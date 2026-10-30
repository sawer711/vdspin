// --- ЗВУКОВОЙ ДВИЖОК (WEB AUDIO API) ---
let soundOn = true;
try { soundOn = localStorage.getItem('vdspin_sound') !== 'off'; } catch (e) {}

const soundBtn = document.getElementById('soundBtn');
function renderSoundBtn() {
    soundBtn.innerText = (soundOn ? '🔊 ' : '🔇 ') + t('sound');
    soundBtn.classList.toggle('off', !soundOn);
}
soundBtn.addEventListener('click', () => {
    soundOn = !soundOn;
    try { localStorage.setItem('vdspin_sound', soundOn ? 'on' : 'off'); } catch (e) {}
    renderSoundBtn();
});
renderSoundBtn();

const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let masterBus = null;     // общий выход: сухой звук + лёгкая "комната"
let noiseBuf = null;      // короткий шум для тонкого щелчка
let lastTickAt = 0;

// Цепочка: всё идёт через мягкий фильтр высоких частот и чуть-чуть реверберации — звук не "режет" ухо
function buildAudioChain() {
    masterBus = audioCtx.createGain();
    masterBus.gain.value = 1.5;

    const softener = audioCtx.createBiquadFilter();
    softener.type = 'lowpass';
    softener.frequency.value = 5200;
    softener.Q.value = 0.5;
    masterBus.connect(softener);
    softener.connect(audioCtx.destination);

    // небольшая комната (искусственный затухающий отзвук)
    const len = Math.floor(audioCtx.sampleRate * 0.9);
    const ir = audioCtx.createBuffer(2, len, audioCtx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
        const d = ir.getChannelData(ch);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
    }
    const room = audioCtx.createConvolver();
    room.buffer = ir;
    const wet = audioCtx.createGain();
    wet.gain.value = 0.22;
    masterBus.connect(room);
    room.connect(wet);
    wet.connect(softener);

    const nLen = Math.floor(audioCtx.sampleRate * 0.02);
    noiseBuf = audioCtx.createBuffer(1, nLen, audioCtx.sampleRate);
    const nd = noiseBuf.getChannelData(0);
    for (let i = 0; i < nLen; i++) nd[i] = Math.random() * 2 - 1;
}

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioCtx();
        buildAudioChain();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

// Мягкий "тук" при прохождении сектора: глухой тон + тонкий щелчок.
// intensity 0..1 — чем быстрее вращение, тем тише; when — момент запуска (нужен только для проверки)
function playTickSound(intensity = 1, when) {
    if (!audioCtx || !soundOn) return;
    if (when === undefined) {
        // на высокой скорости не сыпем десятки щелчков в секунду — иначе получается "трещотка"
        const nowMs = performance.now();
        if (nowMs - lastTickAt < 40) return;
        lastTickAt = nowMs;
    }
    try {
        const t = (when !== undefined) ? when : audioCtx.currentTime;
        const v = Math.max(0.15, Math.min(1, intensity));
        const f = 210 * (1 + (Math.random() - 0.5) * 0.08);

        const body = audioCtx.createOscillator();
        const bodyGain = audioCtx.createGain();
        body.type = 'sine';
        body.frequency.setValueAtTime(f * 1.5, t);
        body.frequency.exponentialRampToValueAtTime(f, t + 0.025);
        bodyGain.gain.setValueAtTime(0.0001, t);
        bodyGain.gain.linearRampToValueAtTime(0.16 * v, t + 0.003);
        bodyGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
        body.connect(bodyGain);
        bodyGain.connect(masterBus);
        body.start(t);
        body.stop(t + 0.12);

        const click = audioCtx.createBufferSource();
        const clickBand = audioCtx.createBiquadFilter();
        const clickGain = audioCtx.createGain();
        click.buffer = noiseBuf;
        clickBand.type = 'bandpass';
        clickBand.frequency.value = 2400;
        clickBand.Q.value = 1.4;
        clickGain.gain.setValueAtTime(0.05 * v, t);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);
        click.connect(clickBand);
        clickBand.connect(clickGain);
        clickGain.connect(masterBus);
        click.start(t);
    } catch (e) {}
}

// Звук остановки: мягкий колокольчик (аккорд из трёх нот с тихим отзвуком)
function playWinSound(when) {
    if (!audioCtx || !soundOn) return;
    try {
        const t0 = (when !== undefined) ? when : audioCtx.currentTime;
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
            const t = t0 + idx * 0.09;
            [[1, 0.10], [2.01, 0.025]].forEach(([mult, level]) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq * mult, t);
                gain.gain.setValueAtTime(0.0001, t);
                gain.gain.linearRampToValueAtTime(level, t + 0.012);
                gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);
                osc.connect(gain);
                gain.connect(masterBus);
                osc.start(t);
                osc.stop(t + 1.35);
            });
        });
    } catch (e) {}
}

// --- ОФОРМЛЕНИЕ: шрифт, шестиугольники и зерно для canvas ---
const HEAD_FONT = "'Oswald', 'Arial Narrow', sans-serif";

function hexPath(c, R) {
    c.beginPath();
    for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + i * Math.PI / 3;
        const x = R * Math.cos(a), y = R * Math.sin(a);
        if (i === 0) c.moveTo(x, y); else c.lineTo(x, y);
    }
    c.closePath();
}

// заранее генерируем плитку шума, потом накладываем её на колесо и карточку
const noiseTile = document.createElement('canvas');
noiseTile.width = noiseTile.height = 160;
(function () {
    const n = noiseTile.getContext('2d');
    const d = n.createImageData(160, 160);
    for (let i = 0; i < d.data.length; i += 4) {
        const v = Math.random() * 255;
        d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
        d.data[i + 3] = 255;
    }
    n.putImageData(d, 0, 0);
})();

function drawGrain(c, alpha) {
    c.save();
    c.globalAlpha = alpha;
    c.fillStyle = c.createPattern(noiseTile, 'repeat');
    c.fillRect(0, 0, c.canvas.width, c.canvas.height);
    c.restore();
}

// --- ПЛАВНОЕ НАВЕДЕНИЕ НА СЕКТОРЫ КОЛЕСА ---
// для каждого перка хранится значение 0..1 (насколько сектор "выдвинут"), оно плавно тянется к цели
const hoverAnim = {};
let hoverTarget = null;
let hoverRaf = null;

function setHover(id) {
    if (hoverTarget === id) return;
    hoverTarget = id;
    if (!hoverRaf) hoverRaf = requestAnimationFrame(stepHover);
}

function resetHover() {
    hoverTarget = null;
    Object.keys(hoverAnim).forEach(k => hoverAnim[k] = 0);
}

function stepHover() {
    let active = false;
    activePool.forEach(p => {
        const target = (p.id === hoverTarget) ? 1 : 0;
        const cur = hoverAnim[p.id] || 0;
        const next = cur + (target - cur) * 0.2;
        if (Math.abs(target - next) < 0.01) {
            hoverAnim[p.id] = target;
        } else {
            hoverAnim[p.id] = next;
            active = true;
        }
    });
    if (!isSpinning) drawWheel();
    hoverRaf = active ? requestAnimationFrame(stepHover) : null;
}

// Кэширование картинок перков
const perkImagesCache = {};
MASTER_PERKS.forEach(p => {
    const img = new Image();
    img.src = p.image;
    img.onload = () => drawWheel();
    perkImagesCache[p.id] = img;
});

let activePool = [...MASTER_PERKS];
let buildSlots = [null, null, null];

const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const resetBtn = document.getElementById('resetBtn');
const modal = document.getElementById('resultModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalQuote = document.getElementById('modalQuote');
const modalImg = document.getElementById('modalImg');
const closeModal = document.getElementById('closeModal');

let currentAngle = 0;
let isSpinning = false;

function drawWheel() {
    const totalSlices = activePool.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (totalSlices === 0) return;

    const sliceAngle = (2 * Math.PI) / totalSlices;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = centerX - 12;
    const hv = (p) => hoverAnim[p.id] || 0;

    function wedge(a0, a1, R) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, R, a0, a1);
        ctx.closePath();
    }
    function shadeGradient(R) {
        const g = ctx.createRadialGradient(centerX, centerY, R * 0.12, centerX, centerY, R);
        g.addColorStop(0, 'rgba(0,0,0,0.65)');
        g.addColorStop(0.5, 'rgba(0,0,0,0)');
        g.addColorStop(1, 'rgba(170,64,26,0.20)');
        return g;
    }

    // 1. Сектора (тёмный металл)
    activePool.forEach((perk, i) => {
        const angle = currentAngle + i * sliceAngle;
        wedge(angle, angle + sliceAngle, radius);
        ctx.fillStyle = (i % 2 === 0) ? "#2a150e" : "#190c08";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#4e2113";
        ctx.stroke();
    });

    // 2. Объём и грязь: затемнение к центру, ржавый отсвет у края, зерно
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = shadeGradient(radius);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrain(ctx, 0.07);
    ctx.restore();

    // 3. Ржавый обод
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 5, 0, Math.PI * 2);
    ctx.lineWidth = 12;
    ctx.strokeStyle = "#3c180d";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 11, 0, Math.PI * 2);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(232,112,58,0.55)";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0d0604";
    ctx.stroke();
    ctx.restore();

    // 4. Сектор под курсором: плавно "выдвигается" наружу и подсвечивается
    activePool.forEach((perk, i) => {
        const h = hv(perk);
        if (h < 0.01) return;
        const a0 = currentAngle + i * sliceAngle;
        const a1 = a0 + sliceAngle;
        const Ro = radius + 10 * h;

        ctx.save();
        wedge(a0, a1, Ro);
        ctx.shadowColor = 'rgba(0,0,0,0.85)';
        ctx.shadowBlur = 16 * h;
        ctx.fillStyle = (i % 2 === 0) ? "#2a150e" : "#190c08";
        ctx.fill();
        ctx.shadowBlur = 0;
        wedge(a0, a1, Ro);
        ctx.fillStyle = `rgba(212,83,42,${0.30 * h})`;
        ctx.fill();
        ctx.save();
        wedge(a0, a1, Ro);
        ctx.clip();
        ctx.fillStyle = shadeGradient(Ro);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        // кромка сектора
        wedge(a0, a1, Ro);
        ctx.lineWidth = 2 + 2 * h;
        ctx.strokeStyle = `rgba(232,112,58,${0.9 * h})`;
        ctx.stroke();

        // кусок обода на выдвинутом секторе
        ctx.beginPath();
        ctx.arc(centerX, centerY, Ro - 5, a0, a1);
        ctx.lineWidth = 12;
        ctx.strokeStyle = "#5c2411";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, Ro - 11, a0, a1);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(255,140,80,0.8)";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, Ro, a0, a1);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#0d0604";
        ctx.stroke();
        ctx.restore();
    });

    // 5. Заклёпки на стыках секторов
    activePool.forEach((perk, i) => {
        const prev = activePool[(i - 1 + totalSlices) % totalSlices];
        const lift = 10 * Math.max(hv(perk), hv(prev));
        const a = currentAngle + i * sliceAngle;
        const rx = centerX + Math.cos(a) * (radius - 5 + lift);
        const ry = centerY + Math.sin(a) * (radius - 5 + lift);
        ctx.beginPath();
        ctx.arc(rx, ry, 3.6, 0, Math.PI * 2);
        ctx.fillStyle = "#b9704a";
        ctx.fill();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#1a0b07";
        ctx.stroke();
    });

    // 6. Иконки перков в шестиугольных рамках (у выбранного — увеличиваются)
    activePool.forEach((perk, i) => {
        const angle = currentAngle + i * sliceAngle;
        const h = hv(perk);

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle + sliceAngle / 2);

        const img = perkImagesCache[perk.id];
        const iconDistance = radius * 0.76 + 8 * h;
        const iconSize = 60;

        ctx.save();
        ctx.translate(iconDistance, 0);
        ctx.rotate(Math.PI / 2);
        ctx.scale(1 + 0.4 * h, 1 + 0.4 * h);

        if (img && img.complete && img.naturalWidth !== 0) {
            ctx.save();
            if (h > 0.01) {
                ctx.shadowColor = `rgba(255,140,80,${0.9 * h})`;
                ctx.shadowBlur = 20 * h;
            }
            hexPath(ctx, iconSize / 2 + 3);
            ctx.fillStyle = "#0b0504";
            ctx.fill();
            ctx.restore();
            ctx.lineWidth = 2;
            ctx.strokeStyle = `rgb(${138 + 94 * h | 0},${58 + 54 * h | 0},${28 + 30 * h | 0})`;
            hexPath(ctx, iconSize / 2 + 3);
            ctx.stroke();

            ctx.save();
            hexPath(ctx, iconSize / 2);
            ctx.clip();
            ctx.drawImage(img, -iconSize / 2, -iconSize / 2, iconSize, iconSize);
            ctx.restore();
        } else {
            ctx.rotate(Math.PI / 4);
            ctx.fillStyle = "#3a1409";
            ctx.strokeStyle = "#a8421c";
            ctx.lineWidth = 2;
            ctx.fillRect(-18, -18, 36, 36);
            ctx.strokeRect(-18, -18, 36, 36);
        }
        ctx.restore();
        ctx.restore();
    });
}

drawWheel();

// Подсказка с названием перка при наведении на колесо
const wheelTip = document.getElementById('wheelTip');

let lastTouch = 0;
let touchTipTimer = null;

// общий обработчик для мыши и пальца: e — любой объект с clientX / clientY
function wheelPointer(e) {
    canvas.style.cursor = 'default';
    if (isSpinning || activePool.length === 0) { wheelTip.classList.remove('show'); setHover(null); return; }
    const rect = canvas.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    const dist = Math.hypot(dx, dy);
    const R = rect.width / 2;
    if (dist < R * 0.2 || dist > R) { wheelTip.classList.remove('show'); setHover(null); return; }

    const sliceAngle = (2 * Math.PI) / activePool.length;
    let rel = (Math.atan2(dy, dx) - currentAngle) % (2 * Math.PI);
    if (rel < 0) rel += 2 * Math.PI;
    const idx = Math.floor(rel / sliceAngle);

    canvas.style.cursor = 'pointer';
    wheelTip.innerText = activePool[idx].name;
    setHover(activePool[idx].id);
    wheelTip.style.left = (e.clientX - canvas.parentElement.getBoundingClientRect().left) + 'px';
    wheelTip.style.top = (e.clientY - canvas.parentElement.getBoundingClientRect().top) + 'px';
    wheelTip.classList.add('show');
    // на телефоне нет "ухода курсора": прячем подсказку сами через пару секунд после касания
    if (Date.now() - lastTouch < 800) {
        clearTimeout(touchTipTimer);
        touchTipTimer = setTimeout(() => { wheelTip.classList.remove('show'); setHover(null); }, 1800);
    }
}
// какой сектор под точкой экрана (или -1, если мимо / в центре)
function sectorAtPoint(clientX, clientY) {
    if (activePool.length === 0) return -1;
    const rect = canvas.getBoundingClientRect();
    const dx = clientX - rect.left - rect.width / 2;
    const dy = clientY - rect.top - rect.height / 2;
    const dist = Math.hypot(dx, dy);
    const R = rect.width / 2;
    if (dist < R * 0.2 || dist > R) return -1;
    const sliceAngle = (2 * Math.PI) / activePool.length;
    let rel = (Math.atan2(dy, dx) - currentAngle) % (2 * Math.PI);
    if (rel < 0) rel += 2 * Math.PI;
    return Math.floor(rel / sliceAngle);
}

// клик по перку на колесе — посмотреть описание
canvas.addEventListener('click', (e) => {
    if (isSpinning) return;
    const idx = sectorAtPoint(e.clientX, e.clientY);
    if (idx < 0) return;
    wheelTip.classList.remove('show');
    showModal(activePool[idx], true);
});

canvas.addEventListener('mousemove', wheelPointer);
canvas.addEventListener('touchstart', (e) => {
    lastTouch = Date.now();
    if (e.touches && e.touches[0]) wheelPointer(e.touches[0]);
}, { passive: true });
canvas.addEventListener('mouseleave', () => {
    // после касания телефон сам "уводит мышь": не прячем подсказку раньше времени
    if (Date.now() - lastTouch < 1000) return;
    wheelTip.classList.remove('show');
    setHover(null);
});

spinBtn.addEventListener('click', () => {
    initAudio();

    const emptyIndex = buildSlots.findIndex(slot => slot === null);
    if (emptyIndex === -1 || isSpinning || activePool.length === 0) return;

    isSpinning = true;
    resetHover();
    wheelTip.classList.remove('show');
    spinBtn.disabled = true;

    const totalSlices = activePool.length;
    const sliceAngle = (2 * Math.PI) / totalSlices;
    const targetIndex = Math.floor(Math.random() * totalSlices);
    const extraRotations = 5 * 2 * Math.PI; 
    const stopAngle = (1.5 * Math.PI) - (targetIndex * sliceAngle) - (sliceAngle / 2);
    const totalRotation = extraRotations + (stopAngle - (currentAngle % (2 * Math.PI)));

    const duration = 4200;
    const startTime = performance.now();
    const startAngle = currentAngle;
    let lastSliceIndex = -1;

    function animate(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        currentAngle = startAngle + totalRotation * easeOut;
        drawWheel();

        // Проверка сектора для щелчка
        const currentSliceIndex = Math.floor(currentAngle / sliceAngle);
        if (currentSliceIndex !== lastSliceIndex) {
            playTickSound(0.35 + 0.65 * progress);
            lastSliceIndex = currentSliceIndex;
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            playWinSound();

            const wonPerk = activePool[targetIndex];
            buildSlots[emptyIndex] = wonPerk;
            activePool.splice(targetIndex, 1);
            
            updateSlotsUI();
            showModal(wonPerk);
            updateControlsUI();
            drawWheel();
        }
    }

    requestAnimationFrame(animate);
});

function updateSlotsUI() {
    buildSlots.forEach((perk, idx) => {
        const slotElem = document.getElementById(`slot-${idx}`);
        const imgElem = slotElem.querySelector('img');
        if (perk) {
            slotElem.classList.add('filled');
            imgElem.style.opacity = '1';
            imgElem.src = perk.image;
            slotElem.querySelector('.slot-name').innerText = perk.name;
        } else {
            slotElem.classList.remove('filled');
            imgElem.src = '';
            slotElem.querySelector('.slot-name').innerText = '';
        }
    });
}

// --- РАНДОМАЙЗЕР МАНЬЯКОВ (простой рандом, без колеса) ---

const killerBtn = document.getElementById('killerBtn');
const killerCard = document.getElementById('killerCard');
const killerImg = document.getElementById('killerImg');
const killerName = document.getElementById('killerName');
let killerRolling = false;
let currentKiller = null;

// --- КАРТОЧКА БИЛДА ---
const cardBtn = document.getElementById('cardBtn');
const cardModal = document.getElementById('cardModal');
const cardCanvas = document.getElementById('cardCanvas');
const cardNote = document.getElementById('cardNote');

function loadImage(src) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
    });
}

function roundRectPath(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
}

function drawContain(c, img, x, y, w, h) {
    if (!img) return;
    const k = Math.min(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * k, dh = img.naturalHeight * k;
    c.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

async function drawBuildCard() {
    const c = cardCanvas.getContext('2d');
    const W = cardCanvas.width, H = cardCanvas.height;
    try { await document.fonts.load("700 24px Oswald"); await document.fonts.ready; } catch (e) {}

    const perkImgs = await Promise.all(buildSlots.map(p => p ? loadImage(p.image) : null));
    const killerImg2 = currentKiller ? await loadImage(currentKiller.image) : null;

    // фон: тёмный металл + ржавый отсвет + зерно + виньетка
    const bg = c.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#1a0d09');
    bg.addColorStop(1, '#070302');
    c.fillStyle = bg;
    c.fillRect(0, 0, W, H);
    const glow = c.createRadialGradient(W / 2, 0, 0, W / 2, 0, 650);
    glow.addColorStop(0, 'rgba(170,64,26,0.38)');
    glow.addColorStop(1, 'rgba(170,64,26,0)');
    c.fillStyle = glow;
    c.fillRect(0, 0, W, H);
    drawGrain(c, 0.08);
    const vig = c.createRadialGradient(W / 2, H / 2, H * 0.45, W / 2, H / 2, W * 0.62);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,0.6)');
    c.fillStyle = vig;
    c.fillRect(0, 0, W, H);

    // заголовок
    c.textAlign = 'center';
    c.fillStyle = '#ecdfcc';
    c.shadowColor = 'rgba(212,83,42,0.7)';
    c.shadowBlur = 16;
    c.font = `700 50px ${HEAD_FONT}`;
    c.fillText('V D   S P I N', W / 2, 72);
    c.shadowBlur = 0;
    c.fillStyle = '#8a7366';
    c.font = "500 15px 'Rubik', sans-serif";
    c.fillText('V I O L E N C E   D I S T R I C T   B U I L D', W / 2, 100);

    const top = 130, ch = 420, cw = 250;

    // панель с ржавой рамкой и заклёпками
    function panel(x, y, w, h) {
        roundRectPath(c, x, y, w, h, 4);
        const g = c.createLinearGradient(x, y, x, y + h);
        g.addColorStop(0, '#2a1611');
        g.addColorStop(1, '#130a07');
        c.fillStyle = g;
        c.fill();
        c.save();
        roundRectPath(c, x, y, w, h, 4);
        c.clip();
        drawGrain(c, 0.05);
        c.restore();
        roundRectPath(c, x, y, w, h, 4);
        c.lineWidth = 3;
        c.strokeStyle = '#5a2312';
        c.stroke();
        roundRectPath(c, x + 6, y + 6, w - 12, h - 12, 2);
        c.lineWidth = 1;
        c.strokeStyle = 'rgba(232,112,58,0.35)';
        c.stroke();
        [[x + 14, y + 14], [x + w - 14, y + 14], [x + 14, y + h - 14], [x + w - 14, y + h - 14]].forEach(([rx, ry]) => {
            c.beginPath();
            c.arc(rx, ry, 4, 0, Math.PI * 2);
            c.fillStyle = '#7a3a1c';
            c.fill();
            c.beginPath();
            c.arc(rx, ry, 1.6, 0, Math.PI * 2);
            c.fillStyle = '#d49a72';
            c.fill();
        });
    }

    // перки
    buildSlots.forEach((perk, i) => {
        const x = 40 + i * 270;
        panel(x, top, cw, ch);

        const hcx = x + cw / 2, hcy = top + 125, R = 92;
        c.save();
        c.translate(hcx, hcy);
        hexPath(c, R + 5);
        const rim = c.createLinearGradient(-R, -R, R, R);
        rim.addColorStop(0, '#e8703a');
        rim.addColorStop(0.5, '#6a2410');
        rim.addColorStop(1, '#a43f1b');
        c.fillStyle = rim;
        c.fill();
        hexPath(c, R);
        c.fillStyle = '#0b0504';
        c.fill();
        if (perkImgs[i]) {
            c.save();
            hexPath(c, R);
            c.clip();
            drawContain(c, perkImgs[i], -R, -R, R * 2, R * 2);
            c.restore();
        }
        c.restore();

        c.fillStyle = '#f1e6d6';
        c.font = `700 25px ${HEAD_FONT}`;
        c.fillText(perk ? perk.name.toUpperCase() : '', x + cw / 2, top + 268, cw - 30);

        c.fillStyle = '#8a7366';
        c.font = "italic 13px 'Rubik', sans-serif";
        const q = perk ? perkText(perk).quote.replace(/<[^>]+>/g, '') : '';
        wrapText(c, q, x + cw / 2, top + 302, cw - 40, 18, 5);
    });

    // маньяк
    const kx = 860, kw = 300;
    panel(kx, top, kw, ch);

    if (currentKiller) {
        c.save();
        roundRectPath(c, kx + 20, top + 20, kw - 40, 320, 3);
        c.clip();
        c.fillStyle = '#0f0705';
        c.fillRect(kx + 20, top + 20, kw - 40, 320);
        drawContain(c, killerImg2, kx + 20, top + 20, kw - 40, 320);
        c.restore();
        roundRectPath(c, kx + 20, top + 20, kw - 40, 320, 3);
        c.lineWidth = 2;
        c.strokeStyle = '#7a2f14';
        c.stroke();
        c.fillStyle = '#ecdfcc';
        c.shadowColor = 'rgba(212,83,42,0.7)';
        c.shadowBlur = 12;
        c.font = `700 32px ${HEAD_FONT}`;
        c.fillText(currentKiller.name.toUpperCase(), kx + kw / 2, top + 384);
        c.shadowBlur = 0;
    } else {
        c.fillStyle = '#3a1c12';
        c.font = `700 100px ${HEAD_FONT}`;
        c.fillText('?', kx + kw / 2, top + 220);
        c.fillStyle = '#8a7366';
        c.font = "500 16px 'Rubik', sans-serif";
        c.fillText(t('killerNone'), kx + kw / 2, top + 270);
    }
}

function wrapText(c, text, x, y, maxW, lineH, maxLines) {
    const words = text.split(' ');
    let line = '', lines = [];
    words.forEach(w => {
        const test = line ? line + ' ' + w : w;
        if (c.measureText(test).width > maxW && line) {
            lines.push(line);
            line = w;
        } else {
            line = test;
        }
    });
    if (line) lines.push(line);
    if (lines.length > maxLines) {
        lines = lines.slice(0, maxLines);
        lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…';
    }
    lines.forEach((l, i) => c.fillText(l, x, y + i * lineH));
}

cardBtn.addEventListener('click', async () => {
    cardNote.innerText = '';
    cardModal.classList.add('active');
    await drawBuildCard();
});

document.getElementById('cardClose').addEventListener('click', () => cardModal.classList.remove('active'));


document.getElementById('cardDownload').addEventListener('click', () => {
    try {
        cardCanvas.toBlob(blob => {
            if (!blob) { cardNote.innerText = t('exportErr'); return; }
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'vdspin-build.png';
            a.click();
            setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        }, 'image/png');
    } catch (e) {
        cardNote.innerText = t('exportErr');
    }
});

document.getElementById('cardCopy').addEventListener('click', () => {
    try {
        cardCanvas.toBlob(async blob => {
            if (!blob) { cardNote.innerText = t('exportErr'); return; }
            try {
                await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                cardNote.style.color = '#7dff9a';
                cardNote.innerText = t('copied');
            } catch (e) {
                cardNote.style.color = '#ff8b95';
                cardNote.innerText = t('copyFail');
            }
        }, 'image/png');
    } catch (e) {
        cardNote.style.color = '#ff8b95';
        cardNote.innerText = t('exportErr');
    }
});

function showKiller(k) {
    killerImg.style.opacity = '1';
    killerImg.src = k.image;
    killerName.innerText = k.name;
}

killerBtn.addEventListener('click', () => {
    if (killerRolling) return;
    initAudio();
    killerRolling = true;
    killerBtn.disabled = true;
    killerCard.classList.remove('filled');
    killerCard.classList.add('rolling');

    // короткое мелькание перед итоговым результатом
    const flickerTimer = setInterval(() => {
        showKiller(KILLERS[Math.floor(Math.random() * KILLERS.length)]);
        playTickSound(0.7);
    }, 90);

    setTimeout(() => {
        clearInterval(flickerTimer);
        const result = KILLERS[Math.floor(Math.random() * KILLERS.length)];
        currentKiller = result;
        showKiller(result);
        killerCard.classList.remove('rolling');
        killerCard.classList.add('filled');
        playWinSound();
        killerRolling = false;
        updateControlsUI();
    }, 900);
});

function resetKiller() {
    killerRolling = false;
    currentKiller = null;
    killerCard.classList.remove('filled', 'rolling');
    killerImg.src = '';
    killerName.innerText = '';
}

function updateControlsUI() {
    const filledCount = buildSlots.filter(s => s !== null).length;
    // кнопка маньяка доступна только когда выбиты все 3 перка
    killerBtn.disabled = (filledCount < 3) || killerRolling;
    cardBtn.disabled = filledCount < 3;
    if (filledCount === 3) {
        spinBtn.innerText = t('spinDone');
        spinBtn.disabled = true;
    } else {
        spinBtn.innerText = t('spin', filledCount + 1);
        spinBtn.disabled = false;
    }
}

window.showSlotPerk = function(index) {
    if (buildSlots[index]) {
        showModal(buildSlots[index]);
    }
};

let shownPerk = null, shownPreview = false;
function showModal(perk, preview = false) {
    shownPerk = perk;
    shownPreview = preview;
    const txt = perkText(perk);
    closeModal.innerText = preview ? t('close') : t('cont');
    modalTitle.innerText = perk.name;
    modalDesc.innerHTML = txt.desc;
    modalQuote.innerHTML = txt.quote;
    modalImg.style.opacity = '1';
    modalImg.src = perk.image;
    modal.classList.add('active');
}

closeModal.addEventListener('click', () => modal.classList.remove('active'));

resetBtn.addEventListener('click', () => {
    if (isSpinning) return;
    buildSlots = [null, null, null];
    activePool = [...MASTER_PERKS];
    resetKiller();
    updateSlotsUI();
    updateControlsUI();
    drawWheel();
});

// --- СКИН ИЗ РОБЛОКСА (обновляется вместе с аватаром) ---
(function initPlayer() {
    const img = document.querySelector('.character-img');
    const nick = document.querySelector('.character-nickname');
    nick.textContent = PLAYER.nickname;
    img.alt = PLAYER.nickname;
    img.src = PLAYER.fallbackImage;
    if (!PLAYER.robloxUserId) return;

    const id = PLAYER.robloxUserId;
    // раз в час меняем параметр, чтобы браузер не держал старую картинку вечно
    const stamp = Math.floor(Date.now() / 3600000);
    const direct = `https://www.roblox.com/avatar-thumbnail/image?userId=${id}&width=720&height=720&format=png&_=${stamp}`;
    const proxyApi = `https://thumbnails.roproxy.com/v1/users/avatar?userIds=${id}&size=720x720&format=Png&isCircular=false`;

    function useFallback() {
        img.onerror = null;
        img.src = PLAYER.fallbackImage;
    }

    // запасной путь: через публичный прокси roproxy (сам Роблокс не разрешает такие запросы со страниц)
    async function viaProxy() {
        img.onerror = useFallback;
        try {
            const r = await fetch(proxyApi);
            const j = await r.json();
            const url = j && j.data && j.data[0] && j.data[0].imageUrl;
            if (!url) return useFallback();
            img.src = url;
        } catch (e) {
            useFallback();
        }
    }

    img.onload = () => { img.style.opacity = '1'; };
    img.onerror = viaProxy;
    img.src = direct;
})();

// --- СОЦСЕТИ ---
(function initSocials() {
    // ссылка на Роблокс берётся из PLAYER.robloxUserId (perks.js)
    const rbx = document.getElementById('robloxLink');
    if (PLAYER.robloxUserId) {
        rbx.href = `https://www.roblox.com/users/${PLAYER.robloxUserId}/profile`;
    }

    // у остальных пока всплывает "Скоро"
    const toast = document.getElementById('soonToast');
    let toastTimer = null;
    document.querySelectorAll('.social-btn[data-soon]').forEach(btn => {
        btn.addEventListener('click', () => {
            const r = btn.getBoundingClientRect();
            // не даём плашке уехать за левый край экрана
            const half = toast.offsetWidth / 2 + 10;
            const cx = Math.min(Math.max(r.left + r.width / 2, half), window.innerWidth - half);
            toast.style.left = cx + 'px';
            toast.style.top = (r.top - 14) + 'px';
            toast.classList.remove('show');
            void toast.offsetWidth;   // перезапуск анимации при повторном клике
            toast.classList.add('show');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => toast.classList.remove('show'), 1600);
        });
    });
})();

// --- ЗАКРЫТИЕ ОКОН: по Esc и по клику на тёмный фон ---
(function initModalClose() {
    document.querySelectorAll('.modal').forEach(m => {
        let downOnBackdrop = false;
        m.addEventListener('mousedown', e => { downOnBackdrop = (e.target === m); });
        m.addEventListener('click', e => {
            // закрываем, только если и нажали, и отпустили на фоне (чтобы не закрыть окно при выделении текста)
            if (e.target === m && downOnBackdrop) m.classList.remove('active');
        });
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
        }
    });
})();

// --- СМЕНА ЯЗЫКА: обновляем всё, что рисуется скриптом ---
document.addEventListener('langchange', () => {
    renderSoundBtn();
    updateControlsUI();
    if (shownPerk && modal.classList.contains('active')) showModal(shownPerk, shownPreview);
    if (cardModal.classList.contains('active')) { cardNote.innerText = ''; drawBuildCard(); }
});
// первая отрисовка с учётом сохранённого / определённого языка
renderSoundBtn();
updateControlsUI();

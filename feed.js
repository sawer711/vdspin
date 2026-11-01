// ЛЕНТА «ВЫПАЛО У ИГРОКОВ»: показывает перки, которые выпали другим людям на сайте.
// Работает через бесплатную базу Firebase Realtime Database (адрес — в feed-config.js).
// Хранится только номер перка и время, без ников и личных данных.
(function () {
    const base = ((typeof FEED_CONFIG !== 'undefined' && FEED_CONFIG.dbUrl) || '').trim().replace(/\/+$/, '');
    const box = document.getElementById('feed');
    if (!base || !box) return;                 // не настроено — лента скрыта
    box.hidden = false;

    const list = document.getElementById('feedList');
    const empty = document.getElementById('feedEmpty');
    const SHOW = 8;                             // сколько строк показываем
    const drops = new Map();                    // ключ записи -> { p: id перка, t: время }
    const shown = new Set();                    // уже нарисованные записи (чтобы анимировать только новые)
    let firstRender = true;

    function ago(ms) {
        const s = Math.max(0, Math.round(ms / 1000));
        if (s < 60) return t('agoSec', s);
        if (s < 3600) return t('agoMin', Math.floor(s / 60));
        if (s < 86400) return t('agoHour', Math.floor(s / 3600));
        return t('agoDay', Math.floor(s / 86400));
    }

    function render() {
        const rows = [...drops.entries()]
            .map(([k, v]) => ({ k, p: MASTER_PERKS.find(x => x.id === v.p), t: Number(v.t) || 0 }))
            .filter(r => r.p)
            .sort((a, b) => (b.t - a.t) || (a.k < b.k ? 1 : -1))
            .slice(0, SHOW);
        list.innerHTML = '';
        rows.forEach(r => {
            const li = document.createElement('li');
            li.className = 'feed-item' + (!firstRender && !shown.has(r.k) ? ' fresh' : '');
            li.dataset.t = r.t;
            li.innerHTML = '<span class="feed-hex"><img alt=""></span><span class="feed-text"><span class="feed-name"></span><span class="feed-time"></span></span>';
            li.querySelector('img').src = r.p.image;
            li.querySelector('.feed-name').textContent = r.p.name;
            li.querySelector('.feed-time').textContent = ago(Date.now() - r.t);
            list.appendChild(li);
            shown.add(r.k);
        });
        empty.style.display = rows.length ? 'none' : '';
        firstRender = false;
    }

    function refreshTimes() {
        list.querySelectorAll('.feed-item').forEach(li => {
            li.querySelector('.feed-time').textContent = ago(Date.now() - Number(li.dataset.t));
        });
    }
    setInterval(refreshTimes, 10000);
    document.addEventListener('langchange', () => { refreshTimes(); });

    // поток обновлений от Firebase (EventSource): сначала последние записи, потом новые по мере появления
    function apply(path, data, merge) {
        if (path === '/') {
            if (!merge) drops.clear();
            if (data) Object.keys(data).forEach(k => { if (data[k] === null) drops.delete(k); else drops.set(k, data[k]); });
        } else {
            const k = path.replace(/^\//, '').split('/')[0];
            if (data === null) drops.delete(k); else if (path.split('/').length <= 2) drops.set(k, data);
        }
        render();
    }
    function connect() {
        const q = encodeURIComponent('"$key"');
        const es = new EventSource(`${base}/drops.json?orderBy=${q}&limitToLast=15`);
        es.addEventListener('put', e => { try { const m = JSON.parse(e.data); apply(m.path, m.data, false); } catch (x) {} });
        es.addEventListener('patch', e => { try { const m = JSON.parse(e.data); apply(m.path, m.data, true); } catch (x) {} });
        es.onerror = () => { /* браузер сам переподключится */ };
    }
    try { connect(); } catch (e) {}

    // отправка своего выпавшего перка (не чаще раза в 1,5 секунды)
    let lastSent = 0;
    window.reportDrop = function (perk) {
        const now = Date.now();
        if (!perk || now - lastSent < 1500) return;
        lastSent = now;
        try {
            fetch(`${base}/drops.json`, {
                method: 'POST',
                body: JSON.stringify({ p: perk.id, t: { '.sv': 'timestamp' } }),
                keepalive: true
            }).catch(() => {});
        } catch (e) {}
    };
})();

// ЯЗЫКИ САЙТА: список языков, тексты интерфейса и переключатель.
// Тексты перков лежат в perks.js (русский) и perks_i18n.js (остальные).
// Чтобы поправить любую надпись — найди её в нужном языке ниже и измени.

const LANGS = [
    { code: 'ru', short: 'RU', name: 'Русский' },
    { code: 'en', short: 'EN', name: 'English (US)' },
    { code: 'es', short: 'ES', name: 'Español' },
    { code: 'fr', short: 'FR', name: 'Français' },
    { code: 'kk', short: 'KZ', name: 'Қазақша' }
];

const I18N = {
    ru: {
        accept: 'ПРИНЯТЬ', reject: 'НЕТ ТАКОГО ПЕРКА', confirm: 'ПОДТВЕРДИТЬ БИЛД',
        sound: 'ЗВУК', soundTitle: 'Включить/выключить звук', langTitle: 'Язык',
        buildTitle: 'ВАШ БИЛД (3 СЛОТА)', killerTitle: 'МАНЬЯК', killerBtn: 'ВЫБРАТЬ МАНЬЯКА',
        spin: (n) => `КРУТИТЬ (${n}/3)`, spinDone: 'БИЛД СОБРАН',
        card: 'КАРТОЧКА', resetTitle: 'Сбросить билд',
        hint: 'Нажми на перк на колесе, чтобы прочитать описание',
        cont: 'ПРОДОЛЖИТЬ', close: 'ЗАКРЫТЬ', download: 'СКАЧАТЬ PNG', copy: 'КОПИРОВАТЬ',
        soon: 'Скоро', socials: 'Соцсети', killerNone: 'маньяк не выбран',
        copied: 'Скопировано в буфер обмена', copyFail: 'Не удалось скопировать — нажми «Скачать PNG».',
        exportErr: 'Браузер блокирует экспорт, если страница открыта как файл (file://). Открой сайт через локальный сервер или хостинг — либо сделай скриншот карточки.'
    },
    en: {
        accept: 'ACCEPT', reject: "I DON'T HAVE THIS PERK", confirm: 'CONFIRM BUILD',
        sound: 'SOUND', soundTitle: 'Turn sound on/off', langTitle: 'Language',
        buildTitle: 'YOUR BUILD (3 SLOTS)', killerTitle: 'KILLER', killerBtn: 'PICK A KILLER',
        spin: (n) => `SPIN (${n}/3)`, spinDone: 'BUILD COMPLETE',
        card: 'BUILD CARD', resetTitle: 'Reset build',
        hint: 'Click a perk on the wheel to read its description',
        cont: 'CONTINUE', close: 'CLOSE', download: 'DOWNLOAD PNG', copy: 'COPY',
        soon: 'Coming soon', socials: 'Social links', killerNone: 'no killer selected',
        copied: 'Copied to clipboard', copyFail: 'Could not copy — press "Download PNG" instead.',
        exportErr: 'The browser blocks export when the page is opened as a file (file://). Open the site through a local server or hosting, or take a screenshot of the card.'
    },
    es: {
        accept: 'ACEPTAR', reject: 'NO TENGO ESTE BENEFICIO', confirm: 'CONFIRMAR BUILD',
        sound: 'SONIDO', soundTitle: 'Activar/desactivar el sonido', langTitle: 'Idioma',
        buildTitle: 'TU BUILD (3 RANURAS)', killerTitle: 'ASESINO', killerBtn: 'ELEGIR ASESINO',
        spin: (n) => `GIRAR (${n}/3)`, spinDone: 'BUILD COMPLETA',
        card: 'TARJETA', resetTitle: 'Reiniciar build',
        hint: 'Haz clic en un beneficio de la ruleta para leer su descripción',
        cont: 'CONTINUAR', close: 'CERRAR', download: 'DESCARGAR PNG', copy: 'COPIAR',
        soon: 'Próximamente', socials: 'Redes sociales', killerNone: 'asesino no elegido',
        copied: 'Copiado al portapapeles', copyFail: 'No se pudo copiar: pulsa «Descargar PNG».',
        exportErr: 'El navegador bloquea la exportación si la página se abre como archivo (file://). Abre el sitio desde un servidor local o un hosting, o haz una captura de la tarjeta.'
    },
    fr: {
        accept: 'ACCEPTER', reject: 'JE N\'AI PAS CET ATOUT', confirm: 'CONFIRMER LE BUILD',
        sound: 'SON', soundTitle: 'Activer/désactiver le son', langTitle: 'Langue',
        buildTitle: 'VOTRE BUILD (3 EMPLACEMENTS)', killerTitle: 'TUEUR', killerBtn: 'CHOISIR UN TUEUR',
        spin: (n) => `TOURNER (${n}/3)`, spinDone: 'BUILD TERMINÉ',
        card: 'CARTE', resetTitle: 'Réinitialiser le build',
        hint: 'Clique sur un atout de la roue pour lire sa description',
        cont: 'CONTINUER', close: 'FERMER', download: 'TÉLÉCHARGER PNG', copy: 'COPIER',
        soon: 'Bientôt', socials: 'Réseaux sociaux', killerNone: 'aucun tueur choisi',
        copied: 'Copié dans le presse-papiers', copyFail: 'Copie impossible — clique sur « Télécharger PNG ».',
        exportErr: 'Le navigateur bloque l\'export si la page est ouverte comme un fichier (file://). Ouvre le site via un serveur local ou un hébergeur, ou fais une capture d\'écran de la carte.'
    },
    kk: {
        accept: 'ҚАБЫЛДАУ', reject: 'МЕНДЕ ОЛ ПЕРК ЖОҚ', confirm: 'БИЛДТІ РАСТАУ',
        sound: 'ДЫБЫС', soundTitle: 'Дыбысты қосу/өшіру', langTitle: 'Тіл',
        buildTitle: 'СІЗДІҢ БИЛД (3 ұя)', killerTitle: 'МАНЬЯК', killerBtn: 'МАНЬЯКТЫ ТАҢДАУ',
        spin: (n) => `АЙНАЛДЫРУ (${n}/3)`, spinDone: 'БИЛД ЖИНАЛДЫ',
        card: 'КАРТОЧКА', resetTitle: 'Билдті тастау',
        hint: 'Сипаттамасын оқу үшін дөңгелектегі перкті басыңыз',
        cont: 'ЖАЛҒАСТЫРУ', close: 'ЖАБУ', download: 'PNG ЖҮКТЕУ', copy: 'КӨШІРУ',
        soon: 'Жақында', socials: 'Әлеуметтік желілер', killerNone: 'маньяк таңдалмаған',
        copied: 'Көшіру буферіне көшірілді', copyFail: 'Көшіру мүмкін болмады — «PNG жүктеу» батырмасын басыңыз.',
        exportErr: 'Бет файл (file://) ретінде ашылса, браузер экспортты бұғаттайды. Сайтты жергілікті сервер немесе хостинг арқылы ашыңыз немесе карточканың скриншотын жасаңыз.'
    }
};

let currentLang = 'ru';

// определяем язык: сохранённый выбор → язык браузера → русский
(function detectLang() {
    let saved = null;
    try { saved = localStorage.getItem('vdspin_lang'); } catch (e) {}
    if (saved && I18N[saved]) { currentLang = saved; return; }
    const list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'ru'];
    for (const l of list) {
        const c = String(l).toLowerCase().slice(0, 2);
        if (I18N[c]) { currentLang = c; return; }
    }
})();

// перевод по ключу; для функций передаём аргументы
function t(key, ...args) {
    const v = (I18N[currentLang] && I18N[currentLang][key] !== undefined) ? I18N[currentLang][key] : I18N.ru[key];
    return typeof v === 'function' ? v(...args) : v;
}

// описание и цитата перка на текущем языке
function perkText(perk) {
    if (currentLang !== 'ru' && typeof PERK_I18N !== 'undefined' && PERK_I18N[currentLang]) {
        const i = MASTER_PERKS.findIndex(p => p.id === perk.id);
        const row = PERK_I18N[currentLang][i];
        if (row) return { desc: row[0], quote: row[1] };
    }
    return { desc: perk.desc, quote: perk.quote || '' };
}

function applyStaticTexts() {
    document.documentElement.lang = currentLang === 'kk' ? 'kk' : currentLang;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    const cur = LANGS.find(l => l.code === currentLang);
    const label = document.getElementById('langLabel');
    if (label && cur) label.textContent = cur.short;
    document.querySelectorAll('.lang-option').forEach(b => {
        b.classList.toggle('active', b.dataset.lang === currentLang);
        b.setAttribute('aria-checked', b.dataset.lang === currentLang ? 'true' : 'false');
    });
}

function setLang(code) {
    if (!I18N[code]) return;
    currentLang = code;
    try { localStorage.setItem('vdspin_lang', code); } catch (e) {}
    applyStaticTexts();
    document.dispatchEvent(new CustomEvent('langchange'));
}

// выпадающее меню языка
(function initLangMenu() {
    const btn = document.getElementById('langBtn');
    const menu = document.getElementById('langMenu');
    if (!btn || !menu) return;

    menu.innerHTML = '';
    LANGS.forEach(l => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'lang-option';
        b.dataset.lang = l.code;
        b.setAttribute('role', 'menuitemradio');
        b.innerHTML = `<span class="lang-code">${l.short}</span><span class="lang-name">${l.name}</span>`;
        b.addEventListener('click', () => { setLang(l.code); close(); });
        menu.appendChild(b);
    });

    function open() { menu.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    function close() { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }

    btn.addEventListener('click', e => {
        e.stopPropagation();
        menu.classList.contains('open') ? close() : open();
    });
    document.addEventListener('click', e => { if (!menu.contains(e.target) && e.target !== btn) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    applyStaticTexts();
})();

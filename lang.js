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
        feedTitle: "ВЫПАЛО У ИГРОКОВ", feedEmpty: "Пока тихо. Крутите колесо!",
        agoSec: (n)=>`${n} сек назад`, agoMin: (n)=>`${n} мин назад`, agoHour: (n)=>`${n} ч назад`, agoDay: (n)=>`${n} дн назад`,
        setupWheel: "НАСТРОИТЬ КОЛЕСО", setupTitle: "НАСТРОЙКА КОЛЕСА", setupHint: "Нажми на перк, чтобы убрать его с колеса. Серые перки не выпадут.", setupAll: "ВКЛЮЧИТЬ ВСЕ", setupNone: "ВЫКЛЮЧИТЬ ВСЕ", setupConfirm: "ПОДТВЕРДИТЬ", hintSetup: "Сначала выбери, какие перки будут на колесе",
        setupCount: (n,m)=>`Выбрано ${n} из ${m} (минимум 3)`,
        copyLink: "ССЫЛКА НА БИЛД", linkCopied: "Ссылка на билд скопирована", linkManual: "Скопируй ссылку из адресной строки",
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
        feedTitle: "DROPPED FOR PLAYERS", feedEmpty: "Quiet for now. Spin the wheel!",
        agoSec: (n)=>`${n}s ago`, agoMin: (n)=>`${n}m ago`, agoHour: (n)=>`${n}h ago`, agoDay: (n)=>`${n}d ago`,
        setupWheel: "SET UP THE WHEEL", setupTitle: "WHEEL SETUP", setupHint: "Click a perk to remove it from the wheel. Gray perks will not drop.", setupAll: "ENABLE ALL", setupNone: "DISABLE ALL", setupConfirm: "CONFIRM", hintSetup: "First choose which perks will be on the wheel",
        setupCount: (n,m)=>`Selected ${n} of ${m} (minimum 3)`,
        copyLink: "SHARE LINK", linkCopied: "Build link copied", linkManual: "Copy the link from the address bar",
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
        feedTitle: "LES SALIÓ A LOS JUGADORES", feedEmpty: "Todo tranquilo. ¡Gira la ruleta!",
        agoSec: (n)=>`hace ${n} s`, agoMin: (n)=>`hace ${n} min`, agoHour: (n)=>`hace ${n} h`, agoDay: (n)=>`hace ${n} d`,
        setupWheel: "CONFIGURAR LA RULETA", setupTitle: "CONFIGURACIÓN DE LA RULETA", setupHint: "Haz clic en un beneficio para quitarlo de la ruleta. Los grises no saldrán.", setupAll: "ACTIVAR TODOS", setupNone: "DESACTIVAR TODOS", setupConfirm: "CONFIRMAR", hintSetup: "Primero elige qué beneficios estarán en la ruleta",
        setupCount: (n,m)=>`Elegidos ${n} de ${m} (mínimo 3)`,
        copyLink: "ENLACE DEL BUILD", linkCopied: "Enlace del build copiado", linkManual: "Copia el enlace de la barra de direcciones",
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
        feedTitle: "TIRÉS PAR LES JOUEURS", feedEmpty: 'Calme pour l\'instant. Tourne la roue !',
        agoSec: (n)=>`il y a ${n} s`, agoMin: (n)=>`il y a ${n} min`, agoHour: (n)=>`il y a ${n} h`, agoDay: (n)=>`il y a ${n} j`,
        setupWheel: "CONFIGURER LA ROUE", setupTitle: "CONFIGURATION DE LA ROUE", setupHint: "Clique sur un atout pour le retirer de la roue. Les atouts grisés ne sortiront pas.", setupAll: "TOUT ACTIVER", setupNone: "TOUT DÉSACTIVER", setupConfirm: "CONFIRMER", hintSetup: 'Choisis d\'abord quels atouts seront sur la roue',
        setupCount: (n,m)=>`${n} sur ${m} sélectionnés (minimum 3)`,
        copyLink: "LIEN DU BUILD", linkCopied: "Lien du build copié", linkManual: 'Copie le lien depuis la barre d\'adresse',
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
        feedTitle: "ОЙЫНШЫЛАРҒА ТҮСТІ", feedEmpty: "Әзірге тыныш. Дөңгелекті айналдырыңыз!",
        agoSec: (n)=>`${n} сек бұрын`, agoMin: (n)=>`${n} мин бұрын`, agoHour: (n)=>`${n} сағ бұрын`, agoDay: (n)=>`${n} күн бұрын`,
        setupWheel: "ДӨҢГЕЛЕКТІ БАПТАУ", setupTitle: "ДӨҢГЕЛЕКТІ БАПТАУ", setupHint: "Дөңгелектен алып тастау үшін перкті басыңыз. Сұр перктер түспейді.", setupAll: "БАРЛЫҒЫН ҚОСУ", setupNone: "БАРЛЫҒЫН ӨШІРУ", setupConfirm: "РАСТАУ", hintSetup: "Алдымен дөңгелекте қандай перктер болатынын таңдаңыз",
        setupCount: (n,m)=>`${m} ішінен ${n} таңдалды (кемінде 3)`,
        copyLink: "БИЛД СІЛТЕМЕСІ", linkCopied: "Билд сілтемесі көшірілді", linkManual: "Сілтемені мекенжай жолынан көшіріңіз",
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

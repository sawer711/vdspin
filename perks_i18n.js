// ПЕРЕВОДЫ ПЕРКОВ: описания и цитаты на английском, испанском, французском и казахском.
// Русские тексты лежат в perks.js. Порядок перков такой же, как в perks.js (1–24).
// Названия перков не переводятся — как в игре.
//
// Чтобы поправить перевод, найди нужный перк по комментарию и измени текст.
// Цветные выделения: s(...) — синий, r(...) — красный, a(...) — фиолетовый (ауры),
// o1/o2/o3 — оранжевый/зелёный/красный (уровни), tier(a,b,c) — три уровня через "/",
// tierp(a,b,c) — то же, но с процентом внутри цвета.

const PERK_I18N = (() => {
    const s  = x => `<span class='hl-surv'>${x}</span>`;
    const r  = x => `<span class='hl-red'>${x}</span>`;
    const a  = x => `<span class='hl-aura'>${x}</span>`;
    const o1 = x => `<span class='t1'>${x}</span>`;
    const o2 = x => `<span class='t2'>${x}</span>`;
    const o3 = x => `<span class='t3'>${x}</span>`;
    const tier  = (x, y, z) => `${o1(x)}/${o2(y)}/${o3(z)}`;
    const tierp = (x, y, z) => `${o1(x + '%')}/${o2(y + '%')}/${o3(z + '%')}`;
    const P = '&nbsp;%';   // французский стиль: пробел перед %

    return {

        // ======================= ENGLISH =======================
        en: [
            // 1 Abyssal Covenant
            [`Creates 4 Cursed Chains. Chaining a ${s('Survivor')} to a Cursed Chain makes the Generator with the most repair progress explode, instantly removing ${tier(3, 4, 5)}% progress, plus another ${tier(3, 4, 5)}% for each ${s('Survivor')} repairing it at that moment. You receive a notification, and the Generator starts to regress.`,
             `«In the name... in the name of darkness»`],
            // 2 All Seeing Eye
            [`If ${s('two or more Survivors')} repair a Generator at the same time, a ${r('loud notification')} is triggered and the ${a('aura')} of that Generator is revealed. Generators revealed by this perk are repaired ${tier(6, 8, 10)}% slower.`,
             `«Let's call it pure intuition...»`],
            // 3 Brutal Strength
            [`Lets you break ${s('Pallets')} and kick ${s('Generators')} ${tier(10, 20, 30)}% faster. Hitting any Generator deals an additional ${tier(1, 2, 3)}% damage.`,
             `«100 gorillas vs 1 Killer»`],
            // 4 Combo Streak
            [`Landing a basic attack gives you a ${s('5% speed boost')} for ${tier(11, 12, 13)} seconds. If you land another successful basic attack during that time, you gain an additional ${s('speed boost')}, and the duration of Combo Streak is refreshed.`,
             `«ус ус усус ус ус.»`],
            // 5 Containment
            [`Each time you vault a ${s('Window')}, you do it ${tier(5, 7.5, 10)}% faster and block that ${s('Window')} for ${tier(12, 14, 16)} seconds.`,
             `«Containing the Survivors is the top priority.»`],
            // 6 Corrupted Path
            [`Hitting a ${s('Survivor')} makes them leave behind a corrupted trail that slows anyone who steps on it by ${r('7%')} for ${tier(20, 25, 30)} seconds.`,
             `«For I have done you no good.»`],
            // 7 Deep Wound
            [`Creates ${o1(3)} Cursed ${s('Chains')}. When a ${s('Survivor')} is freed from a Cursed Chain, they receive the ${r('Healing Ban')} status effect for ${tier(20, 30, 40)} seconds and leave blood pools ${r('100%')} more often.`,
             `«Some wounds never close. They just wait for you to try to heal them.»`],
            // 8 Crackdown
            [`Creates ${r('4')} Cursed Chains. Chaining a ${s('Survivor')} to a Cursed Chain grants ${r('2 tokens')} (maximum: ${r('5')}). Hitting a Generator consumes ${r('1 token')} and deals an additional ${tier(4, 7, 10)}% damage.`,
             `«Classic 90s appliance repair.»`],
            // 9 Echo Location
            [`After hitting a ${s('Generator')}, ${a('reveals the auras')} of ${s('Survivors')} within ${o1('100 studs')} for ${tier(3, 4, 5)} seconds.`,
             `«In the dark, the bat whispers, and the world answers.»`],
            // 10 Enhanced Senses
            [`Each time a ${s('Survivor')} performs a fast or medium vault or drops a ${s('Pallet')}, ${a('their aura is revealed')} to you for ${tier(4, 5, 6)} seconds. In addition, this perk extends any ${a('aura reading')} by ${o1('2 seconds')}. Cooldown: ${o1('30 seconds')}.`,
             `«They won't escape me anymore.»`],
            // 11 Next in Line
            [`Chaining a ${s('Survivor')} to a chain ${a('reveals the auras')} of all Survivors located farther than ${o1('120 studs')} from the Chain for ${tier(6, 7, 8)} seconds.`,
             `«Red lights are for my eyes only.»`],
            // 12 Excitement
            [`The mere thought of chaining your victims excites you. You pick up downed ${s('Survivors')} ${tier(25, 33, 50)}% faster. While carrying a ${s('Survivor')}, you gain a movement speed bonus of ${tier(9, 12, 15)}% and increase your Intent Radius by ${o1('24 studs')}. The speed boost lasts ${tier(3, 7, 10)} seconds after you chain a ${s('Survivor')}.`,
             `«The goal matters, not the path.»`],
            // 13 Exposure Therapy
            [`Damaging a ${s('Survivor')} in any way gives you 1 token (maximum ${o1(8)}). When a ${s('Survivor')} finishes healing another ${s('Survivor')} within 150 studs of you, both ${s('Survivors')} receive the ${r('Vulnerable')} status effect for ${o1('10 seconds')}, plus an additional ${tier(3, 4, 5)} sec. of ${r('Vulnerability')} and ${o1('1 second')} of ${a('aura reading')} for each token consumed (up to ${r('4')}). Cooldown: ${o1('30 seconds')}.`,
             `«Look at them. Patching each other up, pretending it will change anything... Go on. See what happens next.»`],
            // 14 Eyes Of Hell
            [`You see the ${a('auras')} of all ${s('Pallets')}, ${s('dropped Pallets')} and ${s('vault')} spots within ${tier(80, 90, 100)} studs. When a ${s('Survivor')} performs a ${s('vault')}, they receive a ${r('5% Slowdown')} effect for ${o1('8 seconds')}. Cooldown: ${tier(60, 45, 30)} seconds.`,
             `«I see you.»`],
            // 15 Hard Swing
            [`Your strikes are precise and merciless. Damaging a ${s('Survivor')} in any way applies the ${r('Winded')} status effect for ${tier(20, 25, 30)} seconds. In addition, the recovery time after successful basic attacks is reduced by ${o1('0.4 seconds')}.`,
             `«Yes, I like hurting people.»`],
            // 16 King's Scourge
            [`Once per game for each ${s('Generator')}: when repair progress reaches ${s('90%')}, its ${a('aura is revealed')} and a ${s('loud sound signal')} plays. ${s('Survivors')} repairing this Generator face a series of ${tier(9, 12, 15)} ${s('special skill checks')}. Repair is blocked until all checks are passed. Failing a check makes the Survivors ${r('Vulnerable')} and applies a ${r('10% repair speed penalty')} for ${tier(5, 10, 15)} seconds, while the ${s('Generator')} loses ${r('15% progress')} and regresses at ${r('double')} speed.`,
             `«Granted the strength of a countless royal army, he leaves one last gift: unleash a storm of merciless fury...»`],
            // 17 Murderous Acrobatics
            [`Kills are only satisfying when done with ${r('style')}. Once every ${o1('45 seconds')} during a ${s('chase')}, you vault windows ${r('20% faster')}. After such a vault, you gain a ${r('speed boost')} of ${tierp(3, 5, 7)} for ${o1('4 seconds')}.`,
             `«If you're going to run... make it spectacular.»`],
            // 18 Offscreen Scare
            [`While you are not in a chase, you gain a ${s('speed boost')} of ${tier(6, 8, 10)}%. When you come closer than ${o1('50 studs')} to a ${s('Survivor')}, this perk deactivates and you gain the ${s('Undetectable')} effect for ${tier(3, 5, 7)} seconds. Undetectable effect cooldown: ${o1('45 seconds')}.`,
             `«Absolute cinema.»`],
            // 19 Predator
            [`Tracking and hunting have become so routine that you know absolutely everything about your victims. Each time a ${s('Survivor')} escapes a chase, their ${a('aura is revealed')} to you for ${o1('6 seconds')}. When you read a Survivor's aura, you gain a ${s('5%')} speed bonus for the duration of the reveal. Cooldown: ${tier(40, 35, 30)} seconds.`,
             `«*heavy breathing*»`],
            // 20 Shadow Trace
            [`At the start of the round you gain the ${s('Undetectable')} status effect for ${tier(30, 45, 60)} seconds. In addition, each time you chain a ${s('Survivor')} to a chain, you gain the ${s('Undetectable')} status effect for ${o1('20 seconds')}.`,
             `«Soon I will be consumed.»`],
            // 21 Stage Fright
            [`Each time your ${a('aura')} is revealed to a ${s('Survivor')}, you gain a ${s('speed boost')} of ${tierp(5, 6, 7)} for the entire duration of the reveal. In addition, at the very start of the match your ${a('aura is revealed')} to the ${s('Survivor')} closest to you for ${tier(10, 20, 30)} seconds.`,
             `«You wanted to see me... so don't look away.»`],
            // 22 Terror Spread
            [`Survivors remain helpless even after completing their objective. Each time the repair of another ${s('Generator')} is completed, all ${s('Survivors')} receive the ${r('Winded')} status effect, and the Killer receives the ${s('Undetectable')} effect for ${tier(20, 30, 40)} seconds.`,
             `«I talked to the devil in Miami, he said everything would be fine.»`],
            // 23 Touch Of Death
            [`Death follows right behind you. Vaulting a ${s('Window')} marks it with the "Touch of Death" for 60 seconds. You see the ${a('white aura')} of this window and vault it ${r('20% faster')}. Up to 2 windows can be marked at the same time.<br>When a ${s('Survivor')} vaults a marked window, they receive the ${r('Vulnerable')} effect for ${tier(10, 15, 20)} seconds and their ${a('aura is revealed')} for ${o1('2 seconds')}. The mark does not disappear from the window after a Survivor vaults it.`,
             `«They say the Angel of Death doesn't knock on the door — he simply waits for you to walk through it.»`],
            // 24 Trade Off
            [`Creates ${r('2 Cursed Chains')}. Chaining a ${s('Survivor')} to a regular (non-cursed) chain turns it into a Cursed Chain. Chaining a ${s('Survivor')} to a Cursed Chain ${a('reveals the aura')} of the Generator with the most repair progress for ${tier(10, 15, 20)} seconds. Survivors repairing this Generator do so ${r('15% slower')} while the reveal is active.`,
             `«Every time we save someone... it only gets worse.»`]
        ],

        // ======================= ESPAÑOL =======================
        es: [
            // 1 Abyssal Covenant
            [`Crea 4 Cadenas Malditas. Encadenar a un ${s('Superviviente')} a una Cadena Maldita hace explotar el Generador con más progreso de reparación, quitándole al instante un ${tier(3, 4, 5)}% de progreso, más otro ${tier(3, 4, 5)}% por cada ${s('Superviviente')} que lo esté reparando en ese momento. Recibes una notificación y el Generador empieza a retroceder.`,
             `«En nombre de... en nombre de la oscuridad»`],
            // 2 All Seeing Eye
            [`Si ${s('dos o más Supervivientes')} reparan un Generador a la vez, se activa una ${r('notificación sonora')} y se revela el ${a('aura')} de ese Generador. Los Generadores revelados por este beneficio se reparan un ${tier(6, 8, 10)}% más lento.`,
             `«Llamémoslo pura intuición...»`],
            // 3 Brutal Strength
            [`Te permite romper ${s('Palés')} y patear ${s('Generadores')} un ${tier(10, 20, 30)}% más rápido. Golpear cualquier Generador causa un ${tier(1, 2, 3)}% de daño adicional.`,
             `«100 gorilas contra 1 Asesino»`],
            // 4 Combo Streak
            [`Acertar un ataque básico te da un ${s('aumento de velocidad del 5%')} durante ${tier(11, 12, 13)} segundos. Si en ese tiempo aciertas otro ataque básico, obtienes un ${s('aumento de velocidad')} adicional y la duración de Combo Streak se renueva.`,
             `«ус ус усус ус ус.»`],
            // 5 Containment
            [`Cada vez que saltas una ${s('Ventana')}, lo haces un ${tier(5, '7,5', 10)}% más rápido y bloqueas esa ${s('Ventana')} durante ${tier(12, 14, 16)} segundos.`,
             `«Contener a los Supervivientes es la máxima prioridad.»`],
            // 6 Corrupted Path
            [`Golpear a un ${s('Superviviente')} hace que deje tras de sí un rastro corrupto que ralentiza un ${r('7%')} a cualquiera que lo pise durante ${tier(20, 25, 30)} segundos.`,
             `«Pues no os he traído ningún bien.»`],
            // 7 Deep Wound
            [`Crea ${o1(3)} ${s('Cadenas')} Malditas. Cuando un ${s('Superviviente')} se libera de una Cadena Maldita, recibe el efecto de estado ${r('Prohibición de curación')} durante ${tier(20, 30, 40)} segundos y deja charcos de sangre un ${r('100%')} más a menudo.`,
             `«Algunas heridas no se cierran. Solo esperan a que intentes curarlas.»`],
            // 8 Crackdown
            [`Crea ${r('4')} Cadenas Malditas. Encadenar a un ${s('Superviviente')} a una Cadena Maldita otorga ${r('2 fichas')} (máximo: ${r('5')}). Golpear un Generador consume ${r('1 ficha')} y causa un ${tier(4, 7, 10)}% de daño adicional.`,
             `«Clásica reparación de aparatos de los 90.»`],
            // 9 Echo Location
            [`Tras golpear un ${s('Generador')}, ${a('revela las auras')} de los ${s('Supervivientes')} en un radio de ${o1('100 studs')} durante ${tier(3, 4, 5)} segundos.`,
             `«En la oscuridad, el murciélago susurra y el mundo le responde.»`],
            // 10 Enhanced Senses
            [`Cada vez que un ${s('Superviviente')} realiza un salto rápido o medio, o tira un ${s('Palé')}, ${a('se te revela su aura')} durante ${tier(4, 5, 6)} segundos. Además, este beneficio prolonga cualquier ${a('lectura de auras')} en ${o1('2 segundos')}. Enfriamiento: ${o1('30 segundos')}.`,
             `«Ya no se me escaparán.»`],
            // 11 Next in Line
            [`Encadenar a un ${s('Superviviente')} a una cadena ${a('revela las auras')} de todos los Supervivientes que estén a más de ${o1('120 studs')} de la Cadena durante ${tier(6, 7, 8)} segundos.`,
             `«Las luces rojas son solo para mis ojos.»`],
            // 12 Excitement
            [`La sola idea de encadenar a tus víctimas te excita. Levantas a los ${s('Supervivientes')} derribados un ${tier(25, 33, 50)}% más rápido. Mientras cargas a un ${s('Superviviente')}, obtienes un bonificador de velocidad de movimiento del ${tier(9, 12, 15)}% y aumentas tu Radio de Intención en ${o1('24 studs')}. La aceleración se mantiene ${tier(3, 7, 10)} segundos después de encadenar a un ${s('Superviviente')}.`,
             `«Lo importante es la meta, no el camino.»`],
            // 13 Exposure Therapy
            [`Dañar a un ${s('Superviviente')} de cualquier forma te da 1 ficha (máximo ${o1(8)}). Cuando un ${s('Superviviente')} termina de curar a otro ${s('Superviviente')} a menos de 150 studs de ti, ambos ${s('Supervivientes')} reciben el efecto de estado ${r('Vulnerable')} durante ${o1('10 segundos')}, además de ${tier(3, 4, 5)} s adicionales de ${r('Vulnerabilidad')} y ${o1('1 segundo')} de ${a('lectura de auras')} por cada ficha consumida (hasta ${r('4')}). Enfriamiento: ${o1('30 segundos')}.`,
             `«Míralos. Se curan unos a otros, fingiendo que eso cambiará algo... Vamos. Mirad lo que viene ahora.»`],
            // 14 Eyes Of Hell
            [`Ves las ${a('auras')} de todos los ${s('Palés')}, ${s('Palés caídos')} y lugares de ${s('salto')} en un radio de ${tier(80, 90, 100)} studs. Cuando un ${s('Superviviente')} realiza un ${s('salto')}, recibe un efecto de ${r('Ralentización del 5%')} durante ${o1('8 segundos')}. Enfriamiento: ${tier(60, 45, 30)} segundos.`,
             `«Te veo.»`],
            // 15 Hard Swing
            [`Tus golpes son precisos e implacables. Dañar a un ${s('Superviviente')} de cualquier forma aplica el efecto de estado ${r('Sin aliento (Winded)')} durante ${tier(20, 25, 30)} segundos. Además, el tiempo de recuperación tras ataques básicos exitosos se reduce en ${o1('0,4 segundos')}.`,
             `«Sí, me gusta hacer daño a la gente.»`],
            // 16 King's Scourge
            [`Una vez por partida para cada ${s('Generador')}: cuando el progreso de reparación alcanza el ${s('90%')}, se revela su ${a('aura')} y suena una ${s('fuerte señal sonora')}. Los ${s('Supervivientes')} que reparan este Generador se enfrentan a una serie de ${tier(9, 12, 15)} ${s('pruebas de reflejos especiales')}. La reparación queda bloqueada hasta superar todas las pruebas. Fallar una prueba deja a los Supervivientes ${r('Vulnerables')} y aplica una ${r('penalización del 10% a la velocidad de reparación')} durante ${tier(5, 10, 15)} segundos, mientras que el ${s('Generador')} pierde un ${r('15% de progreso')} y retrocede al ${r('doble')} de velocidad.`,
             `«Dotado con la fuerza de un incontable ejército real, deja un último regalo: desata una tormenta de furia despiadada...»`],
            // 17 Murderous Acrobatics
            [`Matar solo satisface cuando se hace con ${r('estilo')}. Una vez cada ${o1('45 segundos')} durante una ${s('persecución')}, saltas ventanas un ${r('20% más rápido')}. Tras realizar ese salto, obtienes un ${r('aumento de velocidad')} de ${tierp(3, 5, 7)} durante ${o1('4 segundos')}.`,
             `«Ya que vas a huir... hazlo espectacular.»`],
            // 18 Offscreen Scare
            [`Mientras no estás en una persecución, obtienes un ${s('aumento de velocidad')} del ${tier(6, 8, 10)}%. Al acercarte a menos de ${o1('50 studs')} de un ${s('Superviviente')}, este beneficio se desactiva y obtienes el efecto ${s('Indetectable')} durante ${tier(3, 5, 7)} segundos. Enfriamiento del efecto Indetectable: ${o1('45 segundos')}.`,
             `«Puro cine.»`],
            // 19 Predator
            [`Rastrear y cazar se han vuelto tan habituales que lo sabes todo de tus víctimas. Cada vez que un ${s('Superviviente')} escapa de una persecución, su ${a('aura se te revela')} durante ${o1('6 segundos')}. Cuando lees el aura de un Superviviente, obtienes un bonificador de velocidad del ${s('5%')} mientras dure la revelación. Enfriamiento: ${tier(40, 35, 30)} segundos.`,
             `«*respiración pesada*»`],
            // 20 Shadow Trace
            [`Al inicio de la ronda obtienes el efecto de estado ${s('Indetectable')} durante ${tier(30, 45, 60)} segundos. Además, cada vez que encadenas a un ${s('Superviviente')}, obtienes el efecto ${s('Indetectable')} durante ${o1('20 segundos')}.`,
             `«Pronto seré consumido.»`],
            // 21 Stage Fright
            [`Cada vez que tu ${a('aura')} se revela a un ${s('Superviviente')}, obtienes un ${s('aumento de velocidad')} de ${tierp(5, 6, 7)} durante todo el tiempo que dure la revelación. Además, al principio de la partida tu ${a('aura se revela')} al ${s('Superviviente')} más cercano durante ${tier(10, 20, 30)} segundos.`,
             `«Queríais verme... pues no apartéis la mirada.»`],
            // 22 Terror Spread
            [`Los Supervivientes siguen indefensos incluso tras cumplir su objetivo. Cada vez que se completa la reparación de otro ${s('Generador')}, todos los ${s('Supervivientes')} reciben el efecto de estado ${r('Sin aliento (Winded)')} y el Asesino obtiene el efecto ${s('Indetectable')} durante ${tier(20, 30, 40)} segundos.`,
             `«Hablé con el diablo en Miami, dijo que todo saldría bien.»`],
            // 23 Touch Of Death
            [`La muerte te sigue de cerca. Saltar una ${s('Ventana')} la marca con el «Toque de la muerte» durante 60 segundos. Ves el ${a('aura blanca')} de esa ventana y la saltas un ${r('20% más rápido')}. Se pueden marcar hasta 2 ventanas a la vez.<br>Cuando un ${s('Superviviente')} salta una ventana marcada, recibe el efecto ${r('Vulnerable')} durante ${tier(10, 15, 20)} segundos y su ${a('aura se revela')} durante ${o1('2 segundos')}. La marca no desaparece de la ventana después de que un Superviviente la salte.`,
             `«Dicen que el Ángel de la Muerte no llama a la puerta: simplemente espera a que la cruces.»`],
            // 24 Trade Off
            [`Crea ${r('2 Cadenas Malditas')}. Encadenar a un ${s('Superviviente')} a una cadena normal (no maldita) la convierte en una Cadena Maldita. Encadenar a un ${s('Superviviente')} a una Cadena Maldita ${a('revela el aura')} del Generador con más progreso de reparación durante ${tier(10, 15, 20)} segundos. Los Supervivientes que reparan ese Generador lo hacen un ${r('15% más lento')} mientras dure la revelación.`,
             `«Cada vez que salvamos a alguien... solo empeora.»`]
        ],

        // ======================= FRANÇAIS =======================
        fr: [
            // 1 Abyssal Covenant
            [`Crée 4 Chaînes Maudites. Enchaîner un ${s('Survivant')} à une Chaîne Maudite fait exploser le Générateur ayant le plus de progression de réparation, retirant instantanément ${tier(3, 4, 5)}${P} de progression, plus ${tier(3, 4, 5)}${P} supplémentaires pour chaque ${s('Survivant')} qui le répare à cet instant. Vous recevez une notification et le Générateur commence à régresser.`,
             `«Au nom de... au nom des ténèbres»`],
            // 2 All Seeing Eye
            [`Si ${s('deux Survivants ou plus')} réparent un Générateur en même temps, une ${r('alerte sonore')} se déclenche et l'${a('aura')} de ce Générateur est révélée. Les Générateurs révélés par cet atout sont réparés ${tier(6, 8, 10)}${P} plus lentement.`,
             `«Appelons ça de l'intuition pure...»`],
            // 3 Brutal Strength
            [`Permet de briser les ${s('Palettes')} et de frapper les ${s('Générateurs')} ${tier(10, 20, 30)}${P} plus vite. Frapper n'importe quel Générateur inflige ${tier(1, 2, 3)}${P} de dégâts supplémentaires.`,
             `«100 gorilles contre 1 Tueur»`],
            // 4 Combo Streak
            [`Toucher avec une attaque de base vous donne un ${s('bonus de vitesse de 5 %')} pendant ${tier(11, 12, 13)} secondes. Si vous réussissez une autre attaque de base pendant ce temps, vous obtenez un ${s('bonus de vitesse')} supplémentaire et la durée de Combo Streak est réinitialisée.`,
             `«ус ус усус ус ус.»`],
            // 5 Containment
            [`Chaque fois que vous franchissez une ${s('Fenêtre')}, vous le faites ${tier(5, '7,5', 10)}${P} plus vite et bloquez cette ${s('Fenêtre')} pendant ${tier(12, 14, 16)} secondes.`,
             `«Contenir les Survivants est la priorité absolue.»`],
            // 6 Corrupted Path
            [`Frapper un ${s('Survivant')} lui fait laisser derrière lui une traînée corrompue qui ralentit de ${r('7 %')} quiconque marche dessus pendant ${tier(20, 25, 30)} secondes.`,
             `«Car je ne vous ai apporté aucun bien.»`],
            // 7 Deep Wound
            [`Crée ${o1(3)} ${s('Chaînes')} Maudites. Lorsqu'un ${s('Survivant')} est libéré d'une Chaîne Maudite, il reçoit l'effet ${r('Interdiction de soin')} pendant ${tier(20, 30, 40)} secondes et laisse des flaques de sang ${r('100 %')} plus souvent.`,
             `«Certaines blessures ne se referment jamais. Elles attendent simplement que vous essayiez de les soigner.»`],
            // 8 Crackdown
            [`Crée ${r('4')} Chaînes Maudites. Enchaîner un ${s('Survivant')} à une Chaîne Maudite donne ${r('2 jetons')} (maximum : ${r('5')}). Frapper un Générateur consomme ${r('1 jeton')} et inflige ${tier(4, 7, 10)}${P} de dégâts supplémentaires.`,
             `«Du bon vieux dépannage d'électroménager des années 90.»`],
            // 9 Echo Location
            [`Après avoir frappé un ${s('Générateur')}, ${a('révèle les auras')} des ${s('Survivants')} dans un rayon de ${o1('100 studs')} pendant ${tier(3, 4, 5)} secondes.`,
             `«Dans le noir, la chauve-souris murmure, et le monde lui répond.»`],
            // 10 Enhanced Senses
            [`Chaque fois qu'un ${s('Survivant')} effectue un franchissement rapide ou moyen ou fait tomber une ${s('Palette')}, ${a('son aura vous est révélée')} pendant ${tier(4, 5, 6)} secondes. De plus, cet atout prolonge toute ${a('lecture d\'aura')} de ${o1('2 secondes')}. Temps de recharge : ${o1('30 secondes')}.`,
             `«Ils ne m'échapperont plus.»`],
            // 11 Next in Line
            [`Enchaîner un ${s('Survivant')} à une chaîne ${a('révèle les auras')} de tous les Survivants situés à plus de ${o1('120 studs')} de la Chaîne pendant ${tier(6, 7, 8)} secondes.`,
             `«Les lumières rouges ne sont que pour mes yeux.»`],
            // 12 Excitement
            [`La seule idée d'enchaîner vos victimes vous excite. Vous ramassez les ${s('Survivants')} à terre ${tier(25, 33, 50)}${P} plus vite. Pendant que vous portez un ${s('Survivant')}, vous gagnez un bonus de vitesse de déplacement de ${tier(9, 12, 15)}${P} et augmentez votre Rayon d'Intention de ${o1('24 studs')}. L'accélération persiste ${tier(3, 7, 10)} secondes après avoir enchaîné un ${s('Survivant')}.`,
             `«Seul le but compte, pas le chemin.»`],
            // 13 Exposure Therapy
            [`Infliger des dégâts à un ${s('Survivant')} de quelque manière que ce soit vous donne 1 jeton (maximum ${o1(8)}). Lorsqu'un ${s('Survivant')} termine de soigner un autre ${s('Survivant')} à moins de 150 studs de vous, les deux ${s('Survivants')} reçoivent l'effet ${r('Vulnérable')} pendant ${o1('10 secondes')}, plus ${tier(3, 4, 5)} s supplémentaires de ${r('Vulnérabilité')} et ${o1('1 seconde')} de ${a('lecture d\'aura')} par jeton consommé (jusqu'à ${r('4')}). Temps de recharge : ${o1('30 secondes')}.`,
             `«Regardez-les. Ils se rafistolent, en faisant semblant que ça changera quelque chose... Allez-y. Voyez ce qui se passe ensuite.»`],
            // 14 Eyes Of Hell
            [`Vous voyez les ${a('auras')} de toutes les ${s('Palettes')}, des ${s('Palettes abattues')} et des points de ${s('franchissement')} dans un rayon de ${tier(80, 90, 100)} studs. Lorsqu'un ${s('Survivant')} effectue un ${s('franchissement')}, il reçoit un effet de ${r('Ralentissement de 5 %')} pendant ${o1('8 secondes')}. Temps de recharge : ${tier(60, 45, 30)} secondes.`,
             `«Je te vois.»`],
            // 15 Hard Swing
            [`Vos coups sont précis et impitoyables. Infliger des dégâts à un ${s('Survivant')} de quelque manière que ce soit applique l'effet ${r('Essoufflé (Winded)')} pendant ${tier(20, 25, 30)} secondes. De plus, le temps de récupération après les attaques de base réussies est réduit de ${o1('0,4 seconde')}.`,
             `«Oui, j'aime faire du mal aux gens.»`],
            // 16 King's Scourge
            [`Une fois par partie pour chaque ${s('Générateur')} : lorsque la progression de réparation atteint ${s('90 %')}, son ${a('aura est révélée')} et un ${s('fort signal sonore')} retentit. Les ${s('Survivants')} qui réparent ce Générateur affrontent une série de ${tier(9, 12, 15)} ${s('tests de réflexes spéciaux')}. La réparation est bloquée tant que tous les tests ne sont pas réussis. Échouer un test rend les Survivants ${r('Vulnérables')} et applique une ${r('pénalité de 10 % à la vitesse de réparation')} pendant ${tier(5, 10, 15)} secondes, tandis que le ${s('Générateur')} perd ${r('15 % de progression')} et régresse à ${r('double')} vitesse.`,
             `«Doté de la puissance d'une armée royale innombrable, il laisse un dernier don : déchaîne un torrent de fureur impitoyable...»`],
            // 17 Murderous Acrobatics
            [`Tuer n'est satisfaisant que lorsqu'on le fait avec ${r('style')}. Une fois toutes les ${o1('45 secondes')} pendant une ${s('poursuite')}, vous franchissez les fenêtres ${r('20 % plus vite')}. Après un tel franchissement, vous gagnez un ${r('bonus de vitesse')} de ${tierp(3, 5, 7)} pendant ${o1('4 secondes')}.`,
             `«Puisque tu veux fuir... fais-le avec panache.»`],
            // 18 Offscreen Scare
            [`Tant que vous n'êtes pas en poursuite, vous gagnez un ${s('bonus de vitesse')} de ${tier(6, 8, 10)}${P}. Lorsque vous vous approchez à moins de ${o1('50 studs')} d'un ${s('Survivant')}, cet atout se désactive et vous obtenez l'effet ${s('Indétectable')} pendant ${tier(3, 5, 7)} secondes. Temps de recharge de l'effet Indétectable : ${o1('45 secondes')}.`,
             `«Du grand cinéma.»`],
            // 19 Predator
            [`Traquer et chasser sont devenus si habituels que vous savez absolument tout de vos victimes. Chaque fois qu'un ${s('Survivant')} échappe à une poursuite, son ${a('aura vous est révélée')} pendant ${o1('6 secondes')}. Lorsque vous lisez l'aura d'un Survivant, vous gagnez un bonus de vitesse de ${s('5 %')} pendant la durée de la révélation. Temps de recharge : ${tier(40, 35, 30)} secondes.`,
             `«*respiration lourde*»`],
            // 20 Shadow Trace
            [`Au début de la manche, vous obtenez l'effet ${s('Indétectable')} pendant ${tier(30, 45, 60)} secondes. De plus, chaque fois que vous enchaînez un ${s('Survivant')}, vous obtenez l'effet ${s('Indétectable')} pendant ${o1('20 secondes')}.`,
             `«Bientôt, je serai consumé.»`],
            // 21 Stage Fright
            [`Chaque fois que votre ${a('aura')} est révélée à un ${s('Survivant')}, vous gagnez un ${s('bonus de vitesse')} de ${tierp(5, 6, 7)} pendant toute la durée de la révélation. De plus, tout au début de la partie, votre ${a('aura est révélée')} au ${s('Survivant')} le plus proche de vous pendant ${tier(10, 20, 30)} secondes.`,
             `«Vous vouliez me voir... alors ne détournez pas le regard.»`],
            // 22 Terror Spread
            [`Les Survivants restent impuissants même après avoir accompli leur objectif. Chaque fois que la réparation d'un autre ${s('Générateur')} est terminée, tous les ${s('Survivants')} reçoivent l'effet ${r('Essoufflé (Winded)')}, et le Tueur obtient l'effet ${s('Indétectable')} pendant ${tier(20, 30, 40)} secondes.`,
             `«J'ai parlé au diable à Miami, il a dit que tout irait bien.»`],
            // 23 Touch Of Death
            [`La mort vous suit de près. Franchir une ${s('Fenêtre')} la marque du « Toucher de la mort » pendant 60 secondes. Vous voyez l'${a('aura blanche')} de cette fenêtre et la franchissez ${r('20 % plus vite')}. Jusqu'à 2 fenêtres peuvent être marquées en même temps.<br>Lorsqu'un ${s('Survivant')} franchit une fenêtre marquée, il reçoit l'effet ${r('Vulnérable')} pendant ${tier(10, 15, 20)} secondes et son ${a('aura est révélée')} pendant ${o1('2 secondes')}. La marque ne disparaît pas de la fenêtre après le franchissement d'un Survivant.`,
             `«On dit que l'Ange de la Mort ne frappe pas à la porte — il attend simplement que vous la franchissiez.»`],
            // 24 Trade Off
            [`Crée ${r('2 Chaînes Maudites')}. Enchaîner un ${s('Survivant')} à une chaîne ordinaire (non maudite) la transforme en Chaîne Maudite. Enchaîner un ${s('Survivant')} à une Chaîne Maudite ${a('révèle l\'aura')} du Générateur ayant le plus de progression de réparation pendant ${tier(10, 15, 20)} secondes. Les Survivants qui réparent ce Générateur le font ${r('15 % plus lentement')} pendant la durée de la révélation.`,
             `«Chaque fois qu'on sauve quelqu'un... ça empire.»`]
        ],

        // ======================= ҚАЗАҚША =======================
        kk: [
            // 1 Abyssal Covenant
            [`4 Қарғыс шынжырын жасайды. ${s('Аман қалушыны')} Қарғыс шынжырына байлау жөндеу барысы ең жоғары Генераторды жарып жібереді: бірден ${tier(3, 4, 5)}% барысты алып тастайды, сонымен қатар сол сәтте оны жөндеп жатқан әрбір ${s('аман қалушы')} үшін тағы ${tier(3, 4, 5)}%. Сізге хабарлама келеді, ал Генератор кері кете бастайды.`,
             `«Қараңғылық атымен... қараңғылық атымен»`],
            // 2 All Seeing Eye
            [`Егер Генераторды ${s('екі немесе одан көп Аман қалушы')} бір уақытта жөндесе, ${r('қатты дабыл')} қосылады және осы Генератордың ${a('аурасы')} ашылады. Осы перк ашқан Генераторлар ${tier(6, 8, 10)}% баяуырақ жөнделеді.`,
             `«Мұны таза түйсік дейік...»`],
            // 3 Brutal Strength
            [`${s('Паллеттерді')} сындыруға және ${s('Генераторларды')} тебуге ${tier(10, 20, 30)}% жылдамырақ мүмкіндік береді. Кез келген Генераторға соққы қосымша ${tier(1, 2, 3)}% зақым келтіреді.`,
             `«100 горилла 1 Маньякқа қарсы»`],
            // 4 Combo Streak
            [`Негізгі шабуыл тигенде ${tier(11, 12, 13)} секундқа ${s('5% жылдамдық бонусын')} аласыз. Осы уақытта тағы бір сәтті негізгі шабуыл жасасаңыз, қосымша ${s('жылдамдық бонусын')} аласыз, ал Combo Streak әрекет ету уақыты жаңарады.`,
             `«ус ус усус ус ус.»`],
            // 5 Containment
            [`${s('Терезеден')} секірген сайын сіз мұны ${tier(5, '7,5', 10)}% жылдамырақ жасайсыз және осы ${s('Терезені')} ${tier(12, 14, 16)} секундқа бұғаттайсыз.`,
             `«Аман қалушыларды тежеу — басты міндет.»`],
            // 6 Corrupted Path
            [`${s('Аман қалушыға')} соққы беру оның артында бүлінген із қалдырады, оған басқан кез келген адам ${tier(20, 25, 30)} секундқа ${r('7%')} баяулайды.`,
             `«Себебі мен сендерге ешқандай пайда әкелмедім.»`],
            // 7 Deep Wound
            [`${o1(3)} Қарғыс ${s('шынжырын')} жасайды. ${s('Аман қалушы')} Қарғыс шынжырынан босатылғанда, ол ${tier(20, 30, 40)} секундқа ${r('Емдеуге тыйым')} күй әсерін алады және қан көлшіктерін ${r('100%')} жиі қалдырады.`,
             `«Кейбір жаралар жазылмайды. Олар сен емдеуге тырысқанша күтіп тұрады.»`],
            // 8 Crackdown
            [`${r('4')} Қарғыс шынжырын жасайды. ${s('Аман қалушыны')} Қарғыс шынжырына байлау ${r('2 жетон')} береді (ең көбі: ${r('5')}). Генераторға соққы ${r('1 жетонды')} жұмсайды және қосымша ${tier(4, 7, 10)}% зақым келтіреді.`,
             `«90-жылдардың классикалық техника жөндеуі.»`],
            // 9 Echo Location
            [`${s('Генераторға')} соққы бергеннен кейін ${o1('100 стад')} радиустағы ${s('Аман қалушылардың')} ${a('аураларын ашады')}, ${tier(3, 4, 5)} секунд бойы.`,
             `«Қараңғыда жарқанат сыбырлайды, ал әлем оған жауап береді.»`],
            // 10 Enhanced Senses
            [`${s('Аман қалушы')} жылдам немесе орташа секіру жасаған не ${s('Паллетті')} құлатқан сайын, оның ${a('аурасы сізге ашылады')}, ${tier(4, 5, 6)} секунд бойы. Сонымен қатар бұл перк кез келген ${a('аура оқуды')} ${o1('2 секундқа')} ұзартады. Қайта зарядталу: ${o1('30 секунд')}.`,
             `«Енді олар менен қашып құтылмайды.»`],
            // 11 Next in Line
            [`${s('Аман қалушыны')} шынжырға байлау шынжырдан ${o1('120 стадтан')} алыс орналасқан барлық Аман қалушылардың ${a('аураларын ашады')}, ${tier(6, 7, 8)} секунд бойы.`,
             `«Қызыл шамдар тек менің көзіме арналған.»`],
            // 12 Excitement
            [`Құрбандарды шынжырға байлау туралы ойдың өзі сізді қуантады. Жығылған ${s('Аман қалушыларды')} ${tier(25, 33, 50)}% жылдамырақ көтересіз. ${s('Аман қалушыны')} көтеріп жүргенде қозғалыс жылдамдығына ${tier(9, 12, 15)}% бонус аласыз және Ниет радиусыңызды ${o1('24 стадқа')} арттырасыз. Жылдамдық ${s('Аман қалушыны')} байлағаннан кейін ${tier(3, 7, 10)} секунд сақталады.`,
             `«Мақсат маңызды, жол емес.»`],
            // 13 Exposure Therapy
            [`${s('Аман қалушыға')} кез келген жолмен зақым келтіру сізге 1 жетон береді (ең көбі ${o1(8)}). ${s('Аман қалушы')} сізден 150 стад радиуста басқа ${s('Аман қалушыны')} емдеп бітіргенде, екеуі де ${o1('10 секундқа')} ${r('Осалдық')} күй әсерін алады, сонымен қатар жұмсалған әр жетон үшін қосымша ${tier(3, 4, 5)} сек. ${r('Осалдық')} және ${o1('1 секунд')} ${a('аура ашылуы')} (ең көбі ${r('4')} дейін). Қайта зарядталу: ${o1('30 секунд')}.`,
             `«Оларға қарашы. Бірін-бірі жамап жатыр, бұл бірдеңені өзгертетіндей кейіп танытып... Жарайды. Әрі қарай не болатынын көр.»`],
            // 14 Eyes Of Hell
            [`Сіз ${tier(80, 90, 100)} стад радиуста барлық ${s('Паллеттердің')}, ${s('құлатылған Паллеттердің')} және ${s('секіру')} орындарының ${a('аураларын')} көресіз. ${s('Аман қалушы')} ${s('секіру')} жасағанда, ол ${o1('8 секундқа')} ${r('5% Баяулау')} әсерін алады. Қайта зарядталу: ${tier(60, 45, 30)} секунд.`,
             `«Мен сені көріп тұрмын.»`],
            // 15 Hard Swing
            [`Сіздің соққыларыңыз дәл әрі аяусыз. ${s('Аман қалушыға')} кез келген жолмен зақым келтіру ${tier(20, 25, 30)} секундқа ${r('Әлсіреу (Winded)')} күй әсерін салады. Сонымен қатар сәтті негізгі шабуылдардан кейінгі қалпына келу уақыты ${o1('0,4 секундқа')} қысқарады.`,
             `«Иә, мен адамдарға ауыртпалық келтіргенді ұнатамын.»`],
            // 16 King's Scourge
            [`Ойында әр ${s('Генератор')} үшін бір рет: жөндеу барысы ${s('90%')} жеткенде, оның ${a('аурасы ашылады')} және ${s('қатты дыбыстық сигнал')} беріледі. Осы Генераторды жөндеп жатқан ${s('Аман қалушылар')} ${tier(9, 12, 15)} ${s('арнайы реакция тексерулерінен')} тұратын сериямен кездеседі. Барлық тексеру өтпейінше жөндеу бұғатталады. Тексеруден өтпеу Аман қалушыларды ${r('Осал')} етеді және ${tier(5, 10, 15)} секундқа ${r('жөндеу жылдамдығына 10% айыппұл')} салады, ал ${s('Генератор')} ${r('15% барысты')} жоғалтып, ${r('екі есе')} жылдам кері кетеді.`,
             `«Сансыз патша әскерінің күшімен сыйланған ол соңғы сыйын қалдырады: аяусыз ашудың дауылын босат...»`],
            // 17 Murderous Acrobatics
            [`Кісі өлтіру тек ${r('стильмен')} жасалғанда ғана ләззат береді. ${s('Қуғын')} кезінде ${o1('45 секунд')} сайын бір рет терезелерден ${r('20% жылдамырақ')} секіресіз. Мұндай секіруден кейін ${o1('4 секундқа')} ${tierp(3, 5, 7)} ${r('жылдамдық бонусын')} аласыз.`,
             `«Қашқың келсе... оны көрнекті жаса.»`],
            // 18 Offscreen Scare
            [`Қуғында болмаған кезде сіз ${tier(6, 8, 10)}% ${s('жылдамдық бонусын')} аласыз. ${s('Аман қалушыға')} ${o1('50 стадтан')} жақын келгенде, бұл перк өшеді, ал сіз ${tier(3, 5, 7)} секундқа ${s('Көрінбеушілік')} әсерін аласыз. Көрінбеушілік әсерінің қайта зарядталуы: ${o1('45 секунд')}.`,
             `«Таза кино.»`],
            // 19 Predator
            [`Із кесу мен аңшылық соншалықты әдетке айналды, сіз құрбандар туралы бәрін білесіз. ${s('Аман қалушы')} қуғыннан құтылған сайын, оның ${a('аурасы сізге')} ${o1('6 секундқа')} ${a('ашылады')}. Аман қалушының аурасын оқып тұрғанда, сіз ашылу әрекет еткен уақытқа ${s('5%')} жылдамдық бонусын аласыз. Қайта зарядталу: ${tier(40, 35, 30)} секунд.`,
             `«*ауыр тыныс*»`],
            // 20 Shadow Trace
            [`Раундтың басында сіз ${tier(30, 45, 60)} секундқа ${s('Көрінбеушілік')} күй әсерін аласыз. Сонымен қатар, ${s('Аман қалушыны')} шынжырға байлаған сайын ${o1('20 секундқа')} ${s('Көрінбеушілік')} күй әсерін аласыз.`,
             `«Жақында мені жұтып қояды.»`],
            // 21 Stage Fright
            [`${a('Аураңыз')} ${s('Аман қалушыға')} ашылған сайын, сіз ашылудың бүкіл уақытына ${tierp(5, 6, 7)} ${s('жылдамдық бонусын')} аласыз. Сонымен қатар, матчтың ең басында ${a('аураңыз')} сізге ең жақын ${s('Аман қалушыға')} ${tier(10, 20, 30)} секундқа ашылады.`,
             `«Сендер мені көргілерің келді... ендеше көзді алмаңдар.»`],
            // 22 Terror Spread
            [`Мақсатты орындағаннан кейін де аман қалушылар дәрменсіз болып қалады. Келесі ${s('Генераторды')} жөндеу аяқталған сайын, барлық ${s('Аман қалушылар')} ${r('Әлсіреу (Winded)')} күй әсерін алады, ал Өлтіруші ${tier(20, 30, 40)} секундқа ${s('Көрінбеушілік')} әсерін алады.`,
             `«Мен Майамиде шайтанмен сөйлестім, ол бәрі жақсы болады деді.»`],
            // 23 Touch Of Death
            [`Өлім сізді із-ізімен қуып жүреді. ${s('Терезеден')} секіру оны 60 секундқа «Өлім жанасуымен» белгілейді. Сіз осы терезенің ${a('ақ аурасын')} көресіз және одан ${r('20% жылдамырақ')} секіресіз. Бір уақытта 2 терезеге дейін белгіленуі мүмкін.<br>${s('Аман қалушы')} белгіленген терезеден секіргенде, ол ${tier(10, 15, 20)} секундқа ${r('Осалдық')} әсерін алады, ал оның ${a('аурасы')} ${o1('2 секундқа')} ашылады. Аман қалушы секіргеннен кейін белгі терезеден жоғалмайды.`,
             `«Өлім Періштесі есікті қақпайды дейді — ол сенің есіктен өтуіңді жай ғана күтеді.»`],
            // 24 Trade Off
            [`${r('2 Қарғыс шынжырын')} жасайды. ${s('Аман қалушыны')} қарапайым (қарғыс емес) шынжырға байлау оны Қарғыс шынжырына айналдырады. ${s('Аман қалушыны')} Қарғыс шынжырына байлау жөндеу барысы ең жоғары Генератордың ${a('аурасын')} ${tier(10, 15, 20)} секундқа ${a('ашады')}. Осы Генераторды жөндеп жатқан Аман қалушылар ашылу әрекет еткен кезде ${r('15% баяу')} жөндейді.`,
             `«Біз біреуді құтқарған сайын... жағдай тек нашарлай түседі.»`]
        ]
    };
})();

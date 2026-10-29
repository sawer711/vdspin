// ДАННЫЕ: перки и маньяки. Чтобы добавить нового — скопируй блок и поменяй поля.

// ВСЕ 24 ПЕРКА С ОПИСАНИЕМ И ЦИТАТАМИ
const MASTER_PERKS = [
    {
        id: 1,
        name: "Abyssal Covenant",
        image: "перки/abyssal_covenant.png",
        desc: "Создаёт 4 Проклятые Цепи. Заковывание <span class='hl-surv'>Выжившего</span> на Проклятую Цепь приводит к взрыву Генератора с наибольшим прогрессом починки, мгновенно отнимая <span class='t1'>3</span>/<span class='t2'>4</span>/<span class='t3'>5</span>% прогресса, плюс ещё <span class='t1'>3</span>/<span class='t2'>4</span>/<span class='t3'>5</span>% за каждого <span class='hl-surv'>Выжившего</span>, чинящего его в этот момент. Вы получаете уведомление, и Генератор начинает регрессировать.",
        quote: '«Во имя... во имя тьмы»'
    },
    {
        id: 2,
        name: "All Seeing Eye",
        image: "перки/all_seeing_eye.png",
        desc: "Если Генератор чинят <span class='hl-surv'>двое или более Выживших</span> одновременно, срабатывает <span class='hl-red'>громкое оповещение</span> и раскрывается <span class='hl-aura'>аура</span> этого Генератора. Раскрытые этим перком Генераторы чинятся на <span class='t1'>6</span>/<span class='t2'>8</span>/<span class='t3'>10</span>% медленнее.",
        quote: '«Назовем это чистой интуицией...»'
    },
    {
        id: 3,
        name: "Brutal Strength",
        image: "перки/brutal_strength.png",
        desc: "Позволяет ломать <span class='hl-surv'>Паллеты</span> и пинать <span class='hl-surv'>Генераторы</span> на <span class='t1'>10</span>/<span class='t2'>20</span>/<span class='t3'>30</span>% быстрее. Удар по любому Генератору наносит дополнительно <span class='t1'>1</span>/<span class='t2'>2</span>/<span class='t3'>3</span>% урона.",
        quote: '«100 горилл против 1 Маньяка»'
    },
    {
        id: 4,
        name: "Combo Streak",
        image: "перки/combo_streak.png",
        desc: "Попадание базовой атакой даёт вам <span class='hl-surv'>ускорение на 5%</span> на <span class='t1'>11</span>/<span class='t2'>12</span>/<span class='t3'>13</span> секунд. Если за это время вы совершите ещё одну успешную базовую атаку, вы получите дополнительное <span class='hl-surv'>ускорение</span>, а длительность Combo Streak обновится.",
        quote: '«ус ус усус ус ус.»'
    },
    {
        id: 5,
        name: "Containment",
        image: "перки/containment.png",
        desc: "Каждый раз, когда вы перелезаете через <span class='hl-surv'>Окно</span>, вы делаете это на <span class='t1'>5</span>/<span class='t2'>7.5</span>/<span class='t3'>10</span>% быстрее и блокируете это <span class='hl-surv'>Окно</span> на <span class='t1'>12</span>/<span class='t2'>14</span>/<span class='t3'>16</span> секунд.",
        quote: '«Сдерживание Выживших — первостепенная задача.»'
    },
    {
        id: 6,
        name: "Corrupted Path",
        image: "перки/corrupted_path.png",
        desc: "Удар по <span class='hl-surv'>Выжившему</span> заставляет его оставлять за собой осквернённый след, который замедляет любого наступившего на него на <span class='hl-red'>7%</span> на <span class='t1'>20</span>/<span class='t2'>25</span>/<span class='t3'>30</span> секунд.",
        quote: '«Ибо я не принёс вам никакой пользы.»'
    },
    {
        id: 7,
        name: "Deep Wound",
        image: "перки/deep_wound.png",
        desc: "Создаёт <span class='t1'>3</span> Проклятые <span class='hl-surv'>Цепи</span>. Когда <span class='hl-surv'>Выживший</span> освобождается от Проклятой Цепи, он получает статус-эффект <span class='hl-red'>Запрет на лечение</span> на <span class='t1'>20</span>/<span class='t2'>30</span>/<span class='t3'>40</span> секунд и оставляет лужи крови на <span class='hl-red'>100%</span> чаще.",
        quote: '«Некоторые раны не затягиваются. Они просто ждут, пока ты попытаешься их залечить.»'
    },
    {
        id: 8,
        name: "Crackdown",
        image: "перки/crackdown.png",
        desc: "Создаёт <span class='hl-red'>4</span> Проклятые Цепи. Заковывание <span class='hl-surv'>Выжившего</span> на Проклятую Цепь даёт <span class='hl-red'>2 жетона</span> (максимум: <span class='hl-red'>5</span>). Удар по Генератору расходует <span class='hl-red'>1 жетон</span> и наносит дополнительно <span class='t1'>4</span>/<span class='t2'>7</span>/<span class='t3'>10</span>% урона.",
        quote: '«Классический ремонт техники из 90-х.»'
    },
    {
        id: 9,
        name: "Echo Location",
        image: "перки/echo_location.png",
        desc: "После удара по <span class='hl-surv'>Генератору</span> <span class='hl-aura'>раскрывает ауры</span> <span class='hl-surv'>Выживших</span> в радиусе <span class='t1'>100 стадов</span> на <span class='t1'>3</span>/<span class='t2'>4</span>/<span class='t3'>5</span> секунды.",
        quote: '«В темноте летучая мышь шепчет, и мир ей отвечает.»'
    },
    {
        id: 10,
        name: "Enhanced Senses",
        image: "перки/enhanced_senses.png",
        desc: "Каждый раз, когда <span class='hl-surv'>Выживший</span> совершает быстрый или средний перелаз либо роняет <span class='hl-surv'>Паллету</span>, вам <span class='hl-aura'>раскрывается его аура</span> на <span class='t1'>4</span>/<span class='t2'>5</span>/<span class='t3'>6</span> секунд. Кроме того, этот перк продлевает любое <span class='hl-aura'>чтение аур</span> на <span class='t1'>2 секунды</span>. Перезарядка: <span class='t1'>30 секунд</span>.",
        quote: '«Больше они от меня не сбегут.»'
    },
    {
        id: 11,
        name: "Next in Line",
        image: "перки/next_in_line.png",
        desc: "Заковывание <span class='hl-surv'>Выжившего</span> на цепь <span class='hl-aura'>раскрывает ауры</span> всех Выживших, находящихся дальше <span class='t1'>120 стадов</span> от Цепи, на <span class='t1'>6</span>/<span class='t2'>7</span>/<span class='t3'>8</span> секунд.",
        quote: '«Красные огни только для моих глаз.»'
    },
    {
        id: 12,
        name: "Excitement",
        image: "перки/excitement.png",
        desc: "Одна лишь мысль о заковывании жертв в цепи приводит вас в возбуждение. Вы поднимаете сбитых с ног <span class='hl-surv'>Выживших</span> на <span class='t1'>25</span>/<span class='t2'>33</span>/<span class='t3'>50</span>% быстрее. Во время переноски <span class='hl-surv'>Выжившего</span> вы получаете бонус к скорости передвижения в <span class='t1'>9</span>/<span class='t2'>12</span>/<span class='t3'>15</span>% и увеличиваете свой радиус Умысла на <span class='t1'>24 стада</span>. Ускорение сохраняется на <span class='t1'>3</span>/<span class='t2'>7</span>/<span class='t3'>10</span> секунд после того, как вы заковали <span class='hl-surv'>Выжившего</span>.",
        quote: '«Важна цель, а не путь.»'
    },
    {
        id: 13,
        name: "Exposure Therapy",
        image: "перки/exposure_therapy.png",
        desc: "Нанесение урона <span class='hl-surv'>Выжившему</span> любым способом даёт вам 1 жетон (максимум <span class='t1'>8</span>). Когда <span class='hl-surv'>Выживший</span> заканчивает лечить другого <span class='hl-surv'>Выжившего</span> в радиусе 150 стадов от вас, оба <span class='hl-surv'>Выживших</span> получают статус-эффект <span class='hl-red'>Уязвимость</span> на <span class='t1'>10 секунд</span>, а также дополнительные <span class='t1'>3</span>/<span class='t2'>4</span>/<span class='t3'>5</span> сек. <span class='hl-red'>Уязвимости</span> и <span class='t1'>1 секунду</span> <span class='hl-aura'>раскрытия аур</span> за каждый поглощённый жетон (максимум до <span class='hl-red'>4</span>). Перезарядка: <span class='t1'>30 секунд</span>.",
        quote: '«Посмотри на них. Латают друг дружку, делая вид, будто это что-то изменит... Ну давайте. Смотрите, что будет дальше»'
    },
    {
        id: 14,
        name: "Eyes Of Hell",
        image: "перки/eyes_of_hell.png",
        desc: "Вы видите <span class='hl-aura'>ауры</span> всех <span class='hl-surv'>Паллет</span>, <span class='hl-surv'>сброшенных Паллет</span> и мест для <span class='hl-surv'>перелаза</span> в радиусе <span class='t1'>80</span>/<span class='t2'>90</span>/<span class='t3'>100</span> стадов. Когда <span class='hl-surv'>Выживший</span> совершает <span class='hl-surv'>перелаз</span>, он получает эффект <span class='hl-red'>Замедления на 5%</span> на <span class='t1'>8 секунд</span>. Перезарядка: <span class='t1'>60</span>/<span class='t2'>45</span>/<span class='t3'>30</span> секунд.",
        quote: '«Я вижу тебя.»'
    },
    {
        id: 15,
        name: "Hard Swing",
        image: "перки/hard_swing.png",
        desc: "Ваши удары точны и беспощадны. Нанесение урона <span class='hl-surv'>Выжившему</span> любым способом накладывает статус-эффект <span class='hl-red'>Одышка (Winded)</span> на <span class='t1'>20</span>/<span class='t2'>25</span>/<span class='t3'>30</span> секунд. Кроме того, время восстановления после успешных базовых атак сокращается на <span class='t1'>0.4 секунды</span>.",
        quote: '«Да, мне нравится причинять людям боль.»'
    },
    {
        id: 16,
        name: "King's Scourge",
        image: "перки/kings_scourge.png",
        desc: "Один раз за игру для каждого <span class='hl-surv'>Генератора</span>: когда прогресс починки достигает <span class='hl-surv'>90%</span>, его <span class='hl-aura'>аура раскрывается</span> и раздаётся <span class='hl-surv'>громкий звуковой сигнал</span>. <span class='hl-surv'>Выжившие</span>, чинящие этот Генератор, сталкиваются с серией из <span class='t1'>9</span>/<span class='t2'>12</span>/<span class='t3'>15</span> <span class='hl-surv'>особых проверок реакции</span>. Починка блокируется, пока не будут пройдены все проверки. Провал проверки делает Выживших <span class='hl-red'>Уязвимыми</span> и накладывает <span class='hl-red'>штраф 10% к скорости починки</span> на <span class='t1'>5</span>/<span class='t2'>10</span>/<span class='t3'>15</span> секунд, а <span class='hl-surv'>Генератор</span> теряет <span class='hl-red'>15% прогресса</span> и регрессирует с <span class='hl-red'>удвоенной</span> скоростью.",
        quote: '«Одарённый силой несметной королевской армии, он оставляет последний дар: высвободи шквал беспощадной ярости...»'
    },
    {
        id: 17,
        name: "Murderous Acrobatics",
        image: "перки/murderous_acrobatics.png",
        desc: "Убийства приносят удовлетворение только тогда, когда совершаются со <span class='hl-red'>стилем</span>. Раз в <span class='t1'>45 секунд</span> во время <span class='hl-surv'>погони</span> вы перелезаете через окна на <span class='hl-red'>20% быстрее</span>. Совершив такой перелаз, вы получаете <span class='hl-red'>ускорение</span> на <span class='t1'>3%</span>/<span class='t2'>5%</span>/<span class='t3'>7%</span> на <span class='t1'>4 секунды</span>.",
        quote: '«Раз уж собрался бежать... сделай это зрелищным.»'
    },
    {
        id: 18,
        name: "Offscreen Scare",
        image: "перки/offscreen_scare.png",
        desc: "Пока вы не находитесь в погоне, вы получаете <span class='hl-surv'>ускорение</span> на <span class='t1'>6</span>/<span class='t2'>8</span>/<span class='t3'>10</span>%. При приближении к <span class='hl-surv'>Выжившему</span> ближе чем на <span class='t1'>50 стадов</span> этот перк деактивируется, а вы получаете эффект <span class='hl-surv'>Незаметность</span> на <span class='t1'>3</span>/<span class='t2'>5</span>/<span class='t3'>7</span> секунд. Перезарядка эффекта Незаметности: <span class='t1'>45 секунд</span>.",
        quote: '«Абсолютное кино.»'
    },
    {
        id: 19,
        name: "Predator",
        image: "перки/predator.png",
        desc: "Выслеживание и охота стали настолько привычными, что вы знаете о жертвах абсолютно всё. Каждый раз, когда <span class='hl-surv'>Выживший</span> сбегает из погони, его <span class='hl-aura'>аура раскрывается</span> вам на <span class='t1'>6 секунд</span>. Когда вы читаете ауру Выжившего, вы получаете бонус к скорости в <span class='hl-surv'>5%</span> на время действия раскрытия. Перезарядка: <span class='t1'>40</span>/<span class='t2'>35</span>/<span class='t3'>30</span> секунд.",
        quote: '«*тяжёлое дыхание*»'
    },
    {
        id: 20,
        name: "Shadow Trace",
        image: "перки/shadow_trace.png",
        desc: "В начале раунда вы получаете статус-эффект <span class='hl-surv'>Незаметность</span> на <span class='t1'>30</span>/<span class='t2'>45</span>/<span class='t3'>60</span> секунд. Кроме того, каждый раз, когда вы заковываете <span class='hl-surv'>Выжившего</span> на цепь, вы получаете статус-эффект <span class='hl-surv'>Незаметность</span> на <span class='t1'>20 секунд</span>.",
        quote: '«Скоро я буду поглощён.»'
    },
    {
        id: 21,
        name: "Stage Fright",
        image: "перки/stage_fright.png",
        desc: "Каждый раз, когда ваша <span class='hl-aura'>аура</span> раскрывается <span class='hl-surv'>Выжившему</span>, вы получаете <span class='hl-surv'>ускорение</span> на <span class='t1'>5%</span>/<span class='t2'>6%</span>/<span class='t3'>7%</span> на всё время раскрытия. Кроме того, в самом начале матча ваша <span class='hl-aura'>аура раскрывается</span> ближайшему к вам <span class='hl-surv'>Выжившему</span> на <span class='t1'>10</span>/<span class='t2'>20</span>/<span class='t3'>30</span> секунд.",
        quote: '«Вы хотели меня увидеть... так не отводите же взгляд.»'
    },
    {
        id: 22,
        name: "Terror Spread",
        image: "перки/terror_spread.png",
        desc: "Выжившие остаются беспомощными даже после выполнения цели. Каждый раз, когда завершается починка очередного <span class='hl-surv'>Генератора</span>, все <span class='hl-surv'>Выжившие</span> получают статус-эффект <span class='hl-red'>Одышка (Winded)</span>, а Убийца получает эффект <span class='hl-surv'>Незаметность</span> на <span class='t1'>20</span>/<span class='t2'>30</span>/<span class='t3'>40</span> секунд.",
        quote: '«Я говорил с дьяволом в Майами, он сказал, всё будет в порядке.»'
    },
    {
        id: 23,
        name: "Touch Of Death",
        image: "перки/touch_of_death.png",
        desc: "Смерть следует за вами по пятам. Перелаз через <span class='hl-surv'>Окно</span> помечает его «Прикосновением смерти» на 60 секунд. Вы видите <span class='hl-aura'>белую ауру</span> этого окна и перелезаете через него на <span class='hl-red'>20% быстрее</span>. Одновременно может быть помечено до 2 окон.<br>Когда <span class='hl-surv'>Выживший</span> перелезает через помеченное окно, он получает эффект <span class='hl-red'>Уязвимость</span> на <span class='t1'>10</span>/<span class='t2'>15</span>/<span class='t3'>20</span> секунд, а его <span class='hl-aura'>аура раскрывается</span> на <span class='t1'>2 секунды</span>. Метка не исчезает с окна после перелаза Выжившего.",
        quote: '«Говорят, Ангел Смерти не стучит в дверь — он просто ждёт, пока ты пройдёшь через неё.»'
    },
    {
        id: 24,
        name: "Trade Off",
        image: "перки/trade_off.png",
        desc: "Создаёт <span class='hl-red'>2 Проклятые Цепи</span>. Заковывание <span class='hl-surv'>Выжившего</span> на обычную (не проклятую) цепь превращает её в Проклятую Цепь. Заковывание <span class='hl-surv'>Выжившего</span> на Проклятую Цепь <span class='hl-aura'>раскрывает ауру</span> Генератора с наибольшим прогрессом починки на <span class='t1'>10</span>/<span class='t2'>15</span>/<span class='t3'>20</span> секунд. Выжившие, чинящие этот Генератор, делают это на <span class='hl-red'>15% медленнее</span> во время действия раскрытия.",
        quote: '«Каждый раз, когда мы кого-то спасаем... становится только хуже.»'
    }
];

// Маньяки: name — имя на сайте, image — путь к картинке в папке «маньяки»
const KILLERS = [
    { name: "Michael",  image: "маньяки/michael.webp" },
    { name: "Jeff",     image: "маньяки/jeff.webp" },
    { name: "Hidden",   image: "маньяки/bandage.webp" },
    { name: "Knight",   image: "маньяки/knight.webp" },
    { name: "Jason",    image: "маньяки/jason.webp" },
    { name: "Jacket",   image: "маньяки/richard.webp" }
];

// Автор сайта (тег слева от колеса).
// robloxUserId — число из ссылки на профиль: roblox.com/users/ЧИСЛО/profile
// Пока там null, показывается обычная картинка fallbackImage.
const PLAYER = {
    nickname: "sawer711",
    robloxUserId: 1482481889,
    fallbackImage: "jason.png"
};

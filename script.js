"use strict";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ui = {
  protein: document.getElementById("protein"),
  sand: document.getElementById("sand"),
  sticks: document.getElementById("sticks"),
  workers: document.getElementById("workers"),
  fighters: document.getElementById("fighters"),
  larvae: document.getElementById("larvae"),
  queenStatus: document.getElementById("queen-status"),
  selectionSummary: document.getElementById("selection-summary"),
  selectionDetail: document.getElementById("selection-detail"),
  actionButtons: document.getElementById("action-buttons"),
  messageLog: document.getElementById("message-log"),
  languageSelect: document.getElementById("language-select"),
};

const LANGUAGE_STORAGE_KEY = "murahy-language";
const SUPPORTED_LANGUAGES = ["en", "de", "uk"];
const I18N = {
  en: {
    languageLabel: "Language",
    title: "Ant Colony RTS",
    canvasLabel: "Ant colony strategy game",
    protein: "Protein",
    sand: "Sand",
    sticks: "Sticks",
    workers: "Workers",
    guards: "Guards",
    larvae: "Larvae",
    queen: "Queen",
    selection: "Selection",
    actions: "Actions",
    alive: "Alive",
    dead: "Dead",
    queenAliveCount: "{count} alive",
    colonyFounded: "Colony founded.",
    selectedOnScreen: "Selected {count} {label} on screen.",
    queenMoving: "Queen moving.",
    movingAnts: "Moving {count} ants.",
    attackOrder: "Attack order issued.",
    clickAttackMove: "Click terrain to attack-move.",
    attackMoving: "{count} ants attack-moving.",
    workersGathering: "{count} workers gathering {resource}.",
    workersGatheringMaterials: "{count} workers gathering materials.",
    workersReturning: "{count} workers returning.",
    workersGrowingAnthill: "{count} workers growing the anthill.",
    workersServingQueen: "{count} workers serving the queen.",
    workersFeedingLarvae: "{count} workers feeding larvae.",
    selectWorkersTunnel: "Select workers to build a tunnel.",
    clickTunnelExit: "Click terrain to place the tunnel exit.",
    tunnelPlacementCancelled: "Tunnel placement cancelled.",
    tunnelNeeds: "Tunnel needs {cost}.",
    workersDiggingTunnel: "{count} workers digging a tunnel ({cost}).",
    workersAddedTunnel: "{count} workers added to the tunnel.",
    noActiveTunnel: "No active tunnel to join.",
    tunnelStopped: "Tunnel construction stopped.",
    ordersCleared: "Orders cleared.",
    antsAttacking: "{count} ants attacking.",
    antsDefending: "{count} ants defending the colony.",
    clickRally: "Click terrain to set the queen rally point.",
    rallySet: "New ants will rally there.",
    queenNeedsCell: "Queen needs a prepared cell. Assign workers to serve her.",
    notEnoughProtein: "Not enough protein.",
    nurseryFull: "Nursery full ({current}/{capacity}). Grow the anthill with workers.",
    queenNeedsSpace: "Queen needs open space nearby. Move her inside the anthill.",
    queenLaidLarva: "Queen laid a {label} larva.",
    anthillHasQueen: "This anthill already has a queen.",
    queenAlreadyGrowing: "A queen is already growing here.",
    newQueenNeeds: "A new queen needs {cost} protein.",
    newQueenGrowing: "A new queen is growing in this anthill.",
    anthillExpanded: "Anthill expanded to level {level}.",
    hatched: "{text}hatched.",
    newAnthill: "New anthill founded.",
    enemyAttackPreparing: "Enemy guards are gathering for an attack.",
    enemyAttackIncoming: "Enemy attack wave incoming.",
    queenFallen: "Your queen has fallen.",
    enemyQueenDefeated: "Enemy queen defeated.",
    rallyCancelled: "Rally placement cancelled.",
    attackMoveCancelled: "Attack move cancelled.",
    hillLevel: "Hill L{level}",
    enemyLevel: "Enemy L{level}",
    tunnelWorkersProgress: "{progress}% | {workers} workers",
    victory: "Victory",
    colonyLost: "Colony Lost",
    cellSingular: "+1 cell",
    cellPlural: "+{count} cells",
    selectIdleWorkers: "Select {count} idle workers",
    selectedIdleWorkers: "Selected {count} idle workers.",
    tunnelBuilding: "Tunnel building",
    tunnelComplete: "Tunnel complete",
    tunnelProgressDetail: "{progress}% complete | {assigned} assigned | {working} working",
    costPaid: "Cost paid: {cost}",
    anthillSummary: "Anthill L{level}",
    proteinStore: "Protein store: {current}/{capacity}",
    queenCells: "Queen cells: {count}",
    queenGrowing: "Queen growing",
    noQueen: "No queen",
    zeroUnits: "0 units",
    enemyQueenStatus: "Enemy queen: {status}",
    selectedCount: "{count} selected",
    ordersPrefix: "Orders: {orders}",
    idleOrders: "Idle or awaiting orders",
    carrying: "carrying {items}",
    layCost: "{protein} protein, {cells} cell ({prepared}), nursery {larvae}/{capacity}",
    noAnthill: "No anthill",
    tunnelProgressCost: "{progress}%, {workers} workers",
    actionTunnelBuilding: "Tunnel Building",
    actionTunnelComplete: "Tunnel Complete",
    actionCancelTunnel: "Cancel Tunnel",
    actionRaiseQueen: "Raise New Queen",
    slowGrowthCost: "{cost} protein, slow growth",
    actionNoSelection: "No Selection",
    actionLayWorker: "Lay Worker Larva",
    actionLayGuard: "Lay Guard Larva",
    actionSettingRally: "Setting Rally",
    actionSetRally: "Set Rally Point",
    costRClick: "R, then click terrain",
    actionGatherFood: "Gather Food",
    costProteinSources: "Protein sources",
    actionGatherMaterials: "Gather Materials",
    costSandSticks: "Sand and sticks",
    actionReturn: "Return",
    costDepositResources: "Deposit resources",
    actionGrowAnthill: "Grow Anthill",
    growAnthillCost: "{sand} sand, {sticks} sticks, +{larvae} larvae",
    actionServeQueen: "Serve Queen",
    costProteinPerCell: "1 protein per cell",
    actionFeedLarvae: "Feed Larvae",
    costConsumesProtein: "Consumes protein",
    actionPlacingTunnel: "Placing Tunnel",
    actionBuildTunnel: "Build Tunnel",
    tunnelScreenCost: "100 protein, 100 sand, 100 sticks per screen",
    actionJoinTunnel: "Join Tunnel",
    assigned: "{count} assigned",
    actionAttackMoveActive: "Attack Move Active",
    actionAttackMove: "Attack Move",
    costAClick: "A, then click terrain",
    actionAttackNearest: "Attack Nearest",
    costCombatOrder: "Combat order",
    actionDefend: "Defend",
    costGuardAnthill: "Guard anthill",
    actionStop: "Stop",
    costClearOrders: "Clear orders",
    resourceProtein: "protein",
    resourceSand: "sand",
    resourceSticks: "sticks",
    orderIdle: "idle",
    orderMoving: "moving",
    orderAttackMove: "attack move",
    orderGathering: "gathering",
    orderReturning: "returning",
    orderBuilding: "building",
    orderFeedingLarvae: "feeding larvae",
    orderServingQueen: "serving queen",
    orderDigging: "digging",
    orderAttacking: "attacking",
    unitWorkerOne: "worker",
    unitWorkerMany: "workers",
    unitGuardOne: "guard",
    unitGuardMany: "guards",
    unitQueenOne: "queen",
    unitQueenMany: "queens",
  },
  de: {
    languageLabel: "Sprache",
    title: "Ameisenkolonie RTS",
    canvasLabel: "Ameisenkolonie-Strategiespiel",
    protein: "Protein",
    sand: "Sand",
    sticks: "Stöcke",
    workers: "Arbeiter",
    guards: "Wachen",
    larvae: "Larven",
    queen: "Königin",
    selection: "Auswahl",
    actions: "Aktionen",
    alive: "Lebt",
    dead: "Tot",
    queenAliveCount: "{count} leben",
    colonyFounded: "Kolonie gegründet.",
    selectedOnScreen: "{count} {label} auf dem Bildschirm ausgewählt.",
    queenMoving: "Königin bewegt sich.",
    movingAnts: "{count} Ameisen bewegen sich.",
    attackOrder: "Angriffsbefehl erteilt.",
    clickAttackMove: "Auf Gelände klicken für Angriffsbewegung.",
    attackMoving: "{count} Ameisen in Angriffsbewegung.",
    workersGathering: "{count} Arbeiter sammeln {resource}.",
    workersGatheringMaterials: "{count} Arbeiter sammeln Material.",
    workersReturning: "{count} Arbeiter kehren zurück.",
    workersGrowingAnthill: "{count} Arbeiter erweitern den Ameisenhügel.",
    workersServingQueen: "{count} Arbeiter versorgen die Königin.",
    workersFeedingLarvae: "{count} Arbeiter füttern Larven.",
    selectWorkersTunnel: "Wähle Arbeiter zum Tunnelbau.",
    clickTunnelExit: "Auf Gelände klicken, um den Tunnelausgang zu setzen.",
    tunnelPlacementCancelled: "Tunnelplatzierung abgebrochen.",
    tunnelNeeds: "Tunnel braucht {cost}.",
    workersDiggingTunnel: "{count} Arbeiter graben einen Tunnel ({cost}).",
    workersAddedTunnel: "{count} Arbeiter zum Tunnel hinzugefügt.",
    noActiveTunnel: "Kein aktiver Tunnel zum Beitreten.",
    tunnelStopped: "Tunnelbau gestoppt.",
    ordersCleared: "Befehle gelöscht.",
    antsAttacking: "{count} Ameisen greifen an.",
    antsDefending: "{count} Ameisen verteidigen die Kolonie.",
    clickRally: "Auf Gelände klicken, um den Sammelpunkt der Königin zu setzen.",
    rallySet: "Neue Ameisen sammeln sich dort.",
    queenNeedsCell: "Die Königin braucht eine vorbereitete Zelle. Arbeiter zu ihr schicken.",
    notEnoughProtein: "Nicht genug Protein.",
    nurseryFull: "Brutkammer voll ({current}/{capacity}). Ameisenhügel mit Arbeitern erweitern.",
    queenNeedsSpace: "Die Königin braucht freien Platz in der Nähe. Bewege sie in den Ameisenhügel.",
    queenLaidLarva: "Königin hat eine {label}-Larve gelegt.",
    anthillHasQueen: "Dieser Ameisenhügel hat bereits eine Königin.",
    queenAlreadyGrowing: "Hier wächst bereits eine Königin heran.",
    newQueenNeeds: "Eine neue Königin braucht {cost} Protein.",
    newQueenGrowing: "Eine neue Königin wächst in diesem Ameisenhügel.",
    anthillExpanded: "Ameisenhügel auf Stufe {level} erweitert.",
    hatched: "{text}geschlüpft.",
    newAnthill: "Neuer Ameisenhügel gegründet.",
    enemyAttackPreparing: "Feindliche Wachen sammeln sich für einen Angriff.",
    enemyAttackIncoming: "Feindliche Angriffswelle naht.",
    queenFallen: "Deine Königin ist gefallen.",
    enemyQueenDefeated: "Feindliche Königin besiegt.",
    rallyCancelled: "Sammelpunktplatzierung abgebrochen.",
    attackMoveCancelled: "Angriffsbewegung abgebrochen.",
    hillLevel: "Hügel S{level}",
    enemyLevel: "Feind S{level}",
    tunnelWorkersProgress: "{progress}% | {workers} Arbeiter",
    victory: "Sieg",
    colonyLost: "Kolonie verloren",
    cellSingular: "+1 Zelle",
    cellPlural: "+{count} Zellen",
    selectIdleWorkers: "{count} untätige Arbeiter wählen",
    selectedIdleWorkers: "{count} untätige Arbeiter ausgewählt.",
    tunnelBuilding: "Tunnel im Bau",
    tunnelComplete: "Tunnel fertig",
    tunnelProgressDetail: "{progress}% fertig | {assigned} zugeteilt | {working} arbeiten",
    costPaid: "Bezahlt: {cost}",
    anthillSummary: "Ameisenhügel S{level}",
    proteinStore: "Proteinspeicher: {current}/{capacity}",
    queenCells: "Königinzellen: {count}",
    queenGrowing: "Königin wächst",
    noQueen: "Keine Königin",
    zeroUnits: "0 Einheiten",
    enemyQueenStatus: "Feindliche Königin: {status}",
    selectedCount: "{count} ausgewählt",
    ordersPrefix: "Befehle: {orders}",
    idleOrders: "Unt. oder wartet auf Befehle",
    carrying: "trägt {items}",
    layCost: "{protein} Protein, {cells} Zelle ({prepared}), Brut {larvae}/{capacity}",
    noAnthill: "Kein Ameisenhügel",
    tunnelProgressCost: "{progress}%, {workers} Arbeiter",
    actionTunnelBuilding: "Tunnel im Bau",
    actionTunnelComplete: "Tunnel fertig",
    actionCancelTunnel: "Tunnel abbrechen",
    actionRaiseQueen: "Neue Königin",
    slowGrowthCost: "{cost} Protein, langsames Wachstum",
    actionNoSelection: "Keine Auswahl",
    actionLayWorker: "Arbeiterlarve",
    actionLayGuard: "Wachlarve",
    actionSettingRally: "Sammelpunkt setzen",
    actionSetRally: "Sammelpunkt",
    costRClick: "R, dann Gelände klicken",
    actionGatherFood: "Nahrung sammeln",
    costProteinSources: "Proteinquellen",
    actionGatherMaterials: "Material sammeln",
    costSandSticks: "Sand und Stöcke",
    actionReturn: "Zurück",
    costDepositResources: "Ressourcen ablegen",
    actionGrowAnthill: "Hügel erweitern",
    growAnthillCost: "{sand} Sand, {sticks} Stöcke, +{larvae} Larven",
    actionServeQueen: "Königin dienen",
    costProteinPerCell: "1 Protein pro Zelle",
    actionFeedLarvae: "Larven füttern",
    costConsumesProtein: "Verbraucht Protein",
    actionPlacingTunnel: "Tunnel setzen",
    actionBuildTunnel: "Tunnel bauen",
    tunnelScreenCost: "100 Protein, 100 Sand, 100 Stöcke pro Bildschirm",
    actionJoinTunnel: "Tunnel beitreten",
    assigned: "{count} zugeteilt",
    actionAttackMoveActive: "Angriffsbewegung aktiv",
    actionAttackMove: "Angriffsbewegung",
    costAClick: "A, dann Gelände klicken",
    actionAttackNearest: "Nächsten angreifen",
    costCombatOrder: "Kampfbefehl",
    actionDefend: "Verteidigen",
    costGuardAnthill: "Ameisenhügel schützen",
    actionStop: "Stopp",
    costClearOrders: "Befehle löschen",
    resourceProtein: "Protein",
    resourceSand: "Sand",
    resourceSticks: "Stöcke",
    orderIdle: "unt.",
    orderMoving: "bewegt sich",
    orderAttackMove: "Angriffsbewegung",
    orderGathering: "sammelt",
    orderReturning: "kehrt zurück",
    orderBuilding: "baut",
    orderFeedingLarvae: "füttert Larven",
    orderServingQueen: "dient Königin",
    orderDigging: "gräbt",
    orderAttacking: "greift an",
    unitWorkerOne: "Arbeiter",
    unitWorkerMany: "Arbeiter",
    unitGuardOne: "Wache",
    unitGuardMany: "Wachen",
    unitQueenOne: "Königin",
    unitQueenMany: "Königinnen",
  },
  uk: {
    languageLabel: "Мова",
    title: "Мурашина колонія RTS",
    canvasLabel: "Стратегічна гра про мурашину колонію",
    protein: "Білок",
    sand: "Пісок",
    sticks: "Гілки",
    workers: "Робітники",
    guards: "Варта",
    larvae: "Личинки",
    queen: "Матка",
    selection: "Вибір",
    actions: "Дії",
    alive: "Жива",
    dead: "Мертва",
    queenAliveCount: "{count} живі",
    colonyFounded: "Колонію засновано.",
    selectedOnScreen: "Вибрано на екрані: {count} {label}.",
    queenMoving: "Матка рухається.",
    movingAnts: "Рухаються мурахи: {count}.",
    attackOrder: "Наказ атакувати видано.",
    clickAttackMove: "Клацніть на місцевість для атакувального руху.",
    attackMoving: "Атакувальний рух: {count} мурах.",
    workersGathering: "{count} робітників збирають {resource}.",
    workersGatheringMaterials: "{count} робітників збирають матеріали.",
    workersReturning: "{count} робітників повертаються.",
    workersGrowingAnthill: "{count} робітників розширюють мурашник.",
    workersServingQueen: "{count} робітників обслуговують матку.",
    workersFeedingLarvae: "{count} робітників годують личинок.",
    selectWorkersTunnel: "Виберіть робітників для будівництва тунелю.",
    clickTunnelExit: "Клацніть на місцевість, щоб розмістити вихід тунелю.",
    tunnelPlacementCancelled: "Розміщення тунелю скасовано.",
    tunnelNeeds: "Для тунелю потрібно: {cost}.",
    workersDiggingTunnel: "{count} робітників копають тунель ({cost}).",
    workersAddedTunnel: "{count} робітників додано до тунелю.",
    noActiveTunnel: "Немає активного тунелю для приєднання.",
    tunnelStopped: "Будівництво тунелю зупинено.",
    ordersCleared: "Накази очищено.",
    antsAttacking: "{count} мурах атакують.",
    antsDefending: "{count} мурах захищають колонію.",
    clickRally: "Клацніть на місцевість, щоб задати точку збору матки.",
    rallySet: "Нові мурахи збиратимуться там.",
    queenNeedsCell: "Матці потрібна підготовлена комірка. Призначте робітників її обслуговувати.",
    notEnoughProtein: "Недостатньо білка.",
    nurseryFull: "Ясла заповнені ({current}/{capacity}). Розширте мурашник робітниками.",
    queenNeedsSpace: "Матці потрібен вільний простір поруч. Перемістіть її всередину мурашника.",
    queenLaidLarva: "Матка відклала личинку: {label}.",
    anthillHasQueen: "У цьому мурашнику вже є матка.",
    queenAlreadyGrowing: "Тут уже росте матка.",
    newQueenNeeds: "Новій матці потрібно {cost} білка.",
    newQueenGrowing: "Нова матка росте в цьому мурашнику.",
    anthillExpanded: "Мурашник розширено до рівня {level}.",
    hatched: "Вилупилися: {text}.",
    newAnthill: "Новий мурашник засновано.",
    enemyAttackPreparing: "Ворожа варта збирається для атаки.",
    enemyAttackIncoming: "Наближається ворожа хвиля атаки.",
    queenFallen: "Ваша матка загинула.",
    enemyQueenDefeated: "Ворожу матку переможено.",
    rallyCancelled: "Розміщення точки збору скасовано.",
    attackMoveCancelled: "Атакувальний рух скасовано.",
    hillLevel: "Мурашник Р{level}",
    enemyLevel: "Ворог Р{level}",
    tunnelWorkersProgress: "{progress}% | робітників: {workers}",
    victory: "Перемога",
    colonyLost: "Колонію втрачено",
    cellSingular: "+1 комірка",
    cellPlural: "+{count} комірок",
    selectIdleWorkers: "Вибрати вільних: {count}",
    selectedIdleWorkers: "Вибрано вільних робітників: {count}.",
    tunnelBuilding: "Тунель будується",
    tunnelComplete: "Тунель готовий",
    tunnelProgressDetail: "{progress}% готово | призначено: {assigned} | працюють: {working}",
    costPaid: "Сплачено: {cost}",
    anthillSummary: "Мурашник Р{level}",
    proteinStore: "Сховище білка: {current}/{capacity}",
    queenCells: "Комірки матки: {count}",
    queenGrowing: "Матка росте",
    noQueen: "Немає матки",
    zeroUnits: "0 одиниць",
    enemyQueenStatus: "Ворожа матка: {status}",
    selectedCount: "Вибрано: {count}",
    ordersPrefix: "Накази: {orders}",
    idleOrders: "Вільні або чекають наказів",
    carrying: "несе {items}",
    layCost: "{protein} білка, {cells} комірка ({prepared}), ясла {larvae}/{capacity}",
    noAnthill: "Немає мурашника",
    tunnelProgressCost: "{progress}%, робітників: {workers}",
    actionTunnelBuilding: "Тунель будується",
    actionTunnelComplete: "Тунель готовий",
    actionCancelTunnel: "Скасувати тунель",
    actionRaiseQueen: "Нова матка",
    slowGrowthCost: "{cost} білка, повільний ріст",
    actionNoSelection: "Немає вибору",
    actionLayWorker: "Личинка робітника",
    actionLayGuard: "Личинка варти",
    actionSettingRally: "Задання збору",
    actionSetRally: "Точка збору",
    costRClick: "R, потім клацніть місцевість",
    actionGatherFood: "Збирати їжу",
    costProteinSources: "Джерела білка",
    actionGatherMaterials: "Збирати матеріали",
    costSandSticks: "Пісок і гілки",
    actionReturn: "Повернутись",
    costDepositResources: "Здати ресурси",
    actionGrowAnthill: "Розширити мурашник",
    growAnthillCost: "{sand} піску, {sticks} гілок, +{larvae} личинок",
    actionServeQueen: "Обслуговувати матку",
    costProteinPerCell: "1 білок за комірку",
    actionFeedLarvae: "Годувати личинок",
    costConsumesProtein: "Споживає білок",
    actionPlacingTunnel: "Розміщення тунелю",
    actionBuildTunnel: "Будувати тунель",
    tunnelScreenCost: "100 білка, 100 піску, 100 гілок за екран",
    actionJoinTunnel: "До тунелю",
    assigned: "призначено: {count}",
    actionAttackMoveActive: "Атак. рух активний",
    actionAttackMove: "Атакувальний рух",
    costAClick: "A, потім клацніть місцевість",
    actionAttackNearest: "Атакувати ближчих",
    costCombatOrder: "Бойовий наказ",
    actionDefend: "Захищати",
    costGuardAnthill: "Охороняти мурашник",
    actionStop: "Стоп",
    costClearOrders: "Очистити накази",
    resourceProtein: "білок",
    resourceSand: "пісок",
    resourceSticks: "гілки",
    orderIdle: "вільні",
    orderMoving: "рухаються",
    orderAttackMove: "атакувальний рух",
    orderGathering: "збирають",
    orderReturning: "повертаються",
    orderBuilding: "будують",
    orderFeedingLarvae: "годують личинок",
    orderServingQueen: "обслуговують матку",
    orderDigging: "копають",
    orderAttacking: "атакують",
    unitWorkerOne: "робітник",
    unitWorkerMany: "робітників",
    unitGuardOne: "вартовий",
    unitGuardMany: "вартових",
    unitQueenOne: "матка",
    unitQueenMany: "маток",
  },
};

function initialLanguage() {
  const saved = window.localStorage?.getItem(LANGUAGE_STORAGE_KEY);
  if (SUPPORTED_LANGUAGES.includes(saved)) return saved;
  const browserLanguage = navigator.language.slice(0, 2);
  return SUPPORTED_LANGUAGES.includes(browserLanguage) ? browserLanguage : "en";
}

let currentLanguage = initialLanguage();

function t(key, values = {}) {
  const dictionary = I18N[currentLanguage] || I18N.en;
  const template = dictionary[key] ?? I18N.en[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.title = t("title");
  canvas.setAttribute("aria-label", t("canvasLabel"));
}

function setLanguage(language) {
  if (!SUPPORTED_LANGUAGES.includes(language)) return;
  currentLanguage = language;
  window.localStorage?.setItem(LANGUAGE_STORAGE_KEY, language);
  if (ui.languageSelect) ui.languageSelect.value = language;
  applyStaticTranslations();
  if (game.statusMessageKey) {
    game.statusMessage = t(game.statusMessageKey, game.statusMessageValues);
  }
  refreshMessageText();
  game.actionSignature = "";
  renderHud();
  renderActions();
}

const WORLD = { width: 3200, height: 2200 };
const VIEW = { width: 1, height: 1, dpr: 1 };
const BUILD_COST = { sand: 12, sticks: 8 };
const BUILD_TIME_BASE = 22;
const BUILD_RADIUS_MAX = 150;
const LARVAE_BATCH_SIZE = 10;
const LARVAE_LAY_COUNT = 1;
const LARVA_LAY_PROTEIN_COST = 0.1;
const LARVA_CELL_PADDING = 4;
const LARVA_PLACEMENT_MAX_RADIUS = 74;
const QUEEN_COST = 50;
const QUEEN_CELL_INTERVAL = 1;
const LARVA_FEED_INCREMENT = 1;
const MAX_LARVA_FEEDERS = 4;
const LARVA_FEED_LOAD_TIME = 0.14;
const LARVA_FEED_STREAM_GAP = 0.34;
const LARVA_FEED_STUCK_LIMIT = 3;
const RESOURCE_SPAWN_INTERVAL = 1.4;
const TUNNEL_TIME = 50;
const TUNNEL_BASE_COST = { protein: 100, sand: 100, sticks: 100 };
const AI_THINK_INTERVAL = 0.9;
const AI_ATTACK_READY_TIME = 240;
const AI_WAVE_BASE_GAP = 70;
const AI_WAVE_MIN_GAP = 42;
const COLLISION_PADDING = 1.8;
const COLLISION_ITERATIONS = 5;
const MELEE_REACH_PADDING = 4;
const MELEE_BLOCK_PADDING = 2.5;
const ATTACK_MARKER_LIFE = 7.5;
const PROTEIN_STORAGE_VISUAL_CAP = 160;

const UNIT_STATS = {
  queen: {
    radius: 18,
    hp: 110,
    speed: 26,
    range: 28,
    cooldown: 1.25,
    carryMax: 0,
  },
  worker: {
    radius: 8,
    hp: 5,
    speed: 88,
    range: 18,
    cooldown: 0.82,
    carryMax: 6,
  },
  fighter: {
    radius: 9.6,
    hp: 10,
    speed: 76,
    range: 21,
    cooldown: 0.72,
    carryMax: 0,
  },
};

const RESOURCE_META = {
  beetle: { kind: "protein", amount: 10, radius: 10, gatherTime: 1.2 },
  fly: { kind: "protein", amount: 10, radius: 9, gatherTime: 0.95 },
  caterpillar: { kind: "protein", amount: 20, radius: 13, gatherTime: 1.6 },
  sand: { kind: "sand", amount: 24, radius: 12, gatherTime: 1.1 },
  sticks: { kind: "sticks", amount: 18, radius: 13, gatherTime: 1.35 },
};

let nextId = 1;
let units = [];
let resources = [];
let anthills = [];
let larvae = [];
let tunnels = [];
let terrain = [];
let floatingText = [];
let attackMarkers = [];

const selectedIds = new Set();
const keys = new Set();
let selectedTunnelId = null;
let selectedHillId = null;

const game = {
  camera: { x: 0, y: 0 },
  mouse: {
    x: 0,
    y: 0,
    worldX: 0,
    worldY: 0,
    inside: false,
    down: false,
    drag: false,
    startX: 0,
    startY: 0,
    startWorldX: 0,
    startWorldY: 0,
  },
  lastFrame: 0,
  elapsed: 0,
  uiTimer: 0,
  spawnTimer: 0,
  aiTimer: 0,
  aiWaveTimer: AI_ATTACK_READY_TIME,
  aiWave: 0,
  aiAttackWarningSent: false,
  status: "playing",
  statusMessage: "",
  statusMessageKey: "",
  statusMessageValues: {},
  message: "",
  messageKey: "",
  messageValues: {},
  messageTimer: 0,
  rallyMode: false,
  tunnelMode: false,
  attackMoveMode: false,
  actionSignature: "",
};

const colonies = {
  player: {
    team: "player",
    protein: 20,
    sand: 0,
    sticks: 0,
    kills: 0,
    workersHatched: 0,
    fightersHatched: 0,
    queenId: null,
    queenServiceTimer: 0,
    rallyPoint: null,
  },
  enemy: {
    team: "enemy",
    protein: 20,
    sand: 0,
    sticks: 0,
    kills: 0,
    workersHatched: 0,
    fightersHatched: 0,
    queenId: null,
    queenServiceTimer: 0,
    rallyPoint: null,
  },
};

function id() {
  nextId += 1;
  return nextId;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function dist(a, b, c, d) {
  const dx = a - c;
  const dy = b - d;
  return Math.hypot(dx, dy);
}

function angleTo(a, b, c, d) {
  return Math.atan2(d - b, c - a);
}

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

function seededRandom(seed) {
  let value = seed % 2147483647;
  return function rng() {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function getColony(team) {
  return colonies[team];
}

function getEnemyTeam(team) {
  return team === "player" ? "enemy" : "player";
}

function resizeCanvas() {
  VIEW.dpr = Math.min(window.devicePixelRatio || 1, 2);
  VIEW.width = window.innerWidth;
  VIEW.height = window.innerHeight;
  canvas.width = Math.floor(VIEW.width * VIEW.dpr);
  canvas.height = Math.floor(VIEW.height * VIEW.dpr);
  canvas.style.width = `${VIEW.width}px`;
  canvas.style.height = `${VIEW.height}px`;
  ctx.setTransform(VIEW.dpr, 0, 0, VIEW.dpr, 0, 0);
  game.camera.x = clamp(game.camera.x, 0, WORLD.width - VIEW.width);
  game.camera.y = clamp(game.camera.y, 0, WORLD.height - VIEW.height);
}

function makeUnit(team, type, x, y, homeHillId = null) {
  const stats = UNIT_STATS[type];
  const unit = {
    id: id(),
    team,
    type,
    homeHillId,
    x,
    y,
    radius: stats.radius,
    hp: stats.hp,
    maxHp: stats.hp,
    speed: stats.speed,
    range: stats.range,
    cooldown: stats.cooldown,
    attackTimer: randomRange(0, 0.4),
    state: "idle",
    selected: false,
    target: null,
    targetId: null,
    resourceId: null,
    gatherTimer: 0,
    gatherPreference: null,
    keepGathering: false,
    carryKind: null,
    carryAmount: 0,
    carryMax: stats.carryMax,
    internalCarry: false,
    serviceStage: null,
    serviceTimer: 0,
    feedSlot: 0,
    feedLarvaId: null,
    feedStuckTimer: 0,
    feedStuckX: x,
    feedStuckY: y,
    feedStuckDistance: null,
    preparedCells: 0,
    attackMoveTarget: null,
    commandX: x,
    commandY: y,
    lastHitFrom: null,
  };
  units.push(unit);
  if (type === "queen") {
    const colony = getColony(team);
    const currentQueen = getUnit(colony.queenId);
    if (!currentQueen || currentQueen.hp <= 0) {
      colony.queenId = unit.id;
    }
  }
  return unit;
}

function makeAnthill(team, x, y) {
  const hill = {
    id: id(),
    team,
    x,
    y,
    radius: 58,
    level: 1,
    buildProgress: 0,
  };
  anthills.push(hill);
  return hill;
}

function makeResource(type, x, y) {
  const meta = RESOURCE_META[type];
  resources.push({
    id: id(),
    type,
    kind: meta.kind,
    x,
    y,
    amount: meta.amount,
    maxAmount: meta.amount,
    radius: meta.radius,
    gatherTime: meta.gatherTime,
  });
}

function larvaRadiusForType(type) {
  if (type === "worker") return 5;
  if (type === "fighter") return 6;
  return 7;
}

function pointInsideAnthillCell(hill, x, y, radius) {
  if (!hill) return false;
  return dist(x, y, hill.x, hill.y) <= Math.max(12, hill.radius - radius - 6);
}

function larvaCellIsFree(team, hill, x, y, radius, reservedSlots = []) {
  if (!pointInsideAnthillCell(hill, x, y, radius)) return false;
  for (const larva of larvae) {
    if (larva.team !== team || larva.homeHillId !== hill.id) continue;
    if (dist(x, y, larva.x, larva.y) < radius + larva.radius + LARVA_CELL_PADDING) return false;
  }
  for (const slot of reservedSlots) {
    if (dist(x, y, slot.x, slot.y) < radius + slot.radius + LARVA_CELL_PADDING) return false;
  }
  return true;
}

function findLarvaCellNearQueen(team, type, hill, queen, reservedSlots = []) {
  if (!hill || !queen || queen.hp <= 0) return null;
  const radius = larvaRadiusForType(type);
  const firstRing = queen.radius + radius + 7;
  const maxRadius = Math.min(LARVA_PLACEMENT_MAX_RADIUS, Math.max(firstRing, hill.radius - radius - 8));
  const seedAngle = ((queen.id * 31 + larvae.length * 17 + reservedSlots.length * 43) % 360) * (Math.PI / 180);

  for (let ring = 0; ring < 8; ring += 1) {
    const ringRadius = firstRing + ring * (radius * 2 + LARVA_CELL_PADDING + 2);
    if (ringRadius > maxRadius) break;
    const steps = Math.max(8, 8 + ring * 4);
    for (let step = 0; step < steps; step += 1) {
      const angle = seedAngle + step * ((Math.PI * 2) / steps) + ring * 0.37;
      const x = queen.x + Math.cos(angle) * ringRadius;
      const y = queen.y + Math.sin(angle) * ringRadius;
      if (dist(x, y, queen.x, queen.y) < queen.radius + radius + 4) continue;
      if (larvaCellIsFree(team, hill, x, y, radius, reservedSlots)) {
        return { x, y, radius, fixedPosition: true };
      }
    }
  }

  return null;
}

function makeLarvae(team, type, count, homeHill = null, options = {}) {
  const hatchTime = type === "worker" ? 30 : type === "fighter" ? 45 : 120;
  const growthCost = type === "worker" ? 1 : type === "fighter" ? 2 : 0;
  const queen = options.queen || (homeHill ? nearestQueen(team, homeHill.x, homeHill.y) : nearestQueen(team));
  const hill = homeHill || nearestAnthill(team, queen?.x || 0, queen?.y || 0);
  const startIndex = larvae.filter((larva) => larva.team === team && larva.homeHillId === hill?.id).length;
  const created = [];
  const reservedSlots = [];
  for (let i = 0; i < count; i += 1) {
    let slot = options.slots?.[i] || null;
    let fixedPosition = Boolean(slot?.fixedPosition);
    if (!slot && type !== "queen" && queen && hill) {
      slot = findLarvaCellNearQueen(team, type, hill, queen, reservedSlots);
      fixedPosition = Boolean(slot?.fixedPosition);
    }
    if (!slot && type !== "queen" && queen && hill) continue;
    if (!slot) slot = hill ? larvaSlot(hill, startIndex + i) : { x: queen?.x || 0, y: queen?.y || 0 };
    const larva = {
      id: id(),
      team,
      type,
      x: slot.x,
      y: slot.y,
      radius: larvaRadiusForType(type),
      homeHillId: hill?.id || null,
      progress: 0,
      hatchTime,
      growthCost,
      proteinSpent: 0,
      feedPulse: 0,
      fixedPosition,
    };
    larvae.push(larva);
    created.push(larva);
    reservedSlots.push({ x: slot.x, y: slot.y, radius: larva.radius });
  }
  if (hill) {
    updateLarvaeLayout(team, hill.id);
  }
  return created;
}

function getUnit(idValue) {
  return units.find((unit) => unit.id === idValue) || null;
}

function getResource(idValue) {
  return resources.find((resource) => resource.id === idValue) || null;
}

function getAnthill(idValue) {
  return anthills.find((hill) => hill.id === idValue) || null;
}

function getLarva(idValue) {
  return larvae.find((larva) => larva.id === idValue) || null;
}

function getTunnel(idValue) {
  return tunnels.find((tunnel) => tunnel.id === idValue) || null;
}

function anthillLarvaeCapacity(hill) {
  return hill ? hill.level * LARVAE_BATCH_SIZE : 0;
}

function colonyLarvaeCapacity(team) {
  return anthills
    .filter((hill) => hill.team === team)
    .reduce((total, hill) => total + anthillLarvaeCapacity(hill), 0);
}

function queenHomeHill(team, queen = null) {
  const queenUnit = queen || nearestQueen(team);
  if (!queenUnit || queenUnit.hp <= 0) return null;
  return nearestAnthill(team, queenUnit.x, queenUnit.y);
}

function anthillHasQueen(hill) {
  if (!hill) return false;
  return liveQueens(hill.team).some((queen) => {
    if (queen.homeHillId === hill.id) return true;
    return !queen.homeHillId && nearestAnthill(queen.team, queen.x, queen.y)?.id === hill.id;
  });
}

function anthillHasQueenLarva(hill) {
  if (!hill) return false;
  return larvae.some((larva) => larva.team === hill.team && larva.type === "queen" && larva.homeHillId === hill.id);
}

function queenForAnthill(hill) {
  if (!hill) return null;
  return (
    liveQueens(hill.team).find((queen) => queen.homeHillId === hill.id) ||
    liveQueens(hill.team).find((queen) => nearestAnthill(queen.team, queen.x, queen.y)?.id === hill.id) ||
    null
  );
}

function colonyHasLivingQueen(team) {
  return liveQueens(team).length > 0;
}

function primaryQueenForSelection() {
  return selectedUnits().find((unit) => unit.type === "queen") || null;
}

function queenPreparedCells(queen) {
  if (!queen || queen.hp <= 0) return 0;
  return Math.floor(queen.preparedCells || 0);
}

function proteinStoragePoint(hill) {
  return {
    x: hill.x,
    y: hill.y,
  };
}

function proteinStorageAccessRadius(hill) {
  return Math.max(18, hill.radius * 0.34);
}

function proteinStorageCapacity(hill) {
  return PROTEIN_STORAGE_VISUAL_CAP + (hill.level - 1) * 42;
}

function queenChamberPoint(hill) {
  return {
    x: hill.x - hill.radius * 0.48,
    y: hill.y - hill.radius * 0.32,
  };
}

function nurseryCenterPoint(hill) {
  return {
    x: hill.x + hill.radius * 0.22,
    y: hill.y + hill.radius * 0.18,
  };
}

function larvaSlot(hill, index) {
  const center = nurseryCenterPoint(hill);
  const angle = index * 2.3999632297;
  const radius = 8 + Math.sqrt(index) * 8.4;
  return {
    x: clamp(center.x + Math.cos(angle) * radius, 18, WORLD.width - 18),
    y: clamp(center.y + Math.sin(angle) * radius, 18, WORLD.height - 18),
  };
}

function updateLarvaeLayout(team, hillId) {
  const hillGroups = new Map();
  for (const larva of larvae) {
    if (larva.team !== team) continue;
    if (hillId && larva.homeHillId !== hillId) continue;
    const key = larva.homeHillId || "none";
    if (!hillGroups.has(key)) hillGroups.set(key, []);
    hillGroups.get(key).push(larva);
  }

  for (const [key, group] of hillGroups) {
    const hill = key === "none" ? null : getAnthill(key);
    if (!hill) continue;
    let layoutIndex = 0;
    for (const larva of group) {
      if (larva.fixedPosition) continue;
      const slot = larvaSlot(hill, layoutIndex);
      larva.x = slot.x;
      larva.y = slot.y;
      layoutIndex += 1;
    }
  }
}

function queenPositionIsFree(queen, hill, x, y) {
  if (!queen || !hill) return false;
  if (!pointInsideAnthillCell(hill, x, y, queen.radius)) return false;
  for (const larva of larvae) {
    if (larva.team !== queen.team || larva.homeHillId !== hill.id) continue;
    if (dist(x, y, larva.x, larva.y) < queen.radius + larva.radius + LARVA_CELL_PADDING + 2) return false;
  }
  return true;
}

function moveQueenAside(team, hill, queen = null) {
  const queenUnit = queen || nearestQueen(team, hill.x, hill.y);
  if (!queenUnit || queenUnit.hp <= 0) return false;
  let target = null;
  const seedAngle = ((queenUnit.id * 29 + countLarvae(team, null, hill.id) * 53) % 360) * (Math.PI / 180);
  for (let ring = 0; ring < 7 && !target; ring += 1) {
    const ringRadius = queenUnit.radius + 10 + ring * 8;
    const steps = 8 + ring * 3;
    for (let step = 0; step < steps; step += 1) {
      const angle = seedAngle + step * ((Math.PI * 2) / steps) + ring * 0.28;
      const x = queenUnit.x + Math.cos(angle) * ringRadius;
      const y = queenUnit.y + Math.sin(angle) * ringRadius;
      if (queenPositionIsFree(queenUnit, hill, x, y)) {
        target = { x, y };
        break;
      }
    }
  }
  if (!target) {
    const chamber = queenChamberPoint(hill);
    if (queenPositionIsFree(queenUnit, hill, chamber.x, chamber.y)) target = chamber;
  }
  if (!target) return false;
  queenUnit.state = "moving";
  queenUnit.target = target;
  queenUnit.targetId = null;
  queenUnit.resourceId = null;
  queenUnit.keepGathering = false;
  queenUnit.commandX = target.x;
  queenUnit.commandY = target.y;
  return true;
}

function nearestAnthill(team, x, y) {
  let best = null;
  let bestDistance = Infinity;
  for (const hill of anthills) {
    if (hill.team !== team) continue;
    const current = dist(x, y, hill.x, hill.y);
    if (current < bestDistance) {
      best = hill;
      bestDistance = current;
    }
  }
  return best;
}

function liveQueens(team) {
  return units.filter((unit) => unit.team === team && unit.type === "queen" && unit.hp > 0);
}

function nearestQueen(team, x = null, y = null) {
  const queens = liveQueens(team);
  if (!queens.length) return null;
  if (Number.isFinite(x) && Number.isFinite(y)) {
    let best = queens[0];
    let bestDistance = dist(x, y, best.x, best.y);
    for (const queen of queens.slice(1)) {
      const current = dist(x, y, queen.x, queen.y);
      if (current < bestDistance) {
        best = queen;
        bestDistance = current;
      }
    }
    return best;
  }
  const primary = getUnit(getColony(team).queenId);
  if (primary && primary.hp > 0) return primary;
  return queens[0];
}

function findNearestResource(x, y, predicate) {
  let best = null;
  let bestDistance = Infinity;
  for (const resource of resources) {
    if (predicate && !predicate(resource)) continue;
    const current = dist(x, y, resource.x, resource.y);
    if (current < bestDistance) {
      best = resource;
      bestDistance = current;
    }
  }
  return best;
}

function findNearestEnemy(unit, maxDistance) {
  let best = null;
  let bestDistance = maxDistance;
  const enemyTeam = getEnemyTeam(unit.team);
  for (const candidate of units) {
    if (candidate.team !== enemyTeam || candidate.hp <= 0) continue;
    const current = dist(unit.x, unit.y, candidate.x, candidate.y);
    if (current < bestDistance) {
      best = candidate;
      bestDistance = current;
    }
  }
  return best;
}

function countUnits(team, type) {
  return units.filter((unit) => unit.team === team && unit.type === type && unit.hp > 0).length;
}

function countLarvae(team, type, hillId = null) {
  return larvae.filter((larva) => larva.team === team && (!type || larva.type === type) && (!hillId || larva.homeHillId === hillId)).length;
}

function selectedUnits() {
  return units.filter((unit) => selectedIds.has(unit.id) && unit.team === "player" && unit.hp > 0);
}

function announce(key, values = {}) {
  const message = t(key, values);
  game.messageKey = key;
  game.messageValues = { ...values };
  game.message = message;
  game.messageTimer = 4;
  ui.messageLog.textContent = message;
}

function refreshMessageText() {
  if (!game.messageKey || game.messageTimer <= 0) return;
  game.message = t(game.messageKey, game.messageValues);
  ui.messageLog.textContent = game.message;
}

function spawnFloatingText(x, y, text, color) {
  floatingText.push({ x, y, text, color, age: 0, life: 1.1 });
}

function addAttackMarker(x, y, orderedUnits, targetId = null) {
  const unitIds = orderedUnits.filter((unit) => unit.team === "player" && unit.hp > 0).map((unit) => unit.id);
  if (!unitIds.length) return;
  attackMarkers.push({
    id: id(),
    x,
    y,
    targetId,
    unitIds,
    age: 0,
    life: ATTACK_MARKER_LIFE,
  });
  if (attackMarkers.length > 8) attackMarkers = attackMarkers.slice(-8);
}

function markerHasActiveUnits(marker) {
  return marker.unitIds.some((unitId) => {
    const unit = getUnit(unitId);
    if (!unit || unit.hp <= 0) return false;
    if (marker.targetId) return unit.state === "attacking" && unit.targetId === marker.targetId;
    return (unit.state === "attack_move" || unit.state === "attacking") && unit.attackMoveTarget;
  });
}

function updateAttackMarkers(dt) {
  for (const marker of attackMarkers) {
    marker.age += dt;
    if (marker.targetId) {
      const target = getUnit(marker.targetId);
      if (target && target.hp > 0) {
        marker.x = target.x;
        marker.y = target.y;
      }
    }
    if (!markerHasActiveUnits(marker)) {
      marker.life = Math.min(marker.life, marker.age + 2.4);
    }
  }
  attackMarkers = attackMarkers.filter((marker) => marker.age < marker.life);
}

function generateTerrain() {
  terrain = [];
  const rng = seededRandom(15791);
  for (let i = 0; i < 540; i += 1) {
    terrain.push({
      x: rng() * WORLD.width,
      y: rng() * WORLD.height,
      r: 8 + rng() * 36,
      type: rng() < 0.68 ? "leaf" : rng() < 0.82 ? "trunk" : "stone",
      shade: rng(),
    });
  }
}

function randomOpenPoint() {
  for (let i = 0; i < 50; i += 1) {
    const x = randomRange(120, WORLD.width - 120);
    const y = randomRange(120, WORLD.height - 120);
    let ok = true;
    for (const hill of anthills) {
      if (dist(x, y, hill.x, hill.y) < 190) {
        ok = false;
        break;
      }
    }
    if (ok) return { x, y };
  }
  return { x: randomRange(120, WORLD.width - 120), y: randomRange(120, WORLD.height - 120) };
}

function randomFoodType() {
  const roll = Math.random();
  if (roll < 0.2) return "beetle";
  if (roll < 0.5) return "fly";
  if (roll < 0.9) return "caterpillar";
  return null;
}

function spawnFood() {
  const type = randomFoodType();
  if (!type) return false;
  const point = randomOpenPoint();
  makeResource(type, point.x, point.y);
  return true;
}

function spawnMaterial() {
  const point = randomOpenPoint();
  makeResource(Math.random() < 0.5 ? "sand" : "sticks", point.x, point.y);
}

function initialResources() {
  let food = 0;
  while (food < 88) {
    if (spawnFood()) food += 1;
  }
  for (let i = 0; i < 56; i += 1) {
    spawnMaterial();
  }
}

function setupGame() {
  generateTerrain();
  const playerHill = makeAnthill("player", 430, 1100);
  const enemyHill = makeAnthill("enemy", 2780, 1080);
  const playerQueenChamber = queenChamberPoint(playerHill);
  const enemyQueenChamber = queenChamberPoint(enemyHill);

  makeUnit("player", "queen", playerQueenChamber.x, playerQueenChamber.y, playerHill.id);
  for (let i = 0; i < 5; i += 1) {
    const angle = (Math.PI * 2 * i) / 5;
    makeUnit("player", "worker", playerHill.x + Math.cos(angle) * 72, playerHill.y + Math.sin(angle) * 58);
  }

  makeUnit("enemy", "queen", enemyQueenChamber.x, enemyQueenChamber.y, enemyHill.id);
  for (let i = 0; i < 5; i += 1) {
    const angle = (Math.PI * 2 * i) / 5;
    makeUnit("enemy", "worker", enemyHill.x + Math.cos(angle) * 72, enemyHill.y + Math.sin(angle) * 58);
  }

  initialResources();
  game.camera.x = clamp(playerHill.x - VIEW.width * 0.42, 0, WORLD.width - VIEW.width);
  game.camera.y = clamp(playerHill.y - VIEW.height * 0.5, 0, WORLD.height - VIEW.height);
  announce("colonyFounded");
}

function screenToWorld(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  return {
    screenX: x,
    screenY: y,
    worldX: x + game.camera.x,
    worldY: y + game.camera.y,
  };
}

function spreadPoint(index, total, x, y) {
  if (total <= 1) return { x, y };
  const ring = Math.floor(Math.sqrt(index));
  const angle = index * 2.3999632297;
  const radius = 18 + ring * 13;
  return {
    x: clamp(x + Math.cos(angle) * radius, 20, WORLD.width - 20),
    y: clamp(y + Math.sin(angle) * radius, 20, WORLD.height - 20),
  };
}

function clearSelection() {
  selectedIds.clear();
  selectedTunnelId = null;
  selectedHillId = null;
  for (const unit of units) {
    unit.selected = false;
  }
}

function updateSelectionFlags() {
  for (const unit of units) {
    unit.selected = selectedIds.has(unit.id);
  }
}

function selectedTunnel() {
  return selectedTunnelId ? getTunnel(selectedTunnelId) : null;
}

function selectedHill() {
  return selectedHillId ? getAnthill(selectedHillId) : null;
}

function selectTunnel(tunnel) {
  clearSelection();
  selectedTunnelId = tunnel.id;
  renderActions();
}

function selectHill(hill) {
  clearSelection();
  selectedHillId = hill.id;
  renderActions();
}

function clearObjectSelection() {
  selectedTunnelId = null;
  selectedHillId = null;
}

function distanceToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSq = dx * dx + dy * dy;
  if (lengthSq === 0) return dist(px, py, ax, ay);
  const t = clamp(((px - ax) * dx + (py - ay) * dy) / lengthSq, 0, 1);
  return dist(px, py, ax + dx * t, ay + dy * t);
}

function tunnelAt(worldX, worldY, team = null) {
  let picked = null;
  let best = Infinity;
  for (const tunnel of tunnels) {
    if (team && tunnel.team !== team) continue;
    if (tunnel.cancelled) continue;
    const hitDistance = distanceToSegment(worldX, worldY, tunnel.x1, tunnel.y1, tunnel.x2, tunnel.y2);
    if (hitDistance <= 12 && hitDistance < best) {
      picked = tunnel;
      best = hitDistance;
    }
  }
  return picked;
}

function selectSingle(worldX, worldY, additive) {
  let picked = null;
  let best = Infinity;
  for (const unit of units) {
    if (unit.team !== "player" || unit.hp <= 0) continue;
    const hitDistance = dist(worldX, worldY, unit.x, unit.y);
    if (hitDistance <= unit.radius + 8 && hitDistance < best) {
      picked = unit;
      best = hitDistance;
    }
  }
  if (!picked && !additive) {
    const hill = anthillAt(worldX, worldY, "player");
    if (hill) {
      selectHill(hill);
      return;
    }
    const tunnel = tunnelAt(worldX, worldY, "player");
    if (tunnel) {
      selectTunnel(tunnel);
      return;
    }
  }
  if (!additive) clearSelection();
  if (picked) {
    clearObjectSelection();
    if (selectedIds.has(picked.id) && additive) {
      selectedIds.delete(picked.id);
    } else {
      selectedIds.add(picked.id);
    }
  }
  updateSelectionFlags();
  renderActions();
}

function selectBox(x1, y1, x2, y2, additive) {
  const minX = Math.min(x1, x2) + game.camera.x;
  const maxX = Math.max(x1, x2) + game.camera.x;
  const minY = Math.min(y1, y2) + game.camera.y;
  const maxY = Math.max(y1, y2) + game.camera.y;
  if (!additive) clearSelection();
  clearObjectSelection();
  for (const unit of units) {
    if (unit.team !== "player" || unit.hp <= 0) continue;
    if (unit.x >= minX && unit.x <= maxX && unit.y >= minY && unit.y <= maxY) {
      selectedIds.add(unit.id);
    }
  }
  updateSelectionFlags();
  renderActions();
}

function selectSameTypeOnScreen(worldX, worldY) {
  const picked = unitAt(worldX, worldY, "player");
  if (!picked) return false;
  clearSelection();
  for (const unit of units) {
    if (unit.team !== "player" || unit.hp <= 0 || unit.type !== picked.type) continue;
    if (isVisible(unit.x, unit.y, unit.radius)) selectedIds.add(unit.id);
  }
  updateSelectionFlags();
  renderActions();
  const label = unitTypeLabel(picked.type, selectedIds.size);
  announce("selectedOnScreen", { count: selectedIds.size, label });
  return true;
}

function unitAt(worldX, worldY, team) {
  let picked = null;
  let best = Infinity;
  for (const unit of units) {
    if (team && unit.team !== team) continue;
    if (unit.hp <= 0) continue;
    const hitDistance = dist(worldX, worldY, unit.x, unit.y);
    if (hitDistance <= unit.radius + 8 && hitDistance < best) {
      picked = unit;
      best = hitDistance;
    }
  }
  return picked;
}

function resourceAt(worldX, worldY) {
  let picked = null;
  let best = Infinity;
  for (const resource of resources) {
    const hitDistance = dist(worldX, worldY, resource.x, resource.y);
    if (hitDistance <= resource.radius + 10 && hitDistance < best) {
      picked = resource;
      best = hitDistance;
    }
  }
  return picked;
}

function anthillAt(worldX, worldY, team) {
  for (const hill of anthills) {
    if (team && hill.team !== team) continue;
    if (dist(worldX, worldY, hill.x, hill.y) <= hill.radius + 12) return hill;
  }
  return null;
}

function tunnelScreenDistance() {
  return Math.max(320, Math.min(VIEW.width, VIEW.height));
}

function tunnelCostForDistance(distanceValue) {
  const factor = Math.max(0.01, distanceValue / tunnelScreenDistance());
  return {
    protein: Math.ceil(TUNNEL_BASE_COST.protein * factor),
    sand: Math.ceil(TUNNEL_BASE_COST.sand * factor),
    sticks: Math.ceil(TUNNEL_BASE_COST.sticks * factor),
    factor,
  };
}

function tunnelCostText(cost) {
  return `${cost.protein} ${resourceLabel("protein")}, ${cost.sand} ${resourceLabel("sand")}, ${cost.sticks} ${resourceLabel("sticks")}`;
}

function canPayTunnel(team, cost) {
  const colony = getColony(team);
  return colony.protein >= cost.protein && colony.sand >= cost.sand && colony.sticks >= cost.sticks;
}

function spendTunnelCost(team, cost) {
  const colony = getColony(team);
  colony.protein -= cost.protein;
  colony.sand -= cost.sand;
  colony.sticks -= cost.sticks;
}

function tunnelWorkerCount(tunnel) {
  return tunnel.workers.filter((unitId) => {
    const worker = getUnit(unitId);
    return worker && worker.hp > 0;
  }).length;
}

function tunnelActiveWorkerCount(tunnel) {
  return tunnel.workers.filter((unitId) => {
    const worker = getUnit(unitId);
    return worker && worker.hp > 0 && worker.state === "digging" && worker.targetId === tunnel.id;
  }).length;
}

function commandMove(list, x, y) {
  const movable = list.filter((unit) => unit.hp > 0);
  movable.forEach((unit, index) => {
    const point = spreadPoint(index, movable.length, x, y);
    unit.state = "moving";
    unit.target = point;
    unit.targetId = null;
    unit.resourceId = null;
    unit.keepGathering = false;
    unit.serviceStage = null;
    unit.feedLarvaId = null;
    unit.attackMoveTarget = null;
    if (unit.internalCarry) {
      unit.carryKind = null;
      unit.carryAmount = 0;
      unit.internalCarry = false;
    }
    unit.commandX = point.x;
    unit.commandY = point.y;
  });
  if (movable.length) {
    if (movable.length === 1 && movable[0].type === "queen") {
      announce("queenMoving");
    } else {
      announce("movingAnts", { count: movable.length });
    }
  }
}

function commandAttack(list, target) {
  const attackers = list.filter((unit) => unit.type !== "queen" || target.type !== "queen");
  for (const unit of attackers) {
    unit.state = "attacking";
    unit.targetId = target.id;
    unit.resourceId = null;
    unit.keepGathering = false;
    unit.serviceStage = null;
    unit.feedLarvaId = null;
    unit.attackMoveTarget = null;
    if (unit.internalCarry) {
      unit.carryKind = null;
      unit.carryAmount = 0;
      unit.internalCarry = false;
    }
  }
  if (attackers.length) {
    addAttackMarker(target.x, target.y, attackers, target.id);
    announce("attackOrder");
  }
}

function commandSetAttackMoveMode() {
  const unitsToCommand = selectedUnits();
  if (!unitsToCommand.length) return;
  game.attackMoveMode = true;
  game.rallyMode = false;
  game.tunnelMode = false;
  announce("clickAttackMove");
  renderActions();
}

function commandAttackMove(list, x, y) {
  const attackers = list.filter((unit) => unit.hp > 0);
  attackers.forEach((unit, index) => {
    const point = spreadPoint(index, attackers.length, x, y);
    unit.state = "attack_move";
    unit.target = point;
    unit.attackMoveTarget = point;
    unit.targetId = null;
    unit.resourceId = null;
    unit.keepGathering = false;
    unit.serviceStage = null;
    unit.feedLarvaId = null;
    if (unit.internalCarry) {
      unit.carryKind = null;
      unit.carryAmount = 0;
      unit.internalCarry = false;
    }
    unit.commandX = point.x;
    unit.commandY = point.y;
  });
  game.attackMoveMode = false;
  if (attackers.length) {
    addAttackMarker(x, y, attackers);
    announce("attackMoving", { count: attackers.length });
  }
  renderActions();
}

function commandGather(list, resource, keepGathering) {
  const workers = list.filter((unit) => unit.type === "worker");
  for (const worker of workers) {
    worker.state = "gathering";
    worker.resourceId = resource.id;
    worker.gatherTimer = 0;
    worker.gatherPreference = resource.kind;
    worker.keepGathering = keepGathering;
    worker.targetId = null;
    worker.serviceStage = null;
    worker.feedLarvaId = null;
    worker.attackMoveTarget = null;
    if (worker.internalCarry) {
      worker.carryKind = null;
      worker.carryAmount = 0;
      worker.internalCarry = false;
    }
  }
  if (workers.length) announce("workersGathering", { count: workers.length, resource: resourceLabel(resource.kind) });
}

function commandGatherNearest(kind) {
  const workers = selectedUnits().filter((unit) => unit.type === "worker");
  let assigned = 0;
  for (const worker of workers) {
    const resource = findNearestResource(worker.x, worker.y, (candidate) => candidate.kind === kind);
    if (!resource) continue;
    worker.state = "gathering";
    worker.resourceId = resource.id;
    worker.gatherTimer = 0;
    worker.gatherPreference = kind;
    worker.keepGathering = true;
    worker.targetId = null;
    worker.serviceStage = null;
    worker.feedLarvaId = null;
    worker.attackMoveTarget = null;
    if (worker.internalCarry) {
      worker.carryKind = null;
      worker.carryAmount = 0;
      worker.internalCarry = false;
    }
    assigned += 1;
  }
  if (assigned) announce("workersGathering", { count: assigned, resource: resourceLabel(kind) });
}

function commandGatherMaterials() {
  const workers = selectedUnits().filter((unit) => unit.type === "worker");
  let assigned = 0;
  for (const worker of workers) {
    const needSand = colonies.player.sand <= colonies.player.sticks + assigned;
    const preferred = needSand ? "sand" : "sticks";
    const resource =
      findNearestResource(worker.x, worker.y, (candidate) => candidate.kind === preferred) ||
      findNearestResource(worker.x, worker.y, (candidate) => candidate.kind === "sand" || candidate.kind === "sticks");
    if (!resource) continue;
    worker.state = "gathering";
    worker.resourceId = resource.id;
    worker.gatherTimer = 0;
    worker.gatherPreference = "materials";
    worker.keepGathering = true;
    worker.targetId = null;
    worker.serviceStage = null;
    worker.feedLarvaId = null;
    worker.attackMoveTarget = null;
    if (worker.internalCarry) {
      worker.carryKind = null;
      worker.carryAmount = 0;
      worker.internalCarry = false;
    }
    assigned += 1;
  }
  if (assigned) announce("workersGatheringMaterials", { count: assigned });
}

function commandReturn(list) {
  let count = 0;
  for (const worker of list) {
    if (worker.type !== "worker") continue;
    const hill = nearestAnthill(worker.team, worker.x, worker.y);
    if (!hill) continue;
    worker.state = "returning";
    worker.target = { x: hill.x, y: hill.y };
    worker.targetId = null;
    worker.resourceId = null;
    worker.keepGathering = false;
    worker.serviceStage = null;
    worker.feedLarvaId = null;
    worker.attackMoveTarget = null;
    if (worker.internalCarry) {
      worker.carryKind = null;
      worker.carryAmount = 0;
      worker.internalCarry = false;
    }
    count += 1;
  }
  if (count) announce("workersReturning", { count });
}

function commandBuild() {
  const workers = selectedUnits().filter((unit) => unit.type === "worker");
  const hill = nearestAnthill("player", game.mouse.worldX, game.mouse.worldY) || nearestAnthill("player", workers[0]?.x || 0, workers[0]?.y || 0);
  if (!hill || workers.length === 0) return;
  for (const worker of workers) {
    worker.state = "building";
    worker.target = { x: hill.x, y: hill.y };
    worker.targetId = hill.id;
    worker.resourceId = null;
    worker.keepGathering = false;
    worker.serviceStage = null;
    worker.feedLarvaId = null;
    worker.attackMoveTarget = null;
    if (worker.internalCarry) {
      worker.carryKind = null;
      worker.carryAmount = 0;
      worker.internalCarry = false;
    }
  }
  announce("workersGrowingAnthill", { count: workers.length });
}

function commandServeQueen() {
  const workers = selectedUnits().filter((unit) => unit.type === "worker");
  const selectedQueen = primaryQueenForSelection();
  const queen = selectedQueen || nearestQueen("player", workers[0]?.x || game.mouse.worldX, workers[0]?.y || game.mouse.worldY);
  if (!queen || workers.length === 0) return;
  for (const worker of workers) {
    worker.state = "serving_queen";
    worker.target = { x: queen.x, y: queen.y };
    worker.targetId = queen.id;
    worker.resourceId = null;
    worker.keepGathering = false;
    worker.serviceStage = "to_queen";
    worker.serviceTimer = 0;
    worker.feedSlot = 0;
    worker.feedLarvaId = null;
    worker.attackMoveTarget = null;
    if (worker.internalCarry) {
      worker.carryKind = null;
      worker.carryAmount = 0;
      worker.internalCarry = false;
    }
  }
  announce("workersServingQueen", { count: workers.length });
}

function commandFeedLarvae() {
  const workers = selectedUnits().filter((unit) => unit.type === "worker");
  const hill = nearestAnthill("player", workers[0]?.x || game.mouse.worldX, workers[0]?.y || game.mouse.worldY);
  if (!hill || workers.length === 0) return;
  for (const worker of workers) {
    worker.state = "feeding_larvae";
    worker.target = { x: hill.x, y: hill.y };
    worker.targetId = hill.id;
    worker.resourceId = null;
    worker.keepGathering = false;
    worker.serviceStage = "to_storage";
    worker.serviceTimer = 0;
    worker.feedSlot = 0;
    worker.feedLarvaId = null;
    worker.attackMoveTarget = null;
    worker.carryKind = null;
    worker.carryAmount = 0;
    worker.internalCarry = false;
  }
  announce("workersFeedingLarvae", { count: workers.length });
}

function orderWorkerToTunnel(worker, tunnel) {
  worker.state = "digging";
  worker.target = { x: tunnel.x2, y: tunnel.y2 };
  worker.targetId = tunnel.id;
  worker.resourceId = null;
  worker.keepGathering = false;
  worker.serviceStage = null;
  worker.feedLarvaId = null;
  worker.attackMoveTarget = null;
  if (worker.internalCarry) {
    worker.carryKind = null;
    worker.carryAmount = 0;
    worker.internalCarry = false;
  }
}

function commandSetTunnelMode() {
  const workers = selectedUnits().filter((unit) => unit.type === "worker");
  if (!workers.length) {
    announce("selectWorkersTunnel");
    return;
  }
  game.tunnelMode = true;
  game.rallyMode = false;
  game.attackMoveMode = false;
  announce("clickTunnelExit");
  renderActions();
}

function placeTunnel(worldX, worldY) {
  const workers = selectedUnits().filter((unit) => unit.type === "worker");
  if (!workers.length) {
    game.tunnelMode = false;
    announce("tunnelPlacementCancelled");
    return;
  }
  const start = nearestAnthill("player", workers[0].x, workers[0].y);
  if (!start) return;
  const targetX = clamp(worldX, 140, WORLD.width - 140);
  const targetY = clamp(worldY, 140, WORLD.height - 140);
  const distanceValue = dist(start.x, start.y, targetX, targetY);
  const cost = tunnelCostForDistance(distanceValue);
  if (!canPayTunnel("player", cost)) {
    announce("tunnelNeeds", { cost: tunnelCostText(cost) });
    return;
  }
  spendTunnelCost("player", cost);
  const tunnel = {
    id: id(),
    team: "player",
    x1: start.x,
    y1: start.y,
    x2: targetX,
    y2: targetY,
    distance: distanceValue,
    cost,
    workers: [],
    progress: 0,
    required: TUNNEL_TIME * Math.max(0.35, cost.factor),
    active: true,
    cancelled: false,
  };
  tunnels.push(tunnel);
  commandAttachTunnel(workers, tunnel, false);
  selectedIds.clear();
  updateSelectionFlags();
  selectedTunnelId = tunnel.id;
  selectedHillId = null;
  game.tunnelMode = false;
  announce("workersDiggingTunnel", { count: workers.length, cost: tunnelCostText(cost) });
  renderActions();
}

function commandAttachTunnel(list, tunnel, shouldAnnounce = true) {
  if (!tunnel || !tunnel.active) return;
  const workers = list.filter((unit) => unit.type === "worker" && unit.hp > 0);
  let added = 0;
  for (const worker of workers) {
    if (!tunnel.workers.includes(worker.id)) {
      tunnel.workers.push(worker.id);
      added += 1;
    }
    orderWorkerToTunnel(worker, tunnel);
  }
  if (added && shouldAnnounce) announce("workersAddedTunnel", { count: added });
}

function commandAttachNearestTunnel() {
  const workers = selectedUnits().filter((unit) => unit.type === "worker");
  if (!workers.length) return;
  let best = null;
  let bestDistance = Infinity;
  for (const tunnel of tunnels) {
    if (tunnel.team !== "player" || !tunnel.active) continue;
    const current = dist(workers[0].x, workers[0].y, tunnel.x2, tunnel.y2);
    if (current < bestDistance) {
      best = tunnel;
      bestDistance = current;
    }
  }
  if (!best) {
    announce("noActiveTunnel");
    return;
  }
  commandAttachTunnel(workers, best);
}

function cancelTunnel(tunnel) {
  if (!tunnel || !tunnel.active) return;
  tunnel.active = false;
  tunnel.cancelled = true;
  for (const unitId of tunnel.workers) {
    const worker = getUnit(unitId);
    if (worker && worker.state === "digging" && worker.targetId === tunnel.id) {
      worker.state = "idle";
      worker.target = null;
      worker.targetId = null;
    }
  }
  tunnels = tunnels.filter((candidate) => candidate.id !== tunnel.id);
  selectedTunnelId = null;
  announce("tunnelStopped");
  renderActions();
}

function commandStop() {
  for (const unit of selectedUnits()) {
    const wasInternalService = unit.state === "feeding_larvae" || unit.state === "serving_queen";
    unit.state = "idle";
    unit.target = null;
    unit.targetId = null;
    unit.resourceId = null;
    unit.keepGathering = false;
    unit.gatherTimer = 0;
    unit.serviceStage = null;
    unit.serviceTimer = 0;
    unit.feedSlot = 0;
    unit.feedLarvaId = null;
    unit.attackMoveTarget = null;
    if (wasInternalService) {
      unit.carryKind = null;
      unit.carryAmount = 0;
      unit.internalCarry = false;
    }
  }
  announce("ordersCleared");
}

function commandAttackNearest() {
  let ordered = 0;
  const targets = new Map();
  for (const unit of selectedUnits()) {
    if (unit.type === "queen") continue;
    const target = findNearestEnemy(unit, 900);
    if (!target) continue;
    unit.state = "attacking";
    unit.targetId = target.id;
    unit.keepGathering = false;
    unit.serviceStage = null;
    unit.feedLarvaId = null;
    unit.attackMoveTarget = null;
    if (unit.internalCarry) {
      unit.carryKind = null;
      unit.carryAmount = 0;
      unit.internalCarry = false;
    }
    if (!targets.has(target.id)) targets.set(target.id, { target, units: [] });
    targets.get(target.id).units.push(unit);
    ordered += 1;
  }
  if (ordered) {
    for (const { target, units: markerUnits } of targets.values()) {
      addAttackMarker(target.x, target.y, markerUnits, target.id);
    }
    announce("antsAttacking", { count: ordered });
  }
}

function commandDefend() {
  let ordered = 0;
  for (const unit of selectedUnits()) {
    if (unit.type === "queen") continue;
    const hill = nearestAnthill(unit.team, unit.x, unit.y);
    if (!hill) continue;
    const point = spreadPoint(ordered, Math.max(1, selectedIds.size), hill.x, hill.y);
    unit.state = "moving";
    unit.target = point;
    unit.targetId = null;
    unit.keepGathering = false;
    unit.serviceStage = null;
    unit.feedLarvaId = null;
    if (unit.internalCarry) {
      unit.carryKind = null;
      unit.carryAmount = 0;
      unit.internalCarry = false;
    }
    ordered += 1;
  }
  if (ordered) announce("antsDefending", { count: ordered });
}

function commandSetRallyMode() {
  if (!selectedUnits().some((unit) => unit.type === "queen")) return;
  game.rallyMode = true;
  game.tunnelMode = false;
  game.attackMoveMode = false;
  announce("clickRally");
  renderActions();
}

function setQueenRallyPoint(x, y) {
  if (!selectedUnits().some((unit) => unit.type === "queen")) {
    game.rallyMode = false;
    return;
  }
  colonies.player.rallyPoint = {
    x: clamp(x, 20, WORLD.width - 20),
    y: clamp(y, 20, WORLD.height - 20),
  };
  game.rallyMode = false;
  announce("rallySet");
  renderActions();
}

function layLarvae(team, type, options = {}) {
  const colony = getColony(team);
  const queen = options.queenId ? getUnit(options.queenId) : nearestQueen(team);
  if (!queen || queen.hp <= 0) return false;
  const hill = queenHomeHill(team, queen);
  if (!hill) return false;
  if (queenPreparedCells(queen) < LARVAE_LAY_COUNT) {
    if (team === "player" && !options.silentCells) {
      announce("queenNeedsCell");
    }
    return false;
  }
  if (colony.protein < LARVA_LAY_PROTEIN_COST) {
    if (team === "player") announce("notEnoughProtein");
    return false;
  }
  const currentLarvae = countLarvae(team, null, hill.id);
  const capacity = anthillLarvaeCapacity(hill);
  if (capacity - currentLarvae < LARVAE_LAY_COUNT) {
    if (team === "player" && !options.silentCapacity) {
      announce("nurseryFull", { current: currentLarvae, capacity });
    }
    return false;
  }
  const slots = [];
  for (let i = 0; i < LARVAE_LAY_COUNT; i += 1) {
    const slot = findLarvaCellNearQueen(team, type, hill, queen, slots);
    if (!slot) {
      if (team !== "player") moveQueenAside(team, hill, queen);
      if (team === "player") announce("queenNeedsSpace");
      return false;
    }
    slots.push(slot);
  }

  colony.protein -= LARVA_LAY_PROTEIN_COST;
  queen.preparedCells = Math.max(0, queenPreparedCells(queen) - LARVAE_LAY_COUNT);
  const created = makeLarvae(team, type, LARVAE_LAY_COUNT, hill, { queen, slots });
  if (created.length < LARVAE_LAY_COUNT) {
    colony.protein += LARVA_LAY_PROTEIN_COST;
    queen.preparedCells += LARVAE_LAY_COUNT;
    if (team === "player") announce("queenNeedsSpace");
    return false;
  }
  moveQueenAside(team, hill, queen);
  if (team === "player") {
    const label = type === "worker" ? unitTypeLabel("worker", 1) : unitTypeLabel("fighter", 1);
    announce("queenLaidLarva", { label });
  }
  return true;
}

function commandRaiseQueen(hill) {
  if (!hill || hill.team !== "player") return;
  if (anthillHasQueen(hill)) {
    announce("anthillHasQueen");
    return;
  }
  if (anthillHasQueenLarva(hill)) {
    announce("queenAlreadyGrowing");
    return;
  }
  if (colonies.player.protein < QUEEN_COST) {
    announce("newQueenNeeds", { cost: QUEEN_COST });
    return;
  }
  colonies.player.protein -= QUEEN_COST;
  makeLarvae("player", "queen", 1, hill);
  announce("newQueenGrowing");
}

function issueContextCommand(worldX, worldY) {
  const list = selectedUnits();
  if (!list.length || game.status !== "playing") return;
  const enemy = unitAt(worldX, worldY, "enemy");
  if (enemy) {
    commandAttack(list, enemy);
    return;
  }
  const resource = resourceAt(worldX, worldY);
  if (resource) {
    commandGather(list, resource, true);
    return;
  }
  const tunnel = tunnelAt(worldX, worldY, "player");
  if (tunnel && tunnel.active) {
    commandAttachTunnel(list, tunnel);
    return;
  }
  const hill = anthillAt(worldX, worldY, "player");
  if (hill) {
    const queens = list.filter((unit) => unit.type === "queen");
    const workers = list.filter((unit) => unit.type === "worker");
    if (workers.length) commandReturn(workers);
    if (queens.length) commandMove(queens, worldX, worldY);
    return;
  }
  commandMove(list, worldX, worldY);
}

function moveToward(unit, targetX, targetY, dt, stopDistance = 4) {
  const current = dist(unit.x, unit.y, targetX, targetY);
  if (current <= stopDistance) return true;
  const step = Math.min(current - stopDistance, unit.speed * dt);
  const angle = angleTo(unit.x, unit.y, targetX, targetY);
  unit.x = clamp(unit.x + Math.cos(angle) * step, unit.radius, WORLD.width - unit.radius);
  unit.y = clamp(unit.y + Math.sin(angle) * step, unit.radius, WORLD.height - unit.radius);
  return dist(unit.x, unit.y, targetX, targetY) <= stopDistance + 0.2;
}

function unitCollisionMass(unit) {
  let mass = unit.type === "queen" ? 9 : unit.type === "fighter" ? 2.25 : 1.7;
  if (unit.state === "idle" || unit.state === "attacking" || unit.state === "building" || unit.state === "digging") {
    mass *= 1.35;
  }
  if (unit.type === "queen") mass *= 1.8;
  return mass;
}

function resolveUnitCollisions() {
  const liveUnits = units.filter((unit) => unit.hp > 0);
  for (let iteration = 0; iteration < COLLISION_ITERATIONS; iteration += 1) {
    for (let i = 0; i < liveUnits.length; i += 1) {
      const a = liveUnits[i];
      for (let j = i + 1; j < liveUnits.length; j += 1) {
        const b = liveUnits[j];
        const minDistance = a.radius + b.radius + COLLISION_PADDING;
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let distanceSq = dx * dx + dy * dy;
        if (distanceSq >= minDistance * minDistance) continue;

        if (distanceSq < 0.0001) {
          const angle = ((a.id * 37 + b.id * 17) % 360) * (Math.PI / 180);
          dx = Math.cos(angle);
          dy = Math.sin(angle);
          distanceSq = 1;
        }

        const distanceValue = Math.sqrt(distanceSq);
        const nx = dx / distanceValue;
        const ny = dy / distanceValue;
        const overlap = minDistance - distanceValue;
        const invMassA = 1 / unitCollisionMass(a);
        const invMassB = 1 / unitCollisionMass(b);
        const totalInvMass = invMassA + invMassB || 1;
        const pushA = overlap * (invMassA / totalInvMass);
        const pushB = overlap * (invMassB / totalInvMass);

        a.x = clamp(a.x - nx * pushA, a.radius, WORLD.width - a.radius);
        a.y = clamp(a.y - ny * pushA, a.radius, WORLD.height - a.radius);
        b.x = clamp(b.x + nx * pushB, b.radius, WORLD.width - b.radius);
        b.y = clamp(b.y + ny * pushB, b.radius, WORLD.height - b.radius);
      }
    }
  }
}

function meleeReach(attacker, target) {
  const queenBonus = attacker.type === "queen" || target.type === "queen" ? 2 : 0;
  return attacker.radius + target.radius + MELEE_REACH_PADDING + queenBonus;
}

function findAttackBlocker(attacker, target) {
  let best = null;
  let bestDistance = Infinity;
  const pathX = target.x - attacker.x;
  const pathY = target.y - attacker.y;
  const pathLengthSq = pathX * pathX + pathY * pathY;
  if (pathLengthSq <= 0.0001) return null;

  for (const candidate of units) {
    if (candidate === attacker || candidate === target || candidate.hp <= 0) continue;
    if (candidate.team !== target.team) continue;
    const projection = ((candidate.x - attacker.x) * pathX + (candidate.y - attacker.y) * pathY) / pathLengthSq;
    if (projection <= 0.08 || projection >= 0.96) continue;
    const blockingDistance = distanceToSegment(candidate.x, candidate.y, attacker.x, attacker.y, target.x, target.y);
    if (blockingDistance > candidate.radius + attacker.radius * 0.35 + MELEE_BLOCK_PADDING) continue;
    const current = dist(attacker.x, attacker.y, candidate.x, candidate.y);
    if (current < bestDistance) {
      best = candidate;
      bestDistance = current;
    }
  }

  return best;
}

function depositCarry(worker) {
  if (!worker.carryKind || worker.carryAmount <= 0) return;
  if (worker.internalCarry) {
    worker.carryKind = null;
    worker.carryAmount = 0;
    worker.internalCarry = false;
    return;
  }
  const colony = getColony(worker.team);
  colony[worker.carryKind] += worker.carryAmount;
  if (worker.team === "player") {
    spawnFloatingText(worker.x, worker.y - 18, `+${worker.carryAmount} ${resourceLabel(worker.carryKind)}`, "#f4d27b");
  }
  worker.carryKind = null;
  worker.carryAmount = 0;
  worker.internalCarry = false;
}

function assignNextGather(worker) {
  const preference = worker.gatherPreference || "protein";
  let resource = null;
  if (preference === "materials") {
    const colony = getColony(worker.team);
    const preferred = colony.sand <= colony.sticks + 3 ? "sand" : "sticks";
    resource =
      findNearestResource(worker.x, worker.y, (candidate) => candidate.kind === preferred) ||
      findNearestResource(worker.x, worker.y, (candidate) => candidate.kind === "sand" || candidate.kind === "sticks");
  } else {
    resource = findNearestResource(worker.x, worker.y, (candidate) => candidate.kind === preference);
  }
  if (!resource && preference !== "protein") {
    resource = findNearestResource(worker.x, worker.y, (candidate) => candidate.kind === "sand" || candidate.kind === "sticks");
  }
  if (!resource && preference === "protein") {
    resource = findNearestResource(worker.x, worker.y, (candidate) => candidate.kind === "protein");
  }
  if (resource) {
    worker.state = "gathering";
    worker.resourceId = resource.id;
    worker.gatherTimer = 0;
  } else {
    worker.state = "idle";
  }
}

function updateGathering(worker, dt) {
  if (worker.carryAmount > 0) {
    worker.state = "returning";
    return;
  }
  let resource = getResource(worker.resourceId);
  if (!resource || resource.amount <= 0) {
    assignNextGather(worker);
    return;
  }
  const arrived = moveToward(worker, resource.x, resource.y, dt, resource.radius + worker.radius + 2);
  if (!arrived) return;
  worker.gatherTimer += dt;
  if (worker.gatherTimer < resource.gatherTime) return;
  const amount = Math.min(worker.carryMax, resource.amount);
  worker.carryKind = resource.kind;
  worker.carryAmount = amount;
  resource.amount -= amount;
  worker.gatherTimer = 0;
  if (resource.amount <= 0) {
    resources = resources.filter((candidate) => candidate.id !== resource.id);
  }
  worker.state = "returning";
}

function updateReturning(worker, dt) {
  const hill = nearestAnthill(worker.team, worker.x, worker.y);
  if (!hill) {
    worker.state = "idle";
    return;
  }
  const arrived = moveToward(worker, hill.x, hill.y, dt, hill.radius - 6);
  if (!arrived) return;
  depositCarry(worker);
  if (worker.keepGathering) {
    assignNextGather(worker);
  } else {
    worker.state = "idle";
  }
}

function updateBuilding(worker, dt) {
  const hill = getAnthill(worker.targetId) || nearestAnthill(worker.team, worker.x, worker.y);
  if (!hill) {
    worker.state = "idle";
    return;
  }
  const arrived = moveToward(worker, hill.x, hill.y, dt, hill.radius + worker.radius);
  if (!arrived) return;
  const colony = getColony(worker.team);
  if (colony.sand < BUILD_COST.sand || colony.sticks < BUILD_COST.sticks) return;
  hill.buildProgress += dt;
  const required = BUILD_TIME_BASE + hill.level * 8;
  if (hill.buildProgress >= required) {
    hill.buildProgress = 0;
    colony.sand -= BUILD_COST.sand;
    colony.sticks -= BUILD_COST.sticks;
    hill.level += 1;
    hill.radius = Math.min(BUILD_RADIUS_MAX, hill.radius + 7);
    updateLarvaeLayout(worker.team, hill.id);
    if (worker.team === "player") {
      announce("anthillExpanded", { level: hill.level });
    }
  }
}

function larvaMatchesHill(larva, hill) {
  return !hill || !larva.homeHillId || larva.homeHillId === hill.id;
}

function larvaFeederCounts(team, hill, excludedWorker = null) {
  const counts = new Map();
  for (const unit of units) {
    if (excludedWorker && unit.id === excludedWorker.id) continue;
    if (unit.team !== team || unit.type !== "worker" || unit.state !== "feeding_larvae" || !unit.feedLarvaId) continue;
    const larva = getLarva(unit.feedLarvaId);
    if (!larva || larva.progress >= larva.hatchTime - 0.01 || !larvaMatchesHill(larva, hill)) continue;
    counts.set(larva.id, (counts.get(larva.id) || 0) + 1);
  }
  return counts;
}

function hungryLarvaFor(worker, hill) {
  const feederCounts = larvaFeederCounts(worker.team, hill, worker);
  let best = null;
  let bestScore = Infinity;
  for (const larva of larvae) {
    if (larva.team !== worker.team || larva.progress >= larva.hatchTime - 0.01) continue;
    if (!larvaMatchesHill(larva, hill)) continue;
    const assignedFeeders = feederCounts.get(larva.id) || 0;
    if (assignedFeeders >= MAX_LARVA_FEEDERS) continue;
    const remaining = larva.hatchTime - larva.progress;
    const activeGroupPenalty = assignedFeeders > 0 ? 0 : 100000;
    const groupFillBonus = (MAX_LARVA_FEEDERS - assignedFeeders) * 25;
    const currentDistance = dist(worker.x, worker.y, larva.x, larva.y);
    const score = activeGroupPenalty + remaining * 900 + groupFillBonus + currentDistance;
    if (score < bestScore) {
      best = larva;
      bestScore = score;
    }
  }
  return best;
}

function assignLarvaFeedingSlot(worker, hill) {
  const previousLarvaId = worker.feedLarvaId;
  const larva = hungryLarvaFor(worker, hill);
  if (!larva) {
    worker.feedLarvaId = null;
    worker.feedSlot = 0;
    return null;
  }
  const feederCounts = larvaFeederCounts(worker.team, hill, worker);
  worker.feedLarvaId = larva.id;
  if (previousLarvaId !== larva.id) {
    worker.feedSlot = clamp(feederCounts.get(larva.id) || 0, 0, MAX_LARVA_FEEDERS - 1);
    resetFeedingStuck(worker);
  }
  return larva;
}

function resetFeedingStuck(worker) {
  worker.feedStuckTimer = 0;
  worker.feedStuckX = worker.x;
  worker.feedStuckY = worker.y;
  worker.feedStuckDistance = null;
}

function updateFeedingStuck(worker, target, dt) {
  const targetDistance = dist(worker.x, worker.y, target.x, target.y);
  const improved = worker.feedStuckDistance === null || targetDistance < worker.feedStuckDistance - 1.2;
  if (improved) {
    worker.feedStuckTimer = 0;
    worker.feedStuckX = worker.x;
    worker.feedStuckY = worker.y;
    worker.feedStuckDistance = targetDistance;
    return false;
  }

  worker.feedStuckTimer += dt;
  worker.feedStuckX = worker.x;
  worker.feedStuckY = worker.y;
  worker.feedStuckDistance = Math.min(worker.feedStuckDistance ?? targetDistance, targetDistance);
  return worker.feedStuckTimer >= LARVA_FEED_STUCK_LIMIT;
}

function randomHungryLarvaFor(worker, hill, excludeId = null) {
  const feederCounts = larvaFeederCounts(worker.team, hill, worker);
  let candidates = larvae.filter((larva) => {
    if (larva.team !== worker.team || larva.progress >= larva.hatchTime - 0.01) return false;
    if (!larvaMatchesHill(larva, hill)) return false;
    return (feederCounts.get(larva.id) || 0) < MAX_LARVA_FEEDERS;
  });
  if (excludeId && candidates.length > 1) {
    candidates = candidates.filter((larva) => larva.id !== excludeId);
  }
  if (!candidates.length) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function assignSpecificLarvaFeedingSlot(worker, hill, larva) {
  if (!larva) return null;
  const feederCounts = larvaFeederCounts(worker.team, hill, worker);
  worker.feedLarvaId = larva.id;
  worker.feedSlot = clamp(feederCounts.get(larva.id) || 0, 0, MAX_LARVA_FEEDERS - 1);
  resetFeedingStuck(worker);
  return larva;
}

function larvaFeedingPoint(worker, larva) {
  const slot = worker.feedSlot || 0;
  const angle = -Math.PI / 2 + (slot / MAX_LARVA_FEEDERS) * Math.PI * 2 + (worker.id % 3) * 0.08;
  const radius = worker.radius + larva.radius + 5;
  return {
    x: clamp(larva.x + Math.cos(angle) * radius, 12, WORLD.width - 12),
    y: clamp(larva.y + Math.sin(angle) * radius, 12, WORLD.height - 12),
  };
}

function updateFeedingLarvaeWorker(worker, dt, hill) {
  const colony = getColony(worker.team);
  const storage = proteinStoragePoint(hill);
  if (!worker.serviceStage) worker.serviceStage = "to_storage";

  if (worker.serviceStage === "to_storage") {
    worker.target = storage;
    worker.targetId = hill.id;
    const arrived = moveToward(worker, storage.x, storage.y, dt, proteinStorageAccessRadius(hill));
    if (!arrived) return;
    resetFeedingStuck(worker);
    const previousLarvaId = worker.feedLarvaId;
    const larva = assignLarvaFeedingSlot(worker, hill);
    if (!larva || colony.protein <= 0) {
      worker.carryKind = null;
      worker.carryAmount = 0;
      worker.internalCarry = false;
      worker.feedLarvaId = null;
      return;
    }
    worker.serviceTimer = LARVA_FEED_LOAD_TIME + (previousLarvaId ? 0 : worker.feedSlot * LARVA_FEED_STREAM_GAP);
    worker.serviceStage = "loading_food";
    return;
  }

  if (worker.serviceStage === "loading_food") {
    const larva = getLarva(worker.feedLarvaId);
    if (!larva || larva.progress >= larva.hatchTime - 0.01 || !larvaMatchesHill(larva, hill) || colony.protein <= 0) {
      worker.serviceStage = "to_storage";
      worker.serviceTimer = 0;
      worker.feedLarvaId = null;
      worker.carryKind = null;
      worker.carryAmount = 0;
      worker.internalCarry = false;
      return;
    }
    worker.target = storage;
    worker.serviceTimer = Math.max(0, worker.serviceTimer - dt);
    if (worker.serviceTimer > 0) return;
    worker.carryKind = "protein";
    worker.carryAmount = 1;
    worker.internalCarry = true;
    worker.serviceStage = "to_larva";
    resetFeedingStuck(worker);
    return;
  }

  let larva = getLarva(worker.feedLarvaId);
  const assignedFeeders = larva ? larvaFeederCounts(worker.team, hill, worker).get(larva.id) || 0 : 0;
  if (!larva || larva.progress >= larva.hatchTime - 0.01 || !larvaMatchesHill(larva, hill) || assignedFeeders >= MAX_LARVA_FEEDERS) {
    larva = assignLarvaFeedingSlot(worker, hill);
    if (!larva) {
      worker.serviceStage = "to_storage";
      worker.serviceTimer = 0;
      worker.carryKind = null;
      worker.carryAmount = 0;
      worker.internalCarry = false;
      worker.feedLarvaId = null;
      return;
    }
  }

  worker.target = larvaFeedingPoint(worker, larva);
  const arrived = moveToward(worker, worker.target.x, worker.target.y, dt, 2);
  if (!arrived) {
    if (updateFeedingStuck(worker, worker.target, dt)) {
      const fallbackLarva = randomHungryLarvaFor(worker, hill, larva.id);
      if (fallbackLarva) {
        assignSpecificLarvaFeedingSlot(worker, hill, fallbackLarva);
      } else {
        worker.serviceStage = "to_storage";
        worker.serviceTimer = 0;
        worker.carryKind = null;
        worker.carryAmount = 0;
        worker.internalCarry = false;
        worker.feedLarvaId = null;
        resetFeedingStuck(worker);
      }
    }
    return;
  }
  resetFeedingStuck(worker);

  const increment = Math.min(LARVA_FEED_INCREMENT, larva.hatchTime - larva.progress);
  const proteinUsed = increment * (larva.growthCost / larva.hatchTime);
  if (colony.protein >= proteinUsed) {
    larva.progress += increment;
    larva.proteinSpent = Math.min(larva.growthCost, larva.proteinSpent + proteinUsed);
    larva.feedPulse = 0.45;
    colony.protein -= proteinUsed;
  }
  worker.carryKind = null;
  worker.carryAmount = 0;
  worker.internalCarry = false;
  worker.serviceTimer = 0;
  worker.serviceStage = "to_storage";
}

function updateServiceWorker(worker, dt, state) {
  const hill = nearestAnthill(worker.team, worker.x, worker.y);
  if (!hill) {
    worker.state = "idle";
    return;
  }
  if (state === "feeding_larvae") {
    updateFeedingLarvaeWorker(worker, dt, hill);
    return;
  }

  const queen = getUnit(worker.targetId) || nearestQueen(worker.team, worker.x, worker.y);
  if (!queen) {
    worker.state = "idle";
    return;
  }
  if (!worker.serviceStage) worker.serviceStage = "to_queen";
  worker.target = { x: queen.x, y: queen.y };
  const arrived = moveToward(worker, queen.x, queen.y, dt, queen.radius + worker.radius + 4);
  if (!arrived) return;

  worker.carryKind = null;
  worker.carryAmount = 0;
  worker.internalCarry = false;
  worker.serviceTimer += dt;
  if (worker.serviceTimer < QUEEN_CELL_INTERVAL) return;

  const cells = Math.floor(worker.serviceTimer / QUEEN_CELL_INTERVAL);
  const colony = getColony(worker.team);
  const before = queenPreparedCells(queen);
  const affordableCells = Math.min(cells, Math.floor(colony.protein), 999 - before);
  if (affordableCells <= 0) {
    worker.serviceTimer = Math.min(worker.serviceTimer, QUEEN_CELL_INTERVAL);
    return;
  }

  worker.serviceTimer -= affordableCells * QUEEN_CELL_INTERVAL;
  if (affordableCells < cells) worker.serviceTimer = Math.min(worker.serviceTimer, QUEEN_CELL_INTERVAL);
  colony.protein -= affordableCells;
  queen.preparedCells = before + affordableCells;
  const created = queenPreparedCells(queen) - before;
  if (created > 0 && worker.team === "player") {
    spawnFloatingText(queen.x, queen.y - queen.radius - 12, created === 1 ? t("cellSingular") : t("cellPlural", { count: created }), "#f4d27b");
  }
}

function updateDigging(worker, dt) {
  const tunnel = tunnels.find((candidate) => candidate.id === worker.targetId && candidate.active);
  if (!tunnel) {
    worker.state = "idle";
    return;
  }
  moveToward(worker, tunnel.x2, tunnel.y2, dt, 24);
}

function damageFor(attacker, target) {
  if (attacker.type === "fighter" && target.type === "worker") return 2;
  if (attacker.type === "fighter" && target.type === "fighter") return 1;
  if (attacker.type === "fighter" && target.type === "queen") return 1;
  if (attacker.type === "queen") return 1;
  return 1;
}

function updateAttacking(unit, dt) {
  const target = getUnit(unit.targetId);
  if (!target || target.hp <= 0) {
    unit.targetId = null;
    if (unit.attackMoveTarget) {
      unit.state = "attack_move";
      unit.target = unit.attackMoveTarget;
      return;
    }
    unit.state = "idle";
    return;
  }
  const blocker = findAttackBlocker(unit, target);
  const activeTarget = blocker || target;
  const reach = meleeReach(unit, activeTarget);
  const current = dist(unit.x, unit.y, activeTarget.x, activeTarget.y);
  if (current > reach) {
    moveToward(unit, activeTarget.x, activeTarget.y, dt, Math.max(2, reach - 2));
    return;
  }
  if (unit.attackTimer > 0) return;
  unit.attackTimer = unit.cooldown;
  activeTarget.lastHitFrom = unit.team;
  const damage = damageFor(unit, activeTarget);
  activeTarget.hp -= damage;
  spawnFloatingText(activeTarget.x, activeTarget.y - activeTarget.radius - 10, `-${damage}`, unit.team === "player" ? "#ffd166" : "#9fc5ff");
  if (activeTarget.hp <= 0) {
    killUnit(activeTarget, unit.team);
  }
}

function updateAttackMove(unit, dt) {
  const threat = findNearestEnemy(unit, unit.type === "fighter" ? 180 : 135);
  if (threat) {
    unit.state = "attacking";
    unit.targetId = threat.id;
    unit.attackMoveTarget = unit.target;
    return;
  }
  if (!unit.target || moveToward(unit, unit.target.x, unit.target.y, dt, 4)) {
    unit.state = "idle";
    unit.attackMoveTarget = null;
  }
}

function killUnit(unit, killerTeam) {
  unit.hp = 0;
  selectedIds.delete(unit.id);
  const killerColony = getColony(killerTeam);
  if (killerColony) killerColony.kills += 1;
  if (unit.type === "queen") {
    const nextQueen = liveQueens(unit.team)[0] || null;
    getColony(unit.team).queenId = nextQueen ? nextQueen.id : null;
    if (unit.team === "player" && !colonyHasLivingQueen("player")) {
      endGame("lost", "queenFallen");
    } else if (unit.team === "enemy" && !colonyHasLivingQueen("enemy")) {
      endGame("won", "enemyQueenDefeated");
    }
  }
}

function cleanupUnits() {
  units = units.filter((unit) => unit.hp > 0);
  updateSelectionFlags();
}

function updateUnit(unit, dt) {
  unit.attackTimer = Math.max(0, unit.attackTimer - dt);

  if (unit.type !== "queen" && unit.state !== "attacking" && unit.state !== "gathering" && unit.state !== "returning") {
    const threat = findNearestEnemy(unit, unit.type === "fighter" ? 110 : 70);
    if (threat && (unit.type === "fighter" || unit.state === "idle" || unit.state === "moving" || unit.state === "attack_move")) {
      if (unit.state === "attack_move") unit.attackMoveTarget = unit.target;
      unit.state = "attacking";
      unit.targetId = threat.id;
    }
  }

  switch (unit.state) {
    case "moving":
      if (!unit.target || moveToward(unit, unit.target.x, unit.target.y, dt, 4)) {
        unit.state = "idle";
      }
      break;
    case "attack_move":
      updateAttackMove(unit, dt);
      break;
    case "gathering":
      if (unit.type === "worker") updateGathering(unit, dt);
      break;
    case "returning":
      if (unit.type === "worker") updateReturning(unit, dt);
      break;
    case "building":
      if (unit.type === "worker") updateBuilding(unit, dt);
      break;
    case "feeding_larvae":
      if (unit.type === "worker") updateServiceWorker(unit, dt, "feeding_larvae");
      break;
    case "serving_queen":
      if (unit.type === "worker") updateServiceWorker(unit, dt, "serving_queen");
      break;
    case "digging":
      if (unit.type === "worker") updateDigging(unit, dt);
      break;
    case "attacking":
      updateAttacking(unit, dt);
      break;
    default:
      break;
  }
}

function updateLarvae(team, dt) {
  const colony = getColony(team);
  for (const larva of larvae) {
    if (larva.team !== team) continue;
    larva.feedPulse = Math.max(0, larva.feedPulse - dt);
    if (larva.type === "queen") {
      larva.progress = Math.min(larva.hatchTime, larva.progress + dt);
    }
  }

  const ready = larvae.filter((larva) => larva.team === team && larva.progress >= larva.hatchTime - 0.01);
  if (!ready.length) return;
  larvae = larvae.filter((larva) => !(larva.team === team && larva.progress >= larva.hatchTime - 0.01));
  for (const [index, larva] of ready.entries()) {
    const home = getAnthill(larva.homeHillId) || nearestAnthill(team, larva.x, larva.y);
    if (!home) continue;
    const angle = randomRange(0, Math.PI * 2);
    const range = randomRange(home.radius + 12, home.radius + 44);
    const queenChamber = larva.type === "queen" ? queenChamberPoint(home) : null;
    const ant = makeUnit(
      team,
      larva.type,
      queenChamber ? queenChamber.x : home.x + Math.cos(angle) * range,
      queenChamber ? queenChamber.y : home.y + Math.sin(angle) * range,
      home.id,
    );
    if (colony.rallyPoint && ant.type !== "queen") {
      const point = spreadPoint(index, ready.length, colony.rallyPoint.x, colony.rallyPoint.y);
      ant.state = "moving";
      ant.target = point;
      ant.commandX = point.x;
      ant.commandY = point.y;
    }
    if (larva.type === "worker") colony.workersHatched += 1;
    if (larva.type === "fighter") colony.fightersHatched += 1;
  }
  updateLarvaeLayout(team);
  if (team === "player") {
    const workers = ready.filter((larva) => larva.type === "worker").length;
    const fighters = ready.filter((larva) => larva.type === "fighter").length;
    const queens = ready.filter((larva) => larva.type === "queen").length;
    const text = [
      workers ? `${workers} ${unitTypeLabel("worker", workers)}` : "",
      fighters ? `${fighters} ${unitTypeLabel("fighter", fighters)}` : "",
      queens ? `${queens} ${unitTypeLabel("queen", queens)}` : "",
    ]
      .filter(Boolean)
      .join(", ");
    announce("hatched", { text: currentLanguage === "en" || currentLanguage === "de" ? `${text} ` : text });
  }
}

function updateQueenService(team, dt) {
  for (const queen of liveQueens(team)) {
    queen.preparedCells = clamp(queen.preparedCells || 0, 0, 999);
  }
}

function updateTunnels(dt) {
  for (const tunnel of tunnels) {
    if (!tunnel.active) continue;
    let diggers = 0;
    for (const unitId of tunnel.workers) {
      const worker = getUnit(unitId);
      if (!worker || worker.state !== "digging") continue;
      if (dist(worker.x, worker.y, tunnel.x2, tunnel.y2) <= 28) {
        diggers += 1;
      }
    }
    if (diggers <= 0) continue;
    tunnel.progress += dt * diggers;
    if (tunnel.progress >= tunnel.required) {
      tunnel.active = false;
      const newHill = makeAnthill(tunnel.team, tunnel.x2, tunnel.y2);
      for (const unitId of tunnel.workers) {
        const worker = getUnit(unitId);
        if (worker && worker.state === "digging") worker.state = "idle";
      }
      if (tunnel.team === "player") {
        selectedIds.clear();
        updateSelectionFlags();
        selectedTunnelId = null;
        selectedHillId = newHill.id;
        announce("newAnthill");
      }
    }
  }
}

function updateSpawns(dt) {
  game.spawnTimer -= dt;
  if (game.spawnTimer > 0) return;
  game.spawnTimer = RESOURCE_SPAWN_INTERVAL;
  const foodCount = resources.filter((resource) => resource.kind === "protein").length;
  const materialCount = resources.length - foodCount;
  if (foodCount < 120 && Math.random() < 0.75) spawnFood();
  if (materialCount < 82 && Math.random() < 0.35) spawnMaterial();
}

function aiTargets() {
  const time = game.elapsed;
  const waveGrowth = game.aiWave * 4;
  const targets = {
    workers: 30,
    fighters: 0,
    hillLevel: 3,
    feederShare: 0.76,
    materialShare: 0.24,
    queenServants: 3,
    attackMinFighters: 10,
    waveSize: 9,
    minWorkersBeforeFighters: 24,
    fighterProteinFloor: 18,
  };

  if (time >= 65) {
    targets.workers = 38;
    targets.hillLevel = 4;
    targets.feederShare = 0.74;
    targets.materialShare = 0.32;
    targets.queenServants = 4;
    targets.minWorkersBeforeFighters = 32;
  }
  if (time >= 135) {
    targets.workers = 44;
    targets.fighters = 12;
    targets.hillLevel = 4;
    targets.feederShare = 0.7;
    targets.materialShare = 0.32;
    targets.queenServants = 5;
    targets.minWorkersBeforeFighters = 34;
    targets.fighterProteinFloor = 14;
  }
  if (time >= 180) {
    targets.workers = 48;
    targets.fighters = 28;
    targets.hillLevel = 5;
    targets.feederShare = 0.76;
    targets.materialShare = 0.28;
    targets.queenServants = 5;
    targets.attackMinFighters = 12;
    targets.waveSize = 14;
    targets.minWorkersBeforeFighters = 36;
    targets.fighterProteinFloor = 10;
  }
  if (time >= AI_ATTACK_READY_TIME) {
    targets.workers = 50;
    targets.fighters = 46 + waveGrowth;
    targets.hillLevel = 6;
    targets.feederShare = 0.8;
    targets.materialShare = 0.22;
    targets.queenServants = 5;
    targets.attackMinFighters = 14 + Math.min(12, game.aiWave * 2);
    targets.waveSize = 18 + Math.min(18, game.aiWave * 3);
    targets.minWorkersBeforeFighters = 38;
    targets.fighterProteinFloor = 6;
  }
  if (time >= 300) {
    targets.workers = 52;
    targets.fighters = 60 + waveGrowth;
    targets.attackMinFighters = 18 + Math.min(14, game.aiWave * 2);
    targets.waveSize = 22 + Math.min(20, game.aiWave * 3);
  }

  return targets;
}

function clearInternalCarry(worker) {
  if (!worker.internalCarry) return;
  worker.carryKind = null;
  worker.carryAmount = 0;
  worker.internalCarry = false;
}

function releaseAIWorker(worker) {
  worker.state = "idle";
  worker.target = null;
  worker.targetId = null;
  worker.resourceId = null;
  worker.gatherTimer = 0;
  worker.keepGathering = false;
  worker.serviceStage = null;
  worker.serviceTimer = 0;
  worker.feedSlot = 0;
  worker.feedLarvaId = null;
  worker.attackMoveTarget = null;
  clearInternalCarry(worker);
}

function aiWorkerCanSwitch(worker) {
  if (worker.state === "idle" || worker.state === "moving") return true;
  return worker.state === "gathering" && worker.carryAmount <= 0 && !worker.internalCarry;
}

function aiOrderGather(worker, kind) {
  const colony = getColony(worker.team);
  let resource = null;
  if (kind === "materials") {
    const preferred = colony.sand <= colony.sticks + 3 ? "sand" : "sticks";
    resource =
      findNearestResource(worker.x, worker.y, (candidate) => candidate.kind === preferred) ||
      findNearestResource(worker.x, worker.y, (candidate) => candidate.kind === "sand" || candidate.kind === "sticks");
  } else {
    resource = findNearestResource(worker.x, worker.y, (candidate) => candidate.kind === "protein");
  }
  if (!resource) {
    resource = findNearestResource(worker.x, worker.y);
  }
  if (!resource) return false;

  worker.state = "gathering";
  worker.resourceId = resource.id;
  worker.gatherTimer = 0;
  worker.gatherPreference = kind === "materials" ? "materials" : resource.kind;
  worker.keepGathering = true;
  worker.target = null;
  worker.targetId = null;
  worker.serviceStage = null;
  worker.serviceTimer = 0;
  worker.feedSlot = 0;
  worker.feedLarvaId = null;
  worker.attackMoveTarget = null;
  clearInternalCarry(worker);
  return true;
}

function aiOrderServeQueen(worker, queen) {
  worker.state = "serving_queen";
  worker.target = { x: queen.x, y: queen.y };
  worker.targetId = queen.id;
  worker.resourceId = null;
  worker.gatherTimer = 0;
  worker.keepGathering = false;
  worker.serviceStage = "to_queen";
  worker.serviceTimer = 0;
  worker.feedSlot = 0;
  worker.feedLarvaId = null;
  worker.attackMoveTarget = null;
  clearInternalCarry(worker);
}

function aiOrderFeedLarvae(worker, hill) {
  worker.state = "feeding_larvae";
  worker.target = { x: hill.x, y: hill.y };
  worker.targetId = hill.id;
  worker.resourceId = null;
  worker.gatherTimer = 0;
  worker.keepGathering = false;
  worker.serviceStage = "to_storage";
  worker.serviceTimer = 0;
  worker.feedSlot = 0;
  worker.feedLarvaId = null;
  worker.attackMoveTarget = null;
  worker.carryKind = null;
  worker.carryAmount = 0;
  worker.internalCarry = false;
}

function aiOrderBuild(worker, hill) {
  worker.state = "building";
  worker.target = { x: hill.x, y: hill.y };
  worker.targetId = hill.id;
  worker.resourceId = null;
  worker.gatherTimer = 0;
  worker.keepGathering = false;
  worker.serviceStage = null;
  worker.serviceTimer = 0;
  worker.feedSlot = 0;
  worker.feedLarvaId = null;
  worker.attackMoveTarget = null;
  clearInternalCarry(worker);
}

function aiManageQueenServants(enemyWorkers, targets) {
  const queen = nearestQueen("enemy");
  if (!queen) return;
  const colony = colonies.enemy;
  const larvaeDemand = countLarvae("enemy") + LARVAE_BATCH_SIZE * 3;
  const desiredCells = Math.min(colonyLarvaeCapacity("enemy"), Math.max(LARVAE_BATCH_SIZE * 3, larvaeDemand));
  const needsCells = queenPreparedCells(queen) < desiredCells;
  const canSpare = Math.max(0, enemyWorkers.length - 2);
  const desiredServants = needsCells && colony.protein >= 1 ? Math.min(canSpare, targets.queenServants) : 0;
  let servants = enemyWorkers.filter((worker) => worker.state === "serving_queen" && worker.targetId === queen.id);

  if (servants.length > desiredServants) {
    servants.slice(desiredServants).forEach((worker) => releaseAIWorker(worker));
  }
  if (servants.length >= desiredServants) return;

  const candidates = enemyWorkers
    .filter((worker) => worker.state !== "serving_queen" && worker.state !== "feeding_larvae" && worker.state !== "building" && aiWorkerCanSwitch(worker))
    .sort((a, b) => dist(a.x, a.y, queen.x, queen.y) - dist(b.x, b.y, queen.x, queen.y));

  for (const worker of candidates.slice(0, desiredServants - servants.length)) {
    aiOrderServeQueen(worker, queen);
  }
}

function aiManageLarvae(targets) {
  const colony = colonies.enemy;
  const queen = nearestQueen("enemy");
  const hill = queenHomeHill("enemy", queen);
  if (!queen || !hill || colony.protein < LARVA_LAY_PROTEIN_COST || queenPreparedCells(queen) < LARVAE_LAY_COUNT) return;

  let attempts = 0;
  while (attempts < 5 && colony.protein >= LARVA_LAY_PROTEIN_COST && queenPreparedCells(queen) >= LARVAE_LAY_COUNT) {
    const hillLarvae = countLarvae("enemy", null, hill.id);
    if (anthillLarvaeCapacity(hill) - hillLarvae < LARVAE_LAY_COUNT) return;
    const currentWorkers = countUnits("enemy", "worker") + countLarvae("enemy", "worker");
    const currentFighters = countUnits("enemy", "fighter") + countLarvae("enemy", "fighter");
    const urgentlyNeedsWorkers = currentWorkers < Math.min(targets.minWorkersBeforeFighters, targets.workers);
    const canRaiseFighters =
      game.elapsed >= 135 &&
      currentWorkers >= targets.minWorkersBeforeFighters &&
      currentFighters < targets.fighters &&
      colony.protein >= targets.fighterProteinFloor;
    let type = null;
    if (urgentlyNeedsWorkers) {
      type = "worker";
    } else if (canRaiseFighters) {
      type = "fighter";
    } else if (currentWorkers < targets.workers) {
      type = "worker";
    } else if (game.elapsed >= 180 && currentFighters < targets.fighters + LARVAE_BATCH_SIZE && colony.protein > targets.fighterProteinFloor) {
      type = "fighter";
    } else if (currentWorkers < targets.workers + LARVAE_BATCH_SIZE && colony.protein > 14) {
      type = "worker";
    }
    if (!type) return;
    if (!layLarvae("enemy", type, { queenId: queen.id, silentCapacity: true, silentCells: true })) return;
    attempts += 1;
  }
}

function aiManageFeeders(enemyWorkers, targets) {
  const colony = colonies.enemy;
  const hill = queenHomeHill("enemy");
  if (!hill) return;

  const enemyLarvae = countLarvae("enemy");
  let feeders = enemyWorkers.filter((worker) => worker.state === "feeding_larvae");
  const workerReserve =
    colony.protein < 4 ? Math.max(2, Math.ceil(enemyWorkers.length * 0.35)) : Math.max(1, Math.floor(enemyWorkers.length * 0.12));
  const feederLimit = Math.max(0, Math.min(Math.floor(enemyWorkers.length * targets.feederShare), enemyWorkers.length - workerReserve));
  const neededFeeders = enemyLarvae > 0 && colony.protein > 0 ? Math.min(feederLimit, Math.max(5, Math.ceil(enemyLarvae * 0.95))) : 0;

  if (feeders.length > neededFeeders) {
    feeders
      .slice(neededFeeders)
      .forEach((worker) => releaseAIWorker(worker));
  }

  feeders = enemyWorkers.filter((worker) => worker.state === "feeding_larvae");
  if (feeders.length >= neededFeeders) return;

  const candidates = enemyWorkers
    .filter((worker) => worker.state !== "feeding_larvae" && worker.state !== "serving_queen" && worker.state !== "building" && aiWorkerCanSwitch(worker))
    .sort((a, b) => dist(a.x, a.y, hill.x, hill.y) - dist(b.x, b.y, hill.x, hill.y));

  for (const worker of candidates.slice(0, neededFeeders - feeders.length)) {
    aiOrderFeedLarvae(worker, hill);
  }
}

function aiManageBuilders(enemyWorkers, targets) {
  const colony = colonies.enemy;
  const hill = queenHomeHill("enemy");
  if (!hill) return;

  let builders = enemyWorkers.filter((worker) => worker.state === "building");
  const needsExpansion = hill.level < targets.hillLevel;
  const hasBuildCost = colony.sand >= BUILD_COST.sand && colony.sticks >= BUILD_COST.sticks;
  const desiredBuilders =
    needsExpansion && hasBuildCost ? Math.min(8, Math.max(3, Math.floor(enemyWorkers.length * 0.3))) : 0;

  if (builders.length > desiredBuilders) {
    builders
      .slice(desiredBuilders)
      .forEach((worker) => releaseAIWorker(worker));
  }
  if (!needsExpansion || !hasBuildCost) {
    builders.forEach((worker) => releaseAIWorker(worker));
    return;
  }

  builders = enemyWorkers.filter((worker) => worker.state === "building");
  if (builders.length >= desiredBuilders) return;

  const candidates = enemyWorkers
    .filter((worker) => worker.state !== "feeding_larvae" && worker.state !== "serving_queen" && worker.state !== "building" && aiWorkerCanSwitch(worker))
    .sort((a, b) => dist(a.x, a.y, hill.x, hill.y) - dist(b.x, b.y, hill.x, hill.y));

  for (const worker of candidates.slice(0, desiredBuilders - builders.length)) {
    aiOrderBuild(worker, hill);
  }
}

function aiManageGatherers(enemyWorkers, targets) {
  const colony = colonies.enemy;
  const hill = queenHomeHill("enemy");
  const pendingLevels = hill ? Math.max(0, targets.hillLevel - hill.level) : 0;
  const desiredProtein = Math.max(16, Math.ceil(countLarvae("enemy") * 1.4) + LARVAE_BATCH_SIZE);
  const needsProtein = colony.protein < desiredProtein;
  const desiredSand = BUILD_COST.sand * Math.max(2, pendingLevels + 1);
  const desiredSticks = BUILD_COST.sticks * Math.max(2, pendingLevels + 1);
  const needsMaterials = colony.sand < desiredSand || colony.sticks < desiredSticks;
  let proteinGatherers = enemyWorkers.filter((worker) => {
    const isGathering = worker.state === "gathering" || worker.state === "returning";
    const proteinPreference = worker.gatherPreference === "protein";
    const carryingProtein = worker.carryKind === "protein";
    return isGathering && (proteinPreference || carryingProtein);
  }).length;
  let materialGatherers = enemyWorkers.filter((worker) => {
    const isGathering = worker.state === "gathering" || worker.state === "returning";
    const materialPreference = worker.gatherPreference === "materials" || worker.gatherPreference === "sand" || worker.gatherPreference === "sticks";
    const carryingMaterial = worker.carryKind === "sand" || worker.carryKind === "sticks";
    return isGathering && (materialPreference || carryingMaterial);
  }).length;
  const desiredProteinGatherers = needsProtein ? Math.min(16, Math.max(3, Math.ceil(enemyWorkers.length * 0.45))) : 0;
  const desiredMaterialGatherers = needsMaterials ? Math.min(14, Math.max(3, Math.ceil(enemyWorkers.length * targets.materialShare))) : 1;

  const idleWorkers = enemyWorkers.filter((worker) => worker.state === "idle" || worker.state === "moving");
  for (const worker of idleWorkers) {
    if (needsProtein && proteinGatherers < desiredProteinGatherers) {
      if (aiOrderGather(worker, "protein")) {
        proteinGatherers += 1;
        continue;
      }
    }
    if (needsMaterials && materialGatherers < desiredMaterialGatherers) {
      if (aiOrderGather(worker, "materials")) {
        if (worker.gatherPreference === "materials" || worker.gatherPreference === "sand" || worker.gatherPreference === "sticks") {
          materialGatherers += 1;
        }
        continue;
      }
    }
    aiOrderGather(worker, "protein");
  }
}

function aiStagePoint(index, total, hill) {
  const playerHill = nearestAnthill("player", hill.x, hill.y);
  const towardPlayer = playerHill && game.elapsed >= 180;
  const centerX = towardPlayer ? hill.x * 0.76 + playerHill.x * 0.24 : hill.x;
  const centerY = towardPlayer ? hill.y * 0.76 + playerHill.y * 0.24 : hill.y;
  return spreadPoint(index, total, centerX, centerY);
}

function aiManageFighters(enemyFighters) {
  const hill = queenHomeHill("enemy");
  if (!hill) return;

  for (const [index, fighter] of enemyFighters.entries()) {
    if (fighter.state === "attacking") continue;
    const threat = findNearestEnemy(fighter, 560);
    if (threat && dist(threat.x, threat.y, hill.x, hill.y) < 620) {
      fighter.state = "attacking";
      fighter.targetId = threat.id;
      fighter.target = null;
      fighter.keepGathering = false;
      fighter.attackMoveTarget = null;
      continue;
    }
    if (fighter.state !== "idle") continue;
    fighter.state = "moving";
    fighter.target = aiStagePoint(index, Math.max(1, enemyFighters.length), hill);
    fighter.targetId = null;
    fighter.keepGathering = false;
    fighter.attackMoveTarget = null;
  }
}

function aiLaunchWave(enemyFighters, targets) {
  if (game.elapsed >= AI_ATTACK_READY_TIME - 45 && !game.aiAttackWarningSent) {
    game.aiAttackWarningSent = true;
    announce("enemyAttackPreparing");
  }
  if (game.elapsed < AI_ATTACK_READY_TIME || game.aiWaveTimer > 0) return;

  const target = nearestQueen("player");
  if (!target) return;
  const available = enemyFighters
    .filter((fighter) => fighter.state !== "attacking")
    .sort((a, b) => dist(a.x, a.y, target.x, target.y) - dist(b.x, b.y, target.x, target.y));

  if (enemyFighters.length < targets.attackMinFighters || available.length < Math.min(8, targets.attackMinFighters)) {
    game.aiWaveTimer = 12;
    return;
  }

  game.aiWave += 1;
  game.aiWaveTimer = Math.max(AI_WAVE_MIN_GAP, AI_WAVE_BASE_GAP - game.aiWave * 6);

  const attackers = available.slice(0, Math.min(available.length, targets.waveSize));
  for (const fighter of attackers) {
    fighter.state = "attacking";
    fighter.targetId = target.id;
    fighter.target = null;
    fighter.keepGathering = false;
    fighter.serviceStage = null;
    fighter.feedLarvaId = null;
    fighter.attackMoveTarget = null;
  }
  if (attackers.length) announce("enemyAttackIncoming");
}

function updateAI(dt) {
  game.aiTimer -= dt;
  game.aiWaveTimer -= dt;
  if (game.aiTimer > 0) return;
  game.aiTimer = AI_THINK_INTERVAL;

  const queen = nearestQueen("enemy");
  if (!queen || queen.hp <= 0) return;

  const targets = aiTargets();
  const enemyWorkers = units.filter((unit) => unit.team === "enemy" && unit.type === "worker" && unit.hp > 0);
  const enemyFighters = units.filter((unit) => unit.team === "enemy" && unit.type === "fighter" && unit.hp > 0);

  aiManageQueenServants(enemyWorkers, targets);
  aiManageLarvae(targets);
  aiManageFeeders(enemyWorkers, targets);
  aiManageBuilders(enemyWorkers, targets);
  aiManageGatherers(enemyWorkers, targets);
  aiManageFighters(enemyFighters);
  aiLaunchWave(enemyFighters, targets);
}

function updateCamera(dt) {
  let dx = 0;
  let dy = 0;
  if (keys.has("KeyA") || keys.has("ArrowLeft")) dx -= 1;
  if (keys.has("KeyD") || keys.has("ArrowRight")) dx += 1;
  if (keys.has("KeyW") || keys.has("ArrowUp")) dy -= 1;
  if (keys.has("KeyS") || keys.has("ArrowDown")) dy += 1;

  const edge = 18;
  if (game.mouse.inside) {
    if (game.mouse.x < edge) dx -= 0.8;
    if (game.mouse.x > VIEW.width - edge) dx += 0.8;
    if (game.mouse.y < edge) dy -= 0.8;
    if (game.mouse.y > VIEW.height - edge) dy += 0.8;
  }

  if (dx !== 0 || dy !== 0) {
    const length = Math.hypot(dx, dy) || 1;
    const speed = keys.has("ShiftLeft") || keys.has("ShiftRight") ? 820 : 520;
    game.camera.x = clamp(game.camera.x + (dx / length) * speed * dt, 0, Math.max(0, WORLD.width - VIEW.width));
    game.camera.y = clamp(game.camera.y + (dy / length) * speed * dt, 0, Math.max(0, WORLD.height - VIEW.height));
    game.mouse.worldX = game.mouse.x + game.camera.x;
    game.mouse.worldY = game.mouse.y + game.camera.y;
  }
}

function updateFloatingText(dt) {
  for (const item of floatingText) {
    item.age += dt;
    item.y -= dt * 20;
  }
  floatingText = floatingText.filter((item) => item.age < item.life);
}

function updateGame(dt) {
  if (game.status !== "playing") {
    updateFloatingText(dt);
    updateAttackMarkers(dt);
    return;
  }
  game.elapsed += dt;
  updateCamera(dt);
  updateSpawns(dt);
  updateAI(dt);
  for (const unit of [...units]) {
    if (unit.hp > 0) updateUnit(unit, dt);
  }
  updateLarvae("player", dt);
  updateLarvae("enemy", dt);
  resolveUnitCollisions();
  updateQueenService("player", dt);
  updateQueenService("enemy", dt);
  updateTunnels(dt);
  updateFloatingText(dt);
  updateAttackMarkers(dt);
  cleanupUnits();
  game.messageTimer = Math.max(0, game.messageTimer - dt);
  if (game.messageTimer <= 0) {
    ui.messageLog.textContent = "";
    game.messageKey = "";
    game.messageValues = {};
  }
}

function endGame(status, messageKey, values = {}) {
  if (game.status !== "playing") return;
  game.status = status;
  game.statusMessageKey = messageKey;
  game.statusMessageValues = { ...values };
  game.statusMessage = t(messageKey, values);
  announce(messageKey, values);
}

function drawTerrain() {
  ctx.fillStyle = "#24442e";
  ctx.fillRect(0, 0, WORLD.width, WORLD.height);

  ctx.fillStyle = "rgba(26, 71, 37, 0.42)";
  for (let y = 0; y < WORLD.height; y += 180) {
    for (let x = 0; x < WORLD.width; x += 180) {
      ctx.beginPath();
      ctx.arc(x + 70, y + 40, 88, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (const item of terrain) {
    if (!isVisible(item.x, item.y, item.r + 8)) continue;
    if (item.type === "leaf") {
      ctx.fillStyle = item.shade > 0.5 ? "rgba(67, 105, 54, 0.7)" : "rgba(46, 87, 50, 0.68)";
      ctx.beginPath();
      ctx.ellipse(item.x, item.y, item.r * 1.3, item.r * 0.62, item.shade * Math.PI, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(22, 43, 27, 0.28)";
      ctx.beginPath();
      ctx.arc(item.x - item.r * 0.2, item.y + item.r * 0.2, item.r * 0.28, 0, Math.PI * 2);
      ctx.fill();
    } else if (item.type === "trunk") {
      ctx.fillStyle = item.shade > 0.45 ? "#6d5638" : "#58452f";
      ctx.beginPath();
      ctx.ellipse(item.x, item.y, item.r * 0.72, item.r * 0.42, item.shade * Math.PI, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(31, 22, 14, 0.34)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(item.x - item.r * 0.3, item.y);
      ctx.lineTo(item.x + item.r * 0.32, item.y - item.r * 0.1);
      ctx.stroke();
    } else {
      ctx.fillStyle = item.shade > 0.45 ? "#6f786b" : "#555f59";
      ctx.beginPath();
      ctx.ellipse(item.x, item.y, item.r * 0.62, item.r * 0.44, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function isVisible(x, y, radius) {
  return (
    x + radius >= game.camera.x &&
    x - radius <= game.camera.x + VIEW.width &&
    y + radius >= game.camera.y &&
    y - radius <= game.camera.y + VIEW.height
  );
}

function drawAnthill(hill) {
  if (!isVisible(hill.x, hill.y, hill.radius + 20)) return;
  const player = hill.team === "player";
  ctx.save();
  ctx.translate(hill.x, hill.y);
  ctx.fillStyle = player ? "#9a6b3c" : "#654f78";
  ctx.beginPath();
  ctx.ellipse(0, 4, hill.radius, hill.radius * 0.62, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = player ? "#c39255" : "#8266a4";
  ctx.beginPath();
  ctx.ellipse(-8, -4, hill.radius * 0.78, hill.radius * 0.45, -0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#221914";
  ctx.beginPath();
  ctx.ellipse(4, 10, hill.radius * 0.28, hill.radius * 0.18, 0.12, 0, Math.PI * 2);
  ctx.fill();
  const storage = proteinStoragePoint(hill);
  const storageX = storage.x - hill.x;
  const storageY = storage.y - hill.y;
  const protein = getColony(hill.team).protein;
  const storageOuter = hill.radius * 0.29;
  const storageFill = clamp(protein / proteinStorageCapacity(hill), 0, 1);
  const storageFillRadius = Math.max(3, storageOuter * Math.sqrt(storageFill));
  ctx.fillStyle = player ? "rgba(62, 39, 21, 0.78)" : "rgba(36, 29, 54, 0.78)";
  ctx.beginPath();
  ctx.arc(storageX, storageY, storageOuter, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = player ? "rgba(243, 208, 107, 0.62)" : "rgba(170, 191, 255, 0.56)";
  ctx.beginPath();
  ctx.arc(storageX, storageY, storageFillRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = player ? "rgba(255, 229, 157, 0.86)" : "rgba(192, 208, 255, 0.78)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(storageX, storageY, storageOuter, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = player ? "#f3d06b" : "#aabfff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(storageX, storageY, storageOuter + 4, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * storageFill);
  ctx.stroke();
  const proteinDots = clamp(Math.ceil(protein / 5), 0, 18);
  for (let i = 0; i < proteinDots; i += 1) {
    const angle = i * 2.3999632297;
    const ring = Math.sqrt(i) * Math.max(3, storageOuter * 0.16);
    ctx.fillStyle = i % 2 ? "#f3d06b" : "#e8b94f";
    ctx.beginPath();
    ctx.arc(storageX + Math.cos(angle) * ring, storageY + Math.sin(angle) * ring, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
  const nursery = nurseryCenterPoint(hill);
  ctx.fillStyle = player ? "rgba(255, 231, 174, 0.13)" : "rgba(199, 180, 255, 0.13)";
  ctx.beginPath();
  ctx.ellipse(nursery.x - hill.x, nursery.y - hill.y, hill.radius * 0.34, hill.radius * 0.24, 0.08, 0, Math.PI * 2);
  ctx.fill();
  const materialDots = clamp(Math.ceil((getColony(hill.team).sand + getColony(hill.team).sticks) / 8), 0, 10);
  for (let i = 0; i < materialDots; i += 1) {
    const mx = hill.radius * 0.45 + (i % 3) * 5;
    const my = -hill.radius * 0.16 + Math.floor(i / 3) * 5;
    ctx.fillStyle = i % 2 ? "#8a5b2f" : "#d1bc78";
    ctx.beginPath();
    ctx.arc(mx, my, 2.8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = player ? "rgba(248, 210, 126, 0.48)" : "rgba(158, 183, 255, 0.44)";
  ctx.lineWidth = 3;
  for (let i = 0; i < hill.level; i += 1) {
    ctx.beginPath();
    ctx.ellipse(0, 5, hill.radius + 8 + i * 6, hill.radius * 0.64 + i * 3, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (selectedHillId === hill.id) {
    ctx.strokeStyle = "#84f1ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 5, hill.radius + 18, hill.radius * 0.72 + 8, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (hill.buildProgress > 0) {
    const progress = hill.buildProgress / (BUILD_TIME_BASE + hill.level * 8);
    ctx.strokeStyle = "#f3d282";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, hill.radius + 17, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
    ctx.stroke();
    ctx.strokeStyle = "rgba(242, 234, 210, 0.68)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i += 1) {
      const angle = -Math.PI * 0.8 + i * 0.38;
      const inner = hill.radius * 0.72;
      const outer = hill.radius + 18;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner * 0.64 + 4);
      ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer * 0.64 + 4);
      ctx.stroke();
    }
  }
  ctx.fillStyle = "#f2ead2";
  ctx.font = "700 12px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(player ? t("hillLevel", { level: hill.level }) : t("enemyLevel", { level: hill.level }), 0, -hill.radius - 18);
  ctx.fillStyle = player ? "#f3d06b" : "#aabfff";
  ctx.font = "650 11px system-ui, sans-serif";
  ctx.fillText(`${countLarvae(hill.team, null, hill.id)}/${anthillLarvaeCapacity(hill)} ${t("larvae").toLowerCase()}`, 0, -hill.radius - 5);
  ctx.restore();
}

function drawResource(resource) {
  if (!isVisible(resource.x, resource.y, resource.radius + 14)) return;
  ctx.save();
  ctx.translate(resource.x, resource.y);
  const remain = clamp(resource.amount / resource.maxAmount, 0, 1);
  if (resource.type === "beetle") {
    ctx.fillStyle = "#20231e";
    ctx.beginPath();
    ctx.ellipse(0, 0, 11, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#5b7443";
    ctx.beginPath();
    ctx.ellipse(-2, 0, 7, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 1.5;
    for (let i = -1; i <= 1; i += 1) {
      ctx.beginPath();
      ctx.moveTo(-5, i * 4);
      ctx.lineTo(-13, i * 7);
      ctx.moveTo(5, i * 4);
      ctx.lineTo(13, i * 7);
      ctx.stroke();
    }
  } else if (resource.type === "fly") {
    ctx.fillStyle = "rgba(190, 220, 226, 0.72)";
    ctx.beginPath();
    ctx.ellipse(-6, -3, 7, 4, -0.45, 0, Math.PI * 2);
    ctx.ellipse(6, -3, 7, 4, 0.45, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#303238";
    ctx.beginPath();
    ctx.ellipse(0, 2, 6, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (resource.type === "caterpillar") {
    for (let i = -2; i <= 2; i += 1) {
      ctx.fillStyle = i % 2 === 0 ? "#a5c957" : "#86b342";
      ctx.beginPath();
      ctx.arc(i * 5, Math.sin(i) * 2, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (resource.type === "sand") {
    ctx.fillStyle = "#d1bc78";
    ctx.beginPath();
    ctx.ellipse(0, 3, 15, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#a8935d";
    for (let i = 0; i < 5; i += 1) {
      ctx.beginPath();
      ctx.arc(-8 + i * 4, -1 + (i % 2) * 3, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    ctx.strokeStyle = "#8a5b2f";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-10, 7);
    ctx.lineTo(10, -7);
    ctx.moveTo(-8, -5);
    ctx.lineTo(12, 6);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, resource.radius + 7, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * remain);
  ctx.stroke();
  ctx.restore();
}

function drawLarva(larva) {
  if (!isVisible(larva.x, larva.y, larva.radius + 12)) return;
  const player = larva.team === "player";
  const progress = clamp(larva.progress / larva.hatchTime, 0, 1);
  ctx.save();
  ctx.translate(larva.x, larva.y);
  ctx.rotate((larva.id % 10) * 0.18);
  ctx.fillStyle =
    larva.type === "queen"
      ? player
        ? "#f4dfa0"
        : "#c2a5ff"
      : larva.type === "fighter"
        ? player
          ? "#8b5a35"
          : "#6e5368"
        : player
          ? "#f1d28c"
          : "#c8c0f0";
  ctx.beginPath();
  ctx.ellipse(0, 0, larva.radius * 1.55, larva.radius, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
  for (let i = -1; i <= 1; i += 1) {
    ctx.beginPath();
    ctx.arc(i * larva.radius * 0.55, -larva.radius * 0.15, larva.radius * 0.16, 0, Math.PI * 2);
    ctx.fill();
  }
  if (larva.feedPulse > 0) {
    ctx.strokeStyle = "rgba(255, 242, 202, 0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, larva.radius + 4 + larva.feedPulse * 4, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  ctx.strokeStyle = player ? "#f3d06b" : "#aabfff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(larva.x, larva.y, larva.radius + 6, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
  ctx.stroke();
}

function drawUnit(unit) {
  if (!isVisible(unit.x, unit.y, unit.radius + 28)) return;
  const player = unit.team === "player";
  const color =
    unit.type === "queen"
      ? player
        ? "#f4dfa0"
        : "#c2a5ff"
      : unit.type === "fighter"
        ? player
          ? "#7a4a27"
          : "#6b5040"
        : player
          ? "#e7b65d"
          : "#87b9d6";

  const target = unit.target || getUnit(unit.targetId);
  const rotation = target ? angleTo(unit.x, unit.y, target.x, target.y) : (unit.id % 12) * 0.52;
  ctx.save();
  ctx.translate(unit.x, unit.y);
  ctx.rotate(rotation);

  if (unit.selected) {
    ctx.strokeStyle = "#84f1ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, unit.radius + 8, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.strokeStyle = player ? "#442915" : "#23324d";
  ctx.lineWidth = unit.type === "queen" ? 3 : 2;
  ctx.lineCap = "round";
  for (let i = -1; i <= 1; i += 1) {
    ctx.beginPath();
    ctx.moveTo(-unit.radius * 0.2, i * unit.radius * 0.38);
    ctx.lineTo(-unit.radius * 1.15, i * unit.radius * 0.76);
    ctx.moveTo(unit.radius * 0.2, i * unit.radius * 0.38);
    ctx.lineTo(unit.radius * 1.15, i * unit.radius * 0.76);
    ctx.stroke();
  }

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(-unit.radius * 0.78, 0, unit.radius * 0.75, unit.radius * 0.58, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(0, 0, unit.radius * 0.72, unit.radius * 0.52, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(unit.radius * 0.78, 0, unit.radius * 0.58, unit.radius * 0.48, 0, 0, Math.PI * 2);
  ctx.fill();

  if (unit.type === "fighter") {
    ctx.strokeStyle = player ? "#ffca72" : "#cce0ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(unit.radius * 1.1, -3);
    ctx.lineTo(unit.radius * 1.65, -8);
    ctx.moveTo(unit.radius * 1.1, 3);
    ctx.lineTo(unit.radius * 1.65, 8);
    ctx.stroke();
  }

  if (unit.type === "queen") {
    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    ctx.beginPath();
    ctx.ellipse(-unit.radius * 0.25, -unit.radius * 0.5, unit.radius * 0.54, unit.radius * 0.24, -0.35, 0, Math.PI * 2);
    ctx.ellipse(-unit.radius * 0.25, unit.radius * 0.5, unit.radius * 0.54, unit.radius * 0.24, 0.35, 0, Math.PI * 2);
    ctx.fill();
  }

  if (unit.carryAmount > 0) {
    ctx.fillStyle = unit.carryKind === "protein" ? "#f3d06b" : unit.carryKind === "sand" ? "#d2be83" : "#9a6534";
    ctx.beginPath();
    ctx.arc(-unit.radius * 1.45, -unit.radius * 0.5, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();

  if (unit.hp < unit.maxHp) {
    const width = unit.radius * 2.5;
    const x = unit.x - width / 2;
    const y = unit.y - unit.radius - 15;
    ctx.fillStyle = "rgba(0, 0, 0, 0.58)";
    ctx.fillRect(x, y, width, 4);
    ctx.fillStyle = unit.team === "player" ? "#8fd078" : "#e06a54";
    ctx.fillRect(x, y, width * clamp(unit.hp / unit.maxHp, 0, 1), 4);
  }

  if (unit.state === "feeding_larvae" || unit.state === "serving_queen" || unit.state === "building" || unit.state === "digging") {
    ctx.fillStyle = "rgba(255, 242, 202, 0.86)";
    ctx.beginPath();
    ctx.arc(unit.x, unit.y - unit.radius - 8, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawTunnel(tunnel) {
  ctx.save();
  ctx.strokeStyle = tunnel.active ? "rgba(214, 174, 96, 0.42)" : "rgba(142, 105, 58, 0.72)";
  ctx.lineWidth = tunnel.active ? 4 : 7;
  ctx.setLineDash(tunnel.active ? [12, 10] : []);
  ctx.beginPath();
  ctx.moveTo(tunnel.x1, tunnel.y1);
  ctx.lineTo(tunnel.x2, tunnel.y2);
  ctx.stroke();
  if (tunnel.active) {
    const progress = clamp(tunnel.progress / tunnel.required, 0, 1);
    ctx.setLineDash([]);
    ctx.strokeStyle = "#f0ca73";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(tunnel.x1, tunnel.y1);
    ctx.lineTo(tunnel.x1 + (tunnel.x2 - tunnel.x1) * progress, tunnel.y1 + (tunnel.y2 - tunnel.y1) * progress);
    ctx.stroke();
  }
  if (selectedTunnelId === tunnel.id) {
    ctx.setLineDash([]);
    ctx.strokeStyle = "#84f1ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(tunnel.x2, tunnel.y2, 24, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (tunnel.active && tunnel.team === "player") {
    const midX = (tunnel.x1 + tunnel.x2) / 2;
    const midY = (tunnel.y1 + tunnel.y2) / 2;
    if (isVisible(midX, midY, 90)) {
      const progress = Math.floor((tunnel.progress / tunnel.required) * 100);
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(12, 15, 13, 0.78)";
      ctx.strokeStyle = "rgba(242, 234, 210, 0.24)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(midX - 76, midY - 25, 152, 42, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#f2ead2";
      ctx.font = "700 11px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(t("tunnelWorkersProgress", { progress, workers: tunnelWorkerCount(tunnel) }), midX, midY - 8);
      ctx.fillStyle = "#e4bd63";
      ctx.font = "650 10px system-ui, sans-serif";
      ctx.fillText(tunnelCostText(tunnel.cost), midX, midY + 7);
    }
  }
  ctx.restore();
}

function drawTunnelPlacementPreview() {
  if (!game.tunnelMode) return;
  const worker = selectedUnits().find((unit) => unit.type === "worker");
  if (!worker) return;
  const start = nearestAnthill("player", worker.x, worker.y);
  if (!start) return;
  const targetX = clamp(game.mouse.worldX, 140, WORLD.width - 140);
  const targetY = clamp(game.mouse.worldY, 140, WORLD.height - 140);
  const cost = tunnelCostForDistance(dist(start.x, start.y, targetX, targetY));
  ctx.save();
  ctx.strokeStyle = canPayTunnel("player", cost) ? "rgba(132, 241, 255, 0.8)" : "rgba(224, 106, 84, 0.82)";
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 8]);
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(targetX, targetY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(12, 15, 13, 0.82)";
  ctx.strokeStyle = "rgba(242, 234, 210, 0.25)";
  ctx.beginPath();
  ctx.roundRect(targetX - 82, targetY - 40, 164, 36, 6);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = canPayTunnel("player", cost) ? "#f2ead2" : "#e06a54";
  ctx.font = "700 11px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(tunnelCostText(cost), targetX, targetY - 18);
  ctx.restore();
}

function drawRallyPoint() {
  const rally = colonies.player.rallyPoint;
  if (!rally || !isVisible(rally.x, rally.y, 28)) return;
  ctx.save();
  ctx.translate(rally.x, rally.y);
  ctx.strokeStyle = game.rallyMode ? "#84f1ff" : "#f3d06b";
  ctx.fillStyle = "rgba(243, 208, 107, 0.16)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -22);
  ctx.lineTo(0, 10);
  ctx.moveTo(0, -22);
  ctx.lineTo(14, -15);
  ctx.lineTo(0, -8);
  ctx.stroke();
  ctx.restore();
}

function drawAttackMarkers() {
  for (const marker of attackMarkers) {
    if (!isVisible(marker.x, marker.y, 34)) continue;
    const fade = clamp((marker.life - marker.age) / 1.2, 0, 1);
    const pulse = Math.sin(marker.age * 8) * 1.8;
    ctx.save();
    ctx.globalAlpha = Math.min(1, fade);
    ctx.translate(marker.x, marker.y);
    ctx.fillStyle = "rgba(224, 106, 84, 0.14)";
    ctx.strokeStyle = "#ffcf72";
    ctx.lineWidth = 2.4;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.arc(0, 0, 20 + pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = "#e06a54";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-12, -12);
    ctx.lineTo(12, 12);
    ctx.moveTo(12, -12);
    ctx.lineTo(-12, 12);
    ctx.stroke();
    ctx.fillStyle = "#ffcf72";
    ctx.beginPath();
    ctx.moveTo(0, -25);
    ctx.lineTo(6, -14);
    ctx.lineTo(-6, -14);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

function drawFloatingText() {
  ctx.save();
  ctx.font = "700 13px system-ui, sans-serif";
  ctx.textAlign = "center";
  for (const item of floatingText) {
    const alpha = 1 - item.age / item.life;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = item.color;
    ctx.fillText(item.text, item.x, item.y);
  }
  ctx.restore();
}

function drawSelectionRect() {
  if (!game.mouse.down || !game.mouse.drag) return;
  const x = Math.min(game.mouse.startX, game.mouse.x);
  const y = Math.min(game.mouse.startY, game.mouse.y);
  const width = Math.abs(game.mouse.startX - game.mouse.x);
  const height = Math.abs(game.mouse.startY - game.mouse.y);
  ctx.save();
  ctx.setTransform(VIEW.dpr, 0, 0, VIEW.dpr, 0, 0);
  ctx.strokeStyle = "#85f4ff";
  ctx.fillStyle = "rgba(133, 244, 255, 0.12)";
  ctx.lineWidth = 1.5;
  ctx.fillRect(x, y, width, height);
  ctx.strokeRect(x, y, width, height);
  ctx.restore();
}

function drawMinimap() {
  const width = 180;
  const height = Math.round(width * (WORLD.height / WORLD.width));
  const x = 14;
  const y = 78;
  ctx.save();
  ctx.setTransform(VIEW.dpr, 0, 0, VIEW.dpr, 0, 0);
  ctx.fillStyle = "rgba(10, 15, 12, 0.72)";
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = "rgba(232, 222, 188, 0.25)";
  ctx.strokeRect(x, y, width, height);
  const sx = width / WORLD.width;
  const sy = height / WORLD.height;
  for (const hill of anthills) {
    ctx.fillStyle = hill.team === "player" ? "#f3d06b" : "#8bb8ff";
    ctx.beginPath();
    ctx.arc(x + hill.x * sx, y + hill.y * sy, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  for (const unit of units) {
    ctx.fillStyle = unit.team === "player" ? "#f0c35e" : "#93b5ff";
    ctx.fillRect(x + unit.x * sx - 1, y + unit.y * sy - 1, 2, 2);
  }
  ctx.strokeStyle = "#f2ead2";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + game.camera.x * sx, y + game.camera.y * sy, VIEW.width * sx, VIEW.height * sy);
  ctx.restore();
}

function drawGameStatus() {
  if (game.status === "playing") return;
  ctx.save();
  ctx.setTransform(VIEW.dpr, 0, 0, VIEW.dpr, 0, 0);
  ctx.fillStyle = "rgba(4, 6, 5, 0.55)";
  ctx.fillRect(0, 0, VIEW.width, VIEW.height);
  ctx.fillStyle = game.status === "won" ? "#f3d06b" : "#e06a54";
  ctx.font = "900 42px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(game.status === "won" ? t("victory") : t("colonyLost"), VIEW.width / 2, VIEW.height / 2 - 18);
  ctx.fillStyle = "#f2ead2";
  ctx.font = "700 18px system-ui, sans-serif";
  ctx.fillText(game.statusMessage, VIEW.width / 2, VIEW.height / 2 + 20);
  ctx.restore();
}

function render() {
  ctx.setTransform(VIEW.dpr, 0, 0, VIEW.dpr, 0, 0);
  ctx.clearRect(0, 0, VIEW.width, VIEW.height);
  ctx.save();
  ctx.translate(-game.camera.x, -game.camera.y);
  drawTerrain();
  for (const tunnel of tunnels) drawTunnel(tunnel);
  drawTunnelPlacementPreview();
  for (const hill of anthills) drawAnthill(hill);
  for (const larva of larvae) drawLarva(larva);
  drawRallyPoint();
  for (const resource of resources) drawResource(resource);
  const orderedUnits = [...units].sort((a, b) => a.y - b.y);
  for (const unit of orderedUnits) drawUnit(unit);
  drawAttackMarkers();
  drawFloatingText();
  ctx.restore();
  drawSelectionRect();
  drawMinimap();
  drawGameStatus();
}

function formatAmount(value) {
  return Math.floor(value).toString();
}

function formatCostAmount(value) {
  if (value >= 1) return Math.floor(value).toString();
  return value.toFixed(1).replace(/\.0$/, "");
}

function resourceLabel(kind) {
  if (kind === "sand") return t("resourceSand");
  if (kind === "sticks") return t("resourceSticks");
  return t("resourceProtein");
}

function unitTypeLabel(type, count) {
  if (type === "fighter") return count === 1 ? t("unitGuardOne") : t("unitGuardMany");
  if (type === "queen") return count === 1 ? t("unitQueenOne") : t("unitQueenMany");
  return count === 1 ? t("unitWorkerOne") : t("unitWorkerMany");
}

function orderLabel(state) {
  const keysByState = {
    idle: "orderIdle",
    moving: "orderMoving",
    attack_move: "orderAttackMove",
    gathering: "orderGathering",
    returning: "orderReturning",
    building: "orderBuilding",
    feeding_larvae: "orderFeedingLarvae",
    serving_queen: "orderServingQueen",
    digging: "orderDigging",
    attacking: "orderAttacking",
  };
  return keysByState[state] ? t(keysByState[state]) : state.replaceAll("_", " ");
}

function appendSelectionText(text) {
  const line = document.createElement("div");
  line.className = "selection-text";
  line.textContent = text;
  ui.selectionDetail.appendChild(line);
}

function appendIdleWorkerButton() {
  const idleWorkers = units.filter((unit) => unit.team === "player" && unit.type === "worker" && unit.hp > 0 && unit.state === "idle");
  if (!idleWorkers.length) return;
  const row = document.createElement("div");
  row.className = "selection-type-buttons";
  const chip = document.createElement("button");
  chip.type = "button";
  chip.className = "selection-chip";
  chip.textContent = t("selectIdleWorkers", { count: idleWorkers.length });
  activateButtonOnPointerDown(chip, selectIdleWorkers);
  row.appendChild(chip);
  ui.selectionDetail.appendChild(row);
}

function selectOnlySelectedType(type) {
  for (const unitId of [...selectedIds]) {
    const unit = getUnit(unitId);
    if (!unit || unit.type !== type) selectedIds.delete(unitId);
  }
  clearObjectSelection();
  updateSelectionFlags();
  renderHud();
  renderActions();
}

function selectIdleWorkers() {
  clearSelection();
  for (const unit of units) {
    if (unit.team === "player" && unit.type === "worker" && unit.hp > 0 && unit.state === "idle") {
      selectedIds.add(unit.id);
    }
  }
  updateSelectionFlags();
  renderHud();
  renderActions();
  if (selectedIds.size) announce("selectedIdleWorkers", { count: selectedIds.size });
}

function renderSelectionPanel() {
  const selection = selectedUnits();
  const tunnel = selectedTunnel();
  const hill = selectedHill();
  ui.selectionDetail.innerHTML = "";

  if (tunnel) {
    const progress = Math.floor((tunnel.progress / tunnel.required) * 100);
    ui.selectionSummary.textContent = tunnel.active ? t("tunnelBuilding") : t("tunnelComplete");
    appendSelectionText(t("tunnelProgressDetail", { progress, assigned: tunnelWorkerCount(tunnel), working: tunnelActiveWorkerCount(tunnel) }));
    appendSelectionText(t("costPaid", { cost: tunnelCostText(tunnel.cost) }));
    appendIdleWorkerButton();
    return;
  }

  if (hill) {
    const queen = queenForAnthill(hill);
    const pendingQueen = anthillHasQueenLarva(hill);
    ui.selectionSummary.textContent = t("anthillSummary", { level: hill.level });
    appendSelectionText(`${countLarvae(hill.team, null, hill.id)}/${anthillLarvaeCapacity(hill)} ${t("larvae").toLowerCase()}`);
    appendSelectionText(t("proteinStore", { current: formatAmount(getColony(hill.team).protein), capacity: proteinStorageCapacity(hill) }));
    appendSelectionText(queen ? t("queenCells", { count: queenPreparedCells(queen) }) : pendingQueen ? t("queenGrowing") : t("noQueen"));
    appendIdleWorkerButton();
    return;
  }

  if (!selection.length) {
    ui.selectionSummary.textContent = t("zeroUnits");
    appendSelectionText(t("enemyQueenStatus", { status: colonyHasLivingQueen("enemy") ? t("alive").toLowerCase() : t("dead").toLowerCase() }));
    appendIdleWorkerButton();
    return;
  }

  const typeCounts = [
    ["queen", selection.filter((unit) => unit.type === "queen").length],
    ["worker", selection.filter((unit) => unit.type === "worker").length],
    ["fighter", selection.filter((unit) => unit.type === "fighter").length],
  ].filter(([, count]) => count > 0);

  ui.selectionSummary.textContent = t("selectedCount", { count: selection.length });
  const row = document.createElement("div");
  row.className = "selection-type-buttons";
  const activeType = typeCounts.length === 1 ? typeCounts[0][0] : null;
  for (const [type, count] of typeCounts) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `selection-chip${activeType === type ? " active" : ""}`;
    chip.textContent = `${count} ${unitTypeLabel(type, count)}`;
    activateButtonOnPointerDown(chip, () => selectOnlySelectedType(type));
    row.appendChild(chip);
  }
  ui.selectionDetail.appendChild(row);

  const carrying = selection
    .filter((unit) => unit.carryAmount > 0)
    .map((unit) => `${unit.carryAmount} ${resourceLabel(unit.carryKind)}`)
    .join(", ");
  const orders = [...new Set(selection.map((unit) => orderLabel(unit.state)))].slice(0, 3).join(", ");
  appendSelectionText(`${orders ? t("ordersPrefix", { orders }) : t("idleOrders")}${carrying ? ` | ${t("carrying", { items: carrying })}` : ""}`);
  const selectedQueen = selection.find((unit) => unit.type === "queen");
  if (selectedQueen) appendSelectionText(t("queenCells", { count: queenPreparedCells(selectedQueen) }));
  appendIdleWorkerButton();
}

function renderHud() {
  const player = colonies.player;
  ui.protein.textContent = formatAmount(player.protein);
  ui.sand.textContent = formatAmount(player.sand);
  ui.sticks.textContent = formatAmount(player.sticks);
  ui.workers.textContent = countUnits("player", "worker").toString();
  ui.fighters.textContent = countUnits("player", "fighter").toString();
  ui.larvae.textContent = `${countLarvae("player")}/${colonyLarvaeCapacity("player")}`;
  const queens = liveQueens("player").length;
  ui.queenStatus.textContent = queens > 1 ? t("queenAliveCount", { count: queens }) : queens === 1 ? t("alive") : t("dead");
  ui.queenStatus.className = queens > 0 ? "good" : "danger";
  renderSelectionPanel();
}

function activateButtonOnPointerDown(element, onClick) {
  let activatedByPointer = false;
  element.addEventListener("pointerdown", (event) => {
    if (element.disabled) return;
    activatedByPointer = true;
    event.preventDefault();
    event.stopPropagation();
    onClick();
  });
  element.addEventListener("click", () => {
    if (activatedByPointer) {
      activatedByPointer = false;
      return;
    }
    onClick();
  });
}

function button(label, cost, disabled, onClick) {
  const element = document.createElement("button");
  element.className = "action-button";
  element.type = "button";
  element.disabled = Boolean(disabled) || game.status !== "playing";
  element.innerHTML = cost ? `${label}<span class="cost">${cost}</span>` : label;
  activateButtonOnPointerDown(element, onClick);
  return element;
}

function currentActionContextSignature(selection, tunnel, hill) {
  return JSON.stringify({
    selectedIds: selection.map((unit) => unit.id).sort((a, b) => a - b),
    tunnelId: tunnel?.id ?? null,
    hillId: hill?.id ?? null,
  });
}

function renderActions() {
  const selection = selectedUnits();
  const player = colonies.player;
  const hasQueen = selection.some((unit) => unit.type === "queen");
  const workers = selection.filter((unit) => unit.type === "worker");
  const fighters = selection.filter((unit) => unit.type === "fighter");
  const selectedQueen = primaryQueenForSelection();
  const queenHill = selectedQueen ? queenHomeHill("player", selectedQueen) : queenHomeHill("player");
  const queenHillLarvae = queenHill ? countLarvae("player", null, queenHill.id) : 0;
  const queenHillCapacity = anthillLarvaeCapacity(queenHill);
  const queenHillHasRoom = queenHillCapacity - queenHillLarvae >= LARVAE_LAY_COUNT;
  const queenCells = selectedQueen ? queenPreparedCells(selectedQueen) : 0;
  const layCost = queenHill
    ? t("layCost", {
        protein: formatCostAmount(LARVA_LAY_PROTEIN_COST),
        cells: LARVAE_LAY_COUNT,
        prepared: queenCells,
        larvae: queenHillLarvae,
        capacity: queenHillCapacity,
      })
    : t("noAnthill");
  const tunnel = selectedTunnel();
  const hill = selectedHill();
  const activeTunnel = tunnels.find((candidate) => candidate.team === "player" && candidate.active);
  const actions = [];

  function addAction(label, cost, disabled, onClick) {
    actions.push({ label, cost, disabled, onClick });
  }

  if (tunnel && !selection.length) {
    const progress = t("tunnelProgressCost", { progress: Math.floor((tunnel.progress / tunnel.required) * 100), workers: tunnelWorkerCount(tunnel) });
    addAction(tunnel.active ? t("actionTunnelBuilding") : t("actionTunnelComplete"), progress, true, () => {});
    addAction(t("actionCancelTunnel"), "Esc", !tunnel.active, () => cancelTunnel(tunnel));
  } else if (hill && !selection.length) {
    const hasHillQueen = anthillHasQueen(hill);
    const pendingQueen = anthillHasQueenLarva(hill);
    addAction(
      t("actionRaiseQueen"),
      t("slowGrowthCost", { cost: QUEEN_COST }),
      hill.team !== "player" || hasHillQueen || pendingQueen || player.protein < QUEEN_COST,
      () => commandRaiseQueen(hill),
    );
  } else if (!selection.length) {
    addAction(t("actionNoSelection"), "", true, () => {});
  } else {
    if (hasQueen) {
      addAction(t("actionLayWorker"), layCost, player.protein < LARVA_LAY_PROTEIN_COST || queenCells < LARVAE_LAY_COUNT || !queenHillHasRoom, () =>
        layLarvae("player", "worker", { queenId: selectedQueen.id }),
      );
      addAction(t("actionLayGuard"), layCost, player.protein < LARVA_LAY_PROTEIN_COST || queenCells < LARVAE_LAY_COUNT || !queenHillHasRoom, () =>
        layLarvae("player", "fighter", { queenId: selectedQueen.id }),
      );
      addAction(game.rallyMode ? t("actionSettingRally") : t("actionSetRally"), t("costRClick"), false, () => commandSetRallyMode());
    }

    if (workers.length) {
      addAction(t("actionGatherFood"), t("costProteinSources"), false, () => commandGatherNearest("protein"));
      addAction(t("actionGatherMaterials"), t("costSandSticks"), false, () => commandGatherMaterials());
      addAction(t("actionReturn"), t("costDepositResources"), false, () => commandReturn(selectedUnits()));
      addAction(
        t("actionGrowAnthill"),
        t("growAnthillCost", { sand: BUILD_COST.sand, sticks: BUILD_COST.sticks, larvae: LARVAE_BATCH_SIZE }),
        player.sand < BUILD_COST.sand || player.sticks < BUILD_COST.sticks,
        () => commandBuild(),
      );
      addAction(t("actionServeQueen"), t("costProteinPerCell"), false, () => commandServeQueen());
      addAction(t("actionFeedLarvae"), t("costConsumesProtein"), false, () => commandFeedLarvae());
      addAction(game.tunnelMode ? t("actionPlacingTunnel") : t("actionBuildTunnel"), t("tunnelScreenCost"), false, () => commandSetTunnelMode());
      if (activeTunnel) {
        addAction(t("actionJoinTunnel"), t("assigned", { count: tunnelWorkerCount(activeTunnel) }), false, () => commandAttachNearestTunnel());
      }
    }

    addAction(game.attackMoveMode ? t("actionAttackMoveActive") : t("actionAttackMove"), t("costAClick"), false, () => commandSetAttackMoveMode());

    if (workers.length || fighters.length) {
      addAction(t("actionAttackNearest"), t("costCombatOrder"), false, () => commandAttackNearest());
      addAction(t("actionDefend"), t("costGuardAnthill"), false, () => commandDefend());
    }
    addAction(t("actionStop"), t("costClearOrders"), false, () => commandStop());
  }

  const signature = JSON.stringify(
    [
      currentActionContextSignature(selection, tunnel, hill),
      actions.map((action) => [action.label, action.cost, Boolean(action.disabled), game.status, game.rallyMode, game.tunnelMode, game.attackMoveMode]),
    ],
  );
  if (signature === game.actionSignature) return;
  game.actionSignature = signature;
  ui.actionButtons.innerHTML = "";

  for (const action of actions) {
    ui.actionButtons.appendChild(button(action.label, action.cost, action.disabled, action.onClick));
  }
}

function tick(timestamp) {
  if (!game.lastFrame) game.lastFrame = timestamp;
  const dt = Math.min(0.05, (timestamp - game.lastFrame) / 1000);
  game.lastFrame = timestamp;
  game.uiTimer += dt;
  updateGame(dt);
  if (game.uiTimer >= 0.18) {
    game.uiTimer = 0;
    renderHud();
    renderActions();
  }
  render();
  requestAnimationFrame(tick);
}

canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

canvas.addEventListener("mousedown", (event) => {
  const point = screenToWorld(event.clientX, event.clientY);
  game.mouse.x = point.screenX;
  game.mouse.y = point.screenY;
  game.mouse.worldX = point.worldX;
  game.mouse.worldY = point.worldY;
  game.mouse.inside = true;
  if (event.button === 2) {
    event.preventDefault();
    issueContextCommand(point.worldX, point.worldY);
    return;
  }
  if (event.button !== 0) return;
  game.mouse.down = true;
  game.mouse.drag = false;
  game.mouse.startX = point.screenX;
  game.mouse.startY = point.screenY;
  game.mouse.startWorldX = point.worldX;
  game.mouse.startWorldY = point.worldY;
});

canvas.addEventListener("mousemove", (event) => {
  const point = screenToWorld(event.clientX, event.clientY);
  game.mouse.x = point.screenX;
  game.mouse.y = point.screenY;
  game.mouse.worldX = point.worldX;
  game.mouse.worldY = point.worldY;
  game.mouse.inside = true;
  if (game.mouse.down && Math.hypot(game.mouse.x - game.mouse.startX, game.mouse.y - game.mouse.startY) > 5) {
    game.mouse.drag = true;
  }
});

canvas.addEventListener("mouseup", (event) => {
  if (event.button !== 0 || !game.mouse.down) return;
  const additive = event.shiftKey;
  if (game.rallyMode && !game.mouse.drag) {
    setQueenRallyPoint(game.mouse.worldX, game.mouse.worldY);
  } else if (game.tunnelMode && !game.mouse.drag) {
    placeTunnel(game.mouse.worldX, game.mouse.worldY);
  } else if (game.attackMoveMode && !game.mouse.drag) {
    commandAttackMove(selectedUnits(), game.mouse.worldX, game.mouse.worldY);
  } else if (game.mouse.drag) {
    selectBox(game.mouse.startX, game.mouse.startY, game.mouse.x, game.mouse.y, additive);
  } else {
    selectSingle(game.mouse.worldX, game.mouse.worldY, additive);
  }
  game.mouse.down = false;
  game.mouse.drag = false;
});

canvas.addEventListener("dblclick", (event) => {
  if (event.button !== 0 || game.status !== "playing") return;
  const point = screenToWorld(event.clientX, event.clientY);
  game.mouse.x = point.screenX;
  game.mouse.y = point.screenY;
  game.mouse.worldX = point.worldX;
  game.mouse.worldY = point.worldY;
  selectSameTypeOnScreen(point.worldX, point.worldY);
});

canvas.addEventListener("mouseleave", () => {
  game.mouse.inside = false;
  game.mouse.down = false;
  game.mouse.drag = false;
});

window.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    if (game.rallyMode) {
      game.rallyMode = false;
      announce("rallyCancelled");
      renderActions();
      event.preventDefault();
      return;
    }
    if (game.tunnelMode) {
      game.tunnelMode = false;
      announce("tunnelPlacementCancelled");
      renderActions();
      event.preventDefault();
      return;
    }
    if (game.attackMoveMode) {
      game.attackMoveMode = false;
      announce("attackMoveCancelled");
      renderActions();
      event.preventDefault();
      return;
    }
    const tunnel = selectedTunnel();
    if (tunnel && tunnel.active) {
      cancelTunnel(tunnel);
      event.preventDefault();
      return;
    }
  }
  if (event.code === "KeyR" && selectedUnits().some((unit) => unit.type === "queen")) {
    commandSetRallyMode();
    event.preventDefault();
    return;
  }
  if (event.code === "KeyA" && selectedUnits().length) {
    commandSetAttackMoveMode();
    event.preventDefault();
    return;
  }
  if (event.code === "KeyT" && selectedUnits().some((unit) => unit.type === "worker")) {
    commandSetTunnelMode();
    event.preventDefault();
    return;
  }
  keys.add(event.code);
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.code);
});

window.addEventListener("resize", resizeCanvas);

if (ui.languageSelect) {
  ui.languageSelect.value = currentLanguage;
  ui.languageSelect.addEventListener("change", (event) => {
    setLanguage(event.target.value);
  });
}

applyStaticTranslations();
resizeCanvas();
setupGame();
renderHud();
renderActions();
requestAnimationFrame(tick);

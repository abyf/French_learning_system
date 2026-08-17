// ============================================================
// Programme hebdomadaire guidé.
//
// Rythme : 2 nouvelles étapes par semaine de contenu, avec un
// jour de révision immédiat pour chacune, puis 2 jours de
// révision approfondie (cas similaires plus poussés), et un
// bilan le 7e jour. Cette même paire d'étapes est ensuite
// entièrement revue une semaine plus tard (semaine de
// consolidation), pour un espacement d'environ une semaine
// entre deux passages sur le même contenu.
//
// Semaine de contenu (introduit les étapes A puis B) :
//   Jour 1 : nouveau contenu — étape A
//   Jour 2 : révision de l'étape A
//   Jour 3 : nouveau contenu — étape B
//   Jour 4 : révision de l'étape B
//   Jour 5 : révision approfondie de l'étape A (cas similaires)
//   Jour 6 : révision approfondie de l'étape B (cas similaires)
//   Jour 7 : bilan de la semaine (étapes A + B)
//
// Semaine de consolidation (mêmes étapes A et B, une semaine
// plus tard, sans rien de nouveau) :
//   Jour 1 : révision de l'étape A
//   Jour 2 : révision approfondie de l'étape A
//   Jour 3 : révision de l'étape B
//   Jour 4 : révision approfondie de l'étape B
//   Jour 5 : révision approfondie de l'étape A
//   Jour 6 : révision approfondie de l'étape B
//   Jour 7 : bilan de la semaine (étapes A + B)
//
// Avec 30 étapes (15 paires), cela donne 15 semaines de contenu
// + 15 semaines de consolidation = 30 semaines (~210 jours,
// soit environ 6,9 mois) — au-delà du minimum de 6 mois demandé,
// avec un espacement régulier plutôt qu'une longue traîne de
// révision tout à la fin.
//
// La révision approfondie réutilise des mécaniques déjà
// existantes pour varier les angles de pratique plutôt que de
// simplement répéter à l'identique :
//   - Grammaire : conjugaison (si le point a un tableau de
//     conjugaison) ou construction de phrases (sinon), au lieu
//     de relire la même explication.
//   - Lecture : mode écoute (texte caché) au lieu du mode lecture.
//   - Vocabulaire, dictée, phrase, parler : nouvelle tentative
//     (répétition espacée), toujours utile même sans contenu
//     nouveau.
//
// Un exercice Parler s'ajoute à partir de la 2e paire d'étapes
// (la toute première paire — alphabet, salutations — est jugée
// trop précoce pour de la production orale).
// ============================================================

const STAGES_PER_PAIR = 2;
const SPEAKING_FROM_PAIR_INDEX = 1; // 0-indexé : exclut seulement la 1re paire

function flattenPhrasebook() {
  return PHRASEBOOK.flatMap(cat => cat.phrases.map(p => ({ ...p, category: cat.category, categoryJa: cat.categoryJa })));
}

const PHRASEBOOK_FLAT = flattenPhrasebook();

function stepsForStage(mode, stageId, phraseIndex, includeSpeaking) {
  const steps = [
    { kind: 'vocab', stageId, mode: mode === 'new' ? 'new' : 'quiz' },
    { kind: 'grammar', stageId, mode },
    { kind: 'reading', stageId, mode },
    { kind: 'dictation', stageId, mode },
    { kind: 'phrase', phraseIndex, mode }
  ];
  if (includeSpeaking) steps.push({ kind: 'speaking', phraseIndex, mode });
  return steps;
}

function testStepsForPair(stageInfos) {
  const steps = [];
  stageInfos.forEach(info => {
    steps.push({ kind: 'vocab', stageId: info.stageId, mode: 'test' });
    steps.push({ kind: 'grammar', stageId: info.stageId, mode: 'test' });
    steps.push({ kind: 'reading', stageId: info.stageId, mode: 'test' });
    steps.push({ kind: 'dictation', stageId: info.stageId, mode: 'test' });
  });
  stageInfos.forEach(info => {
    steps.push({ kind: 'phrase', phraseIndex: info.phraseIndex, mode: 'test' });
    if (info.includeSpeaking) steps.push({ kind: 'speaking', phraseIndex: info.phraseIndex, mode: 'test' });
  });
  return steps;
}

function pushWeek(days, weekMeta, weekNumber, weekKind, objectiveFr, objectiveJa, includeSpeaking, dayDefs, globalDayRef) {
  weekMeta[weekNumber] = { objectiveFr, objectiveJa, includeSpeaking, weekKind };
  dayDefs.forEach((def, i) => {
    const stageForObjective = def.stageId ? CURRICULUM.find(s => s.id === def.stageId) : null;
    days.push({
      day: globalDayRef.value++,
      week: weekNumber,
      dayInWeek: i + 1,
      dayType: def.dayType,
      stageId: def.stageId,
      objectiveFr: stageForObjective ? stageForObjective.titleFr : objectiveFr,
      objectiveJa: stageForObjective ? stageForObjective.titleJa : objectiveJa,
      steps: def.steps
    });
  });
}

function buildDailyPlan() {
  const days = [];
  const weekMeta = {};
  const globalDayRef = { value: 0 };
  let globalWeek = 0;
  let phraseCursor = 0;

  for (let pairIndex = 0; pairIndex * STAGES_PER_PAIR < CURRICULUM.length; pairIndex++) {
    const pairStages = CURRICULUM.slice(pairIndex * STAGES_PER_PAIR, pairIndex * STAGES_PER_PAIR + STAGES_PER_PAIR);
    if (pairStages.length === 0) break;
    const includeSpeaking = pairIndex >= SPEAKING_FROM_PAIR_INDEX;

    const stageInfos = pairStages.map(stage => {
      const phraseIndex = phraseCursor % PHRASEBOOK_FLAT.length;
      phraseCursor++;
      return { stage, stageId: stage.id, phraseIndex, includeSpeaking };
    });
    const [infoA, infoB] = stageInfos;

    const objectiveFr = pairStages.map(s => s.titleFr).join(' · ');
    const objectiveJa = pairStages.map(s => s.titleJa).join(' · ');

    // ---- Semaine de contenu ----
    globalWeek++;
    pushWeek(days, weekMeta, globalWeek, 'content', objectiveFr, objectiveJa, includeSpeaking, [
      { dayType: 'new', stageId: infoA.stageId, steps: stepsForStage('new', infoA.stageId, infoA.phraseIndex, includeSpeaking) },
      { dayType: 'review', stageId: infoA.stageId, steps: stepsForStage('review', infoA.stageId, infoA.phraseIndex, includeSpeaking) },
      { dayType: 'new', stageId: infoB.stageId, steps: stepsForStage('new', infoB.stageId, infoB.phraseIndex, includeSpeaking) },
      { dayType: 'review', stageId: infoB.stageId, steps: stepsForStage('review', infoB.stageId, infoB.phraseIndex, includeSpeaking) },
      { dayType: 'extended', stageId: infoA.stageId, steps: stepsForStage('extended', infoA.stageId, infoA.phraseIndex, includeSpeaking) },
      { dayType: 'extended', stageId: infoB.stageId, steps: stepsForStage('extended', infoB.stageId, infoB.phraseIndex, includeSpeaking) },
      { dayType: 'test', stageId: null, steps: testStepsForPair(stageInfos) }
    ], globalDayRef);

    // ---- Semaine de consolidation (mêmes étapes, 1 semaine plus tard) ----
    globalWeek++;
    pushWeek(days, weekMeta, globalWeek, 'consolidation', objectiveFr, objectiveJa, includeSpeaking, [
      { dayType: 'review', stageId: infoA.stageId, steps: stepsForStage('review', infoA.stageId, infoA.phraseIndex, includeSpeaking) },
      { dayType: 'extended', stageId: infoA.stageId, steps: stepsForStage('extended', infoA.stageId, infoA.phraseIndex, includeSpeaking) },
      { dayType: 'review', stageId: infoB.stageId, steps: stepsForStage('review', infoB.stageId, infoB.phraseIndex, includeSpeaking) },
      { dayType: 'extended', stageId: infoB.stageId, steps: stepsForStage('extended', infoB.stageId, infoB.phraseIndex, includeSpeaking) },
      { dayType: 'extended', stageId: infoA.stageId, steps: stepsForStage('extended', infoA.stageId, infoA.phraseIndex, includeSpeaking) },
      { dayType: 'extended', stageId: infoB.stageId, steps: stepsForStage('extended', infoB.stageId, infoB.phraseIndex, includeSpeaking) },
      { dayType: 'test', stageId: null, steps: testStepsForPair(stageInfos) }
    ], globalDayRef);
  }

  return { days, weekMeta };
}

const _dailyPlanBuild = buildDailyPlan();
const DAILY_PLAN = _dailyPlanBuild.days;
const WEEK_META = _dailyPlanBuild.weekMeta;
const TOTAL_WEEKS = Object.keys(WEEK_META).length;

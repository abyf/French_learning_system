// ============================================================
// Programme quotidien — génère un parcours Jour 0 → fin.
// Règle : le vocabulaire d'une étape est distribué sur plusieurs
// jours (nouveaux mots chaque jour). Une fois tout le vocabulaire
// d'une étape appris, un "jour bilan" débloque pour la première
// fois la grammaire, la lecture et la dictée de cette étape.
// Les jours intermédiaires proposent ces 3 activités en RÉVISION
// de la dernière étape déjà débloquée (ou VERROUILLÉ tout au
// début, tant que l'alphabet n'est pas terminé).
// Ainsi, chaque jour propose toujours les 4 sections, et les
// prérequis sont naturellement placés au début du parcours.
// ============================================================

const WORDS_PER_DAY = 5;

function distributeEvenly(total, parts) {
  const base = Math.floor(total / parts);
  const remainder = total % parts;
  const result = [];
  for (let i = 0; i < parts; i++) {
    result.push(base + (i < remainder ? 1 : 0));
  }
  return result;
}

function buildDailyPlan() {
  const days = [];
  let globalDay = 0;
  let lastUnlockedStage = null; // dernière étape dont grammaire/lecture/dictée sont débloquées

  CURRICULUM.forEach(stage => {
    const words = VOCAB_LESSONS[stage.vocabId].words;
    const vocabDayCount = Math.max(1, Math.ceil(words.length / WORDS_PER_DAY));
    const batchSizes = distributeEvenly(words.length, vocabDayCount);

    let cursor = 0;
    for (let i = 0; i < vocabDayCount; i++) {
      const size = batchSizes[i];
      const wordIndexes = [];
      for (let k = 0; k < size; k++) wordIndexes.push(cursor++);

      days.push({
        day: globalDay++,
        stageId: stage.id,
        stageTitleFr: stage.titleFr,
        stageTitleJa: stage.titleJa,
        dayType: 'vocab',
        vocab: { mode: 'new', wordIndexes, dayInStage: i },
        grammar: lastUnlockedStage ? { status: 'review', stageId: lastUnlockedStage } : { status: 'locked', stageId: null },
        reading: lastUnlockedStage ? { status: 'review', stageId: lastUnlockedStage } : { status: 'locked', stageId: null },
        dictation: lastUnlockedStage ? { status: 'review', stageId: lastUnlockedStage } : { status: 'locked', stageId: null }
      });
    }

    // Jour bilan : débloque grammaire, lecture et dictée de l'étape en cours
    days.push({
      day: globalDay++,
      stageId: stage.id,
      stageTitleFr: stage.titleFr,
      stageTitleJa: stage.titleJa,
      dayType: 'capstone',
      vocab: { mode: 'quiz' },
      grammar: { status: 'new', stageId: stage.id },
      reading: { status: 'new', stageId: stage.id },
      dictation: { status: 'new', stageId: stage.id }
    });

    lastUnlockedStage = stage.id;
  });

  return days;
}

const DAILY_PLAN = buildDailyPlan();

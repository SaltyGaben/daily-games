export interface GuessHistory {
  date: string;
  word: string;
  guessAmount: number;
  win: boolean;
}

export interface GuessStatistics {
  playedGames: number;
  winPercentage: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: Record<number, number>;
}

export const useGameStore = defineStore("games", () => {
  const currentDate = computed(() =>
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const wordQuestGuessCount = useLocalStorage("wordQuestGuessCount", 0);
  const wordQuestGuessList = useLocalStorage<string[]>("wordQuestGuesses", []);
  const wordQuestGuessHistory = useLocalStorage<GuessHistory[]>(
    "wordQuestGuessHistory",
    []
  );
  const wordQuestHasGuessedDailyWord = useLocalStorage(
    "wordQuestHasGuessedDailyWord",
    false
  );

  const incrementWordQuestGuessCount = computed(
    () => wordQuestGuessCount.value++
  );

  const WordQuestGuessEndGame = (word: string, win: boolean) => {
    wordQuestHasGuessedDailyWord.value = true;
    const guessHistory: GuessHistory = {
      date: currentDate.value,
      word: word,
      guessAmount: wordQuestGuessList.value.length,
      win: win,
    };
    wordQuestGuessHistory.value.push(guessHistory);
    wordQuestGuessCount.value = 0;
    wordQuestGuessList.value = [];
  };

  const updatewordQuestGuesses = (guess: string) => {
    wordQuestGuessList.value.push(guess);
  };

  const getWordQuestStatistics = () => {
    const sortedHistory = [...wordQuestGuessHistory.value].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const playedGames = sortedHistory.length;
    const wins = sortedHistory.filter((h) => h.win).length;

    let currentWinStreak = 0;

    for (let i = sortedHistory.length - 1; i >= 0; i--) {
      if (sortedHistory[i]?.win) {
        currentWinStreak++;
      } else {
        break;
      }
    }

    let maxWinStreak = 0;
    let tempStreak = 0;

    for (const game of sortedHistory) {
      if (game.win) {
        tempStreak++;
        maxWinStreak = Math.max(maxWinStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    const guessDistribution: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };

    for (const game of sortedHistory) {
      if (!game.win) continue;

      guessDistribution[game.guessAmount] =
        (guessDistribution[game.guessAmount] ?? 0) + 1;
    }

    const statistics: GuessStatistics = {
      playedGames: playedGames,
      winPercentage: (wins / playedGames) * 100,
      currentStreak: currentWinStreak,
      maxStreak: maxWinStreak,
      guessDistribution: guessDistribution,
    };

    return statistics;
  };

  return {
    wordQuestGuessCount,
    wordQuestGuessList,
    wordQuestHasGuessedDailyWord,
    incrementWordQuestGuessCount,
    updatewordQuestGuesses,
    WordQuestGuessEndGame,
    wordQuestGuessHistory,
    currentDate,
    getWordQuestStatistics,
  };
});

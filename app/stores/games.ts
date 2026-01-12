export const useGameStore = defineStore("games", () => {
  const wordQuestGuessCount = useLocalStorage("wordQuestGuessCount", 0);
  const wordQuestGuessList = useLocalStorage<string[]>("wordQuestGuesses", []);
  const wordQuestHasGuessedDailyWord = useLocalStorage(
    "wordQuestHasGuessedDailyWord",
    false
  );
  const incrementWordQuestGuessCount = computed(
    () => wordQuestGuessCount.value++
  );
  const correctWordQuestGuess = computed(
    () => (wordQuestHasGuessedDailyWord.value = true)
  );
  const updatewordQuestGuesses = (guess: string) => {
    wordQuestGuessList.value.push(guess);
  };

  return {
    wordQuestGuessCount,
    wordQuestGuessList,
    wordQuestHasGuessedDailyWord,
    incrementWordQuestGuessCount,
    updatewordQuestGuesses,
    correctWordQuestGuess,
  };
});

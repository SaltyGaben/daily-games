<script setup lang="ts">
import allowed from '~/assets/words/allowed.json'
import solutions from '~/assets/words/solutions.json'
import { useGameStore } from '~/stores/games'

const gameStore = useGameStore()

const allowedSet = new Set(allowed)

const START_DATE = new Date('2026-01-01')

const animateCell = reactive<{ row: number | null; index: number | null }>({
    row: null,
    index: null,
})

const rowAnimation = reactive<{ row: number | null; type: 'shake' | null }>({
    row: null,
    type: null,
})

const shouldAnimate = (row: number, index: number) => {
    return animateCell.row === row && animateCell.index === index
}

const onCellAnimationEnd = (row: number, index: number) => {
    if (animateCell.row === row && animateCell.index === index) {
        animateCell.row = null
        animateCell.index = null
    }
}

const getDailySolution = (date = new Date()) => {
    const day =
        Math.floor(
            (date.getTime() - START_DATE.getTime()) / 86400000
        )

    return solutions[day % solutions.length]
}

const word = ref(['', '', '', '', ''])

const date = computed(() => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
const guessCount = computed(() => gameStore.wordQuestGuessCount)
const isWordGuessedToday = computed(() => {
    const sortedHistory = [...gameStore.wordQuestGuessHistory].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    const lastGuess = sortedHistory[sortedHistory.length - 1]

    if (lastGuess?.date !== date.value) {
        gameStore.wordQuestHasGuessedDailyWord = false
        return false
    }

    return true
})
const letterMap = ref<Record<string, string>>({})

const removeLetter = () => {
    for (let i = word.value.length - 1; i >= 0; i--) {
        if (word.value[i] !== '') {
            word.value[i] = ''
            break
        }
    }
}

const submitGuess = () => {
    const guessedWord = word.value.join('').toLowerCase()
    const isValid = allowedSet.has(guessedWord)
    const solution = getDailySolution()
    const currentRow = guessCount.value + 1

    if (!isValid) {
        console.log("invalid word: ", guessedWord);

        rowAnimation.row = currentRow
        rowAnimation.type = 'shake'

        setTimeout(() => {
            rowAnimation.row = null
            rowAnimation.type = null
        }, 300)

        return
    }

    word.value = Array(5).fill('', 0)

    gameStore.incrementWordQuestGuessCount
    gameStore.updatewordQuestGuesses(guessedWord)

    if (guessedWord === solution) {
        gameStore.WordQuestGuessEndGame(guessedWord, true)
    } else if (guessCount.value === 6) {
        gameStore.WordQuestGuessEndGame(guessedWord, false)
    }
}

const addLetter = (newLetter: string) => {
    const index = word.value.indexOf('')
    if (index !== -1) {
        word.value[index] = newLetter
    }
    animateCell.row = guessCount.value + 1
    animateCell.index = index
}

const handleKey = (key: string) => {
    if (key === 'Enter') submitGuess()
    else if (key === 'Backspace') removeLetter()
    else addLetter(key.toUpperCase())
}

const getLetters = (index: number) => {
    const guesses = gameStore.wordQuestGuessList

    let newIndex = index - 1

    if (guesses[newIndex]) {
        return guesses[newIndex].toLocaleUpperCase().split('')
    } else {
        return Array(5).fill('', 0)
    }
}

const getBackgroundForWord = (wordIndex: number, letterIndex: number) => {
    let newIndex = wordIndex - 1

    const solution = getDailySolution()?.split('')

    const letter = gameStore.wordQuestGuessList[newIndex]?.split('')[letterIndex]

    if (letter && solution) {
        if (letter === solution[letterIndex]) {
            letterMap.value[letter.toUpperCase()] = 'correct'
            return 'bg-primary'
        } else if (solution.indexOf(letter) !== -1) {
            if (letterMap.value[letter.toUpperCase()] !== 'correct') {
                letterMap.value[letter.toUpperCase()] = 'present'
            }
            return 'bg-yellow-400'
        }
        letterMap.value[letter.toUpperCase()] = 'absent'
    }
    return 'bg-accented'
}


</script>

<template>
    <div v-if="!isWordGuessedToday">
        <div class="text-center my-20">
            <h1 class="text-6xl font-medium">Word Quest</h1>
            <p class="text-sm text-muted">Guess the word of the day in 6 or less guesses!</p>
        </div>
        <div class="flex flex-col items-center gap-2">
            <div class="flex flex-row gap-2" v-for="wordIndex in 6" :key="wordIndex">
                <div v-for="letterIndex in 5" :key="letterIndex"
                    class="h-15 w-15 rounded-lg flex justify-center items-center text-5xl" :class="[
                        wordIndex === guessCount + 1
                            ? 'bg-accented'
                            : getBackgroundForWord(wordIndex, letterIndex - 1),
                        shouldAnimate(wordIndex, letterIndex - 1) ? 'animate-pop' : '',
                        rowAnimation.row === wordIndex && rowAnimation.type === 'shake' ? 'animate-shake' : ''
                    ]" @animationend="onCellAnimationEnd(wordIndex, letterIndex - 1)">
                    <span v-if="wordIndex === guessCount + 1">
                        {{ word[letterIndex - 1] }}
                    </span>
                    <span v-else>
                        {{ getLetters(wordIndex)[letterIndex - 1] }}
                    </span>
                </div>
            </div>
            <div class="mt-8">
                <Keyboard @key="handleKey" :letter-map="letterMap" />
            </div>
        </div>
    </div>
    <div class="h-full flex flex-col justify-center items-center gap-4" v-else>
        <h1 class="text-4xl font-bold">{{ getDailySolution()?.toUpperCase() }}</h1>
        <StatisticsCard />
        <h1>You've completed the guess for {{ date }}</h1>
    </div>
</template>

<style scoped>
@keyframes pop {
    0% {
        transform: scale(0.85);
        opacity: 0.6;
    }

    50% {
        transform: scale(1.12);
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.animate-pop {
    animation: pop 200ms cubic-bezier(.2, .8, .3, 1) both;
    transform-origin: center;
}

@keyframes shake {
    0% {
        transform: translateX(0);
    }

    15% {
        transform: translateX(-8px);
    }

    30% {
        transform: translateX(8px);
    }

    45% {
        transform: translateX(-6px);
    }

    60% {
        transform: translateX(6px);
    }

    75% {
        transform: translateX(-3px);
    }

    100% {
        transform: translateX(0);
    }
}

.animate-shake {
    background: var(--color-red-500);
    animation: shake 300ms cubic-bezier(.36, .07, .19, .97);
}

/* respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {

    .animate-shake,
    .animate-pop {
        animation: none;
        transform: none;
    }
}
</style>
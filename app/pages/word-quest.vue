<script setup lang="ts">
import allowed from '~/assets/words/allowed.json'
import solutions from '~/assets/words/solutions.json'
import { useGameStore } from '~/stores/games'

const gameStore = useGameStore()

const allowedSet = new Set(allowed)

const START_DATE = new Date('2026-01-01')

function getDailySolution(date = new Date()) {
    const day =
        Math.floor(
            (date.getTime() - START_DATE.getTime()) / 86400000
        )

    return solutions[day % solutions.length]
}

const word = ref(['', '', '', '', ''])

const date = computed(() => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
const guessCount = computed(() => gameStore.wordQuestGuessCount)
const wordIsGuessed = computed(() => gameStore.wordQuestHasGuessedDailyWord)

const removeLetter = () => {
    for (let i = word.value.length - 1; i >= 0; i--) {
        if (word.value[i] !== '') {
            word.value[i] = ''
            break
        }
    }
}

onMounted(() => {
    console.log('solution: ', getDailySolution());

})

const submitGuess = () => {
    console.log('enter pressed');

    const guessedWord = word.value.join('').toLowerCase()
    const isValid = allowedSet.has(guessedWord)
    const solution = getDailySolution()

    if (isValid) {
        word.value = Array(5).fill('', 0)

        gameStore.incrementWordQuestGuessCount
        gameStore.updatewordQuestGuesses(guessedWord)
        if (guessedWord === solution) {
            console.log('yippie');
            gameStore.correctWordQuestGuess
        } else {
            console.log('oh no');
        }
    }
}

const addLetter = (newLetter: string) => {
    const index = word.value.indexOf('')
    if (index !== -1) {
        word.value[index] = newLetter
    }
}

const handleKey = (key: string) => {
    if (key === 'Enter') submitGuess()
    else if (key === 'Backspace') removeLetter()
    else addLetter(key)
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
            return 'bg-primary'
        } else if (solution.indexOf(letter) !== -1) {
            return 'bg-yellow-400'
        }
    }

    return 'bg-accented'
}

</script>

<template>
    <div class="text-center my-20">
        <h1 class="text-6xl font-medium">Word Quest</h1>
        <p class="text-sm text-muted">Guess the word of the day in 6 or less guesses!</p>
    </div>
    <div class="flex flex-col items-center gap-2" v-if="!wordIsGuessed">
        <div class="flex flex-row gap-2" v-for="wordIndex in 6">
            <div class="bg-accented h-15 w-15 rounded-lg flex justify-center items-center text-5xl"
                v-if="wordIndex === guessCount + 1" v-for="letter in word">
                {{ letter }}
            </div>
            <div class="h-15 w-15 rounded-lg flex justify-center items-center text-5xl" v-else
                v-for="(letter, letterIndex) in getLetters(wordIndex)"
                :class="getBackgroundForWord(wordIndex, letterIndex)">
                {{ letter }}
            </div>
        </div>
        <div class="mt-8">
            <Keyboard @key="handleKey" />
        </div>
    </div>
    <div v-else class="flex justify-center">
        <h1>You've completed the guess for {{ date }}</h1>
    </div>
</template>
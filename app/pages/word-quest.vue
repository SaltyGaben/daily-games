<script setup lang="ts">
import solutions from '~/assets/words/solutions.json'
import allowed from '~/assets/words/allowed.json'

definePageMeta({
    ssr: false
})

const allowedSet = new Set(allowed)

const isValidWord = (word: string) => {
    return
}

const START_DATE = new Date('2026-01-01')

function getDailySolution(date = new Date()) {
    const day =
        Math.floor(
            (date.getTime() - START_DATE.getTime()) / 86400000
        )

    return solutions[day % solutions.length]
}


const word = ref(['', '', '', '', ''])
const guesses = [
    { letters: ['', '', '', '', ''], active: true },
    { letters: ['', '', '', '', ''], active: false },
    { letters: ['', '', '', '', ''], active: false },
    { letters: ['', '', '', '', ''], active: false },
    { letters: ['', '', '', '', ''], active: false },
    { letters: ['', '', '', '', ''], active: false }]
const date = computed(() => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
const wordIsGuessed = ref(false)

watch(word, v => console.log(v.join('')), { deep: true })

const removeLetter = () => {
    for (let i = word.value.length - 1; i >= 0; i--) {
        if (word.value[i] !== '') {
            word.value[i] = ''
            break
        }
    }
}

const submitGuess = () => {
    const isValid = allowedSet.has(word.value.join('').toLowerCase())
    const solution = getDailySolution()

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
    else if (word.value.lastIndexOf('') !== -1) addLetter(key)
}

</script>

<template>
    <div class="text-center my-20">
        <h1 class="text-6xl font-medium">Word Quest</h1>
        <p class="text-sm text-muted">Guess the word of the day in 6 or less guesses!</p>
    </div>
    <div class="flex flex-col items-center gap-2" v-if="!wordIsGuessed">
        <div class="flex flex-row gap-2" v-for="guess in guesses">
            <div class="bg-accented h-20 w-20 rounded-lg flex justify-center items-center text-5xl"
                v-for="letter in word">
                {{ letter }}
            </div>
        </div>
        <div class="mt-8">
            <Keyboard @key="handleKey" />
        </div>
    </div>
    <div v-else class="flex justify-center">
        <h1>You've already completed the guess for {{ date }}</h1>
    </div>
</template>
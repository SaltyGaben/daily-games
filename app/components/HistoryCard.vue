<script setup lang="ts">

const gameStore = useGameStore()

const statistics = ref<GuessStatistics>()

onMounted(() => {
    statistics.value = gameStore.getWordQuestStatistics()
})

const maxGuess = computed(() => {
    let maxGuess = 0
    for (let index = 1; index < 7; index++) {
        const guess = statistics.value?.guessDistribution[index];

        if (guess && guess > maxGuess) {
            maxGuess = guess
        }
    }

    return maxGuess
})

const barWidth = (value: number | undefined) => {
    if (!value || value === 0) {
        return '24px'
    }

    if (maxGuess.value === 0) {
        return '0%'
    }

    return `${(value / maxGuess.value) * 100}%`
}
</script>

<template>
    <UCard v-if="statistics" variant="soft">
        <div class="grid grid-cols-2">
            <p>Games: {{ statistics.playedGames }}</p>
            <p>Win %: {{ statistics.winPercentage }}%</p>
            <p>Max Streak: {{ statistics.maxStreak }}</p>
            <p>Current Streak: {{ statistics.currentStreak }}</p>
        </div>
        <div class="flex flex-col gap-4 mt-4 bg-elevated p-4 rounded-lg">
            <h1 class="text-xl">Guess distribution</h1>
            <div v-for="index in 6" class="flex flex-row gap-2 items-center">
                {{ index }}
                <div class="bg-accented rounded-md h-7 w-full">
                    <div class="h-full rounded-md bg-primary flex items-center justify-end px-2
               text-sm font-medium text-white transition-all duration-200"
                        :style="{ width: barWidth(statistics.guessDistribution[index]) }">
                        {{ statistics.guessDistribution[index] }}
                    </div>
                </div>
            </div>
        </div>
    </UCard>
    <UCard v-else>
        <div>
            <h1>You have no statistics, play some games to acquire it!</h1>
        </div>
    </UCard>
</template>
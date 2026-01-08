<template>
    <div class="flex flex-col gap-10 p-4">
        <div class="flex flex-col gap-4 justify-center items-center mt-10 max-w-2xl mx-auto text-center">
            <h1 class="text-4xl font-medium">Daily Puzzle Games</h1>
            <p class="text-muted ">Challenge yourself with a fresh puzzle every day. Train your brain and
                compete
                with friends.</p>
        </div>

        <UCard class="min-w-3/4 self-center" variant="soft">
            <div class="flex flex-row gap-8 items-center justify-center min-h-20">
                <p class="flex flex-col text-center text-muted text-sm"><span
                        class="text-primary text-2xl">4</span>Games</p>
                <p class="flex flex-col text-center text-muted text-sm"><span class="text-secondary">
                        <UIcon name="i-lucide-infinity" class="size-7" />
                    </span>Daily Puzzles</p>
                <p class="flex flex-col text-center text-muted text-sm"><span
                        class="text-warning text-2xl">Free</span>To Play</p>
            </div>
        </UCard>

        <div class="flex flex-row flex-wrap max-w-3/4 gap-6 justify-center self-center">
            <UCard class="w-1/3 pb-8 transition hover:scale-101 glow-card" variant="soft">
                <div class="flex flex-col gap-3">
                    <div
                        class="color bg-linear-to-br from-primary/20 to-primary/5 rounded-xl p-2 w-fit flex items-center">
                        <UIcon name="i-lucide-text-cursor-input" class="size-12 text-primary " />
                    </div>
                    <h1 class="text-3xl">Word Quest</h1>
                    <p class="text-sm text-muted">
                        Guess the hidden 5-letter word in 6 tries. Green means correct, yellow means wrong position.
                    </p>
                </div>
            </UCard>
            <UCard class="w-1/3 pb-8 transition hover:scale-101 glow-card" variant="soft">
                <div class="flex flex-col gap-3">
                    <div
                        class="color bg-linear-to-br from-warning/20 to-warning/5 rounded-xl p-2 w-fit flex items-center">
                        <UIcon name="i-lucide-spell-check" class="size-12 text-primary " />
                    </div>
                    <h1 class="text-3xl">LexiBee</h1>
                    <p class="text-sm text-muted">
                        Create words using the available letters. Each word must include the center letter.
                    </p>
                </div>
            </UCard>
        </div>
    </div>

</template>

<style scoped>
.glow-card:hover {
    box-shadow: 0px 0px 15px -2px var(--color-primary);
}
</style>
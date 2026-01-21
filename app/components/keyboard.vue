<script setup lang="ts">
const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
]

onMounted(() => {
    window.addEventListener("keydown", onKeyDown);
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeyDown);
});

const onKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    if (!/^(Enter|Backspace|[a-zA-Z])$/.test(key)) return

    pressKey(key)
}


const emit = defineEmits(['key'])
const props = defineProps<{
    letterMap: Record<string, string>
}>()

function keyClass(key: string) {
    if (key.length > 1) return 'key special'

    return `key ${props.letterMap[key] ?? 'unused'}`
}

function label(key: string) {
    if (key === 'Backspace') return '⌫'
    return key
}

function pressKey(key: string) {
    emit('key', key)
}

</script>

<template>
    <div class="flex-1 justify-center">
        <div v-for="row in KEYBOARD_ROWS" :key="row.join('')" class="flex flex-row gap-1 mt-1 justify-center">
            <UButton v-for="key in row" :key="key" :class="keyClass(key)"
                class="rounded-md font-bold uppercase transition-colors hover:cursor-pointer" @click="pressKey(key)"
                size="xl">
                {{ label(key) }}
            </UButton>
        </div>
    </div>
</template>
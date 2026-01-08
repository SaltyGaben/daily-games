<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const currentDate = computed(() => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Word Quest',
  to: '/word-quest',
  active: route.path.startsWith('/word-quest')
}])

</script>

<template>
  <UApp>
    <UHeader mode="slideover" to="/">
      <template #title>
        <UButton icon="i-lucide-dices" />
        <h1 class="text-xl ml-2">Daily puzzle games</h1>
      </template>

      <template #right>
        <UNavigationMenu :items="items" class="hidden lg:flex gap-4" />
        <p class="text-sm text-muted hidden lg:flex ">{{ currentDate }}</p>
      </template>

      <template #body>
        <p class="text-sm text-muted">{{ currentDate }}</p>
        <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      </template>
    </UHeader>
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
  </UApp>
</template>

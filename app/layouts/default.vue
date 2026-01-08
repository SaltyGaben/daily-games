<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
const router = useRouter()

const menuItems: NavigationMenuItem[] = [
    {
        label: 'Word Quest',
        icon: 'i-lucide-text-cursor-input',
        to: '/word-quest'
    },
    {
        label: 'LexiBee',
        icon: 'i-lucide-hexagon',
        to: '/lexibee'
    },
]
</script>

<template>
    <UDashboardGroup>
        <UDashboardSidebar resizable
            :ui="{ footer: 'border-t border-default flex-row gap-4', header: 'justify-between' }" :default-size="16"
            :min-size="16" :max-size="20">

            <template #header="{ collapsed }" class="flex justify-between">
                <div class="flex flex-row gap-2 items-center hover:cursor-pointer" @click="router.push('/')">
                    <UIcon name="i-lucide-gamepad-2" class="size-8 text-primary" />
                    <h1 v-if="!collapsed" class="font-bold text-2xl">Daily<span class="text-primary">Games</span></h1>
                </div>
            </template>

            <template #default="{ collapsed }">
                <UNavigationMenu :collapsed="collapsed" :items="menuItems" orientation="vertical" highlight />
            </template>

            <template #footer="{ collapsed }" class="flex flex-row gap-2">

            </template>
        </UDashboardSidebar>
        <UDashboardPanel class="p-6">
            <slot />
        </UDashboardPanel>
    </UDashboardGroup>
</template>
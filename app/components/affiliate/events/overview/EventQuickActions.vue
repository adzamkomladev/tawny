<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export interface QuickAction {
  label: string
  icon: string
  href?: string
  onClick?: () => void
  variant?: 'default' | 'outline' | 'ghost'
}

defineProps<{
  actions: QuickAction[]
}>()
</script>

<template>
  <Card class="p-4">
    <CardHeader class="p-0 pb-3">
      <CardTitle class="text-sm font-semibold">Quick Actions</CardTitle>
    </CardHeader>
    <CardContent class="grid grid-cols-2 gap-2 p-0">
      <template v-for="action in actions" :key="action.label">
        <NuxtLink v-if="action.href" :to="action.href" class="contents">
          <Button 
            :variant="action.variant || 'outline'" 
            class="h-auto flex-col gap-1.5 py-3"
          >
            <Icon :name="action.icon" class="size-5" />
            <span class="text-xs">{{ action.label }}</span>
          </Button>
        </NuxtLink>
        <Button 
          v-else 
          :variant="action.variant || 'outline'" 
          class="h-auto flex-col gap-1.5 py-3"
          @click="action.onClick"
        >
          <Icon :name="action.icon" class="size-5" />
          <span class="text-xs">{{ action.label }}</span>
        </Button>
      </template>
    </CardContent>
  </Card>
</template>

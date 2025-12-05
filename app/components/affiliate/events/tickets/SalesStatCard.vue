<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface StatCard {
  title: string
  value: string | number
  subtitle: string
  trend?: {
    value: string
    direction: 'up' | 'down' | 'neutral'
  }
  icon: string
  iconBgClass: string
  iconClass: string
}

defineProps<{
  stat: StatCard
}>()

const getTrendClass = (direction: 'up' | 'down' | 'neutral') => {
  switch (direction) {
    case 'up':
      return 'text-emerald-600 dark:text-emerald-400'
    case 'down':
      return 'text-red-600 dark:text-red-400'
    default:
      return 'text-muted-foreground'
  }
}

const getTrendIcon = (direction: 'up' | 'down' | 'neutral') => {
  switch (direction) {
    case 'up':
      return '↑'
    case 'down':
      return '↓'
    default:
      return ''
  }
}
</script>

<template>
    <Card class="p-4">
        <CardHeader class="flex flex-row items-center justify-between p-0 pb-2">
            <CardTitle class="text-sm font-medium text-muted-foreground">{{ stat.title }}</CardTitle>
            <div class="rounded-md p-1.5" :class="stat.iconBgClass">
                <Icon :name="stat.icon" class="size-4" :class="stat.iconClass" />
            </div>
        </CardHeader>
        <CardContent class="p-0">
            <div class="text-2xl font-bold">{{ stat.value }}</div>
            <p class="text-xs text-muted-foreground mt-1">
                <span v-if="stat.trend" :class="getTrendClass(stat.trend.direction)" class="font-medium">
                    {{ getTrendIcon(stat.trend.direction) }} {{ stat.trend.value }}
                </span>
                {{ stat.subtitle }}
            </p>
        </CardContent>
    </Card>
</template>

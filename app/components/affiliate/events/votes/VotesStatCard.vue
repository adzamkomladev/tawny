<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export interface VoteStat {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  icon: string
  iconBgClass: string
  iconClass: string
}

defineProps<{
  stat: VoteStat
}>()
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between pb-2">
      <CardTitle class="text-sm font-medium text-muted-foreground">
        {{ stat.title }}
      </CardTitle>
      <div :class="['rounded-md p-2', stat.iconBgClass]">
        <Icon :name="stat.icon" :class="['size-4', stat.iconClass]" />
      </div>
    </CardHeader>
    <CardContent>
      <div class="text-3xl font-bold">{{ stat.value }}</div>
      <p v-if="stat.subtitle" class="text-xs text-muted-foreground mt-1">
        <template v-if="stat.trend">
          <span
            :class="[
              'font-medium',
              stat.trend.isPositive
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400',
            ]"
          >
            {{ stat.trend.isPositive ? '↑' : '↓' }} {{ Math.abs(stat.trend.value) }}%
          </span>
          {{ ' ' }}
        </template>
        {{ stat.subtitle }}
      </p>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export interface TicketStat {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  progress?: {
    value: number
    max: number
  }
  icon: string
  iconBgClass: string
  iconClass: string
}

defineProps<{
  stat: TicketStat
}>()
</script>

<template>
    <Card class="p-4">
        <CardHeader class="flex flex-row items-center justify-between p-0 pb-2">
            <CardTitle class="text-sm font-medium text-muted-foreground">
                {{ stat.title }}
            </CardTitle>
            <div :class="['rounded-md p-1.5', stat.iconBgClass]">
                <Icon :name="stat.icon" :class="['size-4', stat.iconClass]" />
            </div>
        </CardHeader>
        <CardContent class="p-0">
            <div class="text-2xl font-bold">{{ stat.value }}</div>

            <!-- Progress variant -->
            <div v-if="stat.progress" class="flex items-center gap-2 mt-1">
                <Progress :model-value="(stat.progress.value / stat.progress.max) * 100" class="h-1.5" />
                <span class="text-xs text-muted-foreground">
                    {{ Math.round((stat.progress.value / stat.progress.max) * 100) }}%
                </span>
            </div>

            <!-- Subtitle with optional trend -->
            <p v-else-if="stat.subtitle" class="text-xs text-muted-foreground mt-1">
                <template v-if="stat.trend">
                    <span :class="[
              'font-medium',
              stat.trend.isPositive
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400',
            ]">
                        {{ stat.trend.isPositive ? '↑' : '↓' }} {{ Math.abs(stat.trend.value) }}%
                    </span>
                    {{ ' ' }}
                </template>
                {{ stat.subtitle }}
            </p>
        </CardContent>
    </Card>
</template>

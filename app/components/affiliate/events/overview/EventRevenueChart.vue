<script lang="ts" setup>
import { VisXYContainer, VisStackedBar, VisAxis, VisBulletLegend } from '@unovis/vue'
import type { ChartConfig } from '@/components/ui/chart'
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from '@/components/ui/chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export interface RevenueDataPoint {
  period: string
  tickets: number
  votes: number
}

const props = defineProps<{
  weeklyData: RevenueDataPoint[]
  monthlyData: RevenueDataPoint[]
  hasTickets?: boolean
  hasVoting?: boolean
}>()

const chartPeriod = ref<'weekly' | 'monthly'>('weekly')

const chartData = computed(() => {
  return chartPeriod.value === 'weekly' ? props.weeklyData : props.monthlyData
})

const totalRevenue = computed(() => {
  return chartData.value.reduce((sum, d) => sum + d.tickets + d.votes, 0)
})

const chartConfig: ChartConfig = {
  tickets: {
    label: 'Ticket Sales',
    color: 'var(--primary)',
  },
  votes: {
    label: 'Vote Revenue',
    color: 'var(--chart-3)',
  },
}

const legendItems = computed(() => {
  const items = []
  if (props.hasTickets !== false) {
    items.push({ name: 'Ticket Sales', color: 'var(--primary)' })
  }
  if (props.hasVoting !== false) {
    items.push({ name: 'Vote Revenue', color: 'var(--chart-3)' })
  }
  return items
})
</script>

<template>
  <Card class="p-4">
    <CardHeader class="flex flex-col gap-3 p-0 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <CardTitle class="text-base">Revenue Breakdown</CardTitle>
        <CardDescription class="mt-0.5">
          <span class="text-lg font-semibold text-foreground">GHS {{ totalRevenue.toLocaleString() }}</span>
          <span class="ml-1 text-xs">total revenue</span>
        </CardDescription>
      </div>
      <Tabs v-model="chartPeriod" class="w-auto">
        <TabsList class="h-7">
          <TabsTrigger value="weekly" class="px-2.5 text-xs">Weekly</TabsTrigger>
          <TabsTrigger value="monthly" class="px-2.5 text-xs">Monthly</TabsTrigger>
        </TabsList>
      </Tabs>
    </CardHeader>
    <CardContent class="p-0">
      <ChartContainer :config="chartConfig" class="h-[200px] w-full">
        <VisBulletLegend :items="legendItems" class="mb-2" />
        <VisXYContainer :data="chartData" :margin="{ top: 10, right: 10, bottom: 25, left: 45 }">
          <VisStackedBar
            :x="(_: RevenueDataPoint, i: number) => i"
            :y="[
              (d: RevenueDataPoint) => d.tickets,
              (d: RevenueDataPoint) => d.votes,
            ]"
            :color="['var(--primary)', 'var(--chart-3)']"
            :bar-padding="0.3"
            :rounded-corners="4"
          />
          <VisAxis type="x" :tick-format="(i: number) => chartData[i]?.period ?? ''" :grid-line="false" />
          <VisAxis type="y" :grid-line="true" :tick-format="(v: number) => `${v}`" />
          <ChartCrosshair color="var(--primary)" :opacity="0.3" />
          <ChartTooltip
            :render="componentToString(chartConfig, ChartTooltipContent, {
              labelFormatter: (d: number | Date) => {
                const i = typeof d === 'number' ? d : 0
                return chartData[i]?.period ?? ''
              },
            })"
          />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
  </Card>
</template>

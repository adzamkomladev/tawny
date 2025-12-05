<script lang="ts" setup>
import { VisXYContainer, VisLine, VisArea, VisAxis, VisBulletLegend } from '@unovis/vue'
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

export interface ChartDataPoint {
  time: string
  sales: number
  revenue: number
}

const props = defineProps<{
  hourlyData: ChartDataPoint[]
  dailyData: ChartDataPoint[]
  monthlyData: ChartDataPoint[]
}>()

const chartPeriod = ref<'hourly' | 'daily' | 'monthly'>('daily')

const chartData = computed(() => {
  switch (chartPeriod.value) {
    case 'hourly':
      return props.hourlyData
    case 'monthly':
      return props.monthlyData
    default:
      return props.dailyData
  }
})

const chartConfig: ChartConfig = {
  sales: {
    label: 'Tickets Sold',
    color: 'var(--primary)',
  },
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-2)',
  },
}
</script>

<template>
  <Card>
    <CardHeader class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <CardTitle>Sales Analytics</CardTitle>
        <CardDescription>
          Track ticket sales and revenue over time
        </CardDescription>
      </div>
      <Tabs v-model="chartPeriod" class="w-auto">
        <TabsList class="h-8">
          <TabsTrigger value="hourly" class="text-xs px-3">Hourly</TabsTrigger>
          <TabsTrigger value="daily" class="text-xs px-3">Daily</TabsTrigger>
          <TabsTrigger value="monthly" class="text-xs px-3">Monthly</TabsTrigger>
        </TabsList>
      </Tabs>
    </CardHeader>
    <CardContent class="pt-0">
      <ChartContainer :config="chartConfig" class="h-[300px] w-full">
        <VisBulletLegend
          :items="[
            { name: 'Tickets Sold', color: 'var(--primary)' },
            { name: 'Revenue', color: 'var(--chart-2)' },
          ]"
        />
        <VisXYContainer :data="chartData" :margin="{ top: 20, right: 20, bottom: 30, left: 50 }">
          <VisArea
            :x="(_: ChartDataPoint, i: number) => i"
            :y="(d: ChartDataPoint) => d.sales"
            color="var(--primary)"
            :opacity="0.15"
            curve-type="monotone"
          />
          <VisLine
            :x="(_: ChartDataPoint, i: number) => i"
            :y="(d: ChartDataPoint) => d.sales"
            color="var(--primary)"
            :line-width="2"
            curve-type="monotone"
          />
          <VisArea
            :x="(_: ChartDataPoint, i: number) => i"
            :y="(d: ChartDataPoint) => d.revenue / 50"
            color="var(--chart-2)"
            :opacity="0.1"
            curve-type="monotone"
          />
          <VisLine
            :x="(_: ChartDataPoint, i: number) => i"
            :y="(d: ChartDataPoint) => d.revenue / 50"
            color="var(--chart-2)"
            :line-width="2"
            curve-type="monotone"
          />
          <VisAxis type="x" :tick-format="(i: number) => chartData[i]?.time ?? ''" :grid-line="false" />
          <VisAxis type="y" :grid-line="true" />
          <ChartCrosshair color="var(--primary)" :opacity="0.3" />
          <ChartTooltip
            :render="componentToString(chartConfig, ChartTooltipContent, {
              labelFormatter: (d: number | Date) => {
                const i = typeof d === 'number' ? d : 0
                return chartData[i]?.time ?? ''
              },
            })"
          />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';

interface StatItem {
  label: string;
  value: number | string;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const props = defineProps<{
  totalEvents: number;
  liveEvents: number;
  totalTicketsSold: number;
}>();

const stats = computed<StatItem[]>(() => [
  {
    label: 'Total Events',
    value: props.totalEvents,
    icon: 'lucide:calendar',
  },
  {
    label: 'Live Events',
    value: props.liveEvents,
    icon: 'lucide:radio',
  },
  {
    label: 'Tickets Sold',
    value: props.totalTicketsSold.toLocaleString(),
    icon: 'lucide:ticket',
  },
]);
</script>

<template>
  <div class="grid gap-4 md:grid-cols-3">
    <Card v-for="stat in stats" :key="stat.label" class="overflow-hidden">
      <CardContent class="p-4">
        <div class="flex items-center gap-3">
          <div class="rounded-lg bg-primary/10 p-2.5">
            <Icon :name="stat.icon" class="h-5 w-5 text-primary" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">{{ stat.label }}</p>
            <p class="text-2xl font-bold tabular-nums">{{ stat.value }}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

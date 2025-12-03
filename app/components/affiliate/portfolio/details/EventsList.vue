<script setup lang="ts">
import type { TeamEvent } from '~~/types/affiliate/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

const props = defineProps<{
  events: TeamEvent[];
  teamId: string;
}>();

const formatDate = (date: Date | string | null) => {
  if (!date) return 'TBD';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 0,
  }).format(amount);
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'live':
    case 'ongoing':
      return { variant: 'default' as const, class: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' };
    case 'upcoming':
      return { variant: 'secondary' as const, class: '' };
    case 'completed':
      return { variant: 'outline' as const, class: '' };
    case 'draft':
      return { variant: 'outline' as const, class: 'text-muted-foreground' };
    default:
      return { variant: 'outline' as const, class: '' };
  }
};

const isLive = (status: string) => status === 'live' || status === 'ongoing';
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between pb-3">
      <CardTitle class="text-lg font-semibold flex items-center gap-2">
        <Icon name="lucide:calendar-days" class="h-5 w-5 text-primary" />
        Recent Events
      </CardTitle>
      <Button v-if="events.length > 0" variant="ghost" size="sm" as-child>
        <NuxtLink :to="`/affiliate/teams/${teamId}/events`">
          View All
          <Icon name="lucide:arrow-right" class="ml-1 h-4 w-4" />
        </NuxtLink>
      </Button>
    </CardHeader>
    <CardContent>
      <!-- Empty state -->
      <Empty v-if="events.length === 0" class="py-8">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icon name="lucide:calendar-off" />
          </EmptyMedia>
          <EmptyTitle>No events yet</EmptyTitle>
          <EmptyDescription>
            This team hasn't created any events yet.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <!-- Events list -->
      <div v-else class="space-y-3">
        <NuxtLink
          v-for="event in events"
          :key="event.id"
          :to="`/affiliate/events/${event.id}`"
          class="group flex items-center justify-between gap-4 rounded-lg border border-border/50 bg-muted/20 p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/40"
        >
          <div class="flex items-center gap-4 min-w-0 flex-1">
            <!-- Live indicator -->
            <div v-if="isLive(event.status)" class="relative flex h-3 w-3 shrink-0">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span class="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <h4 class="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {{ event.title }}
                </h4>
                <Badge :variant="getStatusBadge(event.status).variant" :class="getStatusBadge(event.status).class">
                  {{ event.status }}
                </Badge>
              </div>
              <div class="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                <span class="flex items-center gap-1">
                  <Icon name="lucide:calendar" class="h-3.5 w-3.5" />
                  {{ formatDate(event.startDate) }}
                </span>
                <span v-if="event.venue" class="flex items-center gap-1 truncate">
                  <Icon name="lucide:map-pin" class="h-3.5 w-3.5 shrink-0" />
                  <span class="truncate">{{ event.venue }}</span>
                </span>
              </div>
            </div>
          </div>

          <div class="text-right shrink-0">
            <p class="font-semibold tabular-nums">{{ formatCurrency(event.totalRevenue) }}</p>
            <p class="text-sm text-muted-foreground">{{ event.ticketsSold }} tickets</p>
          </div>
        </NuxtLink>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import EventCard, { type Event } from './EventCard.vue'

defineProps<{
  events: Event[]
  loading?: boolean
}>()
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="i in 8"
        :key="i"
        class="animate-pulse"
      >
        <div class="aspect-4/3 bg-muted rounded-t-md" />
        <div class="p-4 space-y-3 border border-t-0 border-border/50 rounded-b-md">
          <div class="h-5 bg-muted rounded w-3/4" />
          <div class="space-y-2">
            <div class="h-4 bg-muted rounded w-1/2" />
            <div class="h-4 bg-muted rounded w-2/3" />
          </div>
          <div class="pt-3 border-t border-border/50 flex justify-between">
            <div class="h-8 bg-muted rounded w-16" />
            <div class="h-8 bg-muted rounded w-20" />
          </div>
        </div>
      </div>
    </div>

    <!-- Events Grid -->
    <div
      v-else-if="events.length > 0"
      class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <NuxtLink
        v-for="event in events"
        :key="event.id"
        :to="`/events/${event.id}`"
        class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
      >
        <EventCard :event="event" />
      </NuxtLink>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-16 text-center"
    >
      <div class="size-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <Icon name="lucide:calendar-x" class="size-10 text-muted-foreground" />
      </div>
      <h3 class="text-lg font-semibold mb-2">No events found</h3>
      <p class="text-muted-foreground max-w-sm">
        We couldn't find any events matching your search. Try adjusting your filters or search term.
      </p>
    </div>
  </div>
</template>

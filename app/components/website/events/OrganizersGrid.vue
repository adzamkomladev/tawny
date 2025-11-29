<script setup lang="ts">
import OrganizerCard, { type Organizer } from './OrganizerCard.vue'

defineProps<{
  organizers: Organizer[]
  loading?: boolean
}>()
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="i in 6"
        :key="i"
        class="animate-pulse p-6 border border-border/50 rounded-md"
      >
        <div class="flex items-start gap-4 mb-4">
          <div class="size-14 rounded-full bg-muted" />
          <div class="flex-1 space-y-2">
            <div class="h-5 bg-muted rounded w-3/4" />
            <div class="h-4 bg-muted rounded w-1/2" />
          </div>
        </div>
        <div class="space-y-2 mb-4">
          <div class="h-4 bg-muted rounded w-full" />
          <div class="h-4 bg-muted rounded w-2/3" />
        </div>
        <div class="flex gap-2 mb-4">
          <div class="h-6 bg-muted rounded w-16" />
          <div class="h-6 bg-muted rounded w-20" />
        </div>
        <div class="pt-4 border-t border-border/50 grid grid-cols-3 gap-3">
          <div class="h-10 bg-muted rounded" />
          <div class="h-10 bg-muted rounded" />
          <div class="h-10 bg-muted rounded" />
        </div>
      </div>
    </div>

    <!-- Organizers Grid -->
    <div
      v-else-if="organizers.length > 0"
      class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <NuxtLink
        v-for="organizer in organizers"
        :key="organizer.id"
        :to="`/organizers/${organizer.slug}`"
        class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
      >
        <OrganizerCard :organizer="organizer" />
      </NuxtLink>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-16 text-center"
    >
      <div class="size-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <Icon name="lucide:users-x" class="size-10 text-muted-foreground" />
      </div>
      <h3 class="text-lg font-semibold mb-2">No organizers found</h3>
      <p class="text-muted-foreground max-w-sm">
        We couldn't find any organizers matching your search. Try adjusting your filters or search term.
      </p>
    </div>
  </div>
</template>

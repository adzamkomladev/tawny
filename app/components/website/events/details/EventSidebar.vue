<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

defineProps<{
  date: string
  time: string
  endDate?: string
  venue: string
  location: string
  mapUrl?: string
}>()
</script>

<template>
  <Card class="border-border/50 sticky top-24">
    <CardHeader>
      <CardTitle class="flex items-center gap-2 text-base">
        <Icon name="lucide:info" class="size-5 text-primary" />
        Event Details
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-4">
      <!-- Date & Time -->
      <div class="flex items-start gap-3">
        <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon name="lucide:calendar" class="size-5 text-primary" />
        </div>
        <div>
          <div class="font-semibold">{{ date }}</div>
          <div v-if="endDate" class="text-sm text-muted-foreground">to {{ endDate }}</div>
          <div class="text-sm text-muted-foreground">{{ time }}</div>
        </div>
      </div>

      <Separator />

      <!-- Location -->
      <div class="flex items-start gap-3">
        <div class="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
          <Icon name="lucide:map-pin" class="size-5 text-muted-foreground" />
        </div>
        <div>
          <div class="font-semibold">{{ venue }}</div>
          <div class="text-sm text-muted-foreground">{{ location }}</div>
        </div>
      </div>

      <!-- Map Button -->
      <Button
        v-if="mapUrl"
        variant="outline"
        class="w-full gap-2"
        as-child
      >
        <a :href="mapUrl" target="_blank" rel="noopener noreferrer">
          <Icon name="lucide:map" class="size-4" />
          View on Map
        </a>
      </Button>

      <Separator />

      <!-- Quick Actions -->
      <div class="space-y-3">
        <h4 class="text-sm font-medium text-muted-foreground">Actions</h4>
        <div class="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" class="gap-1.5 text-xs">
            <Icon name="lucide:calendar-plus" class="size-3.5" />
            Calendar
          </Button>
          <Button variant="secondary" size="sm" class="gap-1.5 text-xs">
            <Icon name="lucide:bell" class="size-3.5" />
            Remind Me
          </Button>
          <Button variant="secondary" size="sm" class="gap-1.5 text-xs">
            <Icon name="lucide:share-2" class="size-3.5" />
            Share
          </Button>
        </div>
        <button class="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
          <Icon name="lucide:flag" class="size-3" />
          Report this event
        </button>
      </div>
    </CardContent>
  </Card>
</template>

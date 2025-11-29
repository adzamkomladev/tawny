<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export interface Organizer {
  id: string | number
  name: string
  slug: string
  logo?: string
  description: string
  verified: boolean
  stats: {
    events: number
    ticketsSold: string
    votesCast: string
  }
  categories: string[]
  liveEvents?: number
  lastEventDate?: string
}

defineProps<{
  organizer: Organizer
}>()

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatLastEvent(dateStr?: string): string {
  if (!dateStr) return 'No events yet'
  const date = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}
</script>

<template>
  <Card
    class="group relative overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-card"
  >
    <!-- Live Events Pulse Indicator -->
    <div
      v-if="organizer.liveEvents && organizer.liveEvents > 0"
      class="absolute top-3 right-3 z-10"
    >
      <Badge class="bg-red-500 text-white border-0 shadow-lg gap-1.5 pr-2.5">
        <span class="relative flex size-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span class="relative inline-flex rounded-full size-2 bg-white" />
        </span>
        {{ organizer.liveEvents }} Live
      </Badge>
    </div>

    <!-- Decorative Background -->
    <div class="absolute top-0 left-0 right-0 h-20 bg-linear-to-br from-primary/10 via-primary/5 to-transparent" />

    <CardContent class="relative p-6 pt-8">
      <!-- Header -->
      <div class="flex items-start gap-4 mb-4">
        <div class="relative">
          <Avatar class="size-16 border-3 border-background shadow-xl ring-2 ring-primary/20">
            <AvatarImage v-if="organizer.logo" :src="organizer.logo" :alt="organizer.name" />
            <AvatarFallback class="bg-linear-to-br from-primary to-primary/70 text-primary-foreground font-bold text-lg">
              {{ getInitials(organizer.name) }}
            </AvatarFallback>
          </Avatar>
          <!-- Verified Badge on Avatar -->
          <div
            v-if="organizer.verified"
            class="absolute -bottom-1 -right-1 size-6 rounded-full bg-primary flex items-center justify-center ring-2 ring-background"
          >
            <Icon name="lucide:check" class="size-3.5 text-primary-foreground" />
          </div>
        </div>
        <div class="flex-1 min-w-0 pt-1">
          <div class="flex items-center gap-2 mb-1">
            <h3 class="font-bold text-lg truncate group-hover:text-primary transition-colors">
              {{ organizer.name }}
            </h3>
          </div>
          <p class="text-sm text-muted-foreground">@{{ organizer.slug }}</p>
        </div>
      </div>

      <!-- Description -->
      <p class="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
        {{ organizer.description }}
      </p>

      <!-- Categories -->
      <div class="flex flex-wrap gap-1.5 mb-4">
        <Badge
          v-for="category in organizer.categories.slice(0, 3)"
          :key="category"
          variant="secondary"
          class="text-xs font-medium"
        >
          {{ category }}
        </Badge>
        <Badge
          v-if="organizer.categories.length > 3"
          variant="outline"
          class="text-xs"
        >
          +{{ organizer.categories.length - 3 }}
        </Badge>
      </div>

      <!-- Last Event Indicator -->
      <div class="flex items-center gap-2 text-sm text-muted-foreground mb-4 py-2 px-3 bg-muted/50 rounded-lg">
        <Icon name="lucide:clock" class="size-4" />
        <span>Last event: <span class="text-foreground font-medium">{{ formatLastEvent(organizer.lastEventDate) }}</span></span>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-2 pt-4 border-t border-border">
        <div class="text-center p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
          <div class="flex items-center justify-center gap-1.5 mb-1">
            <Icon name="lucide:calendar-days" class="size-4 text-muted-foreground" />
          </div>
          <div class="font-bold text-foreground text-lg">{{ organizer.stats.events }}</div>
          <div class="text-xs text-muted-foreground">Events</div>
        </div>
        <div class="text-center p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
          <div class="flex items-center justify-center gap-1.5 mb-1">
            <Icon name="lucide:ticket" class="size-4 text-primary" />
          </div>
          <div class="font-bold text-primary text-lg">{{ organizer.stats.ticketsSold }}</div>
          <div class="text-xs text-muted-foreground">Tickets</div>
        </div>
        <div class="text-center p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
          <div class="flex items-center justify-center gap-1.5 mb-1">
            <Icon name="lucide:vote" class="size-4 text-primary" />
          </div>
          <div class="font-bold text-primary text-lg">{{ organizer.stats.votesCast }}</div>
          <div class="text-xs text-muted-foreground">Votes</div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export interface EventDetail {
  id: string | number
  slug: string
  title: string
  description: string
  banner?: string
  poster?: string
  logo?: string
  date: string
  endDate?: string
  time: string
  location: string
  venue: string
  category: string
  type: 'voting' | 'tickets' | 'both'
  status: 'upcoming' | 'live' | 'ended'
  organizer: {
    name: string
    slug: string
    logo?: string
    verified: boolean
  }
  stats: {
    ticketsSold?: number
    votesCast?: number
    views: number
  }
}

defineProps<{
  event: EventDetail
}>()

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>

<template>
  <section class="relative min-h-[70vh] flex items-end overflow-hidden">
    <!-- Banner Background -->
    <div class="absolute inset-0 -z-10">
      <NuxtImg
        v-if="event.banner"
        :src="event.banner"
        :alt="event.title"
        class="size-full object-cover"
      />
      <div
        v-else
        class="size-full bg-linear-to-br from-primary/30 via-primary/10 to-muted"
      />
      <!-- Gradient Overlays -->
      <div class="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />
      <div class="absolute inset-0 bg-linear-to-r from-background/50 to-transparent" />
    </div>

    <!-- Floating Elements -->
    <div class="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
    <div class="absolute bottom-1/3 left-1/3 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse delay-700" />

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <div class="flex flex-col lg:flex-row gap-8 items-end lg:items-end">
        <!-- Poster/Logo -->
        <div class="shrink-0">
          <div class="relative group">
            <div class="absolute -inset-2 bg-linear-to-br from-primary/50 to-primary/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div class="relative size-40 sm:size-48 lg:size-56 rounded-xl overflow-hidden border-4 border-background shadow-2xl">
              <NuxtImg
                v-if="event.poster || event.logo"
                :src="event.poster || event.logo"
                :alt="event.title"
                class="size-full object-cover"
              />
              <div
                v-else
                class="size-full bg-linear-to-br from-primary to-primary/70 flex items-center justify-center"
              >
                <Icon name="lucide:calendar-days" class="size-20 text-primary-foreground/50" />
              </div>
            </div>
            <!-- Status Badge -->
            <Badge
              v-if="event.status === 'live'"
              class="absolute -top-2 -right-2 bg-red-500 text-white border-0 shadow-lg px-3 py-1"
            >
              <span class="relative flex size-2 mr-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span class="relative inline-flex rounded-full size-2 bg-white" />
              </span>
              Live Now
            </Badge>
            <Badge
              v-else-if="event.status === 'upcoming'"
              class="absolute -top-2 -right-2 bg-primary text-primary-foreground border-0 shadow-lg px-3 py-1"
            >
              <Icon name="lucide:clock" class="size-3.5 mr-1.5" />
              Upcoming
            </Badge>
          </div>
        </div>

        <!-- Event Info -->
        <div class="flex-1 space-y-4">
          <!-- Category & Type -->
          <div class="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" class="text-sm">
              {{ event.category }}
            </Badge>
            <Badge v-if="event.type === 'voting' || event.type === 'both'" variant="default">
              <Icon name="lucide:vote" class="size-3.5 mr-1.5" />
              Voting
            </Badge>
            <Badge v-if="event.type === 'tickets' || event.type === 'both'" variant="outline">
              <Icon name="lucide:ticket" class="size-3.5 mr-1.5" />
              Tickets
            </Badge>
          </div>

          <!-- Title -->
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {{ event.title }}
          </h1>

          <!-- Date, Time, Location -->
          <div class="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div class="flex items-center gap-2">
              <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="lucide:calendar" class="size-5 text-primary" />
              </div>
              <div>
                <div class="font-medium text-foreground">{{ event.date }}</div>
                <div class="text-sm">{{ event.time }}</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="size-10 rounded-lg bg-muted flex items-center justify-center">
                <Icon name="lucide:map-pin" class="size-5 text-muted-foreground" />
              </div>
              <div>
                <div class="font-medium text-foreground">{{ event.venue }}</div>
                <div class="text-sm">{{ event.location }}</div>
              </div>
            </div>
          </div>

          <!-- Organizer -->
          <div class="flex items-center gap-3 pt-2">
            <span class="text-sm text-muted-foreground">Organized by</span>
            <NuxtLink
              :to="`/organizers/${event.organizer.slug}`"
              class="flex items-center gap-2 group/org"
            >
              <Avatar class="size-8 border border-border">
                <AvatarImage v-if="event.organizer.logo" :src="event.organizer.logo" />
                <AvatarFallback class="bg-primary/10 text-primary text-xs font-semibold">
                  {{ getInitials(event.organizer.name) }}
                </AvatarFallback>
              </Avatar>
              <span class="font-medium group-hover/org:text-primary transition-colors">
                {{ event.organizer.name }}
              </span>
              <Icon
                v-if="event.organizer.verified"
                name="lucide:badge-check"
                class="size-4 text-primary"
              />
            </NuxtLink>
          </div>

          <!-- Stats -->
          <div class="flex flex-wrap items-center gap-6 pt-4">
            <div v-if="event.stats.ticketsSold" class="flex items-center gap-2">
              <Icon name="lucide:ticket" class="size-5 text-primary" />
              <span class="font-bold text-lg">{{ event.stats.ticketsSold.toLocaleString() }}</span>
              <span class="text-sm text-muted-foreground">tickets sold</span>
            </div>
            <div v-if="event.stats.votesCast" class="flex items-center gap-2">
              <Icon name="lucide:vote" class="size-5 text-primary" />
              <span class="font-bold text-lg">{{ event.stats.votesCast.toLocaleString() }}</span>
              <span class="text-sm text-muted-foreground">votes cast</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="lucide:eye" class="size-5 text-muted-foreground" />
              <span class="font-bold text-lg">{{ event.stats.views.toLocaleString() }}</span>
              <span class="text-sm text-muted-foreground">views</span>
            </div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
          <Button
            v-if="event.type === 'tickets' || event.type === 'both'"
            size="lg"
            class="gap-2"
          >
            <Icon name="lucide:ticket" class="size-5" />
            Get Tickets
          </Button>
          <Button
            v-if="event.type === 'voting' || event.type === 'both'"
            size="lg"
            :variant="event.type === 'both' ? 'outline' : 'default'"
            class="gap-2"
          >
            <Icon name="lucide:vote" class="size-5" />
            Vote Now
          </Button>
          <Button variant="ghost" size="lg" class="gap-2">
            <Icon name="lucide:share-2" class="size-5" />
            Share
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.delay-700 {
  animation-delay: 700ms;
}
</style>

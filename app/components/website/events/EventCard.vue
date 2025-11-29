<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export interface Event {
  id: string | number
  title: string
  image?: string
  date: string
  location: string
  type: 'voting' | 'tickets'
  category: string
  stats: {
    label: string
    value: string
  }
  price: string
  organizer: string
  isLive?: boolean
  trending?: boolean
}

defineProps<{
  event: Event
}>()
</script>

<template>
  <Card
    class="group relative overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-card"
  >
    <!-- Live Indicator Glow -->
    <div
      v-if="event.isLive"
      class="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent pointer-events-none"
    />

    <!-- Image -->
    <div class="relative aspect-16/10 overflow-hidden bg-muted">
      <NuxtImg
        v-if="event.image"
        :src="event.image"
        :alt="event.title"
        class="size-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div
        v-else
        class="absolute inset-0 bg-linear-to-br from-primary/30 via-primary/15 to-muted flex items-center justify-center"
      >
        <div class="relative">
          <div class="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <Icon
            :name="event.type === 'voting' ? 'lucide:vote' : 'lucide:ticket'"
            class="relative size-16 text-primary/50"
          />
        </div>
      </div>

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

      <!-- Top Badges -->
      <div class="absolute top-3 left-3 right-3 flex items-start justify-between">
        <Badge class="bg-background/95 backdrop-blur-sm text-foreground shadow-lg">
          {{ event.category }}
        </Badge>

        <!-- Live/Trending Badge -->
        <div class="flex items-center gap-2">
          <Badge
            v-if="event.trending"
            variant="secondary"
            class="bg-orange-500/90 text-white border-0 shadow-lg"
          >
            <Icon name="lucide:trending-up" class="size-3 mr-1" />
            Hot
          </Badge>
          <Badge
            v-if="event.isLive"
            class="bg-red-500 text-white border-0 shadow-lg animate-pulse"
          >
            <span class="size-1.5 rounded-full bg-white mr-1.5 animate-ping" />
            Live
          </Badge>
        </div>
      </div>

      <!-- Bottom Info on Image -->
      <div class="absolute bottom-3 left-3 right-3">
        <Badge
          :variant="event.type === 'voting' ? 'default' : 'secondary'"
          class="shadow-lg"
        >
          <Icon
            :name="event.type === 'voting' ? 'lucide:vote' : 'lucide:ticket'"
            class="size-3.5 mr-1.5"
          />
          {{ event.type === 'voting' ? 'Voting Open' : 'Tickets Available' }}
        </Badge>
      </div>
    </div>

    <CardContent class="p-4">
      <!-- Title -->
      <h3
        class="font-bold text-base mb-3 line-clamp-1 group-hover:text-primary transition-colors"
      >
        {{ event.title }}
      </h3>

      <!-- Date & Location -->
      <div class="space-y-2 mb-3">
        <div class="flex items-center gap-2.5 text-sm">
          <div class="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon name="lucide:calendar" class="size-4 text-primary" />
          </div>
          <span class="text-foreground font-medium truncate">{{ event.date }}</span>
        </div>
        <div class="flex items-center gap-2.5 text-sm">
          <div class="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <Icon name="lucide:map-pin" class="size-4 text-muted-foreground" />
          </div>
          <span class="text-muted-foreground truncate">{{ event.location }}</span>
        </div>
      </div>

      <!-- Organizer -->
      <div class="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Icon name="lucide:building-2" class="size-4 shrink-0" />
        <span class="truncate">by <span class="text-foreground font-medium">{{ event.organizer }}</span></span>
      </div>

      <!-- Stats & Price -->
      <div class="flex items-center justify-between pt-3 border-t border-border">
        <div class="flex items-center gap-2">
          <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon
              :name="event.type === 'voting' ? 'lucide:bar-chart-3' : 'lucide:users'"
              class="size-5 text-primary"
            />
          </div>
          <div>
            <div class="font-bold text-primary text-lg leading-tight">{{ event.stats.value }}</div>
            <div class="text-xs text-muted-foreground">{{ event.stats.label }}</div>
          </div>
        </div>
        <div class="text-right">
          <div class="font-bold text-foreground">{{ event.price }}</div>
          <div class="text-xs text-muted-foreground">Starting price</div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

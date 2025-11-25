<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const events = [
  {
    id: 1,
    title: 'Ghana Music Awards 2025',
    image: '/img/events/music-awards.jpg',
    date: 'Dec 15, 2025',
    location: 'Accra International Conference Centre',
    type: 'voting',
    category: 'Awards',
    stats: {
      label: 'Votes Cast',
      value: '45.2K',
    },
    price: 'Vote from GH₵1',
    organizer: 'Charter House',
  },
  {
    id: 2,
    title: 'Afro Nation Ghana 2025',
    image: '/img/events/afro-nation.jpg',
    date: 'Dec 28-30, 2025',
    location: 'Black Star Square, Accra',
    type: 'tickets',
    category: 'Festival',
    stats: {
      label: 'Tickets Sold',
      value: '12.8K',
    },
    price: 'From GH₵350',
    organizer: 'Afro Nation',
  },
  {
    id: 3,
    title: 'Tech Summit Africa',
    image: '/img/events/tech-summit.jpg',
    date: 'Jan 18-19, 2026',
    location: 'Kempinski Hotel, Accra',
    type: 'tickets',
    category: 'Conference',
    stats: {
      label: 'Registered',
      value: '2.4K',
    },
    price: 'From GH₵200',
    organizer: 'Tech Ghana',
  },
  {
    id: 4,
    title: 'Miss Ghana 2025',
    image: '/img/events/miss-ghana.jpg',
    date: 'Nov 30, 2025',
    location: 'National Theatre, Accra',
    type: 'voting',
    category: 'Pageant',
    stats: {
      label: 'Votes Cast',
      value: '89.5K',
    },
    price: 'Vote from GH₵0.50',
    organizer: 'Exclusive Events',
  },
];
</script>

<template>
  <section id="events" class="py-24 sm:py-32">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 animate-on-scroll">
        <div>
          <Badge variant="secondary" class="mb-4">
            <Icon name="lucide:sparkles" class="size-4 mr-1.5" />
            Live Now
          </Badge>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Discover Amazing
            <span class="text-primary">Events</span>
          </h2>
          <p class="text-lg text-muted-foreground max-w-2xl">
            Explore events with ticket sales and voting happening right now on our platform.
          </p>
        </div>
        <Button variant="outline" as-child class="w-fit shrink-0">
          <NuxtLink to="/events">
            View All Events
            <Icon name="lucide:arrow-right" class="size-5 ml-2" />
          </NuxtLink>
        </Button>
      </div>

      <!-- Events Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          v-for="(event, index) in events"
          :key="event.id"
          class="group overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 animate-on-scroll"
          :style="{ animationDelay: `${150 + index * 100}ms` }"
        >
          <!-- Image -->
          <div class="relative aspect-4/3 overflow-hidden bg-muted">
            <!-- Placeholder gradient when no image -->
            <div 
              class="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/10 to-muted flex items-center justify-center"
            >
              <Icon 
                :name="event.type === 'voting' ? 'lucide:vote' : 'lucide:ticket'" 
                class="size-12 text-primary/30" 
              />
            </div>
            
            <!-- Category Badge -->
            <Badge 
              class="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground"
            >
              {{ event.category }}
            </Badge>
            
            <!-- Type Badge -->
            <Badge 
              :variant="event.type === 'voting' ? 'default' : 'secondary'"
              class="absolute top-3 right-3"
            >
              <Icon 
                :name="event.type === 'voting' ? 'lucide:vote' : 'lucide:ticket'" 
                class="size-3.5 mr-1" 
              />
              {{ event.type === 'voting' ? 'Voting' : 'Tickets' }}
            </Badge>
          </div>

          <CardContent class="p-4">
            <!-- Title -->
            <h3 class="font-semibold text-base mb-2 line-clamp-1 group-hover:text-primary transition-colors">
              {{ event.title }}
            </h3>

            <!-- Date & Location -->
            <div class="space-y-1.5 mb-3">
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="lucide:calendar" class="size-4 shrink-0" />
                <span class="truncate">{{ event.date }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="lucide:map-pin" class="size-4 shrink-0" />
                <span class="truncate">{{ event.location }}</span>
              </div>
            </div>

            <!-- Stats & Price -->
            <div class="flex items-center justify-between pt-3 border-t border-border/50">
              <div>
                <div class="text-xs text-muted-foreground">{{ event.stats.label }}</div>
                <div class="font-semibold text-primary">{{ event.stats.value }}</div>
              </div>
              <div class="text-right">
                <div class="text-xs text-muted-foreground">Starting</div>
                <div class="font-medium text-sm">{{ event.price }}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-12 animate-on-scroll" style="animation-delay: 600ms">
        <p class="text-muted-foreground mb-4">
          Want to list your event here?
        </p>
        <Button as-child>
          <NuxtLink to="/register">
            Create Your Event
            <Icon name="lucide:plus" class="size-5 ml-2" />
          </NuxtLink>
        </Button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.6s ease-out forwards;
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

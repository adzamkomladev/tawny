<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Event } from '@/components/website/events/EventCard.vue'
import type { Organizer } from '@/components/website/events/OrganizerCard.vue'
import EventsGrid from '@/components/website/events/EventsGrid.vue'
import OrganizersGrid from '@/components/website/events/OrganizersGrid.vue'
import EventsSearch from '@/components/website/events/EventsSearch.vue'

definePageMeta({
  layout: false,
})

useSeoMeta({
  title: 'Discover Events & Organizers - Tix4u',
  description:
    'Find amazing events with ticket sales and voting happening right now. Discover top organizers on our platform.',
  ogTitle: 'Discover Events & Organizers - Tix4u',
  ogDescription:
    'Find amazing events with ticket sales and voting happening right now.',
  ogImage: '/img/og-image.png',
  twitterCard: 'summary_large_image',
})

// State
const activeTab = ref<'events' | 'organizers'>('events')
const searchQuery = ref('')
const selectedType = ref('all')
const selectedCategory = ref('all')
const isLoading = ref(false)

// Mock data for events
const allEvents: Event[] = [
  {
    id: 1,
    title: 'Ghana Music Awards 2025',
    date: 'Dec 15, 2025',
    location: 'Accra International Conference Centre',
    type: 'voting',
    category: 'Awards',
    stats: { label: 'Votes Cast', value: '45.2K' },
    price: 'Vote from GH₵1',
    organizer: 'Charter House',
    isLive: true,
    trending: true,
  },
  {
    id: 2,
    title: 'Afro Nation Ghana 2025',
    date: 'Dec 28-30, 2025',
    location: 'Black Star Square, Accra',
    type: 'tickets',
    category: 'Festival',
    stats: { label: 'Tickets Sold', value: '12.8K' },
    price: 'From GH₵350',
    organizer: 'Afro Nation',
    isLive: true,
  },
  {
    id: 3,
    title: 'Tech Summit Africa',
    date: 'Jan 18-19, 2026',
    location: 'Kempinski Hotel, Accra',
    type: 'tickets',
    category: 'Conference',
    stats: { label: 'Registered', value: '2.4K' },
    price: 'From GH₵200',
    organizer: 'Tech Ghana',
  },
  {
    id: 4,
    title: 'Miss Ghana 2025',
    date: 'Nov 30, 2025',
    location: 'National Theatre, Accra',
    type: 'voting',
    category: 'Pageant',
    stats: { label: 'Votes Cast', value: '89.5K' },
    price: 'Vote from GH₵0.50',
    organizer: 'Exclusive Events',
    isLive: true,
    trending: true,
  },
  {
    id: 5,
    title: 'Detty December Concert',
    date: 'Dec 20, 2025',
    location: 'Fantasy Dome, Accra',
    type: 'tickets',
    category: 'Music',
    stats: { label: 'Tickets Sold', value: '5.2K' },
    price: 'From GH₵150',
    organizer: 'Live Events GH',
    isLive: true,
  },
  {
    id: 6,
    title: 'Ghana Comedy Awards',
    date: 'Jan 5, 2026',
    location: 'National Theatre, Accra',
    type: 'voting',
    category: 'Awards',
    stats: { label: 'Votes Cast', value: '32.1K' },
    price: 'Vote from GH₵1',
    organizer: 'Comedy Ghana',
  },
  {
    id: 7,
    title: 'Afrochella 2025',
    date: 'Dec 29-30, 2025',
    location: 'El Wak Stadium, Accra',
    type: 'tickets',
    category: 'Festival',
    stats: { label: 'Tickets Sold', value: '18.3K' },
    price: 'From GH₵500',
    organizer: 'Afrochella',
    trending: true,
  },
  {
    id: 8,
    title: 'Ghana Fashion Awards',
    date: 'Feb 14, 2026',
    location: 'Movenpick Ambassador, Accra',
    type: 'voting',
    category: 'Awards',
    stats: { label: 'Votes Cast', value: '15.7K' },
    price: 'Vote from GH₵2',
    organizer: 'Fashion Ghana',
  },
]

// Mock data for organizers
const allOrganizers: Organizer[] = [
  {
    id: 1,
    name: 'Charter House',
    slug: 'charter-house',
    description:
      'Leading events and entertainment company in Ghana, producers of Ghana Music Awards and more.',
    verified: true,
    stats: { events: 24, ticketsSold: '45K', votesCast: '1.2M' },
    categories: ['Awards', 'Music', 'Entertainment'],
    liveEvents: 2,
    lastEventDate: '2025-11-25',
  },
  {
    id: 2,
    name: 'Afro Nation',
    slug: 'afro-nation',
    description:
      'The world\'s biggest Afrobeats festival, bringing together top artists from Africa and the diaspora.',
    verified: true,
    stats: { events: 8, ticketsSold: '120K', votesCast: '0' },
    categories: ['Festival', 'Music', 'International'],
    liveEvents: 1,
    lastEventDate: '2025-11-20',
  },
  {
    id: 3,
    name: 'Tech Ghana',
    slug: 'tech-ghana',
    description:
      'Empowering Ghana\'s tech ecosystem through conferences, meetups, and networking events.',
    verified: true,
    stats: { events: 15, ticketsSold: '8K', votesCast: '0' },
    categories: ['Conference', 'Technology', 'Networking'],
    liveEvents: 0,
    lastEventDate: '2025-10-15',
  },
  {
    id: 4,
    name: 'Exclusive Events',
    slug: 'exclusive-events',
    description:
      'Premier event management company specializing in pageants, awards, and high-profile events.',
    verified: true,
    stats: { events: 32, ticketsSold: '25K', votesCast: '500K' },
    categories: ['Pageant', 'Awards', 'Gala'],
    liveEvents: 1,
    lastEventDate: '2025-11-28',
  },
  {
    id: 5,
    name: 'Live Events GH',
    slug: 'live-events-gh',
    description:
      'Creating unforgettable live concert experiences across Ghana with top local and international artists.',
    verified: false,
    stats: { events: 18, ticketsSold: '35K', votesCast: '0' },
    categories: ['Music', 'Concerts', 'Entertainment'],
    liveEvents: 1,
    lastEventDate: '2025-11-22',
  },
  {
    id: 6,
    name: 'Comedy Ghana',
    slug: 'comedy-ghana',
    description:
      'Promoting stand-up comedy and comedic talent through events, awards, and shows.',
    verified: true,
    stats: { events: 12, ticketsSold: '10K', votesCast: '200K' },
    categories: ['Comedy', 'Awards', 'Entertainment'],
    liveEvents: 0,
    lastEventDate: '2025-09-10',
  },
]

// Filtered events
const filteredEvents = computed(() => {
  return allEvents.filter((event) => {
    const matchesSearch =
      searchQuery.value === '' ||
      event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesType =
      selectedType.value === 'all' || event.type === selectedType.value

    const matchesCategory =
      selectedCategory.value === 'all' ||
      event.category.toLowerCase() === selectedCategory.value.toLowerCase()

    return matchesSearch && matchesType && matchesCategory
  })
})

// Filtered organizers
const filteredOrganizers = computed(() => {
  return allOrganizers.filter((organizer) => {
    const matchesSearch =
      searchQuery.value === '' ||
      organizer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      organizer.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      organizer.categories.some((cat) =>
        cat.toLowerCase().includes(searchQuery.value.toLowerCase())
      )

    return matchesSearch
  })
})

// Stats
const stats = computed(() => ({
  totalEvents: allEvents.length,
  totalOrganizers: allOrganizers.length,
  ticketEvents: allEvents.filter((e) => e.type === 'tickets').length,
  votingEvents: allEvents.filter((e) => e.type === 'voting').length,
}))
</script>

<template>
  <div class="min-h-screen bg-background">
    <LandingNavbar />

    <main class="pt-16">
      <!-- Hero Section -->
      <section class="relative py-16 sm:py-24 overflow-hidden">
        <!-- Background Elements -->
        <div class="absolute inset-0 -z-10">
          <div
            class="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          />
          <div
            class="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl mx-auto text-center mb-12">
            <Badge variant="secondary" class="mb-4">
              <Icon name="lucide:sparkles" class="size-4 mr-1.5" />
              {{ stats.totalEvents }} Live Events
            </Badge>
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Discover Amazing
              <span class="text-primary">Events</span>
            </h1>
            <p class="text-lg text-muted-foreground">
              Find events with ticket sales and voting happening right now, or explore top organizers on our platform.
            </p>
          </div>

          <!-- Tab Switcher -->
          <div class="flex justify-center mb-8">
            <Tabs v-model="activeTab" class="w-full max-w-md">
              <TabsList class="grid w-full grid-cols-2">
                <TabsTrigger value="events" class="gap-2">
                  <Icon name="lucide:calendar" class="size-4" />
                  Events
                  <Badge variant="secondary" class="ml-1 text-xs">
                    {{ stats.totalEvents }}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="organizers" class="gap-2">
                  <Icon name="lucide:users" class="size-4" />
                  Organizers
                  <Badge variant="secondary" class="ml-1 text-xs">
                    {{ stats.totalOrganizers }}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <!-- Search & Filters -->
          <div class="max-w-2xl mx-auto">
            <EventsSearch
              v-model="searchQuery"
              :type="selectedType"
              :category="selectedCategory"
              :show-filters="activeTab === 'events'"
              :placeholder="activeTab === 'events' ? 'Search events by name, location, or organizer...' : 'Search organizers by name or category...'"
              @update:type="selectedType = $event"
              @update:category="selectedCategory = $event"
            />
          </div>
        </div>
      </section>

      <!-- Results Section -->
      <section class="pb-24">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Results Header -->
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-xl font-semibold">
                {{ activeTab === 'events' ? 'Events' : 'Organizers' }}
              </h2>
              <p class="text-sm text-muted-foreground">
                {{
                  activeTab === 'events'
                    ? `${filteredEvents.length} events found`
                    : `${filteredOrganizers.length} organizers found`
                }}
              </p>
            </div>

            <!-- Quick Stats -->
            <div v-if="activeTab === 'events'" class="hidden sm:flex items-center gap-4">
              <div class="flex items-center gap-2 text-sm">
                <div class="size-2 rounded-full bg-primary" />
                <span class="text-muted-foreground">{{ stats.votingEvents }} Voting</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <div class="size-2 rounded-full bg-secondary-foreground" />
                <span class="text-muted-foreground">{{ stats.ticketEvents }} Tickets</span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <EventsGrid
            v-if="activeTab === 'events'"
            :events="filteredEvents"
            :loading="isLoading"
          />
          <OrganizersGrid
            v-else
            :organizers="filteredOrganizers"
            :loading="isLoading"
          />
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-16 bg-muted/50 border-t border-border/50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-2xl sm:text-3xl font-bold mb-4">
            Ready to create your own event?
          </h2>
          <p class="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of organizers using Tix4u to sell tickets, collect votes, and engage their audience.
          </p>
          <NuxtLink
            to="/register"
            class="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Get Started Free
            <Icon name="lucide:arrow-right" class="size-4" />
          </NuxtLink>
        </div>
      </section>
    </main>

    <LandingFooter />
  </div>
</template>
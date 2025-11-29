<script setup lang="ts">
import LandingNavbar from '~/components/landing/Navbar.vue'
import LandingFooter from '~/components/landing/Footer.vue'
import EventHero from '~/components/website/events/details/EventHero.vue'
import EventAbout from '~/components/website/events/details/EventAbout.vue'
import EventTickets from '~/components/website/events/details/EventTickets.vue'
import EventVoting from '~/components/website/events/details/EventVoting.vue'
import EventGallery from '~/components/website/events/details/EventGallery.vue'
import EventSidebar from '~/components/website/events/details/EventSidebar.vue'
import type { EventDetail } from '~/components/website/events/details/EventHero.vue'
import type { Ticket } from '~/components/website/events/details/EventTickets.vue'
import type { VotingCategory } from '~/components/website/events/details/EventVoting.vue'
import type { GalleryImage } from '~/components/website/events/details/EventGallery.vue'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

// Mock event data - replace with API fetch
const event = computed<EventDetail>(() => ({
  id: '1',
  slug: slug.value,
  title: 'Ghana Music Awards 2024',
  description: `Join us for the most prestigious music awards ceremony in Ghana! The Ghana Music Awards celebrates the incredible talent and artistry of Ghanaian musicians, producers, and industry professionals.

This year's edition promises to be bigger and better than ever, featuring electrifying performances from top artists, exciting award presentations, and unforgettable moments that will go down in music history.

Experience a night of glitz, glamour, and great music as we honor the best in the Ghanaian music industry.`,
  poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=600&fit=crop',
  logo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
  banner: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1920&h=600&fit=crop',
  date: 'Saturday, March 15, 2024',
  time: '7:00 PM - 11:30 PM',
  venue: 'Accra International Conference Centre',
  location: 'Castle Road, Ridge, Accra, Ghana',
  category: 'Music Awards',
  type: 'both',
  status: 'upcoming',
  organizer: {
    name: 'CharterHouse Ghana',
    slug: 'charterhouse-ghana',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    verified: true,
  },
  stats: {
    ticketsSold: 2500,
    votesCast: 84000,
    views: 12000,
  },
}))

const highlights = [
  'Live performances from 20+ top artists',
  'Red carpet arrivals and celebrity interviews',
  'VIP afterparty with exclusive access',
  'Meet and greet opportunities',
  'Professional photography and media coverage',
  'Complimentary refreshments for VIP guests',
]

const tags = ['Music', 'Awards', 'Live Entertainment', 'Ghana', 'Afrobeats', 'Highlife', 'VIP Experience']

const tickets: Ticket[] = [
  {
    id: '1',
    name: 'Regular Entry',
    description: 'General admission to the awards ceremony',
    price: 150,
    currency: 'GHS',
    available: 500,
    total: 1000,
    maxPerOrder: 10,
    benefits: ['Access to main hall', 'Standard seating', 'Event program booklet'],
  },
  {
    id: '2',
    name: 'VIP Access',
    description: 'Premium seating with exclusive perks',
    price: 500,
    currency: 'GHS',
    available: 80,
    total: 200,
    maxPerOrder: 5,
    benefits: [
      'Priority seating near stage',
      'Complimentary drinks',
      'VIP lounge access',
      'Event merchandise pack',
      'Meet & greet wristband',
    ],
    popular: true,
  },
  {
    id: '3',
    name: 'VVIP Table',
    description: 'Exclusive table for groups with premium service',
    price: 2500,
    currency: 'GHS',
    available: 5,
    total: 20,
    maxPerOrder: 2,
    benefits: [
      'Reserved table for 6 guests',
      'Bottle service included',
      'Backstage access',
      'Photo with artists',
      'VIP parking',
      'Priority entry',
    ],
    showAvailability: false,
  },
  {
    id: '4',
    name: 'Early Bird Special',
    description: 'Limited offer for early supporters',
    price: 100,
    currency: 'GHS',
    available: 0,
    total: 200,
    maxPerOrder: 10,
    benefits: ['Access to main hall', 'Standard seating', 'Early bird badge'],
    soldOut: true,
  },
]

const votingCategories: VotingCategory[] = [
  {
    id: '1',
    name: 'Artist of the Year',
    description: 'Vote for the most outstanding artist who made significant impact this year',
    votingPrice: 1,
    currency: 'GHS',
    nominees: [
      { id: '1', name: 'Stonebwoy', code: 'SB01', photo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop', votes: 45000 },
      { id: '2', name: 'Sarkodie', code: 'SK02', photo: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200&h=200&fit=crop', votes: 38000 },
      { id: '3', name: 'Shatta Wale', code: 'SW03', photo: 'https://images.unsplash.com/photo-1534385842125-8c9ad0bd123c?w=200&h=200&fit=crop', votes: 32000 },
      { id: '4', name: 'Black Sherif', code: 'BS04', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', votes: 12800 },
    ],
    totalVotes: 127800,
    endsAt: '2024-03-10',
  },
  {
    id: '2',
    name: 'Song of the Year',
    description: 'The most popular and impactful song released this year',
    votingPrice: 1,
    currency: 'GHS',
    nominees: [
      { id: '5', name: 'Kweku Smoke - Yedin', code: 'KS01', photo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop', votes: 28000 },
      { id: '6', name: 'King Promise - Terminator', code: 'KP02', photo: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop', votes: 35000 },
      { id: '7', name: 'Gyakie - Forever', code: 'GY03', photo: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=200&h=200&fit=crop', votes: 22000 },
      { id: '8', name: 'Camidoh - Sugarcane', code: 'CM04', photo: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop', votes: 15000 },
    ],
    totalVotes: 100000,
    endsAt: '2024-03-10',
  },
  {
    id: '3',
    name: 'Best New Artist',
    description: 'Celebrating breakthrough artists of the year',
    votingPrice: 1,
    currency: 'GHS',
    nominees: [
      { id: '9', name: 'Olivetheboy', code: 'OB01', photo: 'https://images.unsplash.com/photo-1559386484-97dfc0e15539?w=200&h=200&fit=crop', votes: 18000 },
      { id: '10', name: 'Lasmid', code: 'LA02', photo: 'https://images.unsplash.com/photo-1546961342-ea5f71b193f3?w=200&h=200&fit=crop', votes: 14000 },
      { id: '11', name: 'Ayra Starr', code: 'AS03', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop', votes: 13000 },
    ],
    totalVotes: 45000,
    endsAt: '2024-03-12',
    showVoteStats: false,
  },
]

const gallery: GalleryImage[] = [
  { id: '1', src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop', alt: 'Main stage setup', featured: true },
  { id: '2', src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop', alt: 'Crowd at previous event' },
  { id: '3', src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop', alt: 'Artist performing' },
  { id: '4', src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=800&fit=crop', alt: 'Red carpet arrivals' },
  { id: '5', src: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&h=400&fit=crop', alt: 'Award presentation' },
  { id: '6', src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop', alt: 'VIP section' },
  { id: '7', src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=600&fit=crop', alt: 'Concert crowd', featured: true },
  { id: '8', src: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&h=400&fit=crop', alt: 'Stage lighting' },
]

// SEO
useSeoMeta({
  title: () => `${event.value.title} | Tix4u`,
  description: () => event.value.description.slice(0, 160),
  ogTitle: () => event.value.title,
  ogDescription: () => event.value.description.slice(0, 160),
  ogImage: () => event.value.banner,
})

// Computed isLive status
const isLive = computed(() => event.value.status === 'live')
</script>

<template>
  <div class="min-h-screen bg-background">
    <LandingNavbar />

    <!-- Hero Section -->
    <EventHero :event="event" />

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8 lg:py-12">
      <div class="grid gap-8 lg:grid-cols-3">
        <!-- Main Content Area -->
        <div class="lg:col-span-2 space-y-8">
          <!-- About Section -->
          <EventAbout
            :description="event.description"
            :highlights="highlights"
            :tags="tags"
          />

          <!-- Tabs for Tickets, Voting, Gallery -->
          <Tabs default-value="tickets" class="w-full">
            <TabsList class="w-full grid grid-cols-3 h-12 bg-muted/50">
              <TabsTrigger value="tickets" class="gap-2">
                <Icon name="lucide:ticket" class="size-4" />
                <span class="hidden sm:inline">Tickets</span>
              </TabsTrigger>
              <TabsTrigger value="voting" class="gap-2">
                <Icon name="lucide:vote" class="size-4" />
                <span class="hidden sm:inline">Voting</span>
              </TabsTrigger>
              <TabsTrigger value="gallery" class="gap-2">
                <Icon name="lucide:images" class="size-4" />
                <span class="hidden sm:inline">Gallery</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tickets" class="mt-6">
              <EventTickets :tickets="tickets" :is-live="isLive" />
            </TabsContent>

            <TabsContent value="voting" class="mt-6">
              <EventVoting :categories="votingCategories" :is-live="isLive" />
            </TabsContent>

            <TabsContent value="gallery" class="mt-6">
              <EventGallery :images="gallery" />
            </TabsContent>
          </Tabs>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <EventSidebar
            :date="event.date"
            :time="event.time"
            :venue="event.venue"
            :location="event.location"
          />
        </div>
      </div>
    </div>

    <LandingFooter />
  </div>
</template>
<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import type { VoteStat } from '@/components/affiliate/events/votes/VotesStatCard.vue'
import type { VoteCategory } from '@/components/affiliate/events/votes/VoteCategoriesList.vue'
import VotesChart from '~/components/affiliate/events/votes/VotesChart.vue'
import VotesStatCard from '~/components/affiliate/events/votes/VotesStatCard.vue'
definePageMeta({
  layout: 'affiliate',
})

useHead({
  title: 'Votes Overview',
})

const route = useRoute()
const eventId = computed(() => route.params.id as string)

useBreadcrumb().setBreadcrumbs([
  { text: 'Events', url: '/affiliate/events' },
  { text: 'Event Details', url: `/affiliate/events/${eventId.value}` },
  { text: 'Votes', url: `/affiliate/events/${eventId.value}/votes` },
])

// Currency
const currency = ref('GHS')

// Stats data
const stats = computed<VoteStat[]>(() => [
  {
    title: 'Total Votes',
    value: '12,458',
    subtitle: 'from last week',
    trend: { value: 18.2, isPositive: true },
    icon: 'lucide:vote',
    iconBgClass: 'bg-primary/10',
    iconClass: 'text-primary',
  },
  {
    title: 'Total Revenue',
    value: formatCurrency(24916),
    subtitle: 'from last week',
    trend: { value: 15.8, isPositive: true },
    icon: 'lucide:banknote',
    iconBgClass: 'bg-chart-2/10',
    iconClass: 'text-chart-2',
  },
  {
    title: 'Potential Earnings',
    value: formatCurrency(4983),
    subtitle: '20% affiliate commission',
    icon: 'lucide:wallet',
    iconBgClass: 'bg-chart-3/10',
    iconClass: 'text-chart-3',
  },
  {
    title: 'Total Categories',
    value: '6',
    subtitle: '4 active, 2 paused',
    icon: 'lucide:layout-grid',
    iconBgClass: 'bg-chart-4/10',
    iconClass: 'text-chart-4',
  },
])

// Chart data
const hourlyData = ref([
  { time: '6AM', votes: 45, revenue: 90 },
  { time: '8AM', votes: 120, revenue: 240 },
  { time: '10AM', votes: 280, revenue: 560 },
  { time: '12PM', votes: 450, revenue: 900 },
  { time: '2PM', votes: 380, revenue: 760 },
  { time: '4PM', votes: 520, revenue: 1040 },
  { time: '6PM', votes: 680, revenue: 1360 },
  { time: '8PM', votes: 550, revenue: 1100 },
  { time: '10PM', votes: 320, revenue: 640 },
])

const dailyData = ref([
  { time: 'Mon', votes: 1250, revenue: 2500 },
  { time: 'Tue', votes: 1580, revenue: 3160 },
  { time: 'Wed', votes: 1120, revenue: 2240 },
  { time: 'Thu', votes: 1890, revenue: 3780 },
  { time: 'Fri', votes: 2340, revenue: 4680 },
  { time: 'Sat', votes: 2780, revenue: 5560 },
  { time: 'Sun', votes: 1500, revenue: 3000 },
])

const monthlyData = ref([
  { time: 'Jan', votes: 3200, revenue: 6400 },
  { time: 'Feb', votes: 4500, revenue: 9000 },
  { time: 'Mar', votes: 5800, revenue: 11600 },
  { time: 'Apr', votes: 7200, revenue: 14400 },
  { time: 'May', votes: 9500, revenue: 19000 },
  { time: 'Jun', votes: 12458, revenue: 24916 },
])

// Vote categories with nominees
const categories = ref<VoteCategory[]>([
  {
    id: '1',
    name: 'Best Artist of the Year',
    description: 'Vote for your favorite artist who has made the biggest impact this year',
    pricePerVote: 2,
    totalVotes: 4250,
    totalRevenue: 8500,
    status: 'active',
    nominees: [
      { id: '1a', name: 'Kofi Artiste', votes: 1580, revenue: 3160 },
      { id: '1b', name: 'Ama Stars', votes: 1250, revenue: 2500 },
      { id: '1c', name: 'DJ Beats', votes: 890, revenue: 1780 },
      { id: '1d', name: 'Lyrical King', votes: 530, revenue: 1060 },
    ],
  },
  {
    id: '2',
    name: 'Song of the Year',
    description: 'The most played and loved song that defined the year',
    pricePerVote: 2,
    totalVotes: 3820,
    totalRevenue: 7640,
    status: 'active',
    nominees: [
      { id: '2a', name: 'Summer Vibes', votes: 1420, revenue: 2840 },
      { id: '2b', name: 'Midnight Love', votes: 1180, revenue: 2360 },
      { id: '2c', name: 'Dance Floor', votes: 720, revenue: 1440 },
      { id: '2d', name: 'Afro Beat', votes: 500, revenue: 1000 },
    ],
  },
  {
    id: '3',
    name: 'Best New Artist',
    description: 'Rising stars who debuted this year with exceptional talent',
    pricePerVote: 1.5,
    totalVotes: 2150,
    totalRevenue: 3225,
    status: 'active',
    nominees: [
      { id: '3a', name: 'Fresh Prince', votes: 850, revenue: 1275 },
      { id: '3b', name: 'Young Flow', votes: 680, revenue: 1020 },
      { id: '3c', name: 'New Wave', votes: 620, revenue: 930 },
    ],
  },
  {
    id: '4',
    name: 'Best Collaboration',
    description: 'The most iconic musical collaboration of the year',
    pricePerVote: 2,
    totalVotes: 1580,
    totalRevenue: 3160,
    status: 'paused',
    nominees: [
      { id: '4a', name: 'Unity ft. Harmony', votes: 680, revenue: 1360 },
      { id: '4b', name: 'Duo Masters', votes: 520, revenue: 1040 },
      { id: '4c', name: 'The Fusion', votes: 380, revenue: 760 },
    ],
  },
  {
    id: '5',
    name: 'Best Music Video',
    description: 'Visual storytelling that captivated audiences',
    pricePerVote: 1.5,
    totalVotes: 420,
    totalRevenue: 630,
    status: 'active',
    nominees: [
      { id: '5a', name: 'Cinematic Dream', votes: 180, revenue: 270 },
      { id: '5b', name: 'Visual Poetry', votes: 150, revenue: 225 },
      { id: '5c', name: 'Color Burst', votes: 90, revenue: 135 },
    ],
  },
  {
    id: '6',
    name: 'Fan Favorite',
    description: 'The artist with the most dedicated fanbase',
    pricePerVote: 2.5,
    totalVotes: 238,
    totalRevenue: 595,
    status: 'paused',
    nominees: [
      { id: '6a', name: 'Star Power', votes: 120, revenue: 300 },
      { id: '6b', name: 'The Legend', votes: 118, revenue: 295 },
    ],
  },
])

// Sheet state
const isSheetOpen = ref(false)
const editingCategory = ref<VoteCategory | null>(null)

const openCreateSheet = () => {
  editingCategory.value = null
  isSheetOpen.value = true
}

const openEditSheet = (category: VoteCategory) => {
  editingCategory.value = { ...category, nominees: [...category.nominees] }
  isSheetOpen.value = true
}

const handleSaveCategory = (categoryData: Partial<VoteCategory>) => {
  if (categoryData.id) {
    // Update existing
    const index = categories.value.findIndex((c) => c.id === categoryData.id)
    if (index !== -1) {
      categories.value[index] = { ...categories.value[index], ...categoryData } as VoteCategory
    }
  } else {
    // Create new
    categories.value.push({
      id: crypto.randomUUID(),
      totalVotes: 0,
      totalRevenue: 0,
      ...categoryData,
    } as VoteCategory)
  }
}

const handleDeleteCategory = (category: VoteCategory) => {
  categories.value = categories.value.filter((c) => c.id !== category.id)
}

const handleToggleStatus = (category: VoteCategory) => {
  const index = categories.value.findIndex((c) => c.id === category.id)
  if (index !== -1) {
    categories.value[index].status = category.status === 'active' ? 'paused' : 'active'
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: currency.value,
    minimumFractionDigits: 0,
  }).format(amount)
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-6 p-4 pt-0">
    <div class="grid gap-2 sm:grid-cols-2">
      <!-- Stats Grid: 2x2 -->
      <div class="grid gap-4 sm:grid-cols-2">
        <VotesStatCard v-for="stat in stats" :key="stat.title" :stat="stat" />
      </div>

      <!-- Votes Chart -->
      <VotesChart :hourly-data="hourlyData" :daily-data="dailyData" :monthly-data="monthlyData" />
    </div>

    <!-- Vote Categories Section -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold">Vote Categories</h2>
          <p class="text-sm text-muted-foreground">
            Manage categories and view nominee standings
          </p>
        </div>
        <Button @click="openCreateSheet" class="gap-2">
          <Icon name="lucide:plus" class="size-4" />
          Create Category
        </Button>
      </div>

      <AffiliateEventsVotesVoteCategoriesList :categories="categories" :currency="currency" @edit="openEditSheet"
        @delete="handleDeleteCategory" @toggle-status="handleToggleStatus" />
    </div>

    <!-- Create/Edit Sheet -->
    <AffiliateEventsVotesCategorySheet v-model:open="isSheetOpen" :editing-category="editingCategory"
      @save="handleSaveCategory" />
  </div>
</template>
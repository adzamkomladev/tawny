<script lang="ts" setup>
import type { EventInfo } from '@/components/affiliate/events/overview/EventHeader.vue'
import type { EventStat } from '@/components/affiliate/events/overview/EventStatCard.vue'
import type { QuickAction } from '@/components/affiliate/events/overview/EventQuickActions.vue'
import type { RevenueDataPoint } from '@/components/affiliate/events/overview/EventRevenueChart.vue'
import type { ActivityItem } from '@/components/affiliate/events/overview/EventActivityFeed.vue'
import type { TopTicket, TopCategory } from '@/components/affiliate/events/overview/EventTopPerformers.vue'
import EventHeader from '@/components/affiliate/events/overview/EventHeader.vue'
import EventStatCard from '@/components/affiliate/events/overview/EventStatCard.vue'
import EventQuickActions from '@/components/affiliate/events/overview/EventQuickActions.vue'
import EventRevenueChart from '@/components/affiliate/events/overview/EventRevenueChart.vue'
import EventActivityFeed from '@/components/affiliate/events/overview/EventActivityFeed.vue'
import EventTopPerformers from '@/components/affiliate/events/overview/EventTopPerformers.vue'

definePageMeta({
  layout: 'affiliate',
})

const route = useRoute()
const eventId = computed(() => route.params.id as string)

// Mock event data - replace with API call
const event = ref<EventInfo>({
  id: eventId.value,
  name: 'Ghana Music Awards 2025',
  date: '2025-06-15',
  time: '6:00 PM - 11:00 PM',
  location: 'Accra International Conference Centre',
  status: 'published',
  hasTickets: true,
  hasVoting: true,
})

// Stats data
const stats = computed<EventStat[]>(() => [
  {
    label: 'Total Revenue',
    value: 'GHS 45,230',
    change: 12.5,
    changeLabel: 'vs last week',
    trend: 'up',
    icon: 'lucide:wallet',
    iconBgClass: 'bg-emerald-500/15',
  },
  {
    label: 'Tickets Sold',
    value: 1284,
    change: 8.2,
    changeLabel: 'vs last week',
    trend: 'up',
    icon: 'lucide:ticket',
    iconBgClass: 'bg-blue-500/15',
  },
  {
    label: 'Total Votes',
    value: 8542,
    change: 23.1,
    changeLabel: 'vs last week',
    trend: 'up',
    icon: 'lucide:vote',
    iconBgClass: 'bg-purple-500/15',
  },
  {
    label: 'Check-ins',
    value: 0,
    trend: 'neutral',
    icon: 'lucide:scan-line',
    iconBgClass: 'bg-amber-500/15',
  },
])

// Quick actions
const quickActions = computed<QuickAction[]>(() => {
  const actions: QuickAction[] = []
  if (event.value.hasTickets) {
    actions.push({
      label: 'Tickets',
      icon: 'lucide:ticket',
      href: `/affiliate/events/${eventId.value}/tickets`,
    })
    actions.push({
      label: 'Sales',
      icon: 'lucide:receipt',
      href: `/affiliate/events/${eventId.value}/tickets/sales`,
    })
  }
  if (event.value.hasVoting) {
    actions.push({
      label: 'Votes',
      icon: 'lucide:vote',
      href: `/affiliate/events/${eventId.value}/votes`,
    })
    actions.push({
      label: 'Payments',
      icon: 'lucide:credit-card',
      href: `/affiliate/events/${eventId.value}/votes/payments`,
    })
  }
  return actions
})

// Revenue chart data
const weeklyRevenueData = ref<RevenueDataPoint[]>([
  { period: 'Mon', tickets: 1200, votes: 450 },
  { period: 'Tue', tickets: 1800, votes: 620 },
  { period: 'Wed', tickets: 2400, votes: 890 },
  { period: 'Thu', tickets: 1600, votes: 720 },
  { period: 'Fri', tickets: 3200, votes: 1100 },
  { period: 'Sat', tickets: 4500, votes: 1450 },
  { period: 'Sun', tickets: 2800, votes: 980 },
])

const monthlyRevenueData = ref<RevenueDataPoint[]>([
  { period: 'Week 1', tickets: 8500, votes: 3200 },
  { period: 'Week 2', tickets: 12400, votes: 4800 },
  { period: 'Week 3', tickets: 15800, votes: 5600 },
  { period: 'Week 4', tickets: 18200, votes: 6400 },
])

// Activity feed
const activities = ref<ActivityItem[]>([
  {
    id: '1',
    type: 'ticket_sale',
    description: 'purchased 2 VIP tickets for',
    amount: 400,
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    user: { name: 'Kofi Mensah' },
  },
  {
    id: '2',
    type: 'vote',
    description: 'voted 50 times in Best Artist category',
    amount: 25,
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    user: { name: 'Ama Serwaa' },
  },
  {
    id: '3',
    type: 'ticket_sale',
    description: 'purchased 1 Regular ticket for',
    amount: 100,
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    user: { name: 'Yaw Asante' },
  },
  {
    id: '4',
    type: 'vote',
    description: 'voted 100 times in Best Song category',
    amount: 50,
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    user: { name: 'Efua Darko' },
  },
  {
    id: '5',
    type: 'refund',
    description: 'was refunded for 1 Regular ticket',
    amount: 100,
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
    user: { name: 'Kwame Boateng' },
  },
])

// Top performers
const topTickets = ref<TopTicket[]>([
  { id: '1', name: 'VIP Ticket', sold: 284, total: 500, revenue: 28400 },
  { id: '2', name: 'Regular Ticket', sold: 850, total: 1000, revenue: 8500 },
  { id: '3', name: 'Early Bird', sold: 150, total: 150, revenue: 6000 },
])

const topCategories = ref<TopCategory[]>([
  { id: '1', name: 'Best Artist', votes: 3200, totalVotes: 8542, revenue: 1600, topNominee: 'Shatta Wale' },
  { id: '2', name: 'Best Song', votes: 2800, totalVotes: 8542, revenue: 1400, topNominee: 'Already' },
  { id: '3', name: 'Best Album', votes: 2542, totalVotes: 8542, revenue: 1271, topNominee: 'Gift of God' },
])

// Event actions
const handleEdit = () => {
  navigateTo(`/affiliate/events/${eventId.value}/edit`)
}

const handlePublish = () => {
  event.value.status = 'published'
}

const handleDuplicate = () => {
  // TODO: Implement duplicate
}

const handleDelete = () => {
  // TODO: Implement delete with confirmation
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <!-- Event Header -->
    <EventHeader :event="event" @edit="handleEdit" @publish="handlePublish" @duplicate="handleDuplicate"
      @delete="handleDelete" />

    <!-- Stats Grid -->
    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <EventStatCard v-for="stat in stats" :key="stat.label" :stat="stat" />
    </div>

    <!-- Main Content Grid -->
    <div class="grid gap-4 lg:grid-cols-3">
      <!-- Left Column - Charts -->
      <div class="space-y-4 lg:col-span-2">
        <EventRevenueChart :weekly-data="weeklyRevenueData" :monthly-data="monthlyRevenueData"
          :has-tickets="event.hasTickets" :has-voting="event.hasVoting" />
      </div>

      <!-- Right Column - Quick Actions -->
      <div class="space-y-4">
        <EventQuickActions :actions="quickActions" />
      </div>
    </div>

    <!-- Bottom Grid -->
    <div class="grid gap-4 lg:grid-cols-2">
      <!-- Activity Feed -->
      <EventActivityFeed :activities="activities" />

      <!-- Top Performers -->
      <EventTopPerformers :tickets="topTickets" :categories="topCategories" :has-tickets="event.hasTickets"
        :has-voting="event.hasVoting" />
    </div>
  </div>
</template>
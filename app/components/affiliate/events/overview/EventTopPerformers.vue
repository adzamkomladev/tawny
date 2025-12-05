<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export interface TopTicket {
  id: string
  name: string
  sold: number
  total: number
  revenue: number
}

export interface TopCategory {
  id: string
  name: string
  votes: number
  totalVotes: number
  revenue: number
  topNominee?: string
}

defineProps<{
  tickets?: TopTicket[]
  categories?: TopCategory[]
  hasTickets?: boolean
  hasVoting?: boolean
}>()

const activeTab = ref<'tickets' | 'categories'>('tickets')
</script>

<template>
  <Card class="p-4">
    <CardHeader class="p-0 pb-3">
      <CardTitle class="text-sm font-semibold">Top Performers</CardTitle>
    </CardHeader>
    <CardContent class="p-0">
      <Tabs v-if="hasTickets && hasVoting" v-model="activeTab">
        <TabsList class="mb-3 h-7 w-full">
          <TabsTrigger value="tickets" class="flex-1 text-xs">Tickets</TabsTrigger>
          <TabsTrigger value="categories" class="flex-1 text-xs">Vote Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" class="mt-0 space-y-3">
          <div
            v-for="ticket in tickets"
            :key="ticket.id"
            class="space-y-1.5 rounded-lg p-2 transition-colors hover:bg-muted/50"
          >
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">{{ ticket.name }}</span>
              <span class="text-xs text-muted-foreground">
                {{ ticket.sold }}/{{ ticket.total }}
              </span>
            </div>
            <Progress :model-value="(ticket.sold / ticket.total) * 100" class="h-1.5" />
            <p class="text-xs text-muted-foreground">
              GHS {{ ticket.revenue.toLocaleString() }} revenue
            </p>
          </div>
          <div v-if="!tickets?.length" class="py-4 text-center text-sm text-muted-foreground">
            No ticket sales yet
          </div>
        </TabsContent>

        <TabsContent value="categories" class="mt-0 space-y-3">
          <div
            v-for="category in categories"
            :key="category.id"
            class="space-y-1.5 rounded-lg p-2 transition-colors hover:bg-muted/50"
          >
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">{{ category.name }}</span>
              <span class="text-xs text-muted-foreground">
                {{ category.votes }} votes
              </span>
            </div>
            <Progress :model-value="(category.votes / category.totalVotes) * 100" class="h-1.5" />
            <p class="text-xs text-muted-foreground">
              <span v-if="category.topNominee">🏆 {{ category.topNominee }} • </span>
              GHS {{ category.revenue.toLocaleString() }}
            </p>
          </div>
          <div v-if="!categories?.length" class="py-4 text-center text-sm text-muted-foreground">
            No votes yet
          </div>
        </TabsContent>
      </Tabs>

      <!-- Tickets only view -->
      <div v-else-if="hasTickets" class="space-y-3">
        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          class="space-y-1.5 rounded-lg p-2 transition-colors hover:bg-muted/50"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium">{{ ticket.name }}</span>
            <span class="text-xs text-muted-foreground">
              {{ ticket.sold }}/{{ ticket.total }}
            </span>
          </div>
          <Progress :model-value="(ticket.sold / ticket.total) * 100" class="h-1.5" />
          <p class="text-xs text-muted-foreground">
            GHS {{ ticket.revenue.toLocaleString() }} revenue
          </p>
        </div>
        <div v-if="!tickets?.length" class="py-4 text-center text-sm text-muted-foreground">
          No ticket sales yet
        </div>
      </div>

      <!-- Categories only view -->
      <div v-else-if="hasVoting" class="space-y-3">
        <div
          v-for="category in categories"
          :key="category.id"
          class="space-y-1.5 rounded-lg p-2 transition-colors hover:bg-muted/50"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium">{{ category.name }}</span>
            <span class="text-xs text-muted-foreground">
              {{ category.votes }} votes
            </span>
          </div>
          <Progress :model-value="(category.votes / category.totalVotes) * 100" class="h-1.5" />
          <p class="text-xs text-muted-foreground">
            <span v-if="category.topNominee">🏆 {{ category.topNominee }} • </span>
            GHS {{ category.revenue.toLocaleString() }}
          </p>
        </div>
        <div v-if="!categories?.length" class="py-4 text-center text-sm text-muted-foreground">
          No votes yet
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export interface VotingCategory {
  id: string | number
  name: string
  description?: string
  nominees: Nominee[]
  votingPrice: number
  currency: string
  totalVotes: number
  endsAt?: string
  showVoteStats?: boolean
}

export interface Nominee {
  id: string | number
  name: string
  photo?: string
  code: string
  votes: number
}

defineProps<{
  categories: VotingCategory[]
  isLive: boolean
}>()

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatPrice(price: number, currency: string): string {
  return `${currency}${price.toLocaleString()}`
}

function getVotePercentage(votes: number, total: number): number {
  if (total === 0) return 0
  return (votes / total) * 100
}
</script>

<template>
  <Card class="border-border/50 overflow-hidden">
    <CardHeader class="bg-linear-to-r from-primary/5 to-transparent">
      <div class="flex items-center justify-between">
        <CardTitle class="flex items-center gap-2">
          <Icon name="lucide:vote" class="size-5 text-primary" />
          Voting Categories
        </CardTitle>
        <Badge v-if="isLive" class="bg-green-500/10 text-green-600 border-green-500/20">
          <span class="relative flex size-2 mr-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span class="relative inline-flex rounded-full size-2 bg-green-500" />
          </span>
          Voting Open
        </Badge>
      </div>
    </CardHeader>
    <CardContent class="p-0">
      <div class="divide-y divide-border">
        <div
          v-for="category in categories"
          :key="category.id"
          class="p-6 space-y-6"
        >
          <!-- Category Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 class="font-bold text-lg">{{ category.name }}</h4>
              <p v-if="category.description" class="text-sm text-muted-foreground mt-1">
                {{ category.description }}
              </p>
            </div>
            <div class="flex items-center gap-4">
              <div class="text-right">
                <div class="text-xs text-muted-foreground">Vote Price</div>
                <div class="font-bold text-primary">
                  {{ formatPrice(category.votingPrice, category.currency) }}
                </div>
              </div>
              <div v-if="category.showVoteStats !== false" class="text-right">
                <div class="text-xs text-muted-foreground">Total Votes</div>
                <div class="font-bold">{{ category.totalVotes.toLocaleString() }}</div>
              </div>
            </div>
          </div>

          <!-- Nominees Grid -->
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="(nominee, index) in category.nominees"
              :key="nominee.id"
              class="group relative p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 bg-card"
            >
              <!-- Rank Badge for Top 3 -->
              <Badge
                v-if="category.showVoteStats !== false && index < 3"
                :class="[
                  'absolute -top-2 -left-2 size-7 p-0 flex items-center justify-center',
                  index === 0 ? 'bg-yellow-500 text-yellow-950' : '',
                  index === 1 ? 'bg-gray-400 text-gray-950' : '',
                  index === 2 ? 'bg-amber-600 text-amber-950' : '',
                ]"
              >
                {{ index + 1 }}
              </Badge>

              <div class="flex items-center gap-3 mb-3">
                <Avatar class="size-12 border-2 border-border group-hover:border-primary/50 transition-colors">
                  <AvatarImage v-if="nominee.photo" :src="nominee.photo" :alt="nominee.name" />
                  <AvatarFallback class="bg-primary/10 text-primary font-semibold">
                    {{ getInitials(nominee.name) }}
                  </AvatarFallback>
                </Avatar>
                <div class="flex-1 min-w-0">
                  <h5 class="font-semibold truncate group-hover:text-primary transition-colors">
                    {{ nominee.name }}
                  </h5>
                  <div class="text-xs text-muted-foreground font-mono">
                    Code: {{ nominee.code }}
                  </div>
                </div>
              </div>

              <!-- Vote Stats -->
              <div v-if="category.showVoteStats !== false" class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-muted-foreground">{{ nominee.votes.toLocaleString() }} votes</span>
                  <span class="font-medium text-primary">
                    {{ getVotePercentage(nominee.votes, category.totalVotes).toFixed(1) }}%
                  </span>
                </div>
                <div class="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    class="h-full bg-linear-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                    :style="{ width: `${getVotePercentage(nominee.votes, category.totalVotes)}%` }"
                  />
                </div>
              </div>

              <!-- Vote Button -->
              <Button
                v-if="isLive"
                size="sm"
                class="w-full mt-4 gap-2"
              >
                <Icon name="lucide:vote" class="size-4" />
                Vote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

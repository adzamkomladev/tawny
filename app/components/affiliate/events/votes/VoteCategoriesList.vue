<script lang="ts" setup>
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

export interface Nominee {
  id: string
  name: string
  image?: string
  votes: number
  revenue: number
}

export interface VoteCategory {
  id: string
  name: string
  description: string
  pricePerVote: number
  totalVotes: number
  totalRevenue: number
  status: 'active' | 'paused' | 'ended'
  nominees: Nominee[]
}

const props = defineProps<{
  categories: VoteCategory[]
  currency: string
}>()

const emit = defineEmits<{
  edit: [category: VoteCategory]
  delete: [category: VoteCategory]
  toggleStatus: [category: VoteCategory]
}>()

const expandedCategories = ref<Set<string>>(new Set())

const toggleExpanded = (categoryId: string) => {
  if (expandedCategories.value.has(categoryId)) {
    expandedCategories.value.delete(categoryId)
  } else {
    expandedCategories.value.add(categoryId)
  }
}

const isExpanded = (categoryId: string) => expandedCategories.value.has(categoryId)

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return { variant: 'default' as const, label: 'Active' }
    case 'paused':
      return { variant: 'secondary' as const, label: 'Paused' }
    case 'ended':
      return { variant: 'destructive' as const, label: 'Ended' }
    default:
      return { variant: 'outline' as const, label: status }
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: props.currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

const getTopNominee = (nominees: Nominee[]) => {
  if (!nominees.length) return null
  return nominees.reduce((a, b) => (a.votes > b.votes ? a : b))
}

const getNomineePercentage = (nominee: Nominee, category: VoteCategory) => {
  if (category.totalVotes === 0) return 0
  return Math.round((nominee.votes / category.totalVotes) * 100)
}
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <Card v-for="category in categories" :key="category.id" class="overflow-hidden">
      <Collapsible :open="isExpanded(category.id)" @update:open="toggleExpanded(category.id)">
        <CardHeader class="pb-3">
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <CardTitle class="text-base truncate">{{ category.name }}</CardTitle>
                <Badge :variant="getStatusBadge(category.status).variant" class="shrink-0">
                  {{ getStatusBadge(category.status).label }}
                </Badge>
              </div>
              <p class="text-sm text-muted-foreground line-clamp-2">
                {{ category.description }}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon" class="size-8 shrink-0">
                  <Icon name="lucide:more-vertical" class="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem @click="emit('edit', category)">
                  <Icon name="lucide:pencil" class="size-4 mr-2" />
                  Edit Category
                </DropdownMenuItem>
                <DropdownMenuItem @click="emit('toggleStatus', category)">
                  <Icon
                    :name="category.status === 'active' ? 'lucide:pause' : 'lucide:play'"
                    class="size-4 mr-2"
                  />
                  {{ category.status === 'active' ? 'Pause Voting' : 'Resume Voting' }}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="text-destructive" @click="emit('delete', category)">
                  <Icon name="lucide:trash-2" class="size-4 mr-2" />
                  Delete Category
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent class="pb-3 space-y-3">
          <div class="grid grid-cols-3 gap-3 text-center">
            <div class="bg-muted/50 rounded-lg p-2">
              <p class="text-lg font-bold">{{ category.totalVotes.toLocaleString() }}</p>
              <p class="text-xs text-muted-foreground">Total Votes</p>
            </div>
            <div class="bg-muted/50 rounded-lg p-2">
              <p class="text-lg font-bold">{{ formatCurrency(category.totalRevenue) }}</p>
              <p class="text-xs text-muted-foreground">Revenue</p>
            </div>
            <div class="bg-muted/50 rounded-lg p-2">
              <p class="text-lg font-bold">{{ formatCurrency(category.pricePerVote) }}</p>
              <p class="text-xs text-muted-foreground">Per Vote</p>
            </div>
          </div>

          <!-- Top Nominee Preview -->
          <div v-if="getTopNominee(category.nominees)" class="flex items-center gap-3 p-2 bg-primary/5 rounded-lg">
            <div class="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Icon name="lucide:trophy" class="size-5 text-primary" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium truncate">{{ getTopNominee(category.nominees)?.name }}</p>
              <p class="text-xs text-muted-foreground">
                Leading with {{ getTopNominee(category.nominees)?.votes.toLocaleString() }} votes
              </p>
            </div>
          </div>

          <!-- Nominees List (Collapsible) -->
          <CollapsibleContent>
            <Separator class="my-3" />
            <div class="space-y-2">
              <p class="text-sm font-semibold text-muted-foreground">All Nominees</p>
              <div class="space-y-2">
                <div
                  v-for="(nominee, index) in category.nominees"
                  :key="nominee.id"
                  class="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div class="size-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium shrink-0">
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2 mb-1">
                      <p class="text-sm font-medium truncate">{{ nominee.name }}</p>
                      <span class="text-xs text-muted-foreground shrink-0">
                        {{ nominee.votes.toLocaleString() }} votes
                      </span>
                    </div>
                    <Progress :model-value="getNomineePercentage(nominee, category)" class="h-1.5" />
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </CardContent>
        <CardFooter class="border-t bg-muted/30 pt-3">
          <CollapsibleTrigger as-child>
            <Button variant="ghost" size="sm" class="w-full gap-2">
              <Icon
                :name="isExpanded(category.id) ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                class="size-4"
              />
              {{ isExpanded(category.id) ? 'Hide Nominees' : `Show ${category.nominees.length} Nominees` }}
            </Button>
          </CollapsibleTrigger>
        </CardFooter>
      </Collapsible>
    </Card>
  </div>
</template>

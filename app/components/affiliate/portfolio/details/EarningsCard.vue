<script setup lang="ts">
import type { TeamEarnings } from '~~/types/affiliate/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const props = defineProps<{
  earnings: TeamEarnings;
}>();

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (date: Date | string | null) => {
  if (!date) return 'No payouts yet';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const earningsBreakdown = computed(() => [
  {
    label: 'Total Revenue',
    value: props.earnings.totalRevenue,
    icon: 'lucide:banknote',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Platform Fees',
    value: props.earnings.totalFees,
    icon: 'lucide:percent',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
  {
    label: 'Your Share (20%)',
    value: props.earnings.affiliateShare,
    icon: 'lucide:wallet',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
]);

const payoutProgress = computed(() => {
  if (props.earnings.affiliateShare === 0) return 0;
  return Math.min((props.earnings.pendingPayout / props.earnings.affiliateShare) * 100, 100);
});
</script>

<template>
  <Card>
    <CardHeader class="pb-3">
      <CardTitle class="text-lg font-semibold flex items-center gap-2">
        <Icon name="lucide:trending-up" class="h-5 w-5 text-primary" />
        Earnings Overview
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-6">
      <!-- Earnings breakdown -->
      <div class="grid gap-4 md:grid-cols-3">
        <div
          v-for="item in earningsBreakdown"
          :key="item.label"
          class="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 p-4"
        >
          <div :class="[item.bgColor, 'rounded-lg p-2.5']">
            <Icon :name="item.icon" :class="[item.color, 'h-5 w-5']" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">{{ item.label }}</p>
            <p class="text-lg font-bold tabular-nums">{{ formatCurrency(item.value) }}</p>
          </div>
        </div>
      </div>

      <!-- Pending payout section -->
      <div class="rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <Icon name="lucide:clock" class="h-4 w-4 text-primary" />
            <span class="text-sm font-medium">Pending Payout</span>
          </div>
          <span class="text-lg font-bold text-primary tabular-nums">
            {{ formatCurrency(earnings.pendingPayout) }}
          </span>
        </div>
        <Progress :model-value="payoutProgress" class="h-2" />
        <p class="text-xs text-muted-foreground mt-2">
          Last payout: {{ formatDate(earnings.lastPayoutDate) }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>

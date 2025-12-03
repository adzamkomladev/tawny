<script lang="ts" setup>
import type { PortfolioStatsResponse } from '~~/types/affiliate/portfolio';

definePageMeta({
  layout: 'affiliate'
});
useBreadcrumb().setBreadcrumbs([
  { text: 'Home', url: '/affiliate/home' },
  { text: 'Portfolios', url: '/affiliate/portfolios' },
]);

const stats = ref<PortfolioStatsResponse['stats'] | null>(null);
const isLoading = ref(true);

const { getStats } = usePortfolio();

onMounted(async () => {
  const { stats: fetchedStats } = await getStats();
  stats.value = fetchedStats;
  isLoading.value = false;
});

const hasTeams = computed(() => stats.value && stats.value.totalTeams.value > 0);
</script>

<template>
  <AffiliatePortfolioNoTeamsState v-if="!isLoading && !hasTeams" />

  <!-- Loading state -->
  <div v-else-if="isLoading" class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <div class="grid auto-rows-min gap-4 md:grid-cols-3">
      <AffiliatePortfolioStatCardSkeleton v-for="i in 3" :key="i" />
    </div>
  </div>

  <!-- Stats content -->
  <div v-else class="flex flex-1 flex-col gap-6 p-4 pt-0">
    <div class="grid auto-rows-min gap-4 md:grid-cols-3">
      <AffiliatePortfolioStatCard v-if="stats?.totalTeams" :stat="stats.totalTeams" icon="lucide:users" />
      <AffiliatePortfolioStatCard v-if="stats?.totalEvents" :stat="stats.totalEvents" icon="lucide:calendar" />
      <AffiliatePortfolioStatCard v-if="stats?.liveEvents" :stat="stats.liveEvents" icon="lucide:radio" />
    </div>

    <!-- Teams List -->
    <AffiliatePortfolioTeamsList />
  </div>
</template>
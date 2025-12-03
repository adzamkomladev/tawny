<script lang="ts" setup>
import type { TeamDetails } from '~~/types/affiliate/portfolio';
import { Button } from '@/components/ui/button';

definePageMeta({
  layout: 'affiliate'
});

useHead({
  title: 'Team Portfolio'
});

const route = useRoute();
const teamId = computed(() => route.params.id as string);

const team = ref<TeamDetails | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);
const isEditSheetOpen = ref(false);

const { getTeamDetails } = usePortfolio();

const fetchTeamDetails = async () => {
  isLoading.value = true;
  error.value = null;

  const { data, error: fetchError } = await getTeamDetails(teamId.value);

  if (fetchError || !data) {
    error.value = fetchError || 'Failed to load team details';
    isLoading.value = false;
    return;
  }

  team.value = data.data;
  isLoading.value = false;

  // Update page title and breadcrumbs
  useHead({
    title: team.value?.name || 'Team Portfolio'
  });

  useBreadcrumb().setBreadcrumbs([
    { text: 'Home', url: '/affiliate/home' },
    { text: 'Portfolios', url: '/affiliate/portfolios' },
    { text: team.value?.name || 'Team', url: `/affiliate/portfolios/${teamId.value}` },
  ]);
};

const handleTeamUpdated = () => {
  fetchTeamDetails();
};

const openEditSheet = () => {
  isEditSheetOpen.value = true;
};

onMounted(() => {
  fetchTeamDetails();
});
</script>

<template>
  <div class="flex flex-1 flex-col gap-6 p-4 pt-0">
    <!-- Loading state -->
    <AffiliatePortfolioDetailsLoadingSkeleton v-if="isLoading" />

    <!-- Error state -->
    <div v-else-if="error" class="flex flex-1 items-center justify-center">
      <div class="text-center space-y-4">
        <div class="mx-auto rounded-full bg-destructive/10 p-4 w-fit">
          <Icon name="lucide:alert-circle" class="h-8 w-8 text-destructive" />
        </div>
        <div>
          <h3 class="text-lg font-semibold">Failed to load team</h3>
          <p class="text-muted-foreground">{{ error }}</p>
        </div>
        <Button variant="outline" @click="fetchTeamDetails">
          <Icon name="lucide:refresh-cw" class="mr-2 h-4 w-4" />
          Try again
        </Button>
      </div>
    </div>

    <!-- Team content -->
    <template v-else-if="team">
      <!-- Header with team info -->
      <AffiliatePortfolioDetailsTeamHeader :team="team" @edit="openEditSheet" />

      <!-- Quick stats -->
      <AffiliatePortfolioDetailsStatsGrid :total-events="team.stats.totalEvents" :live-events="team.stats.liveEvents"
        :total-tickets-sold="team.stats.totalTicketsSold" />

      <!-- Quick actions -->
      <AffiliatePortfolioDetailsQuickActions :team-id="team.id" :team-slug="team.slug" />

      <!-- Earnings overview -->
      <AffiliatePortfolioDetailsEarningsCard :earnings="team.earnings" />

      <!-- Recent events -->
      <AffiliatePortfolioDetailsEventsList :events="team.recentEvents" :team-id="team.id" />

      <!-- Edit team sheet -->
      <AffiliatePortfolioDetailsEditTeamSheet :team="team" :open="isEditSheetOpen"
        @update:open="isEditSheetOpen = $event" @updated="handleTeamUpdated" />
    </template>
  </div>
</template>
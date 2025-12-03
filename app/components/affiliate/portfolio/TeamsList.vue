<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationFirst,
    PaginationLast,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


const { getPortfoliosPaginated } = usePortfolio();

const searchInput = ref('');
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = 12;

const isLoading = ref(true);
const teams = ref<any[]>([]);
const meta = ref({
  page: 1,
  size: pageSize,
  total: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
});

const debouncedSearch = useDebounceFn((value: string) => {
  searchQuery.value = value;
  currentPage.value = 1;
}, 300);

watch(searchInput, (value) => {
  debouncedSearch(value);
});

async function fetchTeams() {
  isLoading.value = true;

  const { data, error } = await getPortfoliosPaginated({
    page: currentPage.value,
    size: pageSize,
    search: searchQuery.value ?? '',
  });

  if (!error && data) {
    teams.value = data.teams;
    meta.value = data.meta;
  }

  isLoading.value = false;
}

watch([currentPage, searchQuery], () => {
  fetchTeams();
}, { immediate: true });

function handlePageChange(page: number) {
  currentPage.value = page;
}
</script>

<template>
  <div class="space-y-4">
    <!-- Header with Search -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-lg font-semibold text-foreground">Your Teams</h2>
        <p class="text-sm text-muted-foreground">
          {{ meta.total }} {{ meta.total === 1 ? 'team' : 'teams' }} in your portfolio
        </p>
      </div>

      <div class="relative w-full sm:w-72">
        <Icon
          name="lucide:search"
          class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          v-model="searchInput"
          type="search"
          placeholder="Search teams..."
          class="pl-9"
        />
      </div>
    </div>

    <!-- Loading State -->
    <template v-if="isLoading">
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AffiliatePortfolioTeamCardSkeleton v-for="i in pageSize" :key="i" />
      </div>
    </template>

    <!-- Empty State -->
    <template v-else-if="teams.length === 0">
      <div class="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12">
        <Icon
          :name="searchQuery ? 'lucide:search-x' : 'lucide:users'"
          class="h-12 w-12 text-muted-foreground/50"
        />
        <h3 class="mt-4 text-sm font-medium text-foreground">
          {{ searchQuery ? 'No teams found' : 'No teams yet' }}
        </h3>
        <p class="mt-1 text-sm text-muted-foreground">
          {{ searchQuery ? 'Try adjusting your search query' : 'Teams you bring in will appear here' }}
        </p>
        <Button v-if="searchQuery" variant="outline" size="sm" class="mt-4" @click="searchInput = ''">
          Clear search
        </Button>
      </div>
    </template>

    <!-- Teams Grid -->
    <template v-else>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AffiliatePortfolioTeamCard v-for="team in teams" :key="team.id" :team="team" />
      </div>

      <!-- Pagination -->
      <div v-if="meta.totalPages > 1" class="flex items-center justify-between pt-2">
        <p class="text-sm text-muted-foreground">
          Showing {{ (meta.page - 1) * meta.size + 1 }}-{{ Math.min(meta.page * meta.size, meta.total) }}
          of {{ meta.total }}
        </p>

        <Pagination
          :total="meta.total"
          :default-page="1"
          :sibling-count="1"
          :items-per-page="meta.size"
          show-edges
          :page="meta.page"
          @update:page="handlePageChange"
        >
          <PaginationContent v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst />
            <PaginationPrevious />

            <template v-for="(item, index) in items" :key="index">
              <PaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === meta.page">
                {{ item.value }}
              </PaginationItem>
              <PaginationEllipsis v-else :index="index" />
            </template>

            <PaginationNext />
            <PaginationLast />
          </PaginationContent>
        </Pagination>
      </div>
    </template>
  </div>
</template>

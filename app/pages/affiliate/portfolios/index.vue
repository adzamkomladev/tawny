<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

definePageMeta({
  layout: 'affiliate'
});
useBreadcrumb().setBreadcrumbs([
  { text: 'Home', url: '/affiliate/home' },
  { text: 'Portfolios', url: '/affiliate/portfolios' },
]);
const team = null;
</script>

<template>
  <Empty v-if="!team">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Icon name="lucide:user-plus" />
      </EmptyMedia>
      <EmptyTitle>No Teams Yet</EmptyTitle>
      <EmptyDescription>
        You haven't created any teams yet. Get started by creating your first
        team.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <div class="flex gap-2">
        <Button as-child>
          <NuxtLink to="/affiliate/teams/new">Create Team</NuxtLink>
        </Button>
      </div>
    </EmptyContent>
    <Button variant="link" as-child class="text-muted-foreground" size="sm">
      <NuxtLink to="/affiliate/home">
        Learn More
        <ArrowUpRightIcon />
        <Icon name="lucide:arrow-up-right" class="inline-block h-4 w-4" />
      </NuxtLink>
    </Button>
  </Empty>
  <div v-else class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <div class="grid auto-rows-min gap-4 md:grid-cols-3">
      <div class="bg-muted/50 aspect-video rounded-xl" />
      <div class="bg-muted/50 aspect-video rounded-xl" />
      <div class="bg-muted/50 aspect-video rounded-xl" />
    </div>
    <div class="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
  </div>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Icon name="lucide:users" />
      </EmptyMedia>
      <EmptyTitle>No Teams Yet</EmptyTitle>
      <EmptyDescription>
        You haven't onboarded any teams yet. Get started by creating your first
        team and inviting an organizer.
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
        <Icon name="lucide:arrow-up-right" class="inline-block h-4 w-4" />
      </NuxtLink>
    </Button>
  </Empty>
</template>

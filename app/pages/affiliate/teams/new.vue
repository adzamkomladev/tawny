<script lang="ts" setup>
import NewTeamForm from '@/components/affiliate/teams/new/Form.vue';

definePageMeta({
  layout: 'affiliate'
});

useHead({
  title: 'New Team'
});

useBreadcrumb().setBreadcrumbs([
  { text: 'Home', url: '/affiliate/home' },
  { text: 'New Team', url: `/affiliate/teams/new` },
]);
</script>

<template>
  <div class="mx-auto max-w-3xl flex-1 space-y-8 p-8 pt-6">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold tracking-tight text-foreground">Team details</h1>
      <p class="text-muted-foreground">
        This information shows up anywhere your ticketing, payments, or live voting modules mention the team.
      </p>
    </div>

    <NewTeamForm />
  </div>
</template>
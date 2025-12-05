<script lang="ts" setup>
import NewEventForm from '@/components/affiliate/events/new/Form.vue';

definePageMeta({
  layout: 'affiliate',
});

useHead({
  title: 'New Event',
});

useBreadcrumb().setBreadcrumbs([
  { text: 'Home', url: '/affiliate/home' },
  { text: 'New Event', url: '/affiliate/events/new' },
]);
</script>

<template>
  <div class="mx-auto max-w-4xl flex-1 space-y-8 p-8 pt-6">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold tracking-tight text-foreground">Create event</h1>
      <p class="text-muted-foreground">
        Set up a new event with ticketing, payments, and live voting capabilities.
      </p>
    </div>

    <NewEventForm />
  </div>
</template>
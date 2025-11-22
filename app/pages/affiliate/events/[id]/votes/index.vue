<script lang="ts" setup>
definePageMeta({
  layout: 'affiliate'
});

const route = useRoute();

useBreadcrumb().setBreadcrumbs([
  { text: 'Home', url: '/affiliate/home' },
  { text: 'Event', url: `/affiliate/events/${route.params.id}` },
  { text: 'Votes', url: `/affiliate/events/${route.params.id}/votes` },
]);
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <div class="grid auto-rows-min gap-4 md:grid-cols-3">
      <div class="bg-muted/50 aspect-video rounded-xl" />
      <div class="bg-muted/50 aspect-video rounded-xl" />
      <div class="bg-muted/50 aspect-video rounded-xl" />
    </div>
    <div class="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
  </div>
</template>
<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";

useHead({
  titleTemplate: (titleChunk?: string) =>
    titleChunk
      ? `${titleChunk} - Tix4u Tickets and Voting`
      : "Tix4u Tickets and Voting",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster richColors position="bottom-left" />
  </NuxtLayout>
</template>

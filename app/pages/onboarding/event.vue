<script lang="ts" setup>
import {
  FieldDescription,
} from "@/components/ui/field";
import EventForm from "~/components/onboarding/EventForm.vue";

definePageMeta({
  layout: 'onboarding'
});

useHead({
  title: 'Create your event'
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <FieldGroup>
      <div class="flex flex-col items-center gap-2 text-center">
        <NuxtLink to="/" class="flex items-center gap-2 font-medium">
          <NuxtImg src="/svg/logo.svg" alt="Tix4u Logo" class="w-24" />
        </NuxtLink>
        <h1 class="text-xl font-bold">
          Create an event
        </h1>
        <FieldDescription>
          Set up your event.
        </FieldDescription>
      </div>
      <EventForm />
    </FieldGroup>
  </div>
</template>
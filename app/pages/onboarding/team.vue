<script lang="ts" setup>
import {
  FieldDescription,
} from "@/components/ui/field";
import TeamForm from "~/components/onboarding/TeamForm.vue";

definePageMeta({
  layout: 'onboarding',
  middleware: [
    function () {
      const { needsTeam } = useAuth();

      if (!needsTeam.value) {
        return navigateTo('/home');
      }
    },
  ],
});

useHead({
  title: 'Create your team'
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
          Create your team
        </h1>
        <FieldDescription>
          Set up your team to start organizing events.
        </FieldDescription>
      </div>
      <TeamForm />
    </FieldGroup>
  </div>
</template>
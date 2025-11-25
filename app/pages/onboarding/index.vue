<script lang="ts" setup>
import {
  Field,
  FieldDescription,
  FieldSeparator,
} from "@/components/ui/field";
import Form from "@/components/onboarding/index/Form.vue";

definePageMeta({
  layout: 'onboarding'
});

useHead({
  title: 'Pick a role'
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
          Let's get started!
        </h1>
        <FieldDescription>
          How are you planning to use Tix4u?
        </FieldDescription>
      </div>
      <Form />
    </FieldGroup>
    <FieldDescription class="px-6 text-center">
      By clicking continue, you agree to our <a href="#">Terms of Service</a>
      and <a href="#">Privacy Policy</a>.
    </FieldDescription>
  </div>
</template>
<script lang="ts" setup>
import {
  Field,
  FieldDescription,
  FieldSeparator,
} from "@/components/ui/field";
import AffiliateForm from "~/components/onboarding/AffiliateForm.vue";

definePageMeta({
  layout: 'onboarding'
});

useHead({
  title: 'Affiliate Verification'
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
          Affiliate Verification
        </h1>
        <FieldDescription>
          Enter the unique affiliate code sent to you.
        </FieldDescription>
      </div>
      <AffiliateForm />
    </FieldGroup>
    <FieldDescription class="px-6 text-center">
      By verifying, you agree to our Affiliate <a href="#">Terms of Service</a>
      and <a href="#">Privacy Policy</a>.
    </FieldDescription>
  </div>
</template>
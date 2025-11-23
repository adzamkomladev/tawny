<script lang="ts" setup>
import {
  Field,
  FieldDescription,
} from "@/components/ui/field";

import EmailForm from "@/components/auth/email/Form.vue";

definePageMeta({
  layout: 'auth'
});

useHead({
  title: 'Email Verification'
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col items-center gap-1 text-center">
      <h1 class="text-2xl font-bold">
        Enter verification code
      </h1>
      <p class="text-muted-foreground text-sm text-balance">
        We sent a 6-digit code to your email.
      </p>
    </div>

    <EmailForm />

    <Field>
      <FieldDescription class="px-6 text-center">
        Didn't receive the code? <NuxtLink to="/email/verify">Resend</NuxtLink>
      </FieldDescription>
    </Field>
  </div>
</template>
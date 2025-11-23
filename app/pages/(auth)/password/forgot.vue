<script lang="ts" setup>
import ForgotForm from "~/components/auth/password/ForgotForm.vue";

definePageMeta({
  layout: 'auth'
});

useHead({
  title: 'Forgot Password'
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col items-center gap-1 text-center">
      <h1 class="text-2xl font-bold">
        Forgot Password
      </h1>
      <p class="text-muted-foreground text-sm text-balance">
        Enter the email address associated with your account.
      </p>
    </div>

    <ForgotForm />
  </div>
</template>
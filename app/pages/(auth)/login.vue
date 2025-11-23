<script lang="ts" setup>
import {
  Field,
  FieldDescription,
  FieldSeparator,
} from "@/components/ui/field";

import LoginForm from "@/components/auth/login/Form.vue";
import GoogleButton from "@/components/auth/buttons/Google.vue";

definePageMeta({
  layout: 'auth'
});

useHead({
  title: 'Welcome back'
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col items-center gap-1 text-center">
      <h1 class="text-2xl font-bold">
        Login to your account
      </h1>
      <p class="text-muted-foreground text-sm text-balance">
        Enter your email below to login to your account
      </p>
    </div>

    <LoginForm />

    <FieldSeparator>Or continue with</FieldSeparator>

    <Field>
      <GoogleButton />

      <FieldDescription class="px-6 text-center">
        Don't have an account? <NuxtLink to="/register">Sign up</NuxtLink>
      </FieldDescription>
    </Field>
  </div>
</template>
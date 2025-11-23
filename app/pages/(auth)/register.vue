<script setup lang="ts">
import {
  Field,
  FieldDescription,
  FieldSeparator,
} from "@/components/ui/field";
import RegisterForm from "@/components/auth/register/Form.vue";
import GoogleButton from "@/components/auth/buttons/Google.vue";

definePageMeta({
  layout: 'auth'
});

useHead({
  title: 'Create your account'
});

</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col items-center gap-1 text-center">
      <h1 class="text-2xl font-bold">
        Create your account
      </h1>
      <p class="text-muted-foreground text-sm text-balance">
        Fill in the form below to create your account
      </p>
    </div>

    <RegisterForm />

    <FieldSeparator>Or continue with</FieldSeparator>

    <Field>
      <GoogleButton />

      <FieldDescription class="px-6 text-center">
        Already have an account? <NuxtLink to="/login">Sign in</NuxtLink>
      </FieldDescription>
    </Field>
  </div>
</template>


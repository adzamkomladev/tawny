<script setup lang="ts">
import {
  Field,
  FieldDescription,
  FieldSeparator,
} from "@/components/ui/field";
import ResetForm from "~/components/auth/password/ResetForm.vue";

definePageMeta({
  layout: 'auth'
});

useHead({
  title: 'Reset your password'
});

</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col items-center gap-1 text-center">
      <h1 class="text-2xl font-bold">
        Reset your password
      </h1>
      <p class="text-muted-foreground text-sm text-balance">
        Fill in the form below to reset your password
      </p>
    </div>

    <ResetForm />

    <FieldSeparator></FieldSeparator>

    <Field>
      <FieldDescription class="px-6 text-center">
        Remember your password? <NuxtLink to="/login">Sign in</NuxtLink>
      </FieldDescription>
    </Field>
  </div>
</template>


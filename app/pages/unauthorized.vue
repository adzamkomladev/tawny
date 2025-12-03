<script lang="ts" setup>
import { Button } from '@/components/ui/button';

definePageMeta({
  layout: 'auth',
});
useHead({
  title: 'Unauthorized Access'
});

const goBack = () => useRouter().back();
</script>

<template>
  <div class="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
    <div class="flex flex-col items-center gap-6">
      <div class="flex size-16 items-center justify-center rounded-full bg-destructive/10">
        <Icon name="lucide:shield-x" class="size-8 text-destructive" />
      </div>

      <div class="flex flex-col gap-2">
        <h1 class="text-2xl font-semibold text-foreground">Access Denied</h1>
        <p class="max-w-sm text-muted-foreground">
          You don't have permission to view this page. Please contact support if you believe this is an error.
        </p>
      </div>

      <div class="flex gap-3">
        <Button variant="outline" @click="goBack">
          <Icon name="lucide:arrow-left" class="mr-2 size-4" />
          Go Back
        </Button>
        <Button as-child>
          <NuxtLink to="/login">
            <Icon name="lucide:log-in" class="mr-2 size-4" />
            Sign In
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>
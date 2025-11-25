<script lang="ts" setup>
import { Button } from "@/components/ui/button";

defineProps<{
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  text?: string;
}>();
</script>
<template>
  <Button :disabled="disabled" type="submit" class="cursor-pointer w-full" :loading="loading"
    :loading-text="loadingText">
    <template v-if="loading">
      <Icon name="lucide:loader-2" class="mr-2 size-4 animate-spin" />
      {{ loadingText ?? 'Submitting...' }}
    </template>
    <template v-else>{{ text ?? 'Submit' }}</template>
  </Button>
</template>

<script lang="ts" setup>
import {
  Field,
  FieldDescription,
  FieldSeparator,
} from "@/components/ui/field";
import AffiliateForm from "~/components/onboarding/AffiliateForm.vue";

definePageMeta({
  layout: 'onboarding',
  middleware: [
    function () {
      if (useAuth().user.value?.affiliate?.verified) {
        return navigateTo('/affiliate/home');
      }
    },
  ],
});

useHead({
  title: 'Affiliate Verification'
});

const isClearing = ref(false);

const clearRole = async () => {
  isClearing.value = true;
  const success = await useOnboarding().clearRole();
  await useAuth().refreshUser();
  isClearing.value = false;

  if (success) {
    await navigateTo('/onboarding');
  }
}
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
      <AffiliateForm :is-clearing="isClearing" />
    </FieldGroup>
    <FieldDescription class="px-6 text-center">
      By verifying, you agree to our Affiliate <a href="#">Terms of Service</a>
      and <a href="#">Privacy Policy</a>.
    </FieldDescription>
    <div class="text-center">
      <Button class="cursor-pointer" variant="link" :disabled="isClearing" @click="clearRole">
        <Icon v-if="isClearing" name="lucide:loader-2" class="animate-spin" />
        <Icon v-else name="lucide:arrow-left" />
        Choose a different role
      </Button>
    </div>
  </div>
</template>
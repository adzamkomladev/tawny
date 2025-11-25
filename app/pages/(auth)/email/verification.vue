<script lang="ts" setup>
import {
  Field,
  FieldDescription,
} from "@/components/ui/field";
import { toast } from "vue-sonner";

definePageMeta({
  layout: 'auth'
});

useHead({
  title: 'Email Verification'
});

const { user } = useAuth();

const sendEmail = async () => {
  const { error } = await sendVerificationEmail({
    email: user.value?.email || '',
    callbackURL: '/onboarding'
  });

  if (error) {
    toast.error('Failed to send verification email', {
      description: error.message,
    });
    return;
  }

  toast.success('Verification email sent', {
    description: 'Please check your inbox.',
  });
}

</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col items-center gap-1 text-center">
      <h1 class="text-2xl font-bold">
        Check your mail
      </h1>
      <p class="text-muted-foreground text-sm text-balance">
        We sent a verification link to your email address. Please click the link to verify your email.
      </p>
    </div>

    <NuxtImg src="/svg/auth/verify-email.svg" alt="Email verification illustration" class="mx-auto h-48 w-48" />

    <Field>
      <FieldDescription class="px-6 text-center">
        Didn't receive the link?
        <Button class="cursor-pointer text-muted-foreground p-0 " variant="link" @click="sendEmail">
          Resend
        </Button>
      </FieldDescription>
    </Field>
  </div>
</template>
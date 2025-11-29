<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { toast } from 'vue-sonner';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import SubmitButton from "@/components/common/forms/SubmitButton.vue";
import { verifyAffiliateTokenSchema, type VerifyAffiliateTokenForm } from '~~/schemas/onboarding';

withDefaults(defineProps<{
  isClearing: boolean;
}>(), {
  isClearing: false,
});

const { handleSubmit, defineField, errors, isSubmitting, meta } = useForm<VerifyAffiliateTokenForm>({
  validationSchema: toTypedSchema(verifyAffiliateTokenSchema),
  initialValues: {
    token: '',
  },
});

const [token] = defineField('token');

const onSubmit = handleSubmit(async (payload) => {
  const res = await useOnboarding().verifyAffiliateToken(payload);

  if (!res) {
    toast.error('Invalid verification code', {
      description: 'Please check the code and try again.',
    });
    return;
  }

  toast.success('Verification successful', {
    description: 'Your affiliate account has been verified.',
  });

  await useAuth().refreshUser();

  navigateTo('/affiliate/home');
});
</script>
<template>
  <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
    <FieldGroup>
      <Field>
        <FieldLabel for="token" class="sr-only">
          Verification code
        </FieldLabel>
        <InputOTP id="token" v-model="token" :maxlength="6" required>
          <InputOTPGroup class="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
            <InputOTPSlot :index="0" />
            <InputOTPSlot :index="1" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup class="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
            <InputOTPSlot :index="2" />
            <InputOTPSlot :index="3" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup class="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
            <InputOTPSlot :index="4" />
            <InputOTPSlot :index="5" />
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription class="text-center">
          Enter the 6-digit code sent to your email or phone number.
        </FieldDescription>
        <FieldError v-if="errors.token">{{ errors.token }}</FieldError>
      </Field>

      <Field>
        <SubmitButton :disabled="isSubmitting || !meta.valid || isClearing" :loading="isSubmitting" text="Verify"
          loading-text="Verifying…" />
      </Field>
    </FieldGroup>
  </form>
</template>

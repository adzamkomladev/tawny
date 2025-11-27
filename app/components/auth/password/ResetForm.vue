<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import SubmitButton from "@/components/common/forms/SubmitButton.vue";

import { type ResetPasswordForm, resetPasswordSchema } from "~~/schemas/auth";


const route = useRoute();
const token = computed(() => route.query.token as string | undefined);

if (!token.value) {
  toast.error('Invalid reset link', {
    description: 'The password reset link is invalid or has expired.',
  });
  navigateTo('/password/forgot');
}

const { handleSubmit, defineField, errors, isSubmitting, meta } = useForm<ResetPasswordForm>({
  validationSchema: toTypedSchema(resetPasswordSchema),
  initialValues: {
    password: '',
    confirmPassword: '',
  },
});

const [password, passwordAttrs] = defineField('password');
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword');

const onSubmit = handleSubmit(async (payload) => {
  if (!token.value) {
    toast.error('Invalid reset link', {
      description: 'The password reset link is invalid or has expired.',
    });
    return;
  }

  const { error } = await resetPassword({
    newPassword: payload.password,
    token: token.value,
  });

  if (error) {
    toast.error('Reset failed!', {
      description: error.message,
    });
    return;
  }

  toast.success('Password reset successful!', {
    description: 'You can now login with your new password.',
  });

  navigateTo('/login');
});

</script>
<template>
  <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
    <FieldGroup>

      <Field>
        <FieldLabel for="password">
          New Password
        </FieldLabel>
        <Input v-model="password" v-bind="passwordAttrs" id="password" type="password" required />
        <FieldDescription>
          Must be at least 6 characters with uppercase, number, and special character.
        </FieldDescription>
        <FieldError v-if="errors.password">{{ errors.password }}</FieldError>
      </Field>

      <Field>
        <FieldLabel for="confirmPassword">
          Confirm Password
        </FieldLabel>
        <Input v-model="confirmPassword" v-bind="confirmPasswordAttrs" id="confirmPassword" type="password" required />
        <FieldError v-if="errors.confirmPassword">{{ errors.confirmPassword }}</FieldError>
      </Field>

      <Field>
        <SubmitButton :disabled="isSubmitting || !meta.valid" class="cursor-pointer w-full" :loading="isSubmitting"
          text="Reset Password" loading-text="Resetting…" />
      </Field>

    </FieldGroup>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import SubmitButton from "@/components/common/forms/SubmitButton.vue";

import { type ForgotPasswordForm, forgotPasswordSchema } from "~~/schemas/auth";


const { handleSubmit, defineField, errors, isSubmitting, meta } = useForm<ForgotPasswordForm>({
  validationSchema: toTypedSchema(forgotPasswordSchema),
  initialValues: {
    email: '',
  },
});

const [email, emailAttrs] = defineField('email');

const onSubmit = handleSubmit(async (payload) => {
  const { error } = await requestPasswordReset({
    email: payload.email,
    redirectTo: '/password/reset',
  });

  if (error) {
    toast.error('Request failed!', {
      description: error.message,
    });
    return;
  }

  toast.success('Reset link sent!', {
    description: 'Please check your email for the password reset link.',
  });
});

</script>
<template>
  <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
    <FieldGroup>

      <Field>
        <FieldLabel for="email">
          Email
        </FieldLabel>
        <Input v-model="email" v-bind="emailAttrs" id="email" type="email" placeholder="Eg. komla@example.com"
          required />
        <FieldError v-if="errors.email">{{ errors.email }}</FieldError>
      </Field>

      <Field>
        <SubmitButton :disabled="isSubmitting || !meta.valid" class="cursor-pointer w-full" :loading="isSubmitting"
          text="Send Reset Link" loading-text="Sending…" />
      </Field>

    </FieldGroup>
  </form>
</template>

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

import { type RegisterForm, registerSchema } from "~~/schemas/auth";


const { handleSubmit, defineField, errors, isSubmitting, meta } = useForm<RegisterForm>({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
});

const [name, nameAttrs] = defineField('name');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword');

const onSubmit = handleSubmit(async (payload) => {
  const { error } = await signUp.email({
    name: payload.name,
    email: payload.email,
    password: payload.password
  });

  if (error) {
    toast.error('Registration failed', {
      description: error.message,
    });
    return;
  }

  navigateTo('/email/verification');
});
</script>
<template>
  <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
    <FieldGroup>

      <Field>
        <FieldLabel for="name">
          Full Name
        </FieldLabel>
        <Input v-model="name" v-bind="nameAttrs" id="name" type="text" placeholder="Eg. Michael Scott" required />
        <FieldError v-if="errors.name">{{ errors.name }}</FieldError>
      </Field>
      <Field>
        <FieldLabel for="email">
          Email
        </FieldLabel>
        <Input v-model="email" v-bind="emailAttrs" id="email" type="email" placeholder="Eg. scott@example.com"
          required />
        <FieldError v-if="errors.email">{{ errors.email }}</FieldError>
      </Field>
      <Field>
        <FieldLabel for="password">
          Password
        </FieldLabel>
        <Input v-model="password" v-bind="passwordAttrs" id="password" type="password" placeholder="**********"
          required />
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
          text="Create Account" loading-text="Creating account…" />
      </Field>

    </FieldGroup>
  </form>
</template>

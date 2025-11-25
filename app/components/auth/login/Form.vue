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

import { type LoginForm, loginSchema } from "~~/schemas/auth";


const { handleSubmit, defineField, errors, isSubmitting, meta } = useForm<LoginForm>({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: '',
    password: ''
  },
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit(async (payload) => {
  const { error } = await signIn.email({
    email: payload.email,
    password: payload.password
  });

  if (error) {
    toast.error('Login failed!', {
      description: error.message,
    });
    return;
  }

  navigateTo('/affiliate/home');
});

</script>
<template>
  <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
    <FieldGroup>

      <Field>
        <FieldLabel for=" email">
          Email
        </FieldLabel>
        <Input v-model="email" v-bind="emailAttrs" id="email" type="email" placeholder="Eg. komla@example.com"
          required />
        <FieldError v-if="errors.email">{{ errors.email }}</FieldError>
      </Field>
      <Field>
        <div class="flex items-center">
          <FieldLabel for="password">
            Password
          </FieldLabel>
          <NuxtLink to="/password/forgot" class="ml-auto text-sm underline-offset-4 hover:underline">
            Forgot your password?
          </NuxtLink>
        </div>
        <Input v-model="password" v-bind="passwordAttrs" id="password" type="password" required />
        <FieldError v-if="errors.password">{{ errors.password }}</FieldError>
      </Field>
      <Field>
        <SubmitButton :disabled="isSubmitting || !meta.valid" class="cursor-pointer w-full" :loading="isSubmitting"
          text="Login" loading-text="Logging in…" />
      </Field>

    </FieldGroup>
  </form>
</template>

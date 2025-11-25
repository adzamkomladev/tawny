<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { type RegisterForm, registerSchema } from "~~/schemas/auth";


const form = useForm<RegisterForm>({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
});

const { handleSubmit, values, setFieldValue, isSubmitting } = form;


const onSubmit = handleSubmit(async (payload) => {
  const { error } = await signUp.email({
    name: payload.name,
    email: payload.email,
    password: payload.password,
    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(payload.name)}&background=random&size=128`,
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
        <Input id="name" type="text" placeholder="John Doe" required />
      </Field>
      <Field>
        <FieldLabel for="email">
          Email
        </FieldLabel>
        <Input id="email" type="email" placeholder="m@example.com" required />
        <FieldDescription>
          We'll use this to contact you. We will not share your email
          with anyone else.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel for="password">
          Password
        </FieldLabel>
        <Input id="password" type="password" required />
        <FieldDescription>
          Must be at least 8 characters long.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel for="confirm-password">
          Confirm Password
        </FieldLabel>
        <Input id="confirm-password" type="password" required />
        <FieldDescription>Please confirm your password.</FieldDescription>
      </Field>
      <Field>
        <Button type="submit">
          Create Account
        </Button>
      </Field>

    </FieldGroup>
  </form>
</template>

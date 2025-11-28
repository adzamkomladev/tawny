<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { toast } from 'vue-sonner';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import SubmitButton from "@/components/common/forms/SubmitButton.vue";

import { onboardingRoleSchema, type OnboardingRoleForm } from '~~/schemas/onboarding';

const { handleSubmit, defineField, isSubmitting, meta } = useForm<OnboardingRoleForm>({
  validationSchema: toTypedSchema(onboardingRoleSchema),
  initialValues: {
    role: 'organizer',
  },
});

const [role] = defineField('role');

const onSubmit = handleSubmit(async (payload) => {
  const res = await useOnboarding().setRole(payload);

  if (!res) {
    toast.error('Error setting role', {
      description: 'Please try again later.',
    });
    return;
  }

  await useAuth().refreshUser();

  toast.success('Role set', {
    description: 'Your role has been set successfully.',
  });

  if (payload.role === 'affiliate') {
    navigateTo('/onboarding/affiliate');
  } else {
    navigateTo('/onboarding/team');
  }
});
</script>
<template>
  <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
    <Field>
      <RadioGroup v-model="role" default-value="organizer">
        <FieldLabel for="organizer-r2h">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Organizer</FieldTitle>
              <FieldDescription>
                Organize events and manage your own ticket and voting sales.
              </FieldDescription>
            </FieldContent>
            <RadioGroupItem id="organizer-r2h" value="organizer" />
          </Field>
        </FieldLabel>
        <FieldLabel for="affiliate-z4k">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Affiliate</FieldTitle>
              <FieldDescription>
                Promote events and earn commissions on ticket and voting sales of organizers you onboard.
              </FieldDescription>
            </FieldContent>
            <RadioGroupItem id="affiliate-z4k" value="affiliate" />
          </Field>
        </FieldLabel>
      </RadioGroup>
    </Field>
    <Field>
      <SubmitButton :disabled="isSubmitting || !meta.valid" :loading="isSubmitting" text="Next"
        loading-text="Saving…" />
    </Field>
  </form>
</template>

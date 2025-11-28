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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SubmitButton from "@/components/common/forms/SubmitButton.vue";
import { onboardingEventSchema, type OnboardingEventForm } from '~~/schemas/onboarding';

const config = useRuntimeConfig();

const { handleSubmit, defineField, errors, isSubmitting, meta } = useForm<OnboardingEventForm>({
  validationSchema: toTypedSchema(onboardingEventSchema),
  initialValues: {
    name: '',
    slug: '',
    description: '',
  },
});

const [name, nameAttrs] = defineField('name');
const [slug] = defineField('slug');
const [description, descriptionAttrs] = defineField('description');

watch(name, (newName) => {
  slug.value = slugify(newName ?? '');
});

const slugUrl = computed(() => {
  const currentSlug = slug.value?.trim();
  if (!currentSlug) return `${config.public.appUrl}/events/[your-handle]`;
  return `${config.public.appUrl}/events/${currentSlug}`;
});

const onSubmit = handleSubmit(async (payload) => {
  const res = await useOnboarding().createEvent(payload);

  if (!res) {
    toast.error('Error creating event', {
      description: 'Please try again later.',
    });
    return;
  }

  toast.success('Event created', {
    description: 'Your event has been set up successfully.',
  });

  await useAuth().refreshUser();

  navigateTo('/home');
});
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
    <FieldGroup>
      <Field>
        <FieldLabel for="name">Event name</FieldLabel>
        <Input id="name" v-model="name" v-bind="nameAttrs" placeholder="Summer Music Festival 2025" required />
        <FieldDescription>
          Your event will be available at <span class="font-medium text-foreground">{{ slugUrl }}</span>
        </FieldDescription>
        <FieldError v-if="errors.name">{{ errors.name }}</FieldError>
      </Field>

      <Field>
        <FieldLabel for="description">Description</FieldLabel>
        <Textarea id="description" v-model="description" v-bind="descriptionAttrs" class="min-h-24"
          placeholder="Brief context about your event and what you'll be organizing." />
        <FieldError v-if="errors.description">{{ errors.description }}</FieldError>
      </Field>

      <Field>
        <SubmitButton :disabled="isSubmitting || !meta.valid" :loading="isSubmitting" text="Create event"
          loading-text="Creating…" />
      </Field>
    </FieldGroup>
  </form>
</template>

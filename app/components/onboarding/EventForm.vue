<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { toast } from 'vue-sonner';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { onboardingEventSchema, type OnboardingEventForm } from '~~/schemas/onboarding/events';

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>();

const form = useForm<OnboardingEventForm>({
  validationSchema: toTypedSchema(onboardingEventSchema),
  initialValues: {
    name: '',
    slug: '',
    description: '',
  },
});

const { handleSubmit, values, setFieldValue, isSubmitting } = form;

watch(
  () => values.name,
  (name) => {
    setFieldValue('slug', slugify(name ?? ''));
  },
);

const slugUrl = computed(() => {
  const slug = values.slug?.trim();
  if (!slug) return 'tix4u.online/events/your-handle';
  return `tix4u.online/events/${slug}`;
});

const onSubmit = handleSubmit(async (payload) => {
  await new Promise((resolve) => setTimeout(resolve, 900));

  console.table({
    name: payload.name,
    slug: payload.slug,
    description: payload.description,
  });

  toast.success('Event created', {
    description: 'Your event has been set up successfully.',
  });

  navigateTo('/affiliate/home');
});
</script>

<template>
  <form :class="cn('flex flex-col gap-6', props.class)" @submit.prevent="onSubmit">
    <FieldGroup>
      <Field>
        <FieldLabel for="name">Event name</FieldLabel>
        <Input id="name" v-model="values.name" name="name" placeholder="Summer Music Festival 2025" required
          @input="(e: Event) => setFieldValue('name', (e.target as HTMLInputElement).value)" />
        <FieldDescription>
          Your event will be available at <span class="font-medium text-foreground">{{ slugUrl }}</span>
        </FieldDescription>
      </Field>

      <Field>
        <FieldLabel for="description">Description</FieldLabel>
        <Textarea id="description" v-model="values.description" name="description" class="min-h-24"
          placeholder="Brief context about your event and what you'll be organizing."
          @input="(e: Event) => setFieldValue('description', (e.target as HTMLTextAreaElement).value)" />
      </Field>

      <Field>
        <Button type="submit" class="cursor-pointer w-full" :disabled="isSubmitting">
          <Icon v-if="isSubmitting" name="lucide:loader-2" class="mr-2 size-4 animate-spin" />
          {{ isSubmitting ? 'Creating…' : 'Create event' }}
        </Button>
      </Field>
    </FieldGroup>
  </form>
</template>

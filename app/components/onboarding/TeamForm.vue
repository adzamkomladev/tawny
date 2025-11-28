<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { toast } from 'vue-sonner';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import SubmitButton from "@/components/common/forms/SubmitButton.vue";

import { onboardingTeamSchema, type OnboardingTeamForm } from '~~/schemas/onboarding';

const config = useRuntimeConfig();

const { handleSubmit, defineField, errors, isSubmitting, meta } = useForm<OnboardingTeamForm>({
    validationSchema: toTypedSchema(onboardingTeamSchema),
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
    if (!currentSlug) return `${config.public.appUrl}/teams/[your-handle]`;
    return `${config.public.appUrl}/teams/${currentSlug}`;
});

const onSubmit = handleSubmit(async (payload) => {
    const res = await useOnboarding().createTeam(payload);

    if (!res) {
        toast.error('Error creating team', {
            description: 'Please try again later.',
        });
        return;
    }

    toast.success('Team created', {
        description: 'Your team has been set up successfully.',
    });

    await useAuth().refreshUser();

    navigateTo('/onboarding/event');
});
</script>

<template>
    <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
        <FieldGroup>
            <Field>
                <FieldLabel for="name">Team name</FieldLabel>
                <Input id="name" v-model="name" v-bind="nameAttrs" placeholder="Northern Lights Collective" required />
                <FieldDescription>
                    Your team will be available at <span class="font-medium text-foreground">{{ slugUrl }}</span>
                </FieldDescription>
                <FieldError v-if="errors.name">{{ errors.name }}</FieldError>
            </Field>

            <Field>
                <FieldLabel for="description">Description</FieldLabel>
                <Textarea id="description" v-model="description" v-bind="descriptionAttrs" class="min-h-24"
                    placeholder="Brief context about your team and what you'll be organizing." />
                <FieldError v-if="errors.description">{{ errors.description }}</FieldError>
            </Field>

            <Field>
                <SubmitButton :disabled="isSubmitting || !meta.valid" :loading="isSubmitting" text="Create team"
                    loading-text="Creating…" />
            </Field>
        </FieldGroup>
    </form>
</template>

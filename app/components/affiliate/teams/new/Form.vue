<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { toast } from 'vue-sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { newTeamFormSchema, type NewTeamForm } from '~~/schemas/affiliate/teams';
import AssetUploader from './AssetUploader.vue';

type AssetField = 'logo' | 'banner';
const assetFields: AssetField[] = ['logo', 'banner'];

const assetLabels: Record<AssetField, { title: string; helper: string }> = {
  logo: {
    title: 'Team logo',
    helper: 'PNG, SVG, or JPEG · 1:1',
  },
  banner: {
    title: 'Banner',
    helper: 'PNG or JPEG · 16:9',
  },
};

const form = useForm<NewTeamForm>({
  validationSchema: toTypedSchema(newTeamFormSchema),
  initialValues: {
    logo: null,
    banner: null,
    name: '',
    slug: '',
    description: '',
    adminName: '',
    adminEmail: '',
  }
});

const { handleSubmit, values, setFieldValue, resetForm, isSubmitting } = form;

const isFileValue = (value: unknown): value is File =>
  typeof File !== 'undefined' && value instanceof File;

const hasAsset = (field: AssetField) => isFileValue(values[field]);

watch(
  () => values.name,
  (name) => {
    setFieldValue('slug', slugify(name ?? ''));
  },
);

const slugUrl = computed(() => {
  const slug = values.slug?.trim();
  if (!slug) return 'tix4u.com/teams/your-handle';
  return `tix4u.com/teams/${slug}`;
});

const removeFile = (field: AssetField) => {
  setFieldValue(field, null);
};

const resetComposer = () => {
  resetForm();
};

const onSubmit = handleSubmit(async (payload) => {
  await new Promise((resolve) => setTimeout(resolve, 900));

  console.table({
    name: payload.name,
    slug: payload.slug,
    adminEmail: payload.adminEmail,
    logo: payload.logo?.name ?? 'missing',
    banner: payload.banner?.name ?? 'missing',
  });

  toast.success('Team staged for review', {
    description: 'Mock request complete. We’ll notify the admin email next.',
  });

  resetComposer();
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card class="border bg-card shadow-sm">
      <CardContent class="pt-6 space-y-10">
        <section class="space-y-4">
          <div class="space-y-1">
            <h3 class="text-lg font-semibold">Brand assets</h3>
            <p class="text-sm text-muted-foreground">
              These files power previews across ticketing, payment emails, and live voting widgets.
            </p>
          </div>
          <div class="grid gap-6 md:grid-cols-2">
            <FormField v-for="field in assetFields" :key="field" :name="field" v-slot="{ errors }">
              <FormItem>
                <div class="flex items-center justify-between">
                  <div>
                    <FormLabel>{{ assetLabels[field].title }}</FormLabel>
                    <FormDescription>{{ assetLabels[field].helper }}</FormDescription>
                  </div>
                  <Button v-if="hasAsset(field)" type="button" variant="ghost" size="sm" class="text-muted-foreground"
                    @click="removeFile(field)">
                    Clear
                  </Button>
                </div>

                <FormControl>
                  <AssetUploader
                    :model-value="values[field] as File | null"
                    :helper-text="'Recommended size: ' + assetLabels[field].helper"
                    :preview-class="field === 'logo' ? 'mx-auto h-20 w-20 object-contain' : 'h-32 w-full rounded-lg object-cover'"
                    :has-error="!!errors?.length"
                    @update:model-value="(val) => setFieldValue(field, val)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </section>

        <section class="space-y-6">
          <div class="space-y-1">
            <h3 class="text-lg font-semibold">Team profile</h3>
            <p class="text-sm text-muted-foreground">Keep the name readable and the slug short so links are easy to
              share.</p>
          </div>
          <div class="grid gap-6">
            <FormField name="name" v-slot="{ field }">
              <FormItem>
                <FormLabel>Team name</FormLabel>
                <FormControl>
                  <Input :model-value="field.value" name="name" placeholder="Northern Lights Collective"
                    @update:model-value="field.onChange" @blur="field.onBlur" />
                </FormControl>
                <FormDescription>
                  Your team will be available at <span class="font-medium text-foreground">{{ slugUrl }}</span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField name="description" v-slot="{ field }">
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea :model-value="field.value" name="description" class="min-h-32"
                    placeholder="Brief context for ticketing, payments, and live voting flows."
                    @update:model-value="field.onChange" @blur="field.onBlur" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </section>

        <section class="space-y-4">
          <div class="space-y-1">
            <h3 class="text-lg font-semibold">Team Owner</h3>
            <p class="text-sm text-muted-foreground">This user will have full access to manage the team. We’ll send an
              invite to their email.</p>
          </div>
          <div class="grid gap-6 md:grid-cols-2">
            <FormField name="adminName" v-slot="{ field }">
              <FormItem>
                <FormLabel>Owner name</FormLabel>
                <FormControl>
                  <Input :model-value="field.value" name="adminName" placeholder="Avery Reyes"
                    @update:model-value="field.onChange" @blur="field.onBlur" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField name="adminEmail" v-slot="{ field }">
              <FormItem>
                <FormLabel>Owner email</FormLabel>
                <FormControl>
                  <Input :model-value="field.value" name="adminEmail" type="email" placeholder="avery@team.com"
                    @update:model-value="field.onChange" @blur="field.onBlur" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </section>
      </CardContent>

      <CardFooter
        class="flex flex-col gap-3 border-t border-muted/60 pt-6 sm:flex-row sm:items-center sm:justify-between bg-muted/20">
        <p class="text-sm text-muted-foreground">
          Mock submission only. Hook this up to the real API when ready.
        </p>
        <div class="flex gap-3">
          <Button type="button" variant="outline" :disabled="isSubmitting" @click="resetComposer">
            Clear
          </Button>
          <Button type="submit" :disabled="isSubmitting">
            <Icon name="lucide:loader-2" v-if="isSubmitting" class="mr-2 size-4 animate-spin" />
            {{ isSubmitting ? 'Submitting…' : 'Create team' }}
          </Button>
        </div>
      </CardFooter>
    </Card>
  </form>
</template>
<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { toast } from 'vue-sonner';
import type { TeamDetails } from '~~/types/affiliate/portfolio';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { updateTeamFormSchema, type UpdateTeamForm } from '~~/schemas/affiliate/teams';
import AssetUploader from './AssetUploader.vue';

const props = defineProps<{
  team: TeamDetails;
  open: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'updated'): void;
}>();

const config = useRuntimeConfig();

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

const form = useForm<UpdateTeamForm>({
  validationSchema: toTypedSchema(updateTeamFormSchema),
  initialValues: {
    logo: null,
    banner: null,
    name: props.team.name,
    slug: props.team.slug,
    description: props.team.description || '',
    tags: props.team.tags || [],
  },
});

const { handleSubmit, values, setFieldValue, resetForm, isSubmitting } = form;

// Reset form when team changes
watch(() => props.team, (newTeam) => {
  resetForm({
    values: {
      logo: null,
      banner: null,
      name: newTeam.name,
      slug: newTeam.slug,
      description: newTeam.description || '',
      tags: newTeam.tags || [],
    },
  });
}, { deep: true });

const isFileValue = (value: unknown): value is File =>
  typeof File !== 'undefined' && value instanceof File;

const hasNewAsset = (field: AssetField) => isFileValue(values[field]);

const slugUrl = computed(() => {
  const slug = values.slug?.trim();
  if (!slug) return `${config.public.appUrl}/teams/[your-handle]`;
  return `${config.public.appUrl}/teams/${slug}`;
});

const removeFile = (field: AssetField) => {
  setFieldValue(field, null);
};

const closeSheet = () => {
  emit('update:open', false);
};

const onSubmit = handleSubmit(async (payload) => {
  try {
    const assets = useAssets();
    const portfolio = usePortfolio();

    // Upload assets in parallel (if provided)
    const uploadPromises: Promise<string | null>[] = [];

    if (payload.logo) {
      uploadPromises.push(assets.upload(payload.logo, 'teams/logos'));
    } else {
      uploadPromises.push(Promise.resolve(null));
    }

    if (payload.banner) {
      uploadPromises.push(assets.upload(payload.banner, 'teams/banners'));
    } else {
      uploadPromises.push(Promise.resolve(null));
    }

    const [logoAssetId, bannerAssetId] = await Promise.all(uploadPromises);

    // Update team
    const { success, error } = await portfolio.updateTeam(props.team.id, {
      logoAssetId: logoAssetId || undefined,
      bannerAssetId: bannerAssetId || undefined,
      name: payload.name,
      slug: payload.slug,
      description: payload.description,
      tags: payload.tags,
    });

    if (!success) {
      toast.error('Failed to update team', {
        description: error || 'Please try again later.',
      });
      return;
    }

    toast.success('Team updated successfully');
    emit('updated');
    closeSheet();
  } catch (error) {
    console.error('Failed to update team:', error);
    toast.error('Failed to update team', {
      description: 'Please try again later.',
    });
  }
});
</script>

<template>
  <Sheet :open="open" @update:open="emit('update:open', $event)">
    <SheetContent class="flex w-full flex-col gap-0 p-0 sm:max-w-lg" side="right">
      <SheetHeader class="border-b px-6 py-4">
        <SheetTitle>Edit Team</SheetTitle>
        <SheetDescription>
          Update your team's profile and branding.
        </SheetDescription>
      </SheetHeader>

      <ScrollArea class="flex-1 px-6 py-4">
        <form id="edit-team-form" class="space-y-8" @submit.prevent="onSubmit">
          <!-- Brand assets -->
          <section class="space-y-4">
            <div class="space-y-1">
              <h3 class="text-base font-semibold">Brand assets</h3>
              <p class="text-sm text-muted-foreground">
                Update your team's logo and banner.
              </p>
            </div>
            <div class="grid gap-4">
              <FormField v-for="field in assetFields" :key="field" :name="field" v-slot="{ errors }">
                <FormItem>
                  <div class="flex items-center justify-between">
                    <div>
                      <FormLabel>{{ assetLabels[field].title }}</FormLabel>
                      <FormDescription>{{ assetLabels[field].helper }}</FormDescription>
                    </div>
                    <Button
                      v-if="hasNewAsset(field)"
                      type="button"
                      variant="ghost"
                      size="sm"
                      class="text-muted-foreground"
                      @click="removeFile(field)"
                    >
                      Clear
                    </Button>
                  </div>

                  <FormControl>
                    <AssetUploader
                      :model-value="values[field] as File | null"
                      :existing-url="field === 'logo' ? team.logo : team.banner"
                      :helper-text="'Recommended: ' + assetLabels[field].helper"
                      :preview-class="field === 'logo' ? 'mx-auto h-16 w-16 object-contain rounded-lg' : 'h-24 w-full rounded-lg object-cover'"
                      :has-error="!!errors?.length"
                      @update:model-value="(val) => setFieldValue(field, val)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </section>

          <!-- Team profile -->
          <section class="space-y-4">
            <div class="space-y-1">
              <h3 class="text-base font-semibold">Team profile</h3>
              <p class="text-sm text-muted-foreground">
                Keep the name readable and the slug short.
              </p>
            </div>
            <div class="grid gap-4">
              <FormField name="name" v-slot="{ field }">
                <FormItem>
                  <FormLabel>Team name</FormLabel>
                  <FormControl>
                    <Input
                      :model-value="field.value"
                      name="name"
                      placeholder="Northern Lights Collective"
                      @update:model-value="field.onChange"
                      @blur="field.onBlur"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField name="slug" v-slot="{ field }">
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      :model-value="field.value"
                      name="slug"
                      placeholder="northern-lights"
                      @update:model-value="field.onChange"
                      @blur="field.onBlur"
                    />
                  </FormControl>
                  <FormDescription class="truncate">
                    {{ slugUrl }}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField name="description" v-slot="{ field }">
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      :model-value="field.value"
                      name="description"
                      class="min-h-24 resize-none"
                      placeholder="Brief context for your team."
                      @update:model-value="field.onChange"
                      @blur="field.onBlur"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField name="tags" v-slot="{ field }">
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagsInput :model-value="field.value" @update:model-value="field.onChange">
                      <TagsInputItem v-for="tag in field.value" :key="tag" :value="tag">
                        <TagsInputItemText />
                        <TagsInputItemDelete />
                      </TagsInputItem>
                      <TagsInputInput placeholder="Add tag..." @blur="field.onBlur" />
                    </TagsInput>
                  </FormControl>
                  <FormDescription>
                    Press Enter to add. Max 5 tags.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </section>
        </form>
      </ScrollArea>

      <SheetFooter class="border-t px-6 py-4">
        <div class="flex w-full gap-3">
          <Button type="button" variant="outline" class="flex-1" :disabled="isSubmitting" @click="closeSheet">
            Cancel
          </Button>
          <Button type="submit" form="edit-team-form" class="flex-1" :disabled="isSubmitting">
            <Icon v-if="isSubmitting" name="lucide:loader-2" class="mr-2 size-4 animate-spin" />
            {{ isSubmitting ? 'Saving…' : 'Save changes' }}
          </Button>
        </div>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>

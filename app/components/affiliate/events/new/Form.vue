<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { toast } from 'vue-sonner';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input';
import { newEventFormSchema, type NewEventForm } from '~~/schemas/affiliate/events';
import AssetUploader from './AssetUploader.vue';
import GalleryUploader from './GalleryUploader.vue';

const config = useRuntimeConfig();

type AssetField = 'logo' | 'banner' | 'poster';
const assetFields: AssetField[] = ['logo', 'banner', 'poster'];

const assetLabels: Record<AssetField, { title: string; helper: string; previewClass: string }> = {
  logo: {
    title: 'Event logo',
    helper: 'PNG, SVG, or JPEG · 1:1',
    previewClass: 'mx-auto h-20 w-20 object-contain',
  },
  banner: {
    title: 'Banner',
    helper: 'PNG or JPEG · 16:9',
    previewClass: 'h-32 w-full rounded-lg object-cover',
  },
  poster: {
    title: 'Poster',
    helper: 'PNG or JPEG · 3:4',
    previewClass: 'mx-auto h-40 w-30 rounded-lg object-cover',
  },
};

const form = useForm<NewEventForm>({
  validationSchema: toTypedSchema(newEventFormSchema),
  initialValues: {
    logo: null,
    banner: null,
    poster: null,
    title: '',
    slug: '',
    description: '',
    tags: [],
    venue: '',
    startDate: undefined,
    endDate: undefined,
    enableVoting: false,
    enableTicketing: false,
    gallery: [],
  },
});

const { handleSubmit, values, setFieldValue, resetForm, isSubmitting } = form;

const isFileValue = (value: unknown): value is File =>
  typeof File !== 'undefined' && value instanceof File;

const hasAsset = (field: AssetField) => isFileValue(values[field]);

watch(
  () => values.title,
  (title) => {
    setFieldValue('slug', slugify(title ?? ''));
  },
);

const slugUrl = computed(() => {
  const slug = values.slug?.trim();
  if (!slug) return `${config.public.appUrl}/events/[your-handle]`;
  return `${config.public.appUrl}/events/${slug}`;
});

const removeFile = (field: AssetField) => {
  setFieldValue(field, null);
};

const resetComposer = () => {
  resetForm();
};

// Convert JS Date to CalendarDate for the calendar component
const toCalendarDate = (date: Date | undefined) => {
  if (!date) return undefined;
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
};

// Convert CalendarDate to JS Date
const toJsDate = (calendarDate: any) => {
  if (!calendarDate) return undefined;
  return calendarDate.toDate(getLocalTimeZone());
};

const formatDate = (date: Date | undefined) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(date);
};

const onSubmit = handleSubmit(async (payload) => {
  // For now, just log the payload since we're only focusing on UI
  console.log('Event form submitted:', payload);
  toast.success('Event form submitted', {
    description: 'Check console for payload (API not implemented).',
  });
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Card class="border bg-card shadow-sm">
      <CardContent class="pt-6 space-y-10">
        <!-- Brand Assets -->
        <section class="space-y-4">
          <div class="space-y-1">
            <h3 class="text-lg font-semibold">Event assets</h3>
            <p class="text-sm text-muted-foreground">
              These visuals appear on tickets, payment confirmations, and voting widgets.
            </p>
          </div>
          <div class="grid gap-6 md:grid-cols-3">
            <FormField
              v-for="field in assetFields"
              :key="field"
              :name="field"
              v-slot="{ errors }"
            >
              <FormItem>
                <div class="flex items-center justify-between">
                  <div>
                    <FormLabel>{{ assetLabels[field].title }}</FormLabel>
                    <FormDescription>{{ assetLabels[field].helper }}</FormDescription>
                  </div>
                  <Button
                    v-if="hasAsset(field)"
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
                    :helper-text="'Recommended: ' + assetLabels[field].helper"
                    :preview-class="assetLabels[field].previewClass"
                    :has-error="!!errors?.length"
                    @update:model-value="(val) => setFieldValue(field, val)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </section>

        <!-- Event Details -->
        <section class="space-y-6">
          <div class="space-y-1">
            <h3 class="text-lg font-semibold">Event details</h3>
            <p class="text-sm text-muted-foreground">
              Core info that attendees see when browsing or purchasing tickets.
            </p>
          </div>
          <div class="grid gap-6">
            <FormField name="title" v-slot="{ field }">
              <FormItem>
                <FormLabel>Event title</FormLabel>
                <FormControl>
                  <Input
                    :model-value="field.value"
                    name="title"
                    placeholder="Summer Music Festival 2025"
                    @update:model-value="field.onChange"
                    @blur="field.onBlur"
                  />
                </FormControl>
                <FormDescription>
                  Your event will be available at
                  <span class="font-medium text-foreground">{{ slugUrl }}</span>
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
                    class="min-h-32"
                    placeholder="Describe what attendees can expect at your event..."
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
                  <TagsInput
                    :model-value="field.value ?? []"
                    @update:model-value="field.onChange"
                  >
                    <TagsInputItem v-for="tag in (field.value ?? [])" :key="tag" :value="tag">
                      <TagsInputItemText />
                      <TagsInputItemDelete />
                    </TagsInputItem>
                    <TagsInputInput placeholder="Add tag..." @blur="field.onBlur" />
                  </TagsInput>
                </FormControl>
                <FormDescription>
                  Press Enter to add a tag. Maximum 5 tags for discoverability.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </section>

        <!-- Gallery -->
        <section class="space-y-4">
          <div class="space-y-1">
            <h3 class="text-lg font-semibold">Gallery</h3>
            <p class="text-sm text-muted-foreground">
              Add photos to showcase your event. Mark featured images to highlight them.
            </p>
          </div>
          <FormField name="gallery" v-slot="{ field }">
            <FormItem>
              <FormControl>
                <GalleryUploader
                  :model-value="field.value ?? []"
                  :max-images="10"
                  @update:model-value="field.onChange"
                />
              </FormControl>
              <FormDescription>
                Drag to reorder. Featured images appear prominently on the event page.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
        </section>

        <!-- Venue & Schedule -->
        <section class="space-y-6">
          <div class="space-y-1">
            <h3 class="text-lg font-semibold">Venue & schedule</h3>
            <p class="text-sm text-muted-foreground">
              Where and when the event takes place.
            </p>
          </div>
          <div class="grid gap-6">
            <FormField name="venue" v-slot="{ field }">
              <FormItem>
                <FormLabel>Venue</FormLabel>
                <FormControl>
                  <Input
                    :model-value="field.value"
                    name="venue"
                    placeholder="Accra International Conference Centre"
                    @update:model-value="field.onChange"
                    @blur="field.onBlur"
                  />
                </FormControl>
                <FormDescription>
                  Full address or venue name for attendees to find you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="grid gap-6 md:grid-cols-2">
              <FormField name="startDate" v-slot="{ field }">
                <FormItem class="flex flex-col">
                  <FormLabel>Start date</FormLabel>
                  <Popover>
                    <PopoverTrigger as-child>
                      <FormControl>
                        <Button
                          variant="outline"
                          :class="[
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          ]"
                        >
                          <Icon name="lucide:calendar" class="mr-2 size-4" />
                          {{ field.value ? formatDate(field.value) : 'Pick a date' }}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent class="w-auto p-0" align="start">
                      <Calendar
                        :model-value="toCalendarDate(field.value)"
                        :min-value="today(getLocalTimeZone())"
                        @update:model-value="(val) => setFieldValue('startDate', toJsDate(val))"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    When the event begins.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField name="endDate" v-slot="{ field }">
                <FormItem class="flex flex-col">
                  <FormLabel>End date</FormLabel>
                  <Popover>
                    <PopoverTrigger as-child>
                      <FormControl>
                        <Button
                          variant="outline"
                          :class="[
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          ]"
                        >
                          <Icon name="lucide:calendar" class="mr-2 size-4" />
                          {{ field.value ? formatDate(field.value) : 'Pick a date' }}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent class="w-auto p-0" align="start">
                      <Calendar
                        :model-value="toCalendarDate(field.value)"
                        :min-value="toCalendarDate(values.startDate) ?? today(getLocalTimeZone())"
                        @update:model-value="(val) => setFieldValue('endDate', toJsDate(val))"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    When the event ends (optional for single-day events).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </div>
        </section>

        <!-- Features -->
        <section class="space-y-4">
          <div class="space-y-1">
            <h3 class="text-lg font-semibold">Features</h3>
            <p class="text-sm text-muted-foreground">
              Enable ticketing and voting modules for this event.
            </p>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <FormField name="enableTicketing" v-slot="{ field }">
              <FormItem
                class="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4"
              >
                <FormControl>
                  <Checkbox
                    :model-value="field.value"
                    @update:model-value="field.onChange"
                  />
                </FormControl>
                <div class="space-y-1 leading-none">
                  <FormLabel class="cursor-pointer">Enable ticketing</FormLabel>
                  <FormDescription>
                    Allow attendees to purchase tickets for this event.
                  </FormDescription>
                </div>
              </FormItem>
            </FormField>

            <FormField name="enableVoting" v-slot="{ field }">
              <FormItem
                class="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4"
              >
                <FormControl>
                  <Checkbox
                    :model-value="field.value"
                    @update:model-value="field.onChange"
                  />
                </FormControl>
                <div class="space-y-1 leading-none">
                  <FormLabel class="cursor-pointer">Enable voting</FormLabel>
                  <FormDescription>
                    Allow attendees to participate in live voting/polls.
                  </FormDescription>
                </div>
              </FormItem>
            </FormField>
          </div>
        </section>
      </CardContent>

      <CardFooter
        class="flex flex-col gap-3 border-t border-muted/60 pt-6 sm:flex-row sm:items-center sm:justify-between bg-muted/20"
      >
        <p class="text-sm text-muted-foreground">
          You can configure tickets and voting options after creating the event.
        </p>
        <div class="flex gap-3">
          <Button
            type="button"
            variant="outline"
            :disabled="isSubmitting"
            @click="resetComposer"
          >
            Clear
          </Button>
          <Button type="submit" :disabled="isSubmitting">
            <Icon
              v-if="isSubmitting"
              name="lucide:loader-2"
              class="mr-2 size-4 animate-spin"
            />
            {{ isSubmitting ? 'Creating…' : 'Create event' }}
          </Button>
        </div>
      </CardFooter>
    </Card>
  </form>
</template>

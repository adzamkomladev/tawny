<script lang="ts" setup>
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>();

const next = () => navigateTo('/onboarding/affiliate');
</script>
<template>
  <form :class="cn('flex flex-col gap-6', props.class)">
    <Field>

      <RadioGroup default-value="organizer">
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
      <Button @click.prevent="next" type="submit">
        Next
      </Button>
    </Field>
  </form>
</template>

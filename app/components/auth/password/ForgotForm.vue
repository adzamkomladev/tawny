<script lang="ts" setup>
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>();

</script>
<template>
  <form :class="cn('flex flex-col gap-6', props.class)">
    <FieldGroup>

      <Field>
        <FieldLabel for="email">
          Email
        </FieldLabel>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </Field>

      <Field>
        <Button type="submit">
          Send Reset Link
        </Button>
      </Field>

    </FieldGroup>
  </form>
</template>

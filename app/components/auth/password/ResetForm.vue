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
import { Input } from "@/components/ui/input";

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>();

</script>
<template>
  <form :class="cn('flex flex-col gap-6', props.class)">
    <FieldGroup>
      <Field>
        <FieldLabel for="password">
          New Password
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
          Reset Password
        </Button>
      </Field>

    </FieldGroup>
  </form>
</template>

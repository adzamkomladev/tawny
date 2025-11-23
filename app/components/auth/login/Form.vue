<script lang="ts" setup>
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
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
        <FieldLabel for="email">
          Email
        </FieldLabel>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </Field>
      <Field>
        <div class="flex items-center">
          <FieldLabel for="password">
            Password
          </FieldLabel>
          <NuxtLink to="/password/forgot" class="ml-auto text-sm underline-offset-4 hover:underline">
            Forgot your password?
          </NuxtLink>
        </div>
        <Input id="password" type="password" required />
      </Field>
      <Field>
        <Button type="submit">
          Login
        </Button>
      </Field>

    </FieldGroup>
  </form>
</template>

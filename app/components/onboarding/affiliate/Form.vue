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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>();

const next = () => navigateTo('/affiliate/home');

</script>
<template>
  <form :class="cn('flex flex-col gap-6', props.class)">
    <FieldGroup>

      <Field>
        <FieldLabel for="otp" class="sr-only">
          Verification code
        </FieldLabel>
        <InputOTP id="otp" :maxlength="6" required>
          <InputOTPGroup class="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
            <InputOTPSlot :index="0" />
            <InputOTPSlot :index="1" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup class="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
            <InputOTPSlot :index="2" />
            <InputOTPSlot :index="3" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup class="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
            <InputOTPSlot :index="4" />
            <InputOTPSlot :index="5" />
          </InputOTPGroup>
        </InputOTP>
        <FieldDescription class="text-center">
          Enter the 6-digit code sent to your email or phone number.
        </FieldDescription>
      </Field>
      <Field>
        <Button @click.prevent="next" type="submit">
          Verify
        </Button>
      </Field>

    </FieldGroup>
  </form>
</template>

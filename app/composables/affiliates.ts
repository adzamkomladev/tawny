import type { ApplyForm } from "~~/schemas/affiliates";

export const useAffiliates = () => {
  async function apply(data: ApplyForm) {
    try {
      const { success } = await $fetch('/api/affiliates/apply', {
        method: 'POST',
        body: data,
      });

      return success;
    } catch (error) {
      console.error("Failed to submit affiliate application:", error);
      return false;
    }
  }

  return {
    apply,
  };
};

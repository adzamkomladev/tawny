import type { ApplyForm } from "~~/schemas/affiliates";
import type { CreateTeamPayload } from "~~/schemas/affiliate/teams";

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

  async function createTeam(data: CreateTeamPayload) {
    try {
      const { success } = await $fetch('/api/affiliate/teams', {
        method: 'POST',
        body: data,
      });

      return success;
    } catch (error) {
      console.error("Failed to create team:", error);
      return false;
    }
  }

  return {
    apply,
    createTeam,
  };
};

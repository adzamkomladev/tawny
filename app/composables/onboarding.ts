import type { OnboardingRoleForm, OnboardingTeamForm } from "~~/schemas/onboarding/team";

export const useOnboarding = () => {
  async function createTeam(data: OnboardingTeamForm) {
    try {
      const { success } = await $fetch('/api/onboarding/team', {
        method: 'POST',
        body: data,
      });

      return success;
    } catch (error) {
      console.error("Failed to create team:", error);
      return false;
    }
  }

  async function setRole(data: OnboardingRoleForm) {
    try {
      const { success } = await $fetch('/api/onboarding/role', {
        method: 'POST',
        body: data,
      });

      return success;
    } catch (error) {
      console.error("Failed to set role:", error);
      return false;
    }
  }

  return {
    createTeam,
    setRole,
  }
}

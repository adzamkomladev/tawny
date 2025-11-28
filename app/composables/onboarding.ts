import type { OnboardingRoleForm, OnboardingEventForm, OnboardingTeamForm } from "~~/schemas/onboarding";

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

  async function createEvent(data: OnboardingEventForm) {
    try {
      const { success } = await $fetch('/api/onboarding/event', {
        method: 'POST',
        body: data,
      });

      return success;
    } catch (error) {
      console.error("Failed to create event:", error);
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
    createEvent,
    setRole,
  }
}

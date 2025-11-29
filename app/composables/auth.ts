import type { AuthProfile } from "~~/types/profile";

const user = ref<AuthProfile | null>(null);

export const useAuth = () => {
  const hasRole = computed(() => !!user.value?.role);
  const isAffiliate = computed(() => user.value?.role === 'affiliate');
  const isOrganizer = computed(() => user.value?.role === 'organizer');
  const needsTeam = computed(() => {
    return isOrganizer.value && user.value?.teams.length === 0;
  });
  const needsEvent = computed(() => {
    const hasSelectedTeam = isOrganizer.value && !!user.value?.selected?.teamId;
    const team = user.value?.teams.find(team => team.id === user.value?.selected?.teamId);
    return hasSelectedTeam && team ? team.events.length === 0 : false;
  });

  async function refreshUser() {
    try {
      const { user: authProfile } = await $fetch('/api/profile/me');
      user.value = authProfile || null;
    } catch (error) {
      console.error("Failed to refresh user:", error);
      clearUser();
    }
  }

  function clearUser() {
    user.value = null;
  }

  async function logout() {
    try {
      await signOut();

    } catch (error) {
      console.error("Failed to signout:", error);
    }

    clearUser();
    navigateTo("/login");
  }

  return {
    user: readonly(user),
    hasRole,
    needsTeam,
    needsEvent,
    isAffiliate,
    isOrganizer,
    refreshUser,
    clearUser,
    logout,
  };
}

import type { AuthProfile } from "~~/types/profile";

const user = ref<AuthProfile | null>(null);

export const useAuth = () => {

  const hasRole = computed(() => !!user.value?.role);
  const isAffiliate = computed(() => user.value?.role === 'affiliate');
  const needsTeam = computed(() => {
    const isOrganizer = user.value?.role === 'organizer';
    return isOrganizer && user.value?.teams.length === 0;
  });
  const needsEvent = computed(() => {
    const isOrganizer = user.value?.role === 'organizer';
    const hasSelectedTeam = isOrganizer && !!user.value?.selected?.teamId;
    const team = user.value?.teams.find(team => team.id === user.value?.selected?.teamId);
    return hasSelectedTeam && team ? team.events.length === 0 : false;
  });

  async function refreshUser() {
    const { user: fetchedUser } = await $fetch('/api/profile/me');
    user.value = fetchedUser || null;
  }

  function clearUser() {
    user.value = null;
  }

  async function logout() {
    await signOut();
    clearUser();
    navigateTo("/login");
  }

  return {
    user: readonly(user),
    hasRole,
    needsTeam,
    needsEvent,
    isAffiliate,
    refreshUser,
    clearUser,
    logout,
  };
}

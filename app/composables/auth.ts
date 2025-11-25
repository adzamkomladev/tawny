
// const user = ref({
//   name: "Daniel Boakye",
//   email: "daniel.boakye@yopmail.com",
//   avatar: "https://ui-avatars.com/api/?name=Daniel+Boakye",
// });

const user = ref<User | null>(null);

export const useAuth = () => {
  async function refreshUser() {
    const { data } = await getSession();
    user.value = data?.user || null;
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
    refreshUser,
    clearUser,
    logout,
  };
}

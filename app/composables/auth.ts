
const user = ref({
  name: "Daniel Boakye",
  email: "daniel.boakye@yopmail.com",
  avatar: "https://ui-avatars.com/api/?name=Daniel+Boakye",
});

export const useAuth = () => {
  return {
    user: readonly(user)
  }
}

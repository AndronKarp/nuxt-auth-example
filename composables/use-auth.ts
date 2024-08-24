type AccessToken = string | null;

export function useAuth() {
  const accessToken = useState<AccessToken>("accessToken", () => null);

  const isAuthenticated = computed(() => accessToken.value !== null);

  function setAccessToken(v: AccessToken) {
    accessToken.value = v;
  }

  return {
    accessToken: readonly(accessToken),
    isAuthenticated,
    setAccessToken,
  };
}

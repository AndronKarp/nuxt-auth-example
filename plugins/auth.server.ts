// Плагін, який оновлює токен  перед тим, як робитимуться запити до бекенду
export default defineNuxtPlugin(async () => {
  const { setAccessToken } = useAuth();

  // Важливо! Тут використовуємо просто $fetch, щоб зробити запит на внутрішній токен-ендпоінт.
  // Передаємо cookie за допомогою useRequestHeaders
  const accessToken = await $fetch("/api/token", {
    headers: useRequestHeaders(["cookie"]),
  });

  if (accessToken) {
    setAccessToken(accessToken);
  }
});

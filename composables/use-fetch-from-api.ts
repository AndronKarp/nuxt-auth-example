export function useFetchFromApi() {
  const { accessToken, setAccessToken } = useAuth();

  const fetchFromApi = $fetch.create({
    // Тут вказуємо baseURL та інші налаштування, потрібні для запитів до бекенду.
    // Нижче наведені приклади інтерцепторів для додавання accessToken в хедери кожного запиту і для обробки помилки 401
    onRequest(context) {
      if (accessToken.value === null) return;

      const headers = (context.options.headers ??= {});
      const authHeader = {
        name: "Authorization",
        value: `Bearer ${accessToken.value}`,
      };

      if (Array.isArray(headers)) {
        headers.push([authHeader.name, authHeader.value]);
      } else if (headers instanceof Headers) {
        headers.set(authHeader.name, authHeader.value);
      } else {
        headers[authHeader.name] = authHeader.value;
      }
    },
    async onResponseError({ response, request, options }) {
      if (response.status === 401) {
        try {
          const { accessToken } = await fetchFromApi("/api/refresh", {
            method: "POST",
          });
          setAccessToken(accessToken);
          // Повторити запит, що не пройшов
          await fetchFromApi(request, options);
        } catch (e) {
          await fetchFromApi("/api/logout", { method: "POST" });
          setAccessToken(null);
        }
      }
    },
  });

  return fetchFromApi;
}

// Імітація logout-ендпоінта на бекенді. Відтворювати не потрібно
export default defineEventHandler(event => {
  deleteCookie(event, "accessToken");
  deleteCookie(event, "refreshToken");
});

// Імітація login-ендпоінта на бекенді. Відтворювати не потрібно
export default defineEventHandler(event => {
  const accessToken = "accessToken";
  setCookie(event, "accessToken", accessToken, { httpOnly: true });
  setCookie(event, "refreshToken", "refreshToken", { httpOnly: true });

  return { accessToken };
});

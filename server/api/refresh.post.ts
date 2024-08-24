// Імітація refresh-ендпоінта на бекенді. Відтворювати не потрібно
export default defineEventHandler(event => {
  const accessToken = "newAccessToken";
  setCookie(event, "accessToken", accessToken, { httpOnly: true });
  setCookie(event, "refreshToken", "newRefreshToken", { httpOnly: true });

  return { accessToken };
});

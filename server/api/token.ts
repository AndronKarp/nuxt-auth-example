// Внутрішній ендпоінт, який повертає у відповідь accessToken, що знаходиться всередині HttpOnly cookie
export default defineEventHandler(event => {
  return getCookie(event, "accessToken");
});

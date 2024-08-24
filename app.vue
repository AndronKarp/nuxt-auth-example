<template>
  <div>
    <NuxtRouteAnnouncer />
    <template v-if="isAuthenticated">
      <div>Authenticated</div>
      <button @click="logout">Logout</button>
    </template>
    <template v-else>
      <div>Unauthenticated</div>
      <button @click="login">Login</button>
    </template>
    <button @click="fetchFromApi('/api/test')">Test</button>
  </div>
</template>

<script lang="ts" setup>
const { isAuthenticated, setAccessToken } = useAuth();
const fetchFromApi = useFetchFromApi();

async function login() {
  const { accessToken } = await fetchFromApi("/api/login", {
    method: "POST",
    body: { username: "user", password: "password" },
  });
  setAccessToken(accessToken);
}

async function logout() {
  await fetchFromApi("/api/logout", { method: "POST" });
  setAccessToken(null);
}
</script>

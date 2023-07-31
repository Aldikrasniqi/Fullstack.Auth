<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const Logout = async () => {
  const response = await fetch('http://localhost:1212/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      session_token: localStorage.getItem('token'),
    }),
  }).then((res) => res.json());

  console.log(response);

  if (response.sucess) {
    localStorage.removeItem('token');
    router.push('/login');
  } else {
    alert(response.message);
  }
};
</script>

<template>
  <main>
    <header>
      <h1>Hello Welcome to the Stytch API</h1>
      <button @click="Logout">Logout</button>
    </header>
  </main>
</template>

<style>
main {
  padding: 1.5rem;
}
h1 {
  margin-bottom: 1rem;
}
main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100vh;
  background: var(--primary);
  color: white;
}
header {
  padding: 1.5rem;
}
</style>


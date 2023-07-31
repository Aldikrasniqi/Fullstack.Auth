<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const email = ref('');
const password = ref('');
const conf_password = ref('');
// register functionality
const Register = async () => {
  if (!email.value || !password.value || !conf_password.value) {
    return alert('Please fill all fields');
  }
  if (password.value !== conf_password.value) {
    return alert('Passwords do not match');
  }

  const response = await fetch('http://localhost:1212/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  }).then((res) => res.json());

  console.log(response);

  if (response.success) {
    localStorage.setItem('token', response.token);
    router.push('/');
  } else {
    alert(response.message);
  }
};
</script>

<template>
  <main>
    <header>
      <h1 class="logo">SECRET</h1>
      <h2>Register</h2>
      <p>Login or create an account</p>
    </header>
    <form @submit.prevent="Register">
      <label>
        <span>Enter your email...</span>
        <input type="email" v-model="email" placeholder="test@test.com" />
      </label>
      <label>
        <span>Enter your password...</span>
        <input type="password" v-model="password" placeholder="**********" />
      </label>
      <label>
        <span>Enter your confirm password...</span>
        <input
          type="password"
          v-model="conf_password"
          placeholder="**********"
        />
      </label>
      <input type="submit" value="Register" />
    </form>
    <footer>
      <p>
        Alredy have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </footer>
  </main>
</template>

<style scoped>
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
footer {
  background: #fff;
  width: 100%;
  color: var(--dark);
  text-align: center;
  padding: 1.5rem;
  padding-bottom: 3rem;
}
h2 {
  font-size: 2.125rem;
  margin-bottom: 1rem;
}
h2 ~ p {
  font-size: 1rem;
  font-weight: 500;
}
form {
  flex: 1 1 0%;
  display: block;
  border-radius: 1.5rem 1.5rem 0 0;
  background-color: #fff;
  box-shadow: 0 -4px 12px 4px rgba(0, 0, 0, 0.16);
  color: var(--dark);
  padding: 4rem 1.5rem;
  width: 100%;
}
label {
  display: block;
  margin-bottom: 1.5rem;
}
label span {
  display: block;
  color: var(--gray);
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
input:not([type='submit']) {
  display: block;
  width: 100%;
  padding: 1.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--dark);
  background-color: var(--light);
}
input:not([type='submit'])::placeholder {
  color: var(--gray);
  font-style: italic;
}
input[type='submit'] {
  display: block;
  width: fit-content;
  margin: 0 auto;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  background-color: var(--primary);
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.2s ease;
}
input[type='submit']:hover {
  background-color: var(--primary-dark);
}
</style>

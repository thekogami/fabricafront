<template>
  <div class="login-page">
    <div class="left-section">
      <img src="univille.svg" alt="Logo Univille" class="logo">
    </div>
    <div class="right-section">
      <div class="login-form">
        <h2>Sign In</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" placeholder="Enter your email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" placeholder="Enter your password" required>
          </div>
          <button type="submit" class="submit-button">Sign In</button>
        </form>
        <a href="#" class="forgot-password">Forgot password?</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      // Lógica de login aqui
      console.log("Email:", this.email);
      console.log("Password:", this.password);
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  height: 100vh;
}

.left-section {
  flex: 1;
  background-color: #8cc63f; /* Verde claro */
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 50%; /* Tamanho do logo */
}

.right-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.login-form {
  width: 80%;
  max-width: 300px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  font-size: 14px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #555;
}

.forgot-password {
  display: block;
  margin-top: 10px;
  font-size: 14px;
  color: #555;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}
</style>
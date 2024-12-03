<template>
  <div class="login-page">
    <div class="left-section">
      <img src="univille.svg" alt="Logo Univille" class="logo">
    </div>
    <div class="right-section">
      <div class="login-form">
        <h2>Entrar</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" placeholder="Digite seu email" required>
          </div>
          <div class="form-group">
            <label for="password">Senha</label>
            <input type="password" id="password" v-model="password" placeholder="Digite sua senha" required>
          </div>
          <button type="submit" class="submit-button">Entrar</button>
        </form>
        <a href="#" class="forgot-password">Esqueceu a senha?</a>
        <a href="#" class="register-link" @click="showRegisterModal = true">Registrar</a>
      </div>
    </div>

    <!-- Modal de Cadastro -->
    <q-dialog v-model="showRegisterModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Registrar</div>
        </q-card-section>
        <q-card-section>
          <form @submit.prevent="handleRegister">
            <div class="form-group">
              <label for="register-email">Email</label>
              <input type="email" id="register-email" v-model="registerEmail" placeholder="Digite seu email" required>
            </div>
            <div class="form-group">
              <label for="register-password">Senha</label>
              <input type="password" id="register-password" v-model="registerPassword" placeholder="Digite sua senha" required>
            </div>
            <div class="form-group">
              <label for="role">Tipo de Usuário</label>
              <select id="role" v-model="role" required>
                <option value="TECNICO_TI">Técnico de TI</option>
                <option value="USUARIO_COMUM">Usuário Comum</option>
              </select>
            </div>
            <button type="submit" class="submit-button">Registrar</button>
          </form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" @click="showRegisterModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { useQuasar } from 'quasar';

export default {
  setup() {
    const $q = useQuasar();
    return { $q };
  },
  data() {
    return {
      email: '',
      password: '',
      showRegisterModal: false,
      registerEmail: '',
      registerPassword: '',
      role: 'USUARIO_COMUM',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:8080/api/usuarios/login', {
          email: this.email,
          password: this.password,
        });
        if (response.data) {
          console.log("Login bem-sucedido");
          // Redirecionar para a página principal ou dashboard
        } else {
          this.$q.notify({
            type: 'negative',
            message: 'Email ou senha inválidos',
          });
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao fazer login',
        });
      }
    },
    async handleRegister() {
      try {
        const response = await axios.post('http://localhost:8080/api/usuarios/cadastro', {
          email: this.registerEmail,
          password: this.registerPassword,
          role: this.role,
        });
        console.log("Usuário registrado com sucesso:", response.data);
        this.showRegisterModal = false;
        this.$q.notify({
          type: 'positive',
          message: 'Usuário registrado com sucesso',
        });
      } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao registrar usuário',
        });
      }
    },
  },
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

input, select {
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

.forgot-password, .register-link {
  display: block;
  margin-top: 10px;
  font-size: 14px;
  color: #555;
  text-decoration: none;
}

.forgot-password:hover, .register-link:hover {
  text-decoration: underline;
}
</style>

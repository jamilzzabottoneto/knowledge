<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="@/assets/logo.png" alt="Logo" width="200" />
      <hr />
      <div class="auth-title">{{ showSignup ? "Cadastro" : "Login" }}</div>
      <input
        type="text"
        v-if="showSignup"
        v-model="user.name"
        placeholder="Nome"
      />
      <input
        type="text"
        v-model="user.email"
        placeholder="Email"
        name="email"
      />
      <input
        type="password"
        v-model="user.password"
        placeholder="Senha"
        name="password"
      />
      <input
        v-if="showSignup"
        type="password"
        v-model="user.confirmPassword"
        placeholder="Confirme a Senha"
        name="confirmPassword"
      />
      <button class="btn btn-primary" v-if="showSignup" @click="signup">
        Registrar
      </button>
      <button class="btn btn-primary" v-else @click="signin">Entrar</button>
      <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup"> Já tem cadastro: Acesse o login!</span>
        <span v-else>Não tem cadastro? Registre-se aqui!</span>
      </a>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: function () {
    return {
      showSignup: false,
      user: {},
    };
  },
  methods: {
    signin() {
      axios.post(`${baseApiUrl}/signin`, this.user)
        .then((res) => {
          this.$store.commit('setUser', res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: '/' });
        })
        .catch(showError);
    },
    signup() {
      axios.post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
  },
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.auth-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}
.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}
.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
  border-radius: 15px;
}
.auth-modal button {
  align-self: center;
  color: #fff;
  padding: 5px 15px;
}
.auth-modal a {
  margin-top: 35px;
  text-decoration: none;
  color: #1E90FF;
}
.auth-modal a:hover{
    color: #0000EE;
}
.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>
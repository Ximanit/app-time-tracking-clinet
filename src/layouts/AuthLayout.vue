<template>
  <div class="background">
    <q-card bordered class="my-card absolute-center">
      <q-card-section
        class="text-h5 q-pt-none q-pb-lg q-px-none text-center text-weight-medium"
      >
        Вход в систему
      </q-card-section>
      <q-card-section class="q-pb-lg q-px-none">
        <q-input
          v-model="username"
          bg-color="white"
          label="Логин"
          :dense="true"
          outlined
          class="q-mb-sm"
        >
        </q-input>
        <q-input
          v-model="password"
          bg-color="white"
          label="Пароль"
          :dense="true"
          outlined
        >
        </q-input>
      </q-card-section>
      <q-card-section class="q-px-none">
        <q-btn @click="login()" class="button" text-color="primary">
          ВОЙТИ
        </q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { api } from "../boot/axios.js";
import { ref } from "vue";
export default {
  data() {
    return {
      username: "",
      password: "",
      isPwd: ref(true),
    };
  },
  methods: {
    onError(error) {
      if (!error.response || !error.response.status) {
        this.$q.notify({
          type: "negative",
          message: "Нет соединения с сервером",
        });
        return;
      }
      this.$q.notify({
        type: "negative",
        message: error.response.data.message ?? "Ошибка сервера",
      });
    },
    async login() {
      if (this.username == "") {
        this.$q.notify({
          type: "negative",
          message: "Введите логин",
        });
        return;
      }
      if (this.password == "") {
        this.$q.notify({
          type: "negative",
          message: "Введите пароль",
        });
        return;
      }
      try {
        this.$router.replace("/");
      } catch (error) {
        this.onError(error);
      }
    },
  },
};
</script>
<style scoped>
.button {
  width: 100%;
  border-radius: 4px;
  border: 2px solid #8cc63e;
}
.my-card {
  width: 450px;
  height: 370px;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 24px;
  border: 3px solid #099340;
  padding: 64px;
}
.background {
  width: 100%;
  height: 969px;
  background: url("/фон.jpg") center center / cover;
}
</style>

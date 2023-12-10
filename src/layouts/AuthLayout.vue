<template>
  <div class="background desktop-only">
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
  <div class="q-mb-none mobile-only background-mobile">
    <div class="text-h4 text-center title">Авторизация</div>
    <q-img
      src="../assets/mobile-icon.svg"
      style="width: 226px; height: 150px; margin: 24px 20px 24px 60px"
    />
    <div class="q-pa-md">
      <q-input
        bg-color="white"
        v-model="username"
        label="Логин"
        outlined
        class="q-mb-md"
      >
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
      </q-input>

      <q-input
        v-model="password"
        bg-color="white"
        label="Пароль"
        outlined
        class="q-mb-lg"
      >
        <template v-slot:prepend>
          <q-icon name="key" />
        </template>
        <template v-slot:append>
          <q-icon name="visibility_off" />
        </template>
      </q-input>
      <div class="row justify-center">
        <q-btn
          @click="login()"
          text-color="primary"
          style="
            border-radius: 8px;
            max-width: 223px;
            border: 2px solid #8cc63e;
            width: 100%;
          "
        >
          ВОЙТИ
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../boot/axios.js";
import { ref } from "vue";
import VueCookies from "vue-cookies";

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
        const response = await api.post("auth/login", {
          username: this.username,
          password: this.password,
        });
        VueCookies.set("token", response.data.token, Infinity);
        VueCookies.set("username", this.username, Infinity);
        VueCookies.set("id", response.data.id, Infinity);
        console.log(response.data);
        this.$q.notify({
          type: "positive",
          message: "Пользователь успешно авторизован.",
        });
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
.background-mobile {
  background: #fefff4;
  margin: 0; /* Убираем внешний отступ, который может быть установлен браузером по умолчанию */
  padding: 0; /* Убираем внутренний отступ */
  width: 100%; /* Растягиваем фон на всю ширину экрана */
  height: 100%; /* Растягиваем фон на всю высоту экрана */
  min-height: 90vh;
}
.title {
  color: #01803d;
  margin-top: 36px;
}
</style>

<template>
  <q-header class="desktop-only" elevated color="primary">
    <q-toolbar class="q-pa-none">
      <div class="search q-py-md">
        <q-select
          color="dark"
          bg-color="white"
          outlined
          v-model="model"
          :options="options"
          label="Выбор проекта"
          :dense="true"
        />
      </div>
      <q-btn
        icon="refresh"
        class="q-ml-xl help-btn"
        color="warning"
        text-color="black"
        @click="updateTask()"
      />
      <q-space />

      <q-btn class="q-mr-xl help-btn" color="warning" text-color="black">
        ?
      </q-btn>
      <div class="flex items-center name_exit-btn">
        <div style="font-size: 20px">Ivanov.DV</div>
        <q-btn flat @click="logout()">
          <div class="image-container">
            <img
              class="first-image"
              src="../assets/exit-icon.svg"
              alt="exit-logo"
            />
            <img
              class="second-image"
              src="../assets/exit-icon-open.svg"
              alt="exit-open-logo"
            />
          </div>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>

  <q-header class="mobile-only">
    <q-toolbar class="tlbr">
      <q-select
        :dense="true"
        outlined
        default="Все проекты"
        v-model="model"
        :options="options"
        v-if="this.route === '/'"
        label="Выбор проекта"
        bg-color="white"
        class="q-ml-md q-mt-md q-mb-md q-mr-xl"
        style="width: 142px; margin-left: 20px"
        @update:model-value="handleSelection"
      />
      <q-btn
        v-if="this.route === '/'"
        class="btn-refresh q-pa-sm q-mr-md"
        icon="refresh"
        text-color="black"
        @click="updateTask()"
      />
      <div v-else>
        <q-btn
          @click="back()"
          size="20px"
          flat
          round
          color="dark"
          icon="navigate_before"
          style="margin-right: 198px"
          :disable="ispause"
        ></q-btn>
      </div>
      <q-btn class="btn-q q-pa-sm q-mr-md">
        <div style="color: black">?</div>
      </q-btn>
      <q-btn flat @click="logout()">
        <img
          style="width: 32px; height: 32px"
          src="../assets/exit-icon-mobile.svg"
          alt="exit-open-logo"
        />
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script>
import { ref } from "vue";
import VueCookie from "vue-cookie";
import { api } from "../boot/axios";

export default {
  name: "Header",
  props: {
    ispause: {
      type: Boolean,
    },
  },
  data() {
    return {
      route: "",
      model: null,
      options: [],
      // isPause: ref(false),
    };
  },
  mounted() {
    this.getRoute();
    this.getProject();
  },

  methods: {
    logout() {
      VueCookie.delete("token");
      VueCookie.delete("username");
      VueCookie.delete("id");
      this.$router.replace("/auth");
    },
    updateTask() {
      console.log("В Header кнопка работает");
      this.$emit("update-task");
    },
    getRoute() {
      this.route = this.$route.fullPath;
    },
    async getProject() {
      try {
        const res = await api.get("/project/");
        res.data.forEach((item) => {
          if (item.name) {
            this.options.push(item.name);
          }
        });
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    },
    back() {
      window.close();
      // Browser.close();
      // Browser.close();
    },
    handleSelection(value) {
      console.log("Выбран элемент:", value);
      // Добавьте свой код обработки выбора элемента здесь
    },
  },
};
</script>

<style scoped>
.help-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-right: 75px;
  font-size: 18px;
}
.search {
  margin-left: 314px;
  width: 265px;
  font-size: 14px;
}
.name_exit-btn {
  margin-right: 307px;
}

.image-container {
  position: relative;
  width: 40px; /* Ширина и высота картинки */
  height: 40px;
}

.second-image {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0; /* Вторая картинка изначально невидима */
  transition: opacity 0.1s ease; /* Плавное изменение видимости в течение 0.3 секунд */
}

.image-container:hover .first-image {
  opacity: 0; /* При наведении на контейнер первая картинка становится невидимой */
}

.image-container:hover .second-image {
  opacity: 1; /* При наведении на контейнер вторая картинка становится видимой */
}
.btn-refresh {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: rgba(233, 238, 0, 0.16);
}
.btn-q {
  width: 26px;
  height: 32px;
  border-radius: 4px;
  background: rgba(233, 238, 0, 0.16);
}
.tlbr {
  background-color: #fefff4;
}
</style>

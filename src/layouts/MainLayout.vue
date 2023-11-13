<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated color="primary">
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

        <q-space />

        <q-btn class="q-mr-xl help-btn" color="warning" text-color="black">
          ?
        </q-btn>
        <div class="flex items-center name_exit-btn">
          <div style="font-size: 20px">Ivanov.DV</div>
          <q-btn flat>
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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",
  setup() {
    return {
      model: ref(null),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },
});
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
</style>

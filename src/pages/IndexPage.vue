<template>
  <q-page class="desktop-only">
    <Header @update-task="updateTask()" />

    <!-- TODO переделать -->
    <div class="q-pt-xl desktop-only" style="margin-left: 314px">
      <div class="row q-gutter-sm">
        <div v-if="!token" class="fixed-center text-center text-h3">
          Чтобы получить задачи, авторизуйтесь
        </div>
        <div
          v-else-if="token"
          v-for="(task, id) in tasks"
          :key="task.id"
          transition="scale"
        >
          <Card v-if="!task.complited" :task="tasks" :id="id" />
        </div>
      </div>
    </div>
    <div v-if="loading" class="text-center">
      <q-spinner-ball color="primary" size="8em" />
    </div>
  </q-page>

  <q-page class="mobile-only">
    <Header @update-task="updateTask()" />
    <div v-if="!token" class="fixed-center text-center text-h3">
      Чтобы получить задачи, авторизуйтесь
    </div>
    <div class="row justify-center" v-else-if="token">
      <q-btn
        class="q-mb-md"
        text-color="white"
        style="
          width: 328px;
          height: 52px;
          background: linear-gradient(101deg, #8cc63e 0%, #099240 100%);
        "
        @click="createFastTask()"
        >Оформить быструю задачу</q-btn
      >
      <div v-for="(task, id) in tasks" :key="task.id" transition="scale">
        <Card
          v-if="!task.complited"
          style="width: 328px; height: 92px"
          :task="tasks"
          :id="id"
          :isPause="task.isPause"
        />
      </div>
    </div>

    <div v-if="loading" class="absolute-center">
      <q-spinner-ball color="primary" size="8em" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
import Card from "src/components/Card.vue";
import Header from "src/components/Header.vue";
import { api } from "../boot/axios";
import VueCookie from "vue-cookie";

export default defineComponent({
  name: "IndexPage",
  components: {
    Card,
    Header,
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.getTask();
  },
  setup() {
    const tasks = ref(null);
    const token = VueCookie.get("token");
    return {
      tasks,
      token,
    };
  },
  methods: {
    async getTask() {
      const id = VueCookie.get("id");
      if (id !== null) {
        this.loading = true;
        try {
          const res = await api.get(`/task/user/${id}`, {
            headers: {
              authorization: VueCookie.get("token"),
            },
          });
          console.log(res);
          this.tasks = res.data;
          this.loading = false;
        } catch (error) {
          console.log("ERROR");
          this.loading = false;
        }
      }
    },
    async updateTask() {
      this.loading = true;
      console.log("Событие нажатия обработано корректно");
      try {
        const res = await api.get("/task/upload/task/", {
          headers: {
            authorization: VueCookie.get("token"),
          },
        });
        console.log(res);
        this.tasks = res.data;
        this.loading = false;
      } catch (error) {
        if (error.response && error.response.status === 304) {
          this.$q.notify({
            type: "positive",
            message: "Новых заданий нет",
          });
        } else {
          this.$q.notify({
            type: "negative",
            message: "Возникла ошибка при подключении к серверу",
          });
        }

        this.loading = false;
      }
    },

    async createFastTask() {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      try {
        const response = await api.post(
          "/task/",
          {
            user: VueCookie.get("id"),
            task_name: "Быстрая задача",
            description: " ",
            data_start: today,
            data_end: tomorrow,
            pause: [],
            save_time: 0,
          },
          {
            headers: {
              authorization: VueCookie.get("token"),
            },
          }
        );
        const id = response.data._id;

        await Browser.open({
          url: `https://spa-lac-omega.vercel.app/#/task/:${id}`,
        });
        // this.$router.push(`/task/:${id}`);
        // setTimeout(() => {
        //   this.getTask();
        // }, 0.1);
      } catch (error) {
        console.log("Error");
      }
    },
  },
});
</script>

<template>
  <q-page class="desktop-only">
    <Header />

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
    <Header />
    <div v-if="!token" class="fixed-center text-center text-h3">
      Чтобы получить задачи, авторизуйтесь
    </div>
    <div
      v-else-if="token"
      v-for="(task, id) in tasks"
      :key="task.id"
      transition="scale"
    >
      <Card
        v-if="!task.complited"
        style="width: 328px; height: 92px"
        :task="tasks"
        :id="id"
        :isPause="task.isPause"
      />
    </div>
    <div v-if="loading" class="text-center">
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
      this.loading = true;
      try {
        const res = await api.get(`/task/user/${id}`, {
          headers: {
            authorization: VueCookie.get("token"),
          },
        });
        this.tasks = res.data;
        this.loading = false;
      } catch (error) {
        console.log("ERROR");
        this.loading = false;
      }
    },
  },
});
</script>

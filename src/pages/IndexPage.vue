<template>
  <q-page class="desktop-only">
    <Header />
    <!-- TODO переделать -->
    <div class="q-pt-md desktop-only" style="margin-left: 314px">
      <div class="row q-gutter-sm">
        <div v-for="(task, id) in tasks" :key="task.id" transition="scale">
          <Card :task="tasks" :id="id" />
        </div>
      </div>
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
      />
    </div>
  </q-page>

  <!-- <q-page class="capacitor-only">
    <Header />
    <div v-for="(task, id) in tasks" :key="task.id" transition="scale">
      <Card
        v-if="!task.complited"
        style="width: 328px; height: 92px"
        :task="tasks"
        :id="id"
      />
    </div>
  </q-page> -->
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
  mounted() {
    this.getTask();
  },
  setup() {
    // const taskStore = useTask();
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
      try {
        const res = await api.get(`/task/user/${id}`, {
          headers: {
            authorization: VueCookie.get("token"),
          },
        });
        this.tasks = res.data;
      } catch (error) {
        console.log("ERROR");
      }
    },
  },
});
</script>

<template>
  <q-page class="desktop-only">
    <!-- TODO переделать -->
    <div class="q-pt-md desktop-only" style="margin-left: 314px">
      <div class="row q-gutter-sm">
        <div v-for="(task, id) in tasks" :key="task.id" transition="scale">
          <!-- Передаем данные из хранилища в компонент карточки -->
          <Card :task="tasks" :id="id" />
        </div>
      </div>
    </div>
  </q-page>

  <q-page class="mobile-only native-mobile-hide">
    <div v-for="(task, id) in tasks" :key="task.id" transition="scale">
      <!-- Передаем данные из хранилища в компонент карточки -->
      <Card
        v-if="!task.complited"
        style="width: 328px; height: 92px"
        :task="tasks"
        :id="id"
      />
    </div>
  </q-page>

  <q-page class="native-mobile-only">
    <div v-for="(task, id) in tasks" :key="task.id" transition="scale">
      <!-- Передаем данные из хранилища в компонент карточки -->
      <Card
        v-if="!task.complited"
        style="width: 328px; height: 92px"
        :task="tasks"
        :id="id"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
import Card from "src/components/Card.vue";
import { api } from "../boot/axios";

export default defineComponent({
  name: "IndexPage",
  components: {
    Card,
  },
  mounted() {
    this.getTask();
  },
  setup() {
    // const taskStore = useTask();
    const tasks = ref(null);
    return {
      tasks,
    };
  },
  methods: {
    async getTask() {
      try {
        const res = await api.get("/task/");
        this.tasks = res.data;
      } catch (error) {
        console.log("ERROR");
      }
    },
  },
});
</script>

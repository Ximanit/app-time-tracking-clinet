<template>
  <q-page>
    <div class="q-pt-md" style="margin-left: 314px">
      <div class="row q-gutter-sm">
        <div v-for="(task, id) in tasks" :key="task.id" transition="scale">
          <!-- Передаем данные из хранилища в компонент карточки -->
          <Card :task="tasks" :id="id" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
import Card from "src/components/Card.vue";
import { useTask } from "../stores/example-store";
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
    const taskStore = useTask();
    const tasks = ref(null);

    // Отслеживаем изменения в хранилище
    watchEffect(() => {
      tasks.value = taskStore.getTaskData;
    });

    return {
      tasks,
    };
  },
  methods: {
    async getTask() {
      try {
        const res = await api.get("/task/");
        useTask().setTaskData(res.data);
        this.tasks = res.data;
      } catch (error) {
        console.log("ERROR");
      }
    },
  },
});
</script>

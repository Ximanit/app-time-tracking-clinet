<template>
  <q-card style="width: 420px" class="q-pa-md card q-ma-sm">
    <q-card-section class="text-bold q-pl-none" style="font-size: 18px">
      {{ task[id].task_name }}
    </q-card-section>
    <q-card-section class="q-pt-none q-pl-none">
      <q-chip
        style="font-size: 18px"
        text-color="white"
        class="rounded-borders"
        color="info"
      >
        {{ formatDate(task[id].data_start) }}
        - {{ formatDate(task[id].data_end) }}
      </q-chip>
      <q-chip
        style="font-size: 18px"
        text-color="white"
        class="rounded-borders"
        color="negative"
        >{{ task[id].urgency }}</q-chip
      >
    </q-card-section>
    <q-btn
      style="width: 100%; border-radius: 12px"
      class="q-pa-none"
      outline
      color="positive"
      @click="this.fullTask = true"
    >
      Подробнее
    </q-btn>
  </q-card>
  <q-dialog v-model="fullTask">
    <q-card>
      <q-card style="width: 100%; height: 300px">
        <q-card-section class="text-bold q-pl-none" style="font-size: 18px">
          {{ task[id].task_name }}
        </q-card-section>
        <q-card-section class="q-pt-none q-pl-none">
          <q-chip
            style="font-size: 18px"
            text-color="white"
            class="rounded-borders"
            color="info"
          >
            {{ formatDate(task[id].data_start) }}
            - {{ formatDate(task[id].data_end) }}
          </q-chip>
          <q-chip
            style="font-size: 18px"
            text-color="white"
            class="rounded-borders"
            color="negative"
            >{{ task[id].urgency }}</q-chip
          >
        </q-card-section>
        <q-btn
          style="width: 100%; border-radius: 12px"
          class="q-pa-none"
          outline
          color="positive"
          @click="this.fullTask = true"
        >
          Подробнее
        </q-btn>
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      fullTask: false,
    };
  },
  methods: {
    showFullTask() {
      this.fullTask = true;
    },
    formatDate(dateTimeString) {
      const date = new Date(dateTimeString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day < 10 ? "0" : ""}${day}.${
        month < 10 ? "0" : ""
      }${month}.${year}`;
    },
  },
};
</script>

<style>
.card {
  border-radius: 24px;
  border: 1px solid #01803d;
  box-shadow: 0px 1px 11.3px 0px rgba(0, 0, 0, 0.25);
}
</style>

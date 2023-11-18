import { defineStore } from "pinia";

export const useTask = defineStore("taskData", {
  state: () => ({
    taskData: null,
  }),
  actions: {
    setTaskData(data) {
      this.taskData = data;
    },
  },
  getters: {
    getTaskData() {
      return this.taskData;
    },
  },
});

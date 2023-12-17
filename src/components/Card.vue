<template>
  <div class="desktop-only">
    <q-card :class="{ 'card-paused': false }" class="q-pa-md card q-ma-sm">
      <div v-if="true" class="pause-icon">❚❚</div>
      <q-card-section
        class="text-bold q-px-none q-pt-none"
        style="font-size: 18px"
      >
        {{ task[id].task_name }}
      </q-card-section>
      <q-card-section class="q-pt-none q-px-none">
        <q-chip
          style="height: 36px"
          text-color="dark"
          class="date text-weight-medium text-body2 q-px-md q-py-sm q-ma-none q-mr-sm"
        >
          {{ formatDate(task[id].data_start) }} -
          {{ formatDate(task[id].data_end) }}
        </q-chip>
        <q-chip
          style="height: 36px"
          text-color="negative"
          class="urgency q-ma-none"
        >
          {{ task[id].urgency }}
        </q-chip>
      </q-card-section>
      <div class="row">
        <q-btn
          class="q-pa-none col"
          style="border-radius: 12px"
          outline
          color="8F8F8F"
          @click="this.fullTask = true"
        >
          Подробнее
        </q-btn>
        <q-btn
          class="q-pa-none q-ml-sm col"
          style="border-radius: 12px"
          outline
          color="positive"
          @click="taskStart(task[id]._id)"
        >
          Принять
        </q-btn>
      </div>
    </q-card>
    <q-dialog v-model="fullTask">
      <q-card class="full-card">
        <q-card-section class="text-bold q-pt-none q-px-none text-h5">
          {{ task[id].task_name }}
        </q-card-section>
        <q-card-section class="q-pt-none q-px-none">
          <q-chip
            style="height: 36px"
            text-color="dark"
            class="date text-weight-medium text-body2 q-px-md q-py-sm q-ma-none q-mr-sm"
          >
            {{ formatDate(task[id].data_start) }}
            - {{ formatDate(task[id].data_end) }}
          </q-chip>
          <q-chip
            style="height: 36px"
            text-color="negative"
            class="urgency q-ma-none"
            >{{ task[id].urgency }}</q-chip
          >
        </q-card-section>
        <q-card-section class="q-px-none q-pt-none" style="font-size: 18px">
          {{ task[id].description }}
        </q-card-section>
        <div class="row justify-end">
          <q-btn class="q-pa-none q-py-md btn-full" color="positive" outline>
            Принять
          </q-btn>
        </div>
      </q-card>
    </q-dialog>
  </div>

  <div class="mobile-only native-mobile-hide row justify-center">
    <q-card class="q-pa-md card-mobile q-mb-sm">
      <div :class="{ 'paused-card': task[id].isPause }">
        <div class="row inline justify-between q-mb-sm">
          <q-card-section
            class="text-bold q-pa-none"
            style="font-size: 15px; width: 260px"
          >
            <!-- Name -->
            {{ task[id].task_name }}
            <div class="q-mt-sm">
              <q-chip
                style="height: 20px; font-size: 10px; border-radius: 8px"
                text-color="dark"
                class="date text-weight-medium q-ma-none q-mr-sm"
              >
                <!-- date -->
                {{ formatDate(task[id].data_start) }}
                - {{ formatDate(task[id].data_end) }}
              </q-chip>
              <q-chip
                style="height: 20px; font-size: 10px; border-radius: 8px"
                class="q-ma-none"
                :style="getUrgencyStyle(task[id].urgency)"
              >
                <!-- urgency -->
                {{ task[id].urgency }}
              </q-chip>
            </div>
          </q-card-section>

          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
          />
        </div>

        <q-slide-transition>
          <div v-show="expanded">
            <q-card-section
              class="no-padding"
              style="font-size: 13px; line-height: 16px"
            >
              <!-- {{ task[id].description }} -->
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et eum
              voluptates voluptas, quaerat, accusantium suscipit dicta eveniet
              sunt ipsa reiciendis hic voluptate sed, molestias totam quis.
              Nesciunt fugiat animi perspiciatis.
              <div class="q-mt-sm">
                <q-btn
                  class="q-pa-none"
                  outline
                  size="12px"
                  color="positive"
                  @click="taskStart(task[id]._id)"
                  style="width: 100%; border-radius: 4px"
                >
                  Начать
                </q-btn>
              </div>
            </q-card-section>
          </div>
        </q-slide-transition>
      </div>

      <div v-if="task[id].isPause" class="paused-overlay">
        <q-btn
          class="no-padding resume-button"
          @click.native="taskStart(task[id]._id)"
          size="35px"
          flat
          color="primary"
          icon="pause"
        >
        </q-btn>
      </div>
    </q-card>
  </div>

  <div class="capacitor-only row justify-center">
    <q-card class="q-pa-md card-mobile q-mb-sm">
      <div :class="{ 'paused-card': task[id].isPause }">
        <div class="row inline justify-between q-mb-sm">
          <q-card-section
            class="text-bold q-pa-none"
            style="font-size: 15px; width: 260px"
          >
            <!-- Name -->
            {{ task[id].task_name }}
            <div class="q-mt-sm">
              <q-chip
                style="height: 20px; font-size: 10px; border-radius: 8px"
                text-color="dark"
                class="date text-weight-medium q-ma-none q-mr-sm"
              >
                <!-- date -->
                {{ formatDate(task[id].data_start) }}
                - {{ formatDate(task[id].data_end) }}
              </q-chip>
              <q-chip
                style="height: 20px; font-size: 10px; border-radius: 8px"
                class="q-ma-none"
                :style="getUrgencyStyle(task[id].urgency)"
              >
                <!-- urgency -->
                {{ task[id].urgency }}
              </q-chip>
            </div>
          </q-card-section>

          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
          />
        </div>

        <q-slide-transition>
          <div v-show="expanded">
            <q-card-section
              class="no-padding"
              style="font-size: 13px; line-height: 16px"
            >
              <!-- {{ task[id].description }} -->
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et eum
              voluptates voluptas, quaerat, accusantium suscipit dicta eveniet
              sunt ipsa reiciendis hic voluptate sed, molestias totam quis.
              Nesciunt fugiat animi perspiciatis.
              <div class="q-mt-sm">
                <q-btn
                  class="q-pa-none"
                  outline
                  size="12px"
                  color="positive"
                  @click="micro(task[id]._id)"
                  style="width: 100%; border-radius: 4px"
                >
                  Начать
                </q-btn>
              </div>
            </q-card-section>
          </div>
        </q-slide-transition>
      </div>

      <div v-if="task[id].isPause" class="paused-overlay">
        <q-btn
          class="no-padding resume-button"
          @click.native="micro(task[id]._id)"
          size="35px"
          flat
          color="primary"
          icon="pause"
        >
        </q-btn>
      </div>
    </q-card>
  </div>
</template>

<script>
import { Browser } from "@capacitor/browser";

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
    isPause: {
      type: Boolean,
    },
  },
  data() {
    return {
      fullTask: false,
      expanded: false,
    };
  },
  methods: {
    async micro(id) {
      await Browser.open({
        url: `https://spa-chi-pink.vercel.app/#/task/:${id}`,
      });
      // console.log("Capacitor");
    },
    taskStart(id) {
      console.log(id);
      this.$router.push(`/task/:${id}`);
    },
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
    taskStart(id) {
      console.log(id);
      this.$router.push(`/task/:${id}`);
    },
    getUrgencyStyle(urgency) {
      switch (urgency) {
        case "Не срочно":
          return "border: 1px solid var(---, #007CEE); background: var(---, rgba(0, 124, 238, 0.16)); color: var(---, #007CEE);";
        case "Срочно":
          return "border: 1px solid var(---, #D07E03);background: var(---, rgba(208, 126, 3, 0.16));color: var(---, #D07E03);";
        case "Очень срочно":
          return "border: 1px solid var(---, #E00); background: var(---, rgba(238, 0, 0, 0.16)); color: var(---, #E00);";
      }
    },
  },
};
</script>

<style scoped>
.paused-card {
  opacity: 0.5;
  position: relative;
}

.paused-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: 420px;
  border-radius: 24px;
  border: 1px solid #8cc63e;
  box-shadow: 0px 1px 11.3px 0px rgba(0, 0, 0, 0.25);
}

.date {
  border-radius: 8px;
  border: 1px solid #1f1f1f;
  background: var(--unnamed, rgba(154, 154, 154, 0.32));
}
.urgency {
  border-radius: 8px;
  border: 1px solid #007cee;
  background: var(---, rgba(0, 124, 238, 0.16));
}
.full-card {
  max-width: 750px;
  min-width: 700px;
  min-height: 250px;
  padding: 32px 24px;
  border-radius: 24px;
  border: 1px solid #8cc63e;
  background: #fff;
}

.btn {
  width: 250px;
}

.btn-full {
  width: 300px;
  height: 52px;
  border-radius: 12px;
}

.card-mobile {
  max-width: 328px;
  border-radius: 8px;
  border: 1px solid #8cc63e;
  background: #fff;
  box-shadow: 0px 1px 11.3px 0px rgba(0, 0, 0, 0.25);
}
</style>

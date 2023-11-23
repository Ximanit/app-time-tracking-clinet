<template>
  <q-page class="desktop-only">
    <div class="row justify-center">
      <q-card class="work-task q-ma-lg">
        <q-card-section class="padding text-bold text-h5">
          Организовать доступ к ЖЗ Иванову И.И. ФЭУ Lorem ipsum dolor sit amet
        </q-card-section>
        <q-card-section class="padding q-pt-none q-px-none">
          <q-chip
            style="height: 36px"
            text-color="dark"
            class="date text-weight-medium text-body2 q-px-md q-py-sm q-ma-none q-mr-sm"
          >
            11.11.2023 - 14.11.2023
          </q-chip>
          <q-chip
            style="height: 36px"
            text-color="negative"
            class="urgency q-ma-none"
            >Срочно</q-chip
          >
        </q-card-section>
        <q-card-section
          class="padding q-px-none q-pt-none"
          style="font-size: 18px"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam. Lorem ipsum dolor sit
          amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
          suscipit, quam beatae rerum inventore consectetur, neque doloribus,
          cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi
          quidem quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quod modi, ex et quia sapiente aspernatur magni adipisci
          quaerat, ducimus amet velit ut necessitatibus. Eligendi dolorem
          distinctio velit itaque assumenda dignissimos?
        </q-card-section>
        <q-card-section class="padding row justify-center text-h3">
          00:00:00
        </q-card-section>
        <q-card-section class="padding row justify-between">
          <q-btn
            class="q-py-md q-px-lg text-h5 btn"
            color="warning"
            text-color="dark"
            outline
          >
            <q-icon name="pause" />
            Пауза
          </q-btn>
          <q-btn
            class="q-pa-none text-h5 q-py-md btn-finish"
            color="positive"
            outline
            @click="finishTask = true"
          >
            Завершить
          </q-btn>
        </q-card-section>
      </q-card>
      <div>
        <q-card class="work-list q-ma-lg q-pa-none">
          <q-card-section class="row justify-center text-h4 q-mb-lg no-padding">
            Список задач
          </q-card-section>
          <q-card-section class="no-padding">
            <q-scroll-area style="height: 480px; width: 100%">
              <div v-for="n in 10" :key="n" class="q-py-xs">
                <q-card class="q-pa-md card q-ma-sm border">
                  <q-card-section
                    class="text-bold q-px-none q-pt-none"
                    style="font-size: 18px"
                  >
                    Организовать доступ к ЖЗ Иванову И.И. ФЭУ Lorem ipsum dolor
                    sit amet
                  </q-card-section>
                  <q-card-section class="q-pt-none q-px-none">
                    <q-chip
                      style="height: 36px"
                      text-color="dark"
                      class="date text-weight-medium text-body2 q-px-md q-py-sm q-ma-none q-mr-sm"
                    >
                      11.11.2023 - 14.11.2023
                    </q-chip>
                    <q-chip
                      style="height: 36px"
                      text-color="negative"
                      class="urgency q-ma-none"
                      >Срочно</q-chip
                    >
                  </q-card-section>
                </q-card>
              </div>
            </q-scroll-area>
          </q-card-section>
        </q-card>
        <q-card class="work-fast q-ma-lg q-pa-lg">
          <q-card-section
            class="q-px-none q-pt-none q-pb-lg text-center"
            style="font-size: 32px; line-height: 29.5px; /* 92.188% */"
          >
            Оформить быструю задачу
          </q-card-section>
          <q-card-section class="no-padding">
            <q-btn
              @click="fastTask = true"
              class="no-padding text-h6 text-center"
              style="width: 100%; height: 68px; border-radius: 12px"
              >СОЗДАТЬ</q-btn
            >
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="finishTask">
      <q-card>
        <q-card-section> Комментарий по работе </q-card-section>
        <q-card-section>
          <q-input placeholder="Комментарий" autogrow> </q-input>
        </q-card-section>
        <q-card-section>
          <div>Потраченное время на работу</div>
          <div>4 часа 18 минут</div>
        </q-card-section>
        <q-card-section>
          <q-btn>Отмена</q-btn>
          <q-btn>Отправить</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="fastTask"
      ><q-card>
        <q-card-section> Оформить быструю задачу </q-card-section>
        <q-card-section>
          <div>Введите название быстрой задачи</div>
          <q-input autogrow> </q-input>
        </q-card-section>
        <q-card-section>
          <div>Выберите проект</div>
          <q-select v-model="model" :options="options" label="Standard" />
        </q-card-section>
        <q-card-section>
          <div>Комментарий</div>
          <q-input autogrow> </q-input>
        </q-card-section>
        <q-card-section>
          <q-btn>Отмена</q-btn>
          <q-btn>Создать</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>

  <q-page class="mobile-only">
    <div class="row justify-center">
      <q-btn
        class="q-mb-md"
        text-color="white"
        style="
          width: 328px;
          height: 52px;
          background: linear-gradient(101deg, #8cc63e 0%, #099240 100%);
        "
        >Оформить быструю задачу</q-btn
      >
    </div>

    <div class="row justify-center">
      <q-card class="task-mobile">
        <q-card-section class="text-bold text-subtitle1 q-pa-none q-mb-lg">
          Организовать доступ к ЖЗ Иванову И.И. ФЭУ Lorem ipsum dolor sit amet
        </q-card-section>
        <q-card-section class="q-pt-none q-px-none">
          <q-chip
            style="height: 28px; font-size: 10px"
            text-color="dark"
            class="date text-weight-medium q-px-sm q-py-xs q-ma-none q-mr-md"
          >
            11.11.2023 - 14.11.2023
          </q-chip>
          <q-chip
            style="height: 28px; font-size: 10px"
            text-color="negative"
            class="urgency q-ma-none q-px-sm q-py-xs"
            >Срочно</q-chip
          >
        </q-card-section>
        <q-card-section
          class="q-pa-none q-mb-xl"
          style="font-size: 13px; line-height: 16px"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam. Lorem ipsum dolor sit
          amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
          suscipit, quam beatae rerum inventore consectetur, neque doloribus,
          cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi
          quidem quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quod modi, ex et quia sapiente aspernatur magni adipisci
          quaerat, ducimus amet velit ut necessitatibus. Eligendi dolorem
          distinctio velit itaque assumenda dignissimos?
        </q-card-section>
        <q-card-section class="row justify-center text-h3 q-pa-none q-mb-xl">
          00:00:00
        </q-card-section>
        <q-card-section class="row justify-between q-pa-none">
          <q-btn
            class="q-py-md q-px-lg text-h5"
            style="width: 117px"
            color="warning"
            text-color="dark"
            outline
          >
            Пауза
          </q-btn>
          <q-btn
            class="q-pa-none text-h5 q-py-md"
            style="width: 163px; border-radius: 4px"
            color="positive"
            outline
          >
            Завершить
          </q-btn>
        </q-card-section>
      </q-card>
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
  data() {
    return {
      finishTask: false,
      fastTask: false,
      model: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },
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

<style scoped>
/* TODO Переделать на min и max */
.work-task {
  padding: 56px;
  width: 900px;
  height: 840px;
  border-radius: 24px;
  border: 1px solid #8cc63e;
  background: #fff;
  box-shadow: 0px 1px 11.3px 0px rgba(0, 0, 0, 0.25);
}
.padding {
  padding: 0px 0px 40px 0px;
}
.date {
  border-radius: 8px;
  border: 1px solid #1f1f1f;
  background: var(--unnamed, rgba(154, 154, 154, 0.32));
}
.urgency {
  border-radius: 8px;
  border: 1px solid #e00;
  background: var(--unnamed, rgba(238, 0, 0, 0.16));
}
.btn-finish {
  max-width: 270px;
  min-width: 250px;
  /* height: 52px; */
  border-radius: 12px;
}
.btn {
  border-radius: 8px;
}
.work-list {
  padding: 32px;
  width: 441px;
  height: 610px;
  border-radius: 24px;
  border: 1px solid #8cc63e;
  box-shadow: 0px 1px 11.3px 0px rgba(0, 0, 0, 0.25);
}
.work-fast {
  width: 440px;
  height: 206px;
  border-radius: 24px;
  border: 1px solid #8cc63e;
  box-shadow: 0px 1px 11.3px 0px rgba(0, 0, 0, 0.25);
}

.task-mobile {
  padding: 16px 12px;
  width: 328px;
  border-radius: 8px;
  border: 1px solid #8cc63e;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>

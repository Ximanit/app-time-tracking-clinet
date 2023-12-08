<template>
  <q-page class="desktop-only">
    <div class="row justify-center">
      <q-card
        class="work-task q-ma-lg"
        :class="{ 'paused-card': task.isPause }"
      >
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
            @click="startPause()"
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
        <div v-if="task.isPause" class="paused-overlay">
          <q-btn
            class="resume-button q-ma-md text-h5"
            @click.native="endPause()"
          >
            Продолжить
          </q-btn>
        </div>
      </q-card>
      <div>
        <q-card class="work-list q-ma-lg q-pa-none" :disabled="isPause">
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
      <q-card style="width: 328px; height: 328px">
        <q-card-section style="font-size: 17px">
          Комментарий по работе

          <q-input outlined autogrow v-model="finalTranscript" class="q-mb-lg">
            <template v-slot:append>
              <q-btn
                @click="startButton()"
                round
                dense
                flat
                :icon="isRecording ? 'mic_off' : 'mic'"
              />
            </template>
          </q-input>

          <div style="font-size: 17px" class="q-mb-lg">
            Потраченное время на работу
          </div>
          <div class="row justify-center" style="font-size: 36px">
            {{ elapsedTime }}
          </div>
        </q-card-section>
        <q-card-section class="row justify-end">
          <q-btn color="positive" outline @click="back()">Отправить</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="fastTask"
      ><q-card style="width: 328px; min-height: 400px">
        <q-card-section style="font-size: 17px" class="text-bold">
          Оформить быструю задачу
        </q-card-section>
        <q-card-section style="margin-bottom: 110px">
          <div>Введите название быстрой задачи</div>
          <q-input
            v-model="fastTaskTitle"
            class="q-mb-md"
            :dense="true"
            outlined
            autogrow
          >
          </q-input>

          <div>Выберите проект</div>
          <q-select
            v-model="model"
            outlined
            :options="options"
            label="Выбор проекта"
            :dense="true"
          />

          <div>Комментарий</div>
          <q-input v-model="fastTaskDes" outlined :dense="true" autogrow>
          </q-input>
        </q-card-section>
        <q-card-section class="row justify-between">
          <q-btn color="8F8F8F" outline>Отмена</q-btn>
          <q-btn color="positive" outline>Создать</q-btn>
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
        @click="fastTask = !fastTask"
        >Оформить быструю задачу</q-btn
      >
    </div>

    <div class="row justify-center">
      <q-card class="task-mobile" :class="{ 'paused-card': task.isPause }">
        <q-card-section class="text-bold text-subtitle1 q-pa-none q-mb-lg">
          {{ task.task_name }}
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
            >{{ task.urgency }}</q-chip
          >
        </q-card-section>
        <q-card-section
          class="q-pa-none q-mb-xl"
          style="font-size: 13px; line-height: 16px"
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et eum
          voluptates voluptas, quaerat, accusantium suscipit dicta eveniet sunt
          ipsa reiciendis hic voluptate sed, molestias totam quis. Nesciunt
          fugiat animi perspiciatis.
        </q-card-section>
        <q-card-section class="row justify-center text-h3 q-pa-none q-mb-xl">
          {{ elapsedTime }}
        </q-card-section>
        <q-card-section class="row justify-between q-pa-none">
          <q-btn
            class="q-py-md q-px-lg text-h5"
            style="width: 117px"
            color="warning"
            text-color="dark"
            outline
            @click="startPause()"
          >
            Пауза
          </q-btn>
          <q-btn
            class="q-pa-none text-h5 q-py-md"
            style="width: 163px; border-radius: 4px"
            color="positive"
            outline
            @click="finishTask = !finishTask"
          >
            Завершить
          </q-btn>
        </q-card-section>
        <div v-if="task.isPause" class="paused-overlay">
          <q-btn
            class="resume-button q-ma-md text-h5"
            @click.native="endPause()"
          >
            Продолжить
          </q-btn>
        </div>
      </q-card>
    </div>
    <q-dialog v-model="finishTask">
      <q-card style="width: 328px; height: 328px">
        <q-card-section style="font-size: 17px">
          Комментарий по работе

          <q-input outlined autogrow v-model="finalTranscript" class="q-mb-lg">
            <template v-slot:append>
              <q-btn
                @click="startButton()"
                round
                dense
                flat
                :icon="isRecording ? 'mic_off' : 'mic'"
              />
            </template>
          </q-input>

          <div style="font-size: 17px" class="q-mb-lg">
            Потраченное время на работу
          </div>
          <div class="row justify-center" style="font-size: 36px">
            {{ elapsedTime }}
          </div>
        </q-card-section>
        <q-card-section class="row justify-end">
          <q-btn color="positive" outline @click="back()">Отправить</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="fastTask"
      ><q-card style="width: 328px; min-height: 400px">
        <q-card-section style="font-size: 17px" class="text-bold">
          Оформить быструю задачу
        </q-card-section>
        <q-card-section style="margin-bottom: 110px">
          <div>Введите название быстрой задачи</div>
          <q-input
            v-model="fastTaskTitle"
            class="q-mb-md"
            :dense="true"
            outlined
            autogrow
          >
          </q-input>

          <div>Выберите проект</div>
          <q-select
            v-model="model"
            outlined
            :options="options"
            label="Выбор проекта"
            :dense="true"
          />

          <div>Комментарий</div>
          <q-input v-model="fastTaskDes" outlined :dense="true" autogrow>
          </q-input>
        </q-card-section>
        <q-card-section class="row justify-between">
          <q-btn color="8F8F8F" outline>Отмена</q-btn>
          <q-btn color="positive" outline>Создать</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "../boot/axios";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      finishTask: false,
      fastTask: false,
      model: null,
      options: [
        "Журнал заявок",
        "Мобильное приложение",
        "Сайт дополнительного обучения",
        "Главная страница"
      ],
      task: [],
      isPause: false,
      elapsedTime: "00:00:00",
      // Добавьте переменные для отслеживания времени
      startTime: null,
      timerInterval: null,
      savedElapsedTime: undefined,
      recognition: null,
      fastTaskTitle: "",
      fastTaskDes: "",
      isRecording: false,
      mediaRecorder: null,
      audioChunks: []
    };
  },
  mounted() {
    this.getTask();
    this.startTimer();
  },
  methods: {
    startTimer() {
      // Запомните текущее время как начальное время
      this.startTime = new Date();

      // Установите интервал для обновления elapsedTime каждую секунду
      this.timerInterval = setInterval(() => {
        this.updateElapsedTime();
      }, 1000);
    },
    updateElapsedTime() {
      // Вычислите разницу между текущим временем и начальным временем
      const now = new Date();
      const diff = Math.floor((now - this.startTime) / 1000);

      // Преобразуйте разницу в формат HH:mm:ss и обновите elapsedTime
      const hours = Math.floor(diff / 3600)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((diff % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (diff % 60).toString().padStart(2, "0");
      this.elapsedTime = `${hours}:${minutes}:${seconds}`;
    },
    stopTimer() {
      // Очистите интервал при остановке таймера
      clearInterval(this.timerInterval);
    },
    async getTask() {
      try {
        const res = await api.get(
          `/task/${this.$route.params.id.substring(1)}`
        );
        this.task = res.data;
        this.isPause = this.task.isPause;
        console.log(this.isPause);
      } catch (error) {
        console.log("ERROR");
      }
    },
    back() {
      this.$router.push(`/`);
    },
    async startPause() {
      console.log("start pause", this.$route.params.id.substring(1));
      try {
        this.stopTimer();
        this.isPause = false;
        console.log(this.isPause);
        await Promise.resolve();

        // Сохраните текущее значение elapsedTime при постановке на паузу
        this.savedElapsedTime = this.elapsedTime;

        await api.patch(`/task/onpause/${this.$route.params.id.substring(1)}`);
        this.getTask();
      } catch (error) {
        console.log("ERROR");
      }
    },
    async endPause() {
      console.log("Go");
      try {
        // Если есть сохраненное значение, используйте его
        if (this.savedElapsedTime !== undefined) {
          // Обновите elapsedTime, чтобы таймер начал отсчет с сохраненного значения
          this.elapsedTime = this.savedElapsedTime;
          this.savedElapsedTime = undefined; // Сброс сохраненного значения
        }
        this.isPause = true;
        console.log(this.isPause);

        // Запустите таймер
        this.startTimer();

        await Promise.resolve();
        await api.patch(`/task/offpause/${this.$route.params.id.substring(1)}`);
        this.getTask();
      } catch (error) {
        console.log("ERROR");
      }
    },
    startButton() {
      const serverURL =
        "https://app-time-tracking.onrender.com/speechRecognition/recognition/";

      if (!this.isRecording) {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then(stream => {
            this.mediaRecorder = new MediaRecorder(stream);

            this.mediaRecorder.addEventListener("dataavailable", event => {
              this.audioChunks.push(event.data);
            });

            this.mediaRecorder.addEventListener("stop", () => {
              const audioBlob = new Blob(this.audioChunks);
              const fd = new FormData();
              fd.append("audio", audioBlob);

              // Отправка на сервер
              fetch(serverURL, {
                method: "POST",
                body: fd
              })
                .then(response => response.json())
                .then(data => {
                  this.finalTranscript = data.text;
                  console.log(data.text);
                })
                .catch(error => {
                  console.error("Error during server request:", error);
                });

              this.audioChunks = [];
            });

            this.mediaRecorder.start();
            this.isRecording = true;
          })
          .catch(error => {
            console.error("Error accessing microphone:", error);
          });
      } else {
        this.mediaRecorder.stop();
        this.isRecording = false;
      }
    }
  }
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

.paused-card {
  opacity: 0.7;
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

.task-mobile .resume-button {
  z-index: 1;
  border-radius: 8px;
  border: 1px solid #e9ee00;
  background: #fbfcd6;
}
.work-task .resume-button {
  z-index: 1;
  border-radius: 8px;
  border: 1px solid #e9ee00;
  background: #fbfcd6;
}
</style>

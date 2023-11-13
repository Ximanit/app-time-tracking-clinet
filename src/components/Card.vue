<template>
  <q-card style="width: 420px" class="q-pa-md card q-ma-sm">
    <q-card-section class="text-bold q-pl-none" style="font-size: 18px">
      Организовать доступ к ЖЗ Иванову И.И. ФЭУ
    </q-card-section>
    <q-card-section class="q-pt-none q-pl-none">
      <q-chip
        style="font-size: 18px"
        text-color="white"
        class="rounded-borders"
        color="info"
        >11.11.2023 - 14.11.2023</q-chip
      >
      <q-chip
        style="font-size: 18px"
        text-color="white"
        class="rounded-borders"
        color="negative"
        >Срочно</q-chip
      >
    </q-card-section>
    <q-btn
      style="width: 100%; border-radius: 12px"
      class="q-pa-none"
      outline
      color="positive"
    >
      Подробнее
    </q-btn>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
});
</script>

<style>
.card {
  border-radius: 24px;
  border: 1px solid #01803d;
  box-shadow: 0px 1px 11.3px 0px rgba(0, 0, 0, 0.25);
}
</style>

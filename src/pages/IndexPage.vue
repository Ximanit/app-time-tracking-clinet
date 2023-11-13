<template>
  <q-page>
    <div class="q-pt-md" style="margin-left: 314px">
      <div class="row q-gutter-sm">
        <div v-for="index in 30" :key="index" transition="scale">
          <Card style="margin: 0" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Card from "src/components/Card.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    Card,
  },
});
</script>

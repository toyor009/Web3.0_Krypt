<template>
  <div class="flex justify-center items-center py-3">
    <div
      class="animate-spin rounded-full h-10 w-10 border-b-2 border-red-700"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loader",
});
</script>

<template>
  <div class="min-h-screen">
    <div class="gradient-bg-welcome">
      <Navbar />

      <Welcome />
    </div>

    <Services />

    <Transactions />

    <Footer />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
});
</script>

<style scoped></style>

<template>
  <div>
    <div>
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
import Services from "../components/Services.vue";
import Transactions from "../components/Transactions.vue";

export default defineComponent({
  components: { Services, Transactions },
  name: "Home",
});
</script>

<style scoped></style>

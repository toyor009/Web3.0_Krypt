<template>
  <div
    class="flex flex-col mf:flex-row w-full justify-center items-center gradient-bg-services"
  >
    <div
      class="flex mf:flex-row items-center justify-between md:p-20 py-12 px4"
    >
      <div class="flex flex-1 flex-col justify-start items-start">
        <h1 class="text-white text-3xl sm:text-5xl py-2 text-gradient">
          Services that we
          <br />
          continue to improve
        </h1>
      </div>
    </div>

    <div class="flex flex-1 flex-col justify-start items-center">
      <ServiceCard
        v-for="(card, index) in serviceCards"
        :key="index"
        :title="card.tittle"
        :subTitle="card.subTitle"
        :color="card.color"
        :icon="card.icon"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

const ServiceCard = defineComponent({
  name: "Service Card",
  props: { title: String, subTitle: String, color: String, icon: String },

  template: `<div
      class="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl"
    >
      <div
        :class="['w-10 h-10 rounded-full flex justify-center items-center', color]"
      >
        <FontAwesomeIcon :icon="icon" class="text-white text-[22px]" />
      </div>

      <div class="ml-5 flex flex-col flex-1">
      <h1 class="mt-2 text-white text-lg"> {{ title }} </h1>
      <p class="mt-2 text-white text-sm md:w-9/12"> {{ subTitle }} </p>
    </div>
    </div>`,
});

export default defineComponent({
  name: "Services",

  components: { ServiceCard },

  data() {
    return {
      serviceCards: [
        {
          title: "Security Guaranteed",
          subTitle:
            "Security is guaranteed. We always maintain the privacy and security of our products",
          color: "bg-[#2952e3]",
          icon: "shield",
        },
        {
          title: "Best exchange rates",
          subTitle:
            "Security is guaranteed. We always maintain the privacy and security of our products",
          color: "bg-[#8945f8]",
          icon: "magnifying-glass-dollar",
        },
        {
          title: "Fast transactions",
          subTitle:
            "Security is guaranteed. We always maintain the privacy and security of our products",
          color: "bg-[#f84550]",
          icon: "heart",
        },
      ],
    };
  },
});
</script>

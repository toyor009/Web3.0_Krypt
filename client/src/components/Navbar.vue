<template>
  <h1>Navbar</h1>
</template>

<script>
import { defineComponent } from "vue";

const NavbarItem = defineComponent({
  name: "NavbarItem",

  data() {
    return {};
  },

  props: {
    classProps: String,
    title: String,
  },

  template: `<li :class="['mx-4', 'cursor-pointer', classProps]">
      {{ title }}
    </li>`,
});

export default defineComponent({
  name: "Navbar",

  components: {
    NavbarItem,
  },

  data() {
    return {
      navbarItem: ["Market", "Exchange", "Tutorials", "Wallet"],
      menuIsOpen: false,
    };
  },

  methods: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },
  },
});
</script>

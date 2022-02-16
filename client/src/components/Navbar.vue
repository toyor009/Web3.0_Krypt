<template>
  <nav class="w-full flex md:justify-center justify-between items-center p-4">
    <div class="md:flex-[0.5] flex-initial justify-center items-center">
      <img src="src/images/logo.png" alt="Logo" class="w-32 cursor-pointer" />
    </div>

    <ul
      class="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial"
    >
      <NavbarItem
        v-for="(item, index) in navbarItem"
        :key="index"
        :title="item"
      />

      <li
        class="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
      >
        Login
      </li>
    </ul>

    <div class="flex relative">
      <ul
        v-if="menuIsOpen"
        class="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
      >
        <li class="text-xl w-full my-2">
          <FontAwesomeIcon
            icon="times"
            class="text-white cursor-pointer md:hidden"
            @click="toggleMenu"
          />
        </li>

        <NavbarItem
          v-for="(item, index) in navbarItem"
          :key="index"
          :title="item"
          classProps="my-2 text-lg"
        />
      </ul>

      <FontAwesomeIcon
        v-else
        icon="bars"
        class="fa-2x text-white cursor-pointer md:hidden"
        @click="toggleMenu"
      />
    </div>
  </nav>
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

<template>
  <div class="w-full flex justify-center items-center">
    <div
      class="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4"
    >
      <!-- Message -->
      <div class="flex flex-1 justify-start flex-col mf:mr-10">
        <h1 class="text-3xl sm:text-5xl text-white text-gradient py-1">
          Send Crypto <br />
          across the world
        </h1>

        <p
          class="text-left mt-5 text-white font-light w-11/12 md:w-9/12 text-base"
        >
          Explore the crypto world. Buy and sell cryptocurrencies easily on
          Krypt
        </p>

        <button
          v-if="!connectedAccount"
          type="button"
          class="flex flre-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
          @click="connectWallet"
        >
          <span class="text-white text-base font-semibold">
            {{ isConnectingWallet ? "Connecting..." : "Connect Wallet" }}
          </span>
        </button>

        <!-- Features -->
        <div class="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
          <div class="rounded-tl-2xl feature-grid">Reliability</div>
          <div class="rounded-tr-2xl sm:rounded-none feature-grid">
            Security
          </div>
          <div class="sm:rounded-tr-2xl feature-grid">Ethereum</div>
          <div class="sm:rounded-bl-2xl feature-grid">Web 3.0</div>
          <div class="rounded-bl-2xl sm:rounded-none feature-grid">
            Low fees
          </div>
          <div class="rounded-br-2xl feature-grid">Blockchain</div>
        </div>
      </div>

      <div
        class="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10"
      >
        <!-- Ethereum Card -->
        <div
          class="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full mt-5 eth-card white-glassmorphism"
        >
          <div class="flex justify-between flex-col w-full h-full">
            <div class="flex justify-between items-start">
              <div
                class="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center"
              >
                <FontAwesomeIcon icon="bitcoin-sign" class="text-white" />
              </div>

              <FontAwesomeIcon icon="info-circle" class="text-white" />
            </div>

            <div>
              <p class="text-white font-light text-sm">Address</p>
              <p class="text-white font-semibold text-lg mt-1">Ethereum</p>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div
          class="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism mt-4"
        >
          <Input
            v-for="(item, index) in form"
            :key="index"
            :name="item.name"
            :type="item.type"
            :placeholder="item.placeholder"
            v-model:value="item.value"
          />

          <div class="h-[1px] w-full bg-gray-400 my-2" />

          <Loader v-if="isSendingTransaction" />

          <button
            v-else
            type="button"
            class="text-white w-full mt-2 border-[1px] border-[#3d4f7c] p-2 rounded-full cursor-pointer"
            @click="submit"
          >
            Send Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, reactive } from "vue";

import { useStore } from "/@store";

const Input = defineComponent({
  name: "Input",
  emits: ["update:value"],
  props: { name: String, type: String, placeholder: String, value: String },

  template: `<input
            :name="name"
            :type="type"
            :placeholder="placeholder"
            :value="value"
            class="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
            step="0.0001"
            @input="$emit('update:value', $event.target.value)"
          />`,
});

export default defineComponent({
  name: "Welcome",

  components: { Input },

  data() {
    return {
      form: [
        {
          name: "addressTo",
          type: "text",
          value: "",
          placeholder: "Address To",
        },
        {
          name: "amount",
          type: "number",
          value: "",
          placeholder: "Amount (ETH)",
        },
        {
          name: "keyword",
          type: "text",
          value: "",
          placeholder: "Keyword (Gif)",
        },
        {
          name: "message",
          type: "text",
          value: "",
          placeholder: "Enter message",
        },
      ],
    };
  },

  setup() {
    const store = useStore();
    const connectedAccount = computed(() => store.state.connectedAccount);
    const requestStatus = reactive(store.state.requestStatus);
    const connectWallet = async () => {
      await store.dispatch("connectWallet");
    };
    const getConnectedAccount = async () => {
      await store.dispatch("getConnectedAccount");
    };
    const sendTransaction = async (transaction) => {
      await store.dispatch("sendTransaction", transaction);
    };

    getConnectedAccount();

    return { requestStatus, connectedAccount, connectWallet, sendTransaction };
  },

  computed: {
    isSendingTransaction() {
      return this.requestStatus.sendTransaction === "LOADING";
    },

    isConnectingWallet() {
      return this.requestStatus.connectWallet === "LOADING";
    },

    transactionWasSuccessful() {
      return this.requestStatus.sendTransaction === "SUCCESS";
    },
  },

  methods: {
    async submit() {
      if (this.form.some((field) => !field.value)) return;

      let transaction = {};
      this.form.map((field) => {
        transaction = { ...transaction, [field.name]: field.value };
      });

      transaction = { ...transaction, addressFrom: this.connectedAccount };

      await this.sendTransaction(transaction);
      if (this.transactionWasSuccessful) {
        this.clearForm();
        alert("Transction Successful");
        return;
      }

      alert("Transction Failed");
    },

    clearForm() {
      this.form.map((field) => {
        field.value = "";
      });
    },
  },
});
</script>

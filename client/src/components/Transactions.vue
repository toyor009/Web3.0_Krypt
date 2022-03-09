<template>
  <div
    class="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions"
  >
    <div class="flex flex-col md:p-12 py-12 px-4">
      <h3 v-if="connectedAccount" class="text-white text-3xl text-center my-2">
        Latest Transactions
      </h3>

      <h3 v-else class="text-white text-3xl text-center my-2">
        Connect your account to see the latest transactions
      </h3>

      <div
        v-if="connectedAccount"
        class="flex flex-wrap justify-center items-center mt-10"
      >
        <Loader v-if="isFetchingTransactions" />

        <TransctionCard
          v-else-if="allTransactions.length"
          v-for="(transaction, index) in allTransactions"
          :key="index"
          :addressFrom="transaction.addressFrom"
          :addressTo="transaction.addressTo"
          :amount="transaction.amount"
          :message="transaction.message"
          :timestamp="transaction.timestamp"
          :keyword="transaction.keyword"
        />

        <h3 v-else class="text-white text-xl text-center my-2">
          No transactions available
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, reactive, watchEffect, watch } from "vue";

import { useStore } from "/@store";
import { shortenAddress, fetchGif } from "/@utils/mixin";

const TransctionCard = defineComponent({
  name: "TransctionCard",
  props: {
    addressFrom: String,
    addressTo: String,
    timestamp: String,
    amount: String | Number,
    message: String,
    keyword: String,
  },

  data() {
    return {
      gifUrl: "",
    };
  },

  template: `<div
        class="bg-[#181918] m-4 flex flex-1 flex-col p-3 rounded-md hover:shadow-2xl 2xl:min-w-[450px] 2xl:max-w-[5000px] sm:min-w-[270px] sm:max-w-[300px]"
      >
        <div class="flex flex-col items-center w-full mt-3">
          <div class="w-full mb-6 p-2">
            <a :href="'https://ropsten.etherscan.io/address/'+ addressFrom" target="_blank" rel="noopener noreferrer">
              <span class="text-white text-base hover:text-blue-400 hover:underline">
                  From: {{ shortenedAddress(addressFrom) }}
              </span>
            </a>
            <br/>

            <a :href="'https://ropsten.etherscan.io/address/'+ addressTo" target="_blank" rel="noopener noreferrer">
              <span class="text-white text-base hover:text-blue-400 hover:underline">
                To: {{ shortenedAddress(addressTo) }}
              </span>
            </a>
            <br/>

            <p class="text-white text-base">
              Amount: {{ amount }} ETH
            </p>

            <p class="text-white text-base mt-3">
              <span v-if="message"> Message: {{ message }} </span>
            </p>
          </div>

          <img :src="gifUrl" alt="gif" class="w-full h-64 2xl:h-96 rounded-medium shadow-lg object-cover">

          <div class="bg-black p-3 px-5 w-max rounded-3xl mt-5 shadow-2xl">
            <p class="text-[#37c7da] font-bold">
              {{ timestamp }}
            </p>
          </div>
        </div>
      </div>`,

  methods: {
    shortenedAddress(address) {
      return shortenAddress(address);
    },
  },

  async mounted() {
    if (!this.keyword) return;
    this.gifUrl = await fetchGif(this.keyword);
  },
});

export default defineComponent({
  name: "Transactions",

  components: { TransctionCard },

  setup() {
    const store = useStore();
    const connectedAccount = computed(() => store.state.connectedAccount);
    const allTransactions = computed(() => store.state.allTransactions);
    const requestStatus = reactive(store.state.requestStatus);

    const getConnectedAccount = async () => {
      await store.dispatch("getConnectedAccount");
    };

    const getAllTransactions = async () => {
      if (!connectedAccount.value) return;

      await store.dispatch("getAllTransactions");
    };

    const isFetchingTransactions = computed(
      () => requestStatus.getAllTransactions === "LOADING"
    );

    watch(
      () => connectedAccount.value,
      () => {
        getAllTransactions();
      }
    );

    watchEffect(() => console.log("allTransactions: ", allTransactions.value));

    return {
      requestStatus,
      connectedAccount,
      isFetchingTransactions,
      allTransactions,
      getConnectedAccount,
      getAllTransactions,
    };
  },

  async created() {
    await this.getConnectedAccount();
    this.getAllTransactions();
  },
});
</script>

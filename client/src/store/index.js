import { createStore } from "vuex";
import {
  connectedAccount,
  connectWallet,
  sendTransaction,
  logError,
} from "/@utils/TransactionHelper";

const store = createStore({
  state: {
    requestStatus: {
      getConnectedAccount: "",
      connectWallet: "",
      sendTransaction: "",
      getAllTransactions: "",
    },
    connectedAccount: "",
    transactionCount: localStorage.getItem("transactionCount"),
  },

  mutations: {
    SET_REQUEST_STATUS(state, { name, status }) {
      state.requestStatus[name] = status;
    },

    SET_CONNECTED_ACCOUNT(state, account) {
      state.connectedAccount = account;
    },

    SET_TRANSACTION_COUNT(state, count) {
      state.transactionCount = count;
    },
  },

  actions: {
    getConnectedAccount: async (context) => {
      context.commit("SET_REQUEST_STATUS", {
        name: "getConnectedAccount",
        status: "LOADING",
      });

      try {
        const account = await connectedAccount();
        context.commit("SET_REQUEST_STATUS", {
          name: "getConnectedAccount",
          status: "SUCCESS",
        });
        context.commit("SET_CONNECTED_ACCOUNT", account);
      } catch (error) {
        logError(error);
      }
    },

    connectWallet: async (context) => {
      context.commit("SET_REQUEST_STATUS", {
        name: "connectWallet",
        status: "LOADING",
      });

      try {
        const account = await connectWallet();
        console.log("account", account);
        context.commit("SET_REQUEST_STATUS", {
          name: "connectWallet",
          status: "SUCCESS",
        });
        context.commit("SET_CONNECTED_ACCOUNT", account);
      } catch (error) {
        logError(error);
      }
    },

    sendTransaction: async (context, transaction) => {
      context.commit("SET_REQUEST_STATUS", {
        name: "sendTransaction",
        status: "LOADING",
      });

      try {
        await sendTransaction(transaction);
        context.commit("SET_REQUEST_STATUS", {
          name: "sendTransaction",
          status: "SUCCESS",
        });
      } catch (error) {
        logError(error);
        context.commit("SET_REQUEST_STATUS", {
          name: "sendTransaction",
          status: "ERROR",
        });
      }
    },
  },

  modules: {},
});

export const useStore = () => store;

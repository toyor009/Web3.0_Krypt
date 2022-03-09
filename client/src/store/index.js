import { createStore } from "vuex";
import { logError } from "/@utils/mixin";
import {
  connectedAccount,
  connectWallet,
  sendTransaction,
  getAllTransactions,
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
    allTransactions: [],
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

    SET_TRANSACTIONS(state, transactions) {
      let allTransactions = [];

      if (!transactions.length) {
        state.allTransactions = allTransactions;
        return;
      }

      allTransactions = transactions.map((transaction) => ({
        addressFrom: transaction.sender,
        addressTo: transaction.receiver,
        timestamp: new Date(
          Number(transaction.timestamp) * 1000
        ).toLocaleString(),
        keyword: transaction.keyword,
        message: transaction.message,
        amount: parseInt(transaction.amount._hex) / 10 ** 18,
      }));

      const accountTransactions = allTransactions.filter(
        (transaction) =>
          transaction.addressFrom.toLowerCase() ===
            state.connectedAccount.toLowerCase() ||
          transaction.addressTo.toLowerCase() ===
            state.connectedAccount.toLowerCase()
      );

      state.allTransactions = accountTransactions.reverse();
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
        context.commit("SET_REQUEST_STATUS", {
          name: "getConnectedAccount",
          status: "ERROR",
        });
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
        context.commit("SET_REQUEST_STATUS", {
          name: "connectWallet",
          status: "ERROR",
        });
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

    getAllTransactions: async (context) => {
      context.commit("SET_REQUEST_STATUS", {
        name: "getAllTransactions",
        status: "LOADING",
      });

      try {
        const transactions = await getAllTransactions();
        context.commit("SET_REQUEST_STATUS", {
          name: "getAllTransactions",
          status: "SUCCESS",
        });
        context.commit("SET_TRANSACTIONS", transactions);
      } catch (error) {
        logError(error);
        context.commit("SET_REQUEST_STATUS", {
          name: "getAllTransactions",
          status: "ERROR",
        });
      }
    },
  },

  modules: {},
});

export const useStore = () => store;

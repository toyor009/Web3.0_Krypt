import { ref } from "vue";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "/@utils/constants";

const { ethereum } = window;

export default () => {
  const logError = (error) => {
    console.log("error", error);
  };

  const connectedAccount = ref("");

  return {
    connectedAccount,

    checkIfWalletIsConnected: async () => {
      try {
        if (!ethereum) alert("Please install Metamask");

        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (!accounts.length) {
          logError("No accounts found");
          return;
        }
        //console.log("accounts", accounts);
        connectedAccount.value = accounts[0];

        //getAllTransactions();
      } catch (error) {
        logError(error);
      }
    },

    connectWallet: async () => {
      try {
        if (!ethereum) alert("Please install Metamask");

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        connectedAccount.value = accounts[0];
        //console.log("connectedAccount", connectedAccount);
      } catch (error) {
        logError(error);

        throw new Error("No ethereum object");
      }
    },

    getEthreumContract: () => {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      console.log("provider", provider);
      console.log("signer", signer);
      console.log("transactionContract", transactionContract);
    },

    sendTransaction: async () => {
      try {
      } catch (error) {}
    },
  };
};

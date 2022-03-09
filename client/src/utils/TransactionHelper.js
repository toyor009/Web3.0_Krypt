import { ethers } from "ethers";
import { contractABI, contractAddress } from "/@utils/constants";
import { logError } from "/@utils/mixin";

const { ethereum } = window;

const isMetamaskInstalled = () => {
  if (!ethereum) {
    alert("Please install Metamask");
    return false;
  }

  return true;
};

const getEthreumContract = () => {
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    return transactionContract;
  } catch (error) {
    logError(error);
  }
};

export const connectedAccount = async () => {
  try {
    if (!isMetamaskInstalled()) return;

    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (!accounts.length) {
      logError("No accounts found");
      return;
    }

    return accounts[0];
  } catch (error) {
    logError(error);
  }
};

export const connectWallet = async () => {
  try {
    if (!isMetamaskInstalled()) return;

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts[0];
  } catch (error) {
    logError(error);
    throw new Error("No ethereum object");
  }
};

export const sendTransaction = async (transaction) => {
  try {
    if (!isMetamaskInstalled()) return;

    const { addressFrom, addressTo, amount, keyword, message } = transaction;
    const parsedAmount = ethers.utils.parseEther(amount);
    const transactionContract = getEthreumContract();

    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: addressFrom,
          to: addressTo,
          gas: "0x5208", // 21,000 Gwei
          value: parsedAmount._hex,
        },
      ],
    });

    const transactionHash = await transactionContract.addToBlockchain(
      addressTo,
      parsedAmount,
      message,
      keyword
    );

    // console.log("Loading.....", transactionHash.hash);
    await transactionHash.wait();
    // console.log("Success.....", transactionHash.hash);
  } catch (error) {
    logError(error);
  }
};

export const getAllTransactions = async () => {
  try {
    const transactionContract = getEthreumContract();
    const transactions = await transactionContract.getAllTransactions();
    return transactions;
  } catch (error) {
    logError(error);
  }
};

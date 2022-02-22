// https://eth-ropsten.alchemyapi.io/v2/wAvFiOS-JZwkDzyKQ1rvsaRYjJb0npxh

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/wAvFiOS-JZwkDzyKQ1rvsaRYjJb0npxh",
      accounts: [
        "82064a8231f27aca8bcafa8cf61da40f73861fee74749030c7e8394fcac81dde",
      ],
    },
  },
};

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      from: '0xB6E1AB0B1e9E12f9A94da4d00DdB83bf96433D69',
      network_id: 5777, // Match any network id
       gasPrice: 1,   // <--- Twice as much
       gas: 9999999,   // <--- Twice as much
    }
  }
};
if (!window.ethereum || !window.ethereum.isMetaMask) {
    console.log('MetaMask未インストール');
    console.log(window.ethereum);
} else {
    console.log('MetaMaskがインストールされています');
    console.log(window.ethereum);
    console.log(window.ethereum.isMetaMask);
}

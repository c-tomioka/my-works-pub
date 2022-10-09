if (!window.ethereum || !window.ethereum.isMetaMask) {
    console.log('MetaMask未インストール');
    console.log(window.ethereum);
} else {
    console.log('MetaMaskがインストールされています');
    console.log(window.ethereum);
    console.log(window.ethereum.isMetaMask);
}

handleEthereum: () => {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
        console.log("Ethereum successfully detected!");
        console.log(ethereum.selectedAddress);
        const myaddress = ethereum.selectedAddress;
        return myaddress;
    } else {
        console.log("Please install MetaMask!");
    }
}

if (!window.ethereum || !window.ethereum.isMetaMask) {
   // Ethereum プロバイダーを検出できなかった場合（＝ MetaMask が未インストールの場合）
   alert('このページを利用するには、MetaMask をインストールしてください。');

   // DOM で MetaMask のダウンロード先を表示する処理 **********//
   const helpElement = document.createElement('div');
   // ダウンロード先を作成
   const aTag = document.createElement('a');
   aTag.innerText = 'こちらの公式サイト'
   aTag.href = 'https://metamask.io/';
   aTag.target = '_blank'; // クリック時に別タブ表示にするための設定
   aTag.rel = 'noopener'; // 別タブ表示を安全にするための設定
   // ダウンロードリンクしない文章を作成
   const spanTag = document.createElement('span');
   spanTag.innerText = 'から MetaMask をダウンロードしてください。（※ インストール後は、ブラウザの再起動が必要です）';
   // 表示メッセージを親要素に追加
   helpElement.appendChild(aTag);
   helpElement.appendChild(spanTag);
   // 表示スタイルを装飾する
   helpElement.style.border = '1px solid #f3b76e';
   helpElement.style.borderRadius = '5px';
   helpElement.style.backgroundColor = '#f8f3ed';
   helpElement.style.padding = '0.5em 1em';

   // id "main" の要素の先頭に、helpElement要素を追加表示する
   document.body.prepend(helpElement);

   window.addEventListener("ethereum#initialized", this.handleEthereum, {
    once: true,
  });
  setTimeout(this.handleEthereum, 3000);
} else {
    // Ethereum プロバイダーを検出できた場合
    console.log('MetaMask is installed!');
}
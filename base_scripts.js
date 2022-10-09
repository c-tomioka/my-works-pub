// MetaMask インストールチェック (これがないとウォレットにアクセスできない) ※注意 ローカルで読み込んでも、必ずエラーになります
const isMetaMaskInstalled = () => {
   // Ethereum プロバイダーを検出できなかった場合（＝ MetaMask が未インストールの場合）
   if (!(window.ethereum && !window.ethereum.isMetaMask)) {
        console.log('MetaMask 未インストール');
        return false;
    } else {
        return true;
    }
}

// 画面表示が、ローカルマシンのhtmlファイル参照でないかをチェック
const isLocalFileView = () => {
    if (location.protocol.match(/file:/)) {
         return true;
     } else {
         return false;
     }
 }

// 画面上部に警告メッセージを表示する
if (isLocalFileView) {
    // DOM で注意メッセージを表示する処理 **********//
    const helpElement = document.createElement('div');
    helpElement.innerText = 'この画面は "' + location.pathname + '" のファイルを表示しています。\nローカルファイルの表示からでは、セキュリティ上 window.ethereum が実行できないため、「http://」から始まるサイトにアップロードして表示してください。\n（例えば、GitHubに公開し、GitHub Pages を利用してこのページを表示すると動作します。）';
    helpElement.style.border = '1px solid #f3b76e';
    helpElement.style.borderRadius = '5px';
    helpElement.style.backgroundColor = '#f8f3ed';
    helpElement.style.padding = '0.5em 1em';
    document.body.prepend(helpElement);

} else if (!isMetaMaskInstalled) {
    // MetaMask が未インストールの場合に、画面の上部に注意メッセージとダウンロードリンクを表示する

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
}

// 画面が読み込まれた後の処理
window.onload = () => {
    if (isLocalFileView) {
        alert('アドレスが「file:」から始まるページでは利用できません。\n「https://」から始まるページでご利用ください。');
    } else if (!isMetaMaskInstalled) {
        alert('このページを利用するには、MetaMask をインストールしてください。');
    } else if (isMetaMaskInstalled) {
        console.log('MetaMask がインストールされています');
    }
}

// ********** MetaMask 関連処理 ********** //
try {
    const acccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (acccounts.length > 0) {
        console.log(acccounts[0]);
    }
} catch (err) {
    if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // ユーザーが接続を拒否するとここに来ます
        console.log('Please connect to MetaMask.');
    } else {
        console.error(err);
    }
}

document.getElementById('connect_btn').addEventListener('click', connectToWallet);

function connectToWallet() {
    if (!isMetaMaskInstalled) {
        alert('MetaMask をインストールしないと使用できません。');
    } else {
        window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(
            // リクエスト後の処理を .then() で続けて書いています
            (acccounts) => {
                console.log(acccounts);

                if (acccounts.length > 0) {
                    console.log(acccounts[0]);
                }
            }
        )
        .catch(
            // リクエスト後にエラーが発生した時の処理を .catch() で更に続けて書いています
            (err) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // ユーザーが接続を拒否するとここに来ます
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            }
        );
    }
}
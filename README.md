リバーシ
====

Firebase + Vue(composition api)で作ったリバーシ

## Description

- リバーシのサイトを作りたかった訳ではなく、FirebaseとVue.jsの機能を使ったデモを作りたかったのでUXに関してはご容赦願いたい。

利用した機能：
- 機能の肝は、ブラウザを問わず他のユーザーの行った作業が反映される点である。この機能は、FirebaseとVueのリアルタイムな状態管理を用いることで非常にシンプルに実現されている。リバーシのサイトを作りたかった訳ではなく、FirebaseとVue.jsの機能を使ったデモを作りたかったのでUXに関してはご容赦願いたい。機能の肝は、ブラウザを問わず他のユーザーの行った作業が反映される点である。この機能は、FirebaseとVueのリアルタイムな状態管理を用いることで非常にシンプルに実現されている。
- また、SPA（ページ遷移によりHTMLのロードがない）であり、最初に２MByte程度の読み込みをFirebaseHostingで行った後は、Firestoreとの通信でデータのみを受信するため非常に軽快に動作する。
- Vue2.6だが、component apiを導入。コレクション（firestoreにおけるテーブルのようなもの）毎に、クラスを定義。Vuexなしで問題はない。
- Firebase Authenticationでメールアドレス承認を利用した。
- pug/sassで簡単な表記。

## Requirement

- Googleアカウント
- Githubアカウント
- npm
- Firebase Tools (`npm install -g firebase-tools`)

## Install
1. "git clone"
1. Firebaseコンソールで新規のプロジェクトを作る。
1. Firestoreを有効にする。
1. authoricationを有効にして、email承認を有効にする
1. firebaseコンソールから、Webアプリを有効にして`Firebase SDK snippet`から`構成`を選択表示されたキーを
　`src/script/firebaseConfig.ts`に貼り付ける。
 `.firebaserc`のプロジェクト名を上記の画面から取得したプロジェクト名にする
  ```
  {
    "projects": {
      "default": "your-own-firebase-project-name"
    }
  }
  ```
6. `firebase login`を実行してfirebaseにログインする
1. `npm install`を実行する
1. `npm run serve`で実行
1. `http://localhost:8080`でサイトにアクセス

## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)


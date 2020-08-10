<template lang="pug">
#home
  img(alt="Vue logo" src="../assets/logo.png")
  h1 firebase + vue で作ったリバーシ(オセロ)
  p このサイトは岩元隆明(iwamoto.takaaki@gmail.com)がポートフォリとして作った(本格)リバーシのサイトです。
  p firebaseのリアルタイムデータベースとvueのreactiveで非常に軽量に、リアルタイム通信を行います。
  h3 注意:
  p コンピュータではなく、実際の人と対戦します。本格的なので、相手を探すところからゲームは始まります。
  h3 使い方:
  p １．右上のsing inボタンを押していただくとユーザー登録ができます。
  p ２．ログイン後、上に'テーブル管理'のリンクが表示されますので、クリックします。
  p ３．対戦用のボードは復数保管できます。相手の名前などをタイトルにしてください。
  p ４．タイトルをクリックするとボードが表示されます。
  p ５．置きたい駒を選択してクリックすると置くことができます。
  p ６．ひっくり返すのは手動です。相手を助けることも見逃しをスルーすることもできます。
  p ７．返し終わったら、相手にターンが終わったことをお知らせください。
  h3 技術的な解説:
  p
    | github: &lt;
    a(href="https://github.com/iwamoto-takaaki/reversi") https://github.com/iwamoto-takaaki/reversi
    | &gt;にて
</template>

<style scoped lang="sass">
#home
  h3
    margin-top: 3rem
  margin-bottom: 3rem
</style>

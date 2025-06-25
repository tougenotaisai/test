# 会員情報登録デモ

このプロジェクトは、HTMLとJavaScriptで作成された会員情報登録画面のサンプルです。郵便番号を入力すると、aipzloud（zipaddress.net）APIを利用して自動的に住所が入力されます。

## ファイル構成

- `UserEntry.html`  
  会員情報登録画面のHTMLファイルです。  
- `postalcode.js`  
  郵便番号から住所を自動入力するJavaScriptファイルです。  
- `index.html`, `index2.html`  
  サンプルのHello Worldページです。  
- `README.md`  
  このファイルです。

## 使い方

1. `UserEntry.html` をブラウザで開きます。
2. フォームに必要事項を入力します。年齢も必須項目です。
3. 郵便番号（例: 123-4567 または 1234567）を入力し、入力欄からフォーカスを外すと自動で住所が入力されます。

## 注意事項

- 住所自動入力にはインターネット接続が必要です。
- APIの仕様や利用制限は [zipaddress.net](https://zipaddress.net/) をご確認ください。

## ライセンス

このプロジェクトは学習・検証用
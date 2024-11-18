## 概要
***タイトル***：Jozady 想像が膨らむ，旅のしおり  

旅行のスケジュールを作成，閲覧ができる  
何かwebアプリを作りたいと思って修士1年の時に作ったアプリ  
[nicody](https://nicody.jp/mypage/library)を参考（ほぼそのまま）に作成  
vercelでデプロイ  
⚠️バグ・余計なUI多数あり

## 使い方
(https://jozady-trip-scheduler-jisd.vercel.app/)

### 操作
1. **しおり一覧**で旅のしおりを作成（画面1）
    - タイトルやら日付やらを入力して追加  
2. しおりごとにスケジュールを追加（画面2）
    - 行きたいスポットをフォームに入力して，Googleのオートコンプリートで入力補完（推しポ！）
    - 日付やらを入力して，スポット情報の追加
- PC画面なら編集可能
- スマホ画面ならしおり一覧とスケジュールの閲覧が可能
  

## その他
### 開発言語など
- GCP cloud mysql
- node.js(Express.js)
- JavaScript(Vue.js)
    - vuetify
    - pinia


### スクショ
PC画面  
<img width="600" alt="image" src="https://github.com/user-attachments/assets/fb27c01a-fbcb-44af-822b-b03c58d7ef1c"><br>
<img width="600" alt="image" src="https://github.com/user-attachments/assets/aaf7a038-7451-4b47-88c1-8307438a9a61"><br>
スマホ画面  
<img width="200" alt="image" src="https://github.com/user-attachments/assets/9e8860b1-2a99-4d29-9a15-e041e3e26fe9">
<img width="200" alt="image" src="https://github.com/user-attachments/assets/70439fff-4aaa-4efb-8655-bba6e4bb62f7">


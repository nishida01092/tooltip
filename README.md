## toolTipアプリケーション
開発完了
## 概要
tooltipアプリケーションのAPIサーバー。<br>
詳細はフロントが参考になる。<br>
https://github.com/nishida01092/naming
## 技術、環境
▶︎技術<br>
node.js,mysql,Express,Typescript<br>
▶︎環境<br>
DockerDektop,GithubDesktop,DBeaver<br>
▶︎デプロイ<br>
AWSLambda,EC2,RDS(MYSQL),Apigateway
## 初期設定
<!-- envファイルの作成 -->
▶︎DB設定<br>
cd database<br>
touch .env
<!-- envファイルにログイン情報を記載 -->
MYSQL_DATABASE=<br>
MYSQL_USER=<br>
MYSQL_PASSWORD=<br>
MYSQL_ROOT_PASSWORD=<br>

<!-- ネットワークの作成 -->
▶︎Docker設定<br>
docker network create node_network
<!-- コンテナの起動 -->
docker-compose up -d
<!-- コンテナに入る -->
docker-compose exec go ash
<!-- MYSQLにrootで入る -->
docker exec -it database bash
mysql -u root -p
<!-- MYSQL8に接続できない問題を解決 -->
▶︎MYSQL8に接続できない問題を解決<br>
ALTER USER 'user'@ IDENTIFIED WITH mysql_native_password BY 'password'
<!-- backend/src/config/config.tsを書き換える -->
<!-- typescriptのトランスパイルコマンド -->
▶︎トランスパイル<br>
npx tsc


<!-- mysql -u(database_name) -p(MYSQL_USER) (MYSQL_USER) -->

<!-- envファイルの作成 -->
cd database
touch .env
<!-- envファイルにログイン情報を記載 -->
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_ROOT_PASSWORD=
<!-- ネットワークの作成 -->
docker network create node_network
<!-- コンテナの起動 -->
docker-compose up -d
<!-- コンテナに入る -->
docker-compose exec go ash
<!-- MYSQLにrootで入る -->
docker exec -it database bash
mysql -u root -p
<!-- MYSQL8に接続できない問題を解決 -->
ALTER USER 'user'@ IDENTIFIED WITH mysql_native_password BY 'password'
<!-- backend/src/config/config.tsを書き換える -->
<!-- typescriptのトランスパイルコマンド -->
npx tsc


<!-- mysql -u(database_name) -p(MYSQL_USER) (MYSQL_USER) -->

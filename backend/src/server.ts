import express from 'express'
import { Request, Response } from 'express-serve-static-core';
import * as mysql from "promise-mysql";
import config from './config/config';

const app = express();
app.use(express.json());
//フォームからのデータ受け取り
app.use(express.urlencoded({ extended: true }));
//ポートをバインド
app.listen(config.port, () => {
  console.log(`Start on port ${config.port}.`);
});
//ルーティング
app.get('/', (req, res) => res.send('Test Express!'))
app.post('/post', (req, res) => test(req, res))
//テスト
function test(req: Request, res: Response) {
  console.log(req.body)
  console.log("aa");
  res.json({ id: 1 });
}
//MYSQLとの接続を確立
const connection = async () => {
  return await mysql.createConnection(config.db);
};
//SELECT文
connection()
  .then((connection) => {
    const result = connection.query('SELECT id FROM sample');
    connection.end;
    return result;
  })
  .then((result) => {
    console.log(result);
  });
//INSERT文
connection()
  .then((connection) => {
    const sql = 'INSERT INTO sample' + ' SET ?';
    const insert = { id: 0, name: "akira" }
    const result = connection.query(sql, insert);
    connection.end;
    return result;
  })
  .then((result) => {
    console.log(result);
  });

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
app.get('/tooltip/index', (req, res) => indexAction(req, res))
app.post('/tooltip/feedback', (req, res) => feedbackAction(req,res))

//MYSQLとの接続を確立
const connection = async () => {
  return await mysql.createConnection(config.db);
};

//tooltipの初期表示用
function indexAction(req: Request, res: Response){
  connection()
    .then((connection) => {
      const result = connection.query('SELECT id FROM sample');
      connection.end;
      return result;
    })
    .then((result) => {
      res.json(result);
    });
}

//INSERT文
function feedbackAction(req: Request, res: Response){
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
}


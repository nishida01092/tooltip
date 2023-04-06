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
      const sql_tooltip = 
            `
            SELECT 
              mt.id,
              mt.word,
              mt.description,
              mt.asking          
            FROM 
              mst_tooltip AS mt
            ORDER BY mt.id
            `;
      const sql_feedback = 
            `
            SELECT 
              mt.id,
              mf.id AS feedback_id,
              mf.feedback_name           
            FROM 
              mst_tooltip AS mt
            LEFT JOIN
              mst_feedback AS mf
            ON
              mt.id = mf.tooltip_id
            ORDER BY mt.id, mf.id
            `;
      return Promise.all([
        connection.query(sql_tooltip),
        connection.query(sql_feedback),
        connection.end
      ])
    })
    .then((results) => {
        const tooltips = results[0];
        const feedbacks = results[1];
        const tooltipsWithFeedbacks = tooltips.map((tooltip: { id: any; }) => {
          const tooltipFeedbacks = feedbacks.filter((feedback: { id: any; }) => feedback.id === tooltip.id);
          return {
            ...tooltip,
            feedbacks: tooltipFeedbacks
          };
        });
        res.json(tooltipsWithFeedbacks);
    })
    .catch((error) => {
      console.error('Connection error:', error);
    })
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


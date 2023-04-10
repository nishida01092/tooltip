import { Request, Response } from 'express-serve-static-core';
import * as mysql from 'promise-mysql';
import config from '../config/config';

//MYSQLとの接続を確立
async function connection (){
  try {
    return await mysql.createConnection(config.db_dev);
  } catch (error) {
    console.error('Connection error:', error);
    throw error;
  }
};

//型定義
interface Feedback {
    filter: any;
    id: number;
    feedback_id: number;
    feedback_name: string;
  }
  
  interface Tooltip {
    id: number;
    word: string;
    description: string;
    asking: string;
    feedbacks: Feedback[];
  }
  
  
  
  //tooltipの初期表示用
  export async function indexAction(req: Request, res: Response): Promise<void>{
    try {
      const conn = await connection();
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
      const results = await Promise.all([
        conn.query(sql_tooltip),
        conn.query(sql_feedback),
        conn.end()
      ]);
      const tooltips: Tooltip[] = results[0];
      const feedbacks: Feedback[] = results[1];
      const tooltipsWithFeedbacks = tooltips.map((tooltip: { id: number; }) => {
        const tooltipFeedbacks = feedbacks.filter((feedback: { id: number; }) => feedback.id === tooltip.id);
        return {
          ...tooltip,
          feedbacks: tooltipFeedbacks
        };
      });
      res.json(tooltipsWithFeedbacks);

    } catch (error) {
      console.error('Connection error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// INSERT文
export async function feedbackAction(req: Request, res: Response) {
  try {
    const conn = await connection();
    const sql = `
      INSERT INTO trn_feedback
        (feedback_id)
      VALUES
        (?)
    `;
    const value = req.body.feedback_id;

    const result = await conn.query(sql, value);
    conn.end();
    res.sendStatus(200);
  } catch (error) {
    console.error('Connection error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


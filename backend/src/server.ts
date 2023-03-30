import express from 'express'
import { Request, Response } from 'express-serve-static-core';
import * as mysql from "promise-mysql";
import { ParsedQs } from 'qs';
import config from './config/config';

const app = express();
const port = 3000;
app.use(express.json());
//フォームからのデータ受け取り
app.use(express.urlencoded({extended:true}));
app.listen(config.port, () => {
  console.log(`Start on port ${config.port}.`);
});

app.get('/', (req, res) => res.send('Test Express!'))
app.post('/post', (req, res) => test(req,res))
//テスト
function test(req: Request,res: Response){
  console.log("aa");
  res.json({id:1});
}
const connection = async () => {
  return await mysql.createConnection(config.db);
};
//SELECT文
connection()
  .then((connection)=>{
    const result = connection.query('SELECT id FROM sample');
    connection.end;
    return result;
  })
  .then((result)=>{
    console.log(result);
  });
  //INSERT文
connection()
  .then((connection)=>{
    const sql = 'INSERT INTO sample' + ' SET ?';
    const insert = {id:3,name:"akira"}
    const result = connection.query(sql,insert);
    connection.end;
    return result;
  })
  .then((result)=>{
    console.log(result);
  });

// app.post("/insert",(req,res)=>{
//   const feedback:string = req.body.name;
//   connection()
//     .then((connection)=>{
//       const result = 
//           connection.query(
//             'INSERT INTO SAMPLE (ID,NAME) VALUES (5,?)',
//             [feedback]
//           );
//       connection.end();
//       return result;
//     })
//     .then(function(rows){
//       res.send(rows);
//     });
// });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

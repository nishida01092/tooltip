import express from 'express'
import * as mysql from "promise-mysql";
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

const connection = async () => {
  return await mysql.createConnection(config.db);
};
connection()
  .then((connection)=>{
    const result = connection.query('SELECT id FROM sample');
    console.log("DB");
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

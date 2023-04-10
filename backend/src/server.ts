import express from 'express'
import config from './config/config';
import { indexAction,feedbackAction } from './controller/controller';


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

export {app}


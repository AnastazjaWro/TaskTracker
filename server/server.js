const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8000;
const db = require("./db");

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`Hi! Server is listening on port ${port}`)
});

app.get('/tasks/', (req,res) => {
  db.query("SELECT * from tasks", (err,result) => {
     if(err){
         res.status(400).send("Error in DB operation");
     }else{
         res.send(result);
     }
 });
});
app.get('/tasks/:status', (req, res) => {
  const status = String(req.params.status);
  db.query(`SELECT * from tasks where status = '${status}' `, (err,result) => {
     if(err){
         res.status(400).send("Error in DB operation");
     }else{
         res.send(result);
     }
 });
});
app.get('/tasks/:id', (req, res) => {
  const status = String(req.params.status);
  db.query(`SELECT * from tasks where id = '${id}' `, (err,result) => {
     if(err){
         res.status(400).send("Error in DB operation");
     }else{
         res.send(result);
     }
 });
});
app.post('/tasks/', (req, res) => {
  db.query(`INSERT INTO tasks(id,name, date, description, status) VALUES ('${req.body.id}','${req.body.name}', '${req.body.date}', '${req.body.description}', '${req.body.status}');`);
  res.status(201).send(`Task Done`);
});

app.put('/tasks/', (req, res) => {
  db.query(`UPDATE tasks set name="${req.body.name}", date="${req.body.date}", description = "${req.body.description}", status="${req.body.status}" WHERE id='${req.body.id}';`);
  res.status(201).send(`Task Modified ${req.body.id}`);
});

app.delete('/tasks/', (req, res) => {
  db.query(`DELETE FROM tasks WHERE id = '${req.query.id}';`);
  res.status(201).send(`Task Delete ${req.query.id}`);
});

app.listen(port);
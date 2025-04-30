const express=require('express');
const sequelize=require('./utils/db-connection');
const expenseRouter=require('./routes/expenseRouter');
const cors = require('cors');

const app=express();
app.use(cors());

app.use(express.json());

app.use('/expense',expenseRouter);

sequelize.sync({force:true}).then(()=>{
  app.listen(5000,(err)=>{
    console.log("Server running at http://localhost:5000")
  })
}).catch((err)=>{
  console.log(err);
});
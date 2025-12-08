const express=require('express');
const mongoose=require('mongoose')
const cookieParser= require('cookie-parser')
const TaskRouter=require('./routes/task.route');
const cors=require('cors');
const AuthRouter = require('./routes/auth.routes');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app=express();
app.use(express.json());
 app.use(cookieParser());
app.use(cors({
  origin:'https://agentic-system-runner-ycxs.vercel.app',
  credentials: true 

}));


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("DB Connection Failed:", err.message));
 app.use("/task",TaskRouter);
 app.use("/auth",AuthRouter);



      

app.listen(port, () => console.log("Server running on port " + port));


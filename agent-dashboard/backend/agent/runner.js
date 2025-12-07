
const Task=require('../model/Task1.js');
const BlogRunner = require('./BlogRunner.js');
const CodeRunner = require('./CodeRunner.js');
const DataExRunner = require('./DataExRunner.js');
const EmailRunner = require('./EmailRunner.js');
const ResumeBulletRunner = require('./ResumeBulletRunner.js');
const SummmarizeRunner=require('./SummarizeRunner.js')
 


 const runners={
     summarize:SummmarizeRunner,
     email:EmailRunner,
     blog:BlogRunner,
     code:CodeRunner,
     resume:ResumeBulletRunner,
     extract:DataExRunner,
 }



async function RunTask(TaskId){
      
     const task=await Task.findById(TaskId);
    //   console.log(task);
     
      if(!task) throw new Error('task not found');
    //    console.log(task.status)
      
      task.status='RUNNING';
      await task.save();
      const runner=runners[task.type];
      let output='';
    //   console.log(task.type);
       if(!runner) output="UNKNOW TASK TYPE"
      else  output=await runner(task)
      // console.log(output);
       task.status='DONE';
       task.result=output;
        await task.save();
       return task;
}

module.exports = { RunTask };
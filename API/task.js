import express from 'express';
import passport from 'passport';
import {TaskModel} from '../database';
import {validateCreate} from '../validation/task';


const Router = express.Router();


/*
Api         post
path        /create
desc        create a new task
params      none
access      token
 */
Router.post("/create",passport.authenticate("tokenauth",{session:false}),async (req,res)=>{
    try {
        await validateCreate(req.body);
        const taskdetails = req.body;
        taskdetails.user = req.user[0]._id;
        taskdetails.status = "pen";  //pen - pending
        const newtask = await TaskModel.create(taskdetails);
        const {index, name, priority, status} = newtask;
        const task = {index, name, priority, status};
        return res.status(200).json({message:"success",task});
    }
    catch (error) {
        return res.status(500).json({ message:"failed", error: error.message });
    }
});


/*
Api         get
path        /list
desc        display all tasks
params      none
access      token
 */
Router.get("/list",passport.authenticate("tokenauth",{session:false}),async (req,res)=>{
    try {
        const {user} = req; 
        const tasks = await TaskModel.find({user:user[0]._id,status:{$ne:"del"}},{_id:0, index:1, name:1, priority:1, status:1});
        tasks.sort((a,b)=>{
            return(a.priority-b.priority);
        });
        return res.status(200).json({message:"success",tasks});
    }
    catch (error) {
        return res.status(500).json({ message:"failed", error: error.message });
    }
});


/*
Api         get
path        /report
desc        display task report
params      none
access      token
 */
Router.get("/report",passport.authenticate("tokenauth",{session:false}),async (req,res)=>{
    try {
        const {user} = req;
        const tasks = await TaskModel.find({user:user[0]._id,status:{$ne:"del"}},{_id:0, index:1, name:1, priority:1, status:1});
        const deleted = await TaskModel.countDocuments({user:user[0]._id,status:{$eq:"del"}});
        let pending=0;
        let completed=0;
        let canceled=0;
        const ptask=[];
        const cotask=[];
        const catask=[];
        tasks.forEach((value)=>{
            if(value.status=="pen"){
                pending+=1;
                ptask.push(value);
            }
            else if(value.status=="can"){
                canceled+=1;
                catask.push(value);
            }
            else{
                completed+=1;
                cotask.push(value);
            }
        })
        return res.status(200).json({message:"success",count:{pending,completed,canceled,deleted},tasks:{pending:ptask,completed:cotask,canceled:catask}});
    }
    catch (error) {
        return res.status(500).json({ message:"failed", error: error.message });
    }
});


/*
Api         patch
path        /completed
desc        create a new task
params      index
access      token
 */
Router.patch("/completed/:index",passport.authenticate("tokenauth",{session:false}),async (req,res)=>{
    try {
        const {user} = req;
        const index = req.params.index;
        const task = await TaskModel.findOne({user:user[0]._id,index,status:{$ne:"del"}});
        if(!task) throw new Error("wrong index");
        if(task.status=="can") throw new Error("task already cancelled");
        if(task.status=="pen"){
            const task1 = await TaskModel.updateOne({index},{$set:{status:"com" }});
            if(task1.matchedCount!=1) throw new Error("update failed");
        }
        return res.status(200).json({message:"success"});
    }
    catch (error) {
        return res.status(500).json({message:"failed", error: error.message });
    }
});


/*
Api         patch
path        /cancel
desc        create a new task
params      index
access      token
 */
Router.patch("/cancel/:index",passport.authenticate("tokenauth",{session:false}),async (req,res)=>{
    try {
        const {user} = req;
        const index = req.params.index;
        const task = await TaskModel.findOne({user:user[0]._id,index,status:{$ne:"del"}});
        if(!task) throw new Error("wrong index");
        if(task.status=="com") throw new Error("task already completed");
        if(task.status=="pen"){
            const task1 = await TaskModel.updateOne({index},{$set:{status:"can" }});
            if(task1.matchedCount!=1) throw new Error("update failed");
        }
        return res.status(200).json({message:"success"});
    }
    catch (error) {
        return res.status(500).json({ message:"failed", error: error.message });
    }
});


/*
Api         delete
path        /
desc        create a new task
params      index
access      token
 */
Router.delete("/delete/:index",passport.authenticate("tokenauth",{session:false}),async (req,res)=>{
    try {
        const {user} = req;
        const index = req.params.index;
        const task = await TaskModel.findOne({user:user[0]._id,index,status:{$ne:"del"}});
        if(!task) throw new Error("wrong index");
        const task1 = await TaskModel.updateOne({index},{$set:{status:"del" }});
        if(task1.matchedCount!=1) throw new Error("delete failed");
        return res.status(200).json({message:"success"});
    }
    catch (error) {
        return res.status(500).json({ message:"failed", error: error.message });
    }
});



export default Router;
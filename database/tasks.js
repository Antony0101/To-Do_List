import Mongoose from 'mongoose';
import {CounterModel} from './counter';

const TaskSchema = new Mongoose.Schema({
    user:{type:Mongoose.Types.ObjectId,ref:"Users",required:true},
    index:{type:Number,required:true},
    name:{type:String,required:true},
    description:String,
    priority:{type:Number,required:true},
    status:{type:String,required:true},
});


TaskSchema.pre("save",async function (next) {
    try{
        const task = this;
        if (!task.$isNew) return next();
        counter= await CounterModel.findByIdAndUpdate({_id: 'Tasks'}, {$inc: { seq: 1} },{new: true, upsert: true})
        task.index=counter.seq;
        return next();
    }
    catch(error){
        return next(err);
    }
});


export const TaskModel = Mongoose.model("Tasks",TaskSchema);
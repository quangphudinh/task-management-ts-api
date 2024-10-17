import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title : String,
        status : String,
        content : String,
        timeStart : Date,
        timeFinish : Date,
        createBy : String,
        listUser : Array,
        taskParentId : String,
        deleted : {
            type : Boolean,
            default : false
        },
        deletedAt : Date
    } ,{
        timestamps : true
    }
)
export const Task = mongoose.model('Task', taskSchema, 'task');
// export default Task

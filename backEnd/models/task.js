import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    info: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    status: {
        type: String
    },
    userId: {
        type: String
    }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
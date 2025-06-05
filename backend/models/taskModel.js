import bodyParser from 'body-parser';
import mongoose from 'mongoose'
const json = bodyParser.json;

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        default: ''
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    dueDate: {
        type: Date
    }
    ,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const taskModel = mongoose.model("Task",taskSchema);
export default taskModel; 
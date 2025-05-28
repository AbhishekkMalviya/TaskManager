import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://abhishekmalviya997:taskflow25@cluster0.yqr2qvr.mongodb.net/Taskflow').then(() => {
        console.log('Database Connected')
    })
}
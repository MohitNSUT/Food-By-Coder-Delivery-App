import mongoose from 'mongoose';

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://mohit:2021UCB6620@cluster0.uyjvyey.mongodb.net/Food-Delivery-App').then(()=>{
        console.log("DB is connected")
    })
}

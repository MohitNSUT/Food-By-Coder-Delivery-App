import express from "express"
import cors from  "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoutes.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/cartRoute.js";

//app config
const app = express();
const port = 7000;

// middleware
app.use(express.json());
app.use(cors());

// db connections
connectDB();

// api endpoints
app.use("/api/food",foodRouter);
app.use('/images',express.static('uploads'))
app.use("/api/user",userRouter);
app.use('/api/cart',cartRouter); 
app.use('/api/order',orderRouter)

app.get("/",(req,resp)=>{
    resp.send("server is created");
})

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
});

import express, { Application } from "express"
import { bookingRouter } from "./modules/post/booking.router";
import {toNodeHandler} from "better-auth/node"
import { auth } from "./lib/auth";

const app:Application = express();
app.all("/api/auth/*rest", toNodeHandler(auth));
app.use(express.json())

app.use("/booking",bookingRouter);

app.get("/",(req,res)=>{
    res.send("Hello World");
});

export default app;
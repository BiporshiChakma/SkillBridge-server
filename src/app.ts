import express, { Application } from "express"
import { bookingRouter } from "./modules/booking/booking.router";
import {toNodeHandler} from "better-auth/node"
import { auth } from "./lib/auth";
import cors from 'cors'
import { tutorProfile } from "./modules/tutors/tutorProfile.router";
import { category } from "./modules/categories/category.router";
import { AvailabilityController } from "./modules/abilityslot/abilityslot.controller";
import { abilitySlot } from "./modules/abilityslot/abilityslot.route";
import { review } from "./modules/review/review.router";
import { adminRouter } from "./modules/admin/admin.router";
const app:Application = express();

app.use(express.json());

app.use(cors({
    origin:process.env.APP_URL || " http://localhost:3000 ",
    credentials:true
}))


app.all("/api/auth/*rest", toNodeHandler(auth));

app.use("/booking",bookingRouter);
app.use("/tutors",tutorProfile);
app.use("/category",category);
app.use("/ability",abilitySlot);
app.use("/review",review);
app.use("/admin",adminRouter)
app.get("/",(req,res)=>{
    res.send("Hello World");
});

export default app;
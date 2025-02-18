import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import mealRoutes from "./routes/mealRoutes.ts";

const app = express();

connectDB();
//
// router.get("/api/v1/", function (req, res, next) {
//   console.log("router working");
//   res.end;
// });

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api/meals", mealRoutes);
app.use(cors());
app.listen(3000, () => console.log("Server started on port 3000"));

import express from "express";
import cors from "cors";
import quesGenRoute from "./routes/quesGen.route.js";

//express app
const app = express();
const PORT = 8000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/gen-ques", quesGenRoute);

app.listen(PORT, () => console.log(`Server started at http://localhost:8000`));

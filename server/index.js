import express from "express";
import dotenv from "dotenv"
import Data from "./Db/Data.db.js";
import router from "./AllRoute/router.allroute.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
Data();

app.use("/api",router);

app.listen(port,()=>{
    console.log(`server run on port no :: ${port}`)
})
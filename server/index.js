import express from "express";
import dotenv from "dotenv"
import Data from "./Db/Data.db.js";
import router from "./AllRoute/router.allroute.js";
import cors from "cors"
dotenv.config();

const app = express();
const port = process.env.PORT || 4000 || 4001;

const corsOptions = {
    origin: 'http://localhost:5173/', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 
app.use(express.json());
Data();

app.use("/api",router);

app.listen(port,()=>{
    console.log(`server run on port no :: ${port}`)
})
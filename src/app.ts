import express, { Application, json, Request, Response } from "express";

const app: Application = express()
app.use(json())



const PORT: number = 3000
const msg: string = "Server is runnig"

app.listen(PORT, ()=> console.log(msg))
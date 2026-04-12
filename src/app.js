import express from "express" 
 /*
Imports Express framework
 Why?
Used to create server
Handle routes (API)
Manage requests & responses
*/
import cors from "cors"
                                /*
                                Imports CORS middleware
                                Why?
                                Allows frontend (React, etc.) to call your backend
                                Without it → browser blocks requests ❌*/
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes
import userRoutes from "./routes/user.routes.js"
app.use("/api/v1/users", userRoutes)

// const url = "http://localhost:8000/api/v1/users/register";
export { app }
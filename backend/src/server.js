import express from "express";
import cors from "cors"
import dotenv from "dotenv";

import noteRoutes from "./notesRoutes.js";
import mongoose from "mongoose";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
};

// Upstash rate limiter setup
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s"),
});

// Rate limiter middleware
const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit_key");
        if (!success) {
            return res.status(429).json({
                message: "Too many requests, Try again Later"
            });
        }
        next();
    } catch (error) {
        console.log("error occurred in rateLimiter", error);
        next(error);
    }
};


// CORS middleware (allow local dev origins 5173 & 5174)
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // allow non-browser clients / same-origin
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Explicit preflight handler (optional safety)
app.options("*", cors());
app.use(express.json());
app.use(rateLimiter);


app.use("/api/notes", noteRoutes);


connectDB().then(() => {
    app.listen(PORT,()=>{
    console.log("server started on port:",PORT);
    });
})


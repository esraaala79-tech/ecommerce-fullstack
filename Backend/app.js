require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); 

const { errorhandler } = require("./middleware/ErrorHandlerMiddleware");
const { userCont } = require("./Controllers/UserController");

const app = express();
const port = process.env.PORT || 8000;

// ================= Middleware =================
app.use(cors());
app.use(express.json());

// ================= Serve Images =================
app.use("/images", express.static(path.join(__dirname, "images")));



// ================= DB Connection =================
async function dbConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.log("MongoDB connection error:", err.message);
    }
}

dbConnection();

// ================= Routes =================
const authRoutes = require("./Routes/authRoutes");
app.use("/api", authRoutes);

const categoryRoutes = require("./Routes/CategoryRoutes");
app.use('/api/categories', categoryRoutes);

const productRoutes = require("./Routes/ProductsRoutes");
app.use('/api/products', productRoutes);

userCont(app);

// ================= Error Handler =================
app.use(errorhandler);

// ================= Server =================
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
// // seed-products.js
// const mongoose = require("mongoose");
// require("dotenv").config();
// const Product = require("./models/Products"); // تأكدي المسار مظبوط
// const User = require("./models/User"); // لو عندك موديل User

// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

// async function seedProducts() {
//   const user = await User.findOne(); // أول مستخدم موجود
//   if (!user) {
//     console.log("Create a user first!");
//     mongoose.connection.close();
//     return;
//   }

//   await Product.create([
//     {
//       name: "iPhone 14",
//       description: "Apple smartphone with great camera",
//       price: 1200,
//       image: "/images/iphone14.jpg",
//       createdBy: user._id
//     },
//     {
//       name: "Dell Laptop",
//       description: "Dell Inspiron Laptop",
//       price: 900,
//       image: "/images/dell-laptop.jpg",
//       createdBy: user._id
//     }
//   ]);

//   console.log("Products added!");
//   mongoose.connection.close();
// }

// seedProducts();
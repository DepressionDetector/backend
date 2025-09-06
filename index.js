require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const chatRoutes = require("./src/routes/chat.route");
const sessionRoutes = require("./src/routes/session.route");
const sessionSummary = require("./src/routes/sessionSummary.route");
const phq9Questions = require("./src/routes/phq9.route");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH", 
    credentials: true, 
  })
);

app.use(
  session({
    secret: "xzcbnxncdhvbfhncxbnvbcfhv", 
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/chat", chatRoutes);
app.use("/session", sessionRoutes);
app.use("/sessionSummary", sessionSummary);
app.use("/phq9", phq9Questions);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

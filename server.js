// including the dependencies requires for this project
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
// routes imports
const transactionsRouter = require("./routes/transactions");
// function for connecting MongoDB atlas (MongoDB in the cloud)
const connectDB = require("./config/db");

// configuration of environment variables
dotenv.config({ path: "./config/config.env" });

// connect to MongoDB Atlas database
connectDB();

// create the server
const app = express();

// middlewares
// app.use(morgan());
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/transactions", transactionsRouter);

// app.use(express.static("client/dist"));
app.use(express.static(path.resolve(__dirname, "client", "dist")));

app.get("*", (request, response) =>
	response.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
);

// port
const PORT = process.env.PORT || 5000;

// start the server
app.listen(PORT, () => {
	console.log(
		`Server is listening at PORT: ${PORT} in ${process.env.NODE_ENV} mode`
			.yellow.bold
	);
});

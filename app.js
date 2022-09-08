const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const productsRoutes = require("./routes/products");
const reviewsRoutes = require("./routes/reviews");

const PORT = process.env.PORT || 3000;
const dbURI =
    "mongodb+srv://sishir:test1234@moneyyapp.edb33n1.mongodb.net/api?retryWrites=true&w=majority";

// Aschronous task
mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => {
        console.log("Successfully connected to db");
        // * only start listening when the db is connected
        try {
            app.listen(PORT, (err) => {
                if (err) throw err;
                console.log(`Server started successfully at ${PORT}`);
            });
        } catch (err) {
            console.log("Error starting up the server");
            console.log(err);
        }
    })
    .catch((err) => {
        console.log("Error connecting to db");
        console.log(err);
    });

// adding middlewares
app.use(bodyParser.urlencoded({ extended: false }));

// mounting of routes
app.use("/products", productsRoutes);
app.use("/reviews", reviewsRoutes);

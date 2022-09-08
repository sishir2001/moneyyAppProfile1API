// POST /products/add
// GET /products/all
// GET /products/:id
// UPDATE /products/:id
// DELETE /products/:id
const path = require("path");

const express = require("express");
const router = express.Router();

const Product = require("../models/product");

router.route("/add").post((req, res, next) => {
    // add a new product to database
    const prod = new Product({
        name: req.body.name,
        price: parseInt(req.body.price),
    });
    prod.save()
        .then((results) => {
            res.send(results);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send({
                response: "Error on POST /products/add",
            });
        });
});

router.route("/all").get((req, res, next) => {
    // access the database and get the list of all the products
    Product.find()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
            res.send({
                response: "Error on GET /products/all",
            });
        });
});

router
    .route("/:id")
    .get((req, res, next) => {
        // access the database and get the list of all the products
        console.log(req.params);
        Product.findById(req.params.id)
            .then((results) => {
                res.send(results);
            })
            .catch((error) => {
                console.log(error);
                res.send({
                    response: "Error on GET /products/:id",
                });
            });
    })
    .patch((req, res, next) => {
        // update the product
        console.log(req.params);

        const update = req.body;

        Product.findByIdAndUpdate(req.params.id, update)
            .then((results) => {
                res.send({
                    response: "success",
                    error: null,
                });
            })
            .catch((error) => {
                console.log(error);
                res.send({
                    response: null,
                    error: "error on PATCH /products/:id",
                });
            });
    })
    .delete((req, res, next) => {
        // delete the product from database
        console.log(req.params);
        Product.findByIdAndDelete(req.params.id)
            .then((results) => {
                res.send({
                    response: "success",
                    error: null,
                });
            })
            .catch((error) => {
                console.log(error);
                res.send({
                    response: null,
                    error: "error on DELETE /products/:id",
                });
            });
    });

module.exports = router;

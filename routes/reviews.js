// POST /reviews/create
// DELETE /reviews/:id
//! /review/populate

const path = require("path");

const express = require("express");
const router = express.Router();
const Review = require("../models/review");

const rootDir = require("../util/path");
// mounted at /reviews

router.route("/create").post((req, res, next) => {
    // add a new review to database
    console.log(req.body);
    const rev = new Review({
        userId: parseInt(req.body.userId),
        description: req.body.description,
    });
    rev.save()
        .then((results) => {
            res.send(results);
        })
        .catch((error) => {
            console.log(error);
            res.send({
                response: "Error on POST /reviews/create",
            });
        });
});

router.route("/:id").delete((req, res, next) => {
    // delete the review from database
    console.log(req.params);
    Review.findByIdAndDelete(req.params.id)
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
                error: "error on DELETE /reviews/:id",
            });
        });
});

module.exports = router;

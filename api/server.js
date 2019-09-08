const handleError = require("../middleware/error-handle-middleware");
const authorize = require("../middleware/auth-middleware");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// SERVER
const server = express();

/********************************************************
 *                      MIDDLEWARE                      *
 ********************************************************/
server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

/********************************************************
 *                        ROUTES                        *
 ********************************************************/
const authRouter = require("../routes/auth/auth-router");
const usersRouter = require("../routes/users/users-router");
const recipesRouter = require("../routes/recipes/recipes-router");
const categoriesRouter = require("../routes/categories/categories-router");
const measurementsRouter = require("../routes/measurements/measurements-router");
const ingredientsRouter = require("../routes/ingredients/ingredients-router");

server.use("/auth", authRouter);
server.use("/recipes", authorize, recipesRouter);
server.use("/users", authorize, usersRouter);
server.use("/categories", authorize, categoriesRouter);
server.use("/measurements", authorize, measurementsRouter);
server.use("/ingredients", authorize, ingredientsRouter);

/********************************************************
 *                   CUSTOM MIDDLEWARE                  *
 ********************************************************/
server.use("/", handleError);

// EXPORTS
module.exports = server;

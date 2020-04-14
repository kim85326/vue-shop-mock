const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const { loadCurrentUserMiddleware, authMiddleware } = require("./middlewares/authMiddleware");

const docsRouter = require("./routes/docs");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/roles");
const permissionsRouter = require("./routes/permissions");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static files
app.use(express.static(path.join(__dirname, "public")));

// cors
app.use(
  cors({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: "*",
    exposedHeaders: "*",
  })
);

// load current user
app.use(loadCurrentUserMiddleware);

// routers
app.use("/docs", docsRouter);
app.use("/", indexRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authMiddleware, usersRouter);
app.use("/api/v1/roles", authMiddleware, rolesRouter);
app.use("/api/v1/permissions", authMiddleware, permissionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

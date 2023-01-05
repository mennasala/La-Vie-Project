const express = require("express");
const path = require("path");

const app = express();
require("../db/connect");

const passwordReset = require("../routes/password_reset_routes");
const userRoutes = require("../routes/user_routes");
const roleRoutes = require("../routes/role_routes");
const urlRoutes = require("../routes/url_routes");
const plantSeedRoutes=require("../routes/plant_seed_routes");
const blogRoutes=require("../routes/blog_routes");
const shopRoutes=require("../routes/shop_routes");

app.use(express.json());
app.use(express.static(path.join(__dirname, "../uploads")));

app.use("/api/user/", userRoutes);
app.use("/api/role/", roleRoutes);
app.use("/api/url/", urlRoutes);
app.use("/api/password-reset", passwordReset);
app.use("/api/plant_seed", plantSeedRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/shop", shopRoutes);

app.all("*", (req, res) => {
  res.status(404).send({
    apisStatus: false,
    message: "Invalid URL",
    data: {},
  });
});
module.exports = app;

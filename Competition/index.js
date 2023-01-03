require("dotenv").config();
const app = require("./app/app");

app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT} successfully`);
});

import express from "express";
import ClientRouter from "./routes/User.routes.js";
import CategoryRouter from "./routes/category.routes.js";
import bodyParser from "body-parser";
const port = 5000;

const app = express();

app.listen(port, () => {
  console.log("server started");
});
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", ClientRouter);
app.use("/api", CategoryRouter);

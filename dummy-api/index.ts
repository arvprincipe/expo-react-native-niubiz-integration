import express from "express";
import cors from "cors";
import nubizRoutes from "./src/routes/niubiz";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(nubizRoutes);

app.listen(3000, () => {
  console.log("Server is running: http://localhost:3000");
});

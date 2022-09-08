const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
app.use(express.json());

const auth = (req, res, next) => {
  const { ID, Name, Rating, Description, Genre, Cast } = req.body;

  if (
    typeof ID == "number" &&
    typeof Name == "string" &&
    typeof Rating == "number" &&
    typeof Description == "string" &&
    typeof Genre == "number" &&
    typeof Cast == "number"
  ) {
    next();
  } else {
    res.send("the status code for bad request is 400");
  }
};

app.post("/", auth, (req, res) => {
  const typeddata = req.body;
  const dp = fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(dp);
  const lastdata = result.movies;

  lastdata.push(typeddata);
  fs.writeFileSync("./db.json", JSON.stringify(result), "utf-8");

  res.send("done");
}); 








app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

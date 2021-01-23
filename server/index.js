const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json()); // for parsing application/json
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

app.get("/notes", (req, res) => {
  try {
    const path = `${__dirname}/notes.json`;
    var data = fs.readFileSync(path, "utf8");
    var parsedData = JSON.parse(data);
    res.json(parsedData);
  } catch (e) {
    console.log("Error:", e.stack);
  }
});

app.post("/notes", (req, res) => {
  console.log(req.body);

  // write to our notes.json

  // if the file already exists, delete it
  const path = `${__dirname}/notes.json`;
  if (fs.existsSync(path)) {
    try {
      fs.unlinkSync(path);
      //file removed
    } catch (err) {
      console.error(err);
    }
  }
  fs.writeFileSync(path, JSON.stringify(req.body), "utf8");

  return { status: 204 };
});

app.listen(8000, () => {
  console.log("server started on port 8000");
});

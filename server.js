const express = require ("express");
const bodyParser = require ("body-parser");
const path = require("path");

const app = express();
const port = 8001;


const recipesRoute = require('./routes/getRecipe')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/style'))); // adding styles

app.use('/api/recipes', recipesRoute)

app.get("/", (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "index.html"));
  } catch (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Internal Server Error");
  }
});

// 404 Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).send(err.message || "Internal Server Error");
});

//listing at port...
app.listen(port, ()=>{
    console.log(`Server is listening on port: {${port}}`);
})
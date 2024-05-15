const express = require ("express");
const bodyParser = require ("body-parser");
const path = require("path");
const recipesRoute = require('./routes/getRecipe.js')
const app = express();
const port = 8001;



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/style'))); // adding styles

app.use('/api/recipes', recipesRoute)

app.get("/", (req, res) => {
  try {
    if (req.query.number) {
      const number = parseInt(req.params.number);
      const selectedRecipes = recipes.slice(0, number);
      res.json(selectedRecipes);
      } else {
        res.sendFile(path.join(__dirname, "index.html"));
    }
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
    console.log(`Server is listening on port: ${port}`);
})
const express = require ("express");
const router = express.Router();

let recipes = require('../recipes');

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const recipe = recipes.find(recipe => recipe.id === id);
    if (recipe) {
        const recipeHtml = `
        <html>
        <head>
        <link rel="stylesheet" type="text/css" href="/styleRecipe.css">
        </head>
        <body>
        <div class="recipe">
        <h2>${recipe.name}</h2>
        <p><strong>Price:</strong> ${recipe.price}</p>
        <p><strong>Time of Cooking:</strong> ${recipe.timeOfCooking}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        </div>
        </body>
        </html>
        `;
        res.send(recipeHtml);
    } else {
        res.status(404).json({ message: `Recipe with ID ${id} not found` });
    }
});

//update
router.patch('/:id', (req, res) => { 
    const { id } = req.params;
    const recipeToBeUpdate = recipes.filter(recipe => recipe.id === id).pop();

    if(req.body.name){
        recipeToBeUpdate.name = req.body.name;
    }

    if(req.body.price){
        recipeToBeUpdate.price = req.body.price;
    }

    if(req.body.timeOfCooking){
        recipeToBeUpdate.timeOfCooking = req.body.timeOfCooking;
    }

    if(req.body.ingredients){
        recipeToBeUpdate.ingredients = req.body.ingredients;
    }

    //if the object is found by id and has a size, then update
    if (Object.keys(recipeToBeUpdate).length) {
        res.json({ message: 'Recipe updated', recipeToBeUpdate });
    } else {
        res.status(404).json({ message: `Recipe with ID ${id} not found` });
    }
});

//add
router.post('/', (req, res) => {
res.send("inside POST call")
    const newRecipe = req.body;
    recipes.push(newRecipe);
    res.json(recipes);
});


//delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = recipes.findIndex(recipe => recipe.id === id);
    if (index !== -1) {
        recipes.splice(index, 1);
        res.json({ message: 'Recipe deleted', recipes });
    } else {
        res.status(404).json({ message: `Recipe with ID ${id} not found` });
    }
});

module.exports = router;
const { Router } = require('express');

const router = Router();
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

//add
router.patch('/', (req, res) => { 
    const { id } = req.params;
    const updatedRecipe = req.body;
    const index = recipes.findIndex(recipe => recipe.id === id);
    if (index !== -1) {
        recipes[index] = { ...recipes[index], ...updatedRecipe };
        res.json({ message: 'Recipe updated', recipe: recipes[index] });
    } else {
        res.status(404).json({ message: `Recipe with ID ${id} not found` });
    }
});

//update
router.post('/', (req, res) => {
    const newRecipe = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        timeOfCooking: req.body.timeOfCooking,
        ingredients: req.body.ingredients
    };
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
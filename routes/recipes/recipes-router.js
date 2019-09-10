const router = require("express").Router(),
  Recipes = require("./recipes-model"),
  Ingredients = require("../ingredients/ingredients-model"),
  Steps = require("../steps/steps-model");

/********************************************************
 *                     GET /recipes                     *
 ********************************************************/
router.get("/", async (req, res, next) => {
  // TEST ENDPOINT
  try {
    const r = await Recipes.find();
    res.status(200).json(r);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/********************************************************
 *                   GET /recipes/id                    *
 ********************************************************/

router.get("/:id", validateID, async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipes.findById(id);
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Failed to get recipe." });
  }
});

/********************************************************
 *                     POST /recipes                    *
 ********************************************************/
// TODO edit readme, also requires categoryId
router.post("/", async (req, res) => {
  const recipeData = req.body;
  try {
    const recipe = await Recipes.add(recipeData);
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create new recipe."
    });
  }
});

/********************************************************
 *                     PUT /recipes/id                   *
 ********************************************************/
router.put("/:id", validateID, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const recipe = await Recipes.findById(id);
    if (recipe) {
      await Recipes.update(changes, id);
      const newRecipe = await Recipes.findById(id);
      res.json(newRecipe);
    } else {
      res.status(404).json({ message: "Could not find recipe with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update scheme" });
  }
});

/********************************************************
 *              DELETE /recipes/id                   *
 ********************************************************/
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Recipes.remove(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: "Could not find recipe with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete recipe" });
  }
});

/********************************************************
 *        GET /recipes/:recipe_id/ingredients           *
 ********************************************************/
router.get("/:recipe_id/ingredients", async (req, res) => {
  const { recipe_id } = req.params;
  try {
    const ingredients = await Ingredients.getIngredients(recipe_id);
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

/********************************************************
 *        POST /recipes/:recipe_id/ingredients          *
 ********************************************************/
router.post("/:recipe_id/ingredients", async (req, res) => {
  const body = req.body;
  const recipe_id = req.params.recipe_id;
  const id = { recipe_id: recipe_id };
  const ingredientData = Object.assign(body, id);

  try {
    const ingredient = await Ingredients.addIngredients(ingredientData);
    res.status(200).json(ingredient);
  } catch (err) {
    res.status(500).json({ message: "Failed to create new ingredients" });
  }
});

/********************************************************
 *        GET /recipes/:recipe_id/steps           *
 ********************************************************/
router.get("/:recipe_id/steps", async (req, res) => {
  const { recipe_id } = req.params;
  try {
    const steps = await Steps.getSteps(recipe_id);
    res.status(200).json(steps);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

/********************************************************
 *        POST /recipes/:recipe_id/steps                *
 ********************************************************/
router.post("/:recipe_id/steps", async (req, res) => {
  const body = req.body;
  const recipe_id = req.params.recipe_id;
  const id = { recipe_id: recipe_id };
  const stepsData = Object.assign(body, id);

  try {
    const steps = await Steps.addSteps(stepsData);
    res.status(200).json(steps);
  } catch (err) {
    res.status(500).json({ message: "Failed to create new steps" });
  }
});

/********************************************************
 *                   CUSTOM MIDDLEWARE                  *
 ********************************************************/
async function validateID(req, res, next) {
  const { id } = req.params;
  let recipe = await Recipes.findById(id);
  if (recipe) {
    req.recipe = recipe;
    next();
  } else {
    res.status(400).json({
      message: `A recipe with id ${id} could not be found.`
    });
  }
}

// TODO create validateData checker
async function validateRequest(req, res, next) {
  const { body } = req.body;

  if (body) {
    if (body.title && body.created_by && body.author) {
      next();
    } else {
      res.status(400).json({
        message: `Recipe fields 'title', 'created_by', and 'author' are required.`
      });
    }
  } else {
    res.status(500).json({
      message: "Internal Server Error."
    });
  }
}

// EXPORTS
module.exports = router;

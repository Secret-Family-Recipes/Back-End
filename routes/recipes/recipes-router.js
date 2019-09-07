const router = require("express").Router(),
  Recipes = require("./recipes-model");

/********************************************************
 *                     GET api/recipes                   *
 ********************************************************/
// TODO test endpoint, delete when completed
router.get("/", async (req, res, next) => {
  // TEST ENDPOINT
  try {
    const r = await Recipes.find();
    res.status(200).json(r);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", validateID, async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipes.findById(id);
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Failed to get recipe." });
  }
});

// TODO POST /recipes
// router.post("/", async (req, res) => {
//   const recipeData = req.body;
//   try {
//     const recipe = await Recipes.add(recipeData);
//     res.status(201).json(recipe);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to create new recipe."
//     });
//   }
// });

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

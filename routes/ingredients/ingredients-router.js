const router = require("express").Router(),
  Ingredients = require("./ingredients-model");

/********************************************************
 *        PUT /ingredients/:id       *
 ********************************************************/
router.put("/:id", validateID, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    if (changes.recipe_id) {
      res.status(400).json({
        message: "Cannot update recipe_id"
      });
    }

    // const ingredients = await Ingredients.findById(id);
    const updated = await Ingredients.update(changes, id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

/********************************************************
 *              DELETE /ingredients/:id                 *
 ********************************************************/
router.delete("/:id", validateID, async (req, res) => {
  const { id } = req.params;
  const { ingredient } = req;

  try {
    const deleted = await Ingredients.remove(id);
    if (deleted) {
      res.status(200).json({ removed: deleted, ingredient });
    } else {
      res
        .status(404)
        .json({ message: "Could not find ingredient with given id." });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

async function validateID(req, res, next) {
  const { id } = req.params;

  let ingredient = await Ingredients.findById(id);

  if (ingredient) {
    req.ingredient = ingredient;
    next();
  } else {
    res.status(400).json({
      message: `An ingredient with id ${id} could not be found.`
    });
  }
}

module.exports = router;

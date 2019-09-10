const router = require("express").Router(),
  Steps = require("./steps-model");

/********************************************************
 *                     PUT /steps/:id                   *
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

    const updated = await Steps.update(changes, id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

/********************************************************
 *              DELETE /steps/:id                 *
 ********************************************************/
router.delete("/:id", validateID, async (req, res) => {
  const { id } = req.params;
  const { step } = req;

  try {
    const deleted = await Steps.remove(id);
    if (deleted) {
      res.status(200).json({ removed: deleted, step });
    } else {
      res.status(404).json({ message: "Could not find step with given id." });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

async function validateID(req, res, next) {
  const { id } = req.params;

  let step = await Steps.findById(id);

  if (step) {
    req.step = step;
    next();
  } else {
    res.status(400).json({
      message: `An step with id ${id} could not be found.`
    });
  }
}

module.exports = router;

const router = require("express").Router(),
  Categories = require("./categories-model");

/********************************************************
 *                   GET /categories                    *
 ********************************************************/
router.get("/", async (req, res, next) => {
  // TEST ENDPOINT
  try {
    const c = await Categories.find();
    res.status(200).json(c);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/********************************************************
 *                    POST /categories                   *
 ********************************************************/
router.post("/", async (req, res) => {
  const categoryData = req.body;
  try {
    const category = await Categories.add(categoryData);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

/********************************************************
 *                 PUT categories/id                    *
 ********************************************************/
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const name = req.body;

  try {
    const category = await Categories.findById(id);

    if (category) {
      const updated = await Categories.update(name, id);
      res.json(updated);
      console.log(updated);
    } else {
      res
        .status(404)
        .json({ message: "Could not find category name with given id." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update category." });
  }
});

/********************************************************
 *              DELETE /categories/id                   *
 ********************************************************/
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Categories.remove(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res
        .status(404)
        .json({ message: "Could not find category with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete category" });
  }
});

module.exports = router;

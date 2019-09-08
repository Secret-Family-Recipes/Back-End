const router = require("express").Router(),
  Measurements = require("./measurements-model");

/********************************************************
 *                   GET /Measurements                    *
 ********************************************************/
router.get("/", async (req, res, next) => {
  // TEST ENDPOINT
  try {
    const c = await Measurements.find();
    res.status(200).json(c);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/********************************************************
 *                    POST /Measurements                   *
 ********************************************************/
router.post("/", async (req, res) => {
  const measurementData = req.body;
  try {
    const measurement = await Measurements.add(measurementData);
    res.status(201).json(measurement);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

/********************************************************
 *                 PUT Measurements/id                    *
 ********************************************************/
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const name = req.body;

  try {
    const measurement = await Measurements.findById(id);

    if (measurement) {
      const updated = await Measurements.update(name, id);
      res.json(updated);
      console.log(updated);
    } else {
      res
        .status(404)
        .json({ message: "Could not find measurement name with given id." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update measurement." });
  }
});

/********************************************************
 *              DELETE /Measurements/id                   *
 ********************************************************/
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Measurements.remove(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res
        .status(404)
        .json({ message: "Could not find measurement with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete measurement" });
  }
});

module.exports = router;

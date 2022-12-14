const validateActivities = (req, res, next) => {
  const { name, difficulty, season, duration, countries } = req.body;
  if (!name) return res.status(400).json({ error: "missing name" });
  if (!difficulty) return res.status(400).json({ error: "missing difficulty" });
  if (!duration) return res.status(400).json({ error: "missing duration" });
  if (!season) return res.status(400).json({ error: "missing season" });
  if (!countries) return res.status(400).json({ error: "missing countryId" });

  next();
};

module.exports = validateActivities;

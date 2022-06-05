const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { tableName } = require('../../models/Product');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  await Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [{
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
      through: "ProductTag"
    }],
  })
  .then((TagData) => {
    res.json(TagData);
  })
  .catch((err) => {
    res.json(err)
  })
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  await Tag.findByPk(req.params.id, {
    include: [{
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
      through: "ProductTag"
    }]
  })
  .then((tagID) => {
    res.json(tagID);
  })
  .catch((err) => {
    res.json(err)
  })
});

router.post('/', async (req, res) => {
  // create a new tag
  await Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((tagNew) => {
    res.json(tagNew);
  })
  .catch((err) => {
    res.json(err)
  })
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  await Tag.update({
    tag_name: req.body.tag_name,
  },
  {
    where: {
      id: req.params.id,
    },
  })
  .then((tagUpdate) => {
    res.json(tagUpdate);
  })
  .catch((err) => {
    res.json(err)
  });
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((tagRemoved) => {
    res.json(tagRemoved)
  })
  .catch((err) => {
    res.json(err)
  })
});

module.exports = router;

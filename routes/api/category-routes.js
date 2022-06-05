const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  await Category.findAll({
    attributes: ["id", "category_name"],
    // be sure to include its associated Products
    include: [{
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"]
    }]
  })
  .then((categories) => {
    res.json(categories);
  })
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  await Category.findByPk(req.params.id, {
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      }
    ]
  })
  .then((category) => {
    res.json(category);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.post('/', async (req, res) => {
  // create a new category
  await Category.create(req.body)
  .then((newCategory) => 
  res.status(200).json(newCategory))

  .catch((err) => {
    console.log(err);
    res.status(400).json(err)
  })
});



router.put('/:id', async (req, res) => {
  // update a category by its `id` value
 await Category.update(req.body, {
   where: {
     id: req.params.id,
   },
 })
 .then(cat => Category.findByPk(req.params.id))
 .then((updatedCategory) => res.status(200).json(updatedCategory))
 .catch((err) => {res.json(err)})
});

router.delete('/:id', async (req, res) => {
  await Category.destroy({
    where: {
      id: req.params.id // might need ,
    },
  })
  .then((removeCategory) => {
    res.json(`This category has been removed`);
  })
  .catch((err) => {res.json(err)});
  // delete a category by its `id` value
});

module.exports = router;

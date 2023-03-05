const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
})
.then(data => res.json(data))
.catch(err => res.status(500).json(err));
});


//get one product by id
router.get('/:id', async (req, res) => {
  try {
      const searchData = await Category.findOne({
       where: {
        id: req.params.id
       },
        include: [Product]
     });
     if (!searchData) {
      return res.status(404).json({
        "message": "No category with that id was found."
      });
     }
     return res.json(searchData);
  } catch(err) {
      return res.status(500).json(err);
  }
});


router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
.then(data => res.json(data))
.catch(err => res.status(500).json(err));
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
      const updateData = await Category.update(req.body, {
       where: {
        id: req.params.id,
       },
        include: [Product]
     });
     if (!updateData[0]) {
      return res.status(404).json({
        "message": "No category with that id was found."
      });
     }
     return res.json(updateData);
  } catch(err) {
      return res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
      const deleteData = await Category.destroy({
       where: {
        id: req.params.id
       },
        include: [Product]
     });
     if (!deleteData) {
      return res.status(404).json({
        "message": "No category with that id was found."
      });
     }
     return res.json(deleteData);
  } catch(err) {
      return res.status(500).json(err);
  }
});


module.exports = router;

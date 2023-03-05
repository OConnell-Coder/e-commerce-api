const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


// find all tags
// be sure to include its associated Product data
router.get('/', (req, res) => {
  Tag.findAll({
    include: [Product]
})
.then(data => res.json(data))
.catch(err => res.status(500).json(err));
});


// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
      const searchData = await Tag.findOne({
       where: {
        id: req.params.id
       },
        include: [Product]
     });
     if (!searchData) {
      return res.status(404).json({
        "message": "No tag with that id was found."
      });
     }
     return res.json(searchData);
  } catch(err) {
      return res.status(500).json(err);
  }
});


// create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
.then(data => res.json(data))
.catch(err => res.status(500).json(err));
});


// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
      const updateData = await Tag.update(req.body, {
       where: {
        id: req.params.id,
       },
        include: [Product]
     });
     if (!updateData[0]) {
      return res.status(404).json({
        "message": "No tag with that id was found."
      });
     }
     return res.json(updateData);
  } catch(err) {
      return res.status(500).json(err);
  }
});


// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
      const deleteData = await Tag.destroy({
       where: {
        id: req.params.id
       },
        include: [Product]
     });
     if (!deleteData) {
      return res.status(404).json({
        "message": "No tag with that id was found."
      });
     }
     return res.json(deleteData);
  } catch(err) {
      return res.status(500).json(err);
  }
});


module.exports = router;

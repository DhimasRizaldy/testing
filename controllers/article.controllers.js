const { createArticle, getAllArticle, getArticleId, getUpdate, getDelete } = require('../libs/article.libs');

module.exports = {
  create: async (req, res, next) => {
    try {
      let { title, body, user_id } = req.body;

      try {
        let article = await createArticle(title, body, user_id);

        return res.status(201).json({
          status: false,
          message: 'OK',
          data: article
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err,
          data: null
        });
      }
    } catch (err) {
      next(err);
    }
  },

  getArticleId: async (req, res, next) => {
    try {
      let { id } = req.params;
      try {
        let user = await getArticleId(Number(id));

        return res.status(200).json({
          status: false,
          message: 'OK',
          data: user
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err,
          data: null
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err,
        data: null
      });
    }
  },

  getAllArticle: async (req, res, next) => {
    try {
      // Mengambil semua artikel dari database
      const article = await getAllArticle();

      return res.status(200).jsnon({
        status: true,
        message: 'Created Article Successfuly!',
        data: article
      });

    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err,
        data: null
      });
    }
  },

  getUpdate: async (req, res, next) => {
    try {
      let { title, body, user_id } = req.body;
      try {
        let updateArticle = await getUpdate(title, body, user_id);

        return res.status(200).json({
          status: true,
          message: 'Updated Article Succesfully',
          data: updateArticle
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err,
          data: null
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err,
        data: null
      });
    }
  },

  getDelete: async (req, res, next) => {
    try {
      let { id } = req.params;
      try {
        await getDelete(id);

        return res.status(200).json({
          status: true,
          message: 'Deleted Article Successfuly!',
          data: null
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err,
          data: null
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err,
        data: null
      });
    }
  }
};
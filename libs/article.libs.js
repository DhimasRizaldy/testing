const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  createArticle: async (title, body, user_id) => {
    try {
      const existArticle = await prisma.article.findUnique({
        where: { id }
      });
      if (existArticle) throw 'id sudah dipakai';

      const article = await prisma.article.create({ data: { title, body, user_id } });
      return article;
    } catch (err) {
      throw err;
    }
  },

  getArticleId: async (id) => {
    try {
      const article = await prisma.article.findUnique({
        where: {
          id
        }
      });
      if (!article) throw 'article tidak ditemukan';

      return article;
    } catch (err) {
      throw err;
    }
  },

  getAllArticle: async (title, body, user_id) => {
    try {

    } catch (err) {
      throw err;
    }
  },

  getUpdateId: async () => {
    try {

    } catch (err) {
      throw err;
    }
  },

  getDelete: async () => {
    try {

    } catch (err) {
      throw err;
    }
  }


}
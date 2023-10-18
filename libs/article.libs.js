const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createArticle: async (title, body, user_id) => {
    try {
      // membuat data artikel baru
      const existArticle = await prisma.article.findUnique({
        where: { id },
      });
      if (existArticle) throw "id sudah dipakai";

      const article = await prisma.article.create({
        data: { title, body, user_id },
      });
      return article;
    } catch (err) {
      throw err;
    }
  },

  getArticleId: async (id) => {
    try {
      // Menampilkan detail data artikel by id
      const article = await prisma.article.findUnique({
        where: {
          id,
        },
      });
      if (!article) throw "article tidak ditemukan";

      return article;
    } catch (err) {
      throw err;
    }
  },

  getAllArticle: async () => {
    try {
      // mengambil semua artikel dari database
      const article = await prisma.article.findMany();
      return article;
    } catch (err) {
      throw err;
    }
  },

  getUpdate: async (title, body, user_id) => {
    try {
      // Mempeebarui artikel by id
      const updateArticle = await prisma.article.update({
        where: { id },
        data: { title, body, user_id },
      });
      return updateArticle;
    } catch (err) {
      throw err;
    }
  },

  getDelete: async (id) => {
    try {
      // menghapus article by id
      await prisma.article.delete({
        where: { id },
      });
    } catch (err) {
      throw err;
    }
  },
};

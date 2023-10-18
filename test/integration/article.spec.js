const app = require("../../app");
const request = require("supertest");
let user = {};
describe("test POST /api/v1/articles endpoint", () => {
  test("create user", async () => {
    try {
      const name = "usertest3";
      const email = "usertest3@mail.com";
      const password = "pasword123";

      const { statusCode, body } = await request(app)
        .post("/api/v1/users")
        .send({
          name,
          email,
          password,
        });
      user = body.data;
      expect(statusCode).toBe(201);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body.data).toHaveProperty("id");
      expect(body.data).toHaveProperty("name");
      expect(body.data).toHaveProperty("email");
      expect(body.data).toHaveProperty("password");
      expect(body.data.name).toBe(name);
      expect(body.data.email).toBe(email);
      expect(body.data.password).toBe(password);
    } catch (err) {
      expect(err).toBe(err);
    }
  });
  test("create article", async () => {
    const data = {
      title: "title",
      body: "body",
      user_id: user.id,
    };
    const response = await request(app).post("/api/v1/articles").send(data);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("title");
    expect(response.body.data).toHaveProperty("body");
    expect(response.body.data.title).toBe(data.title);
    expect(response.body.data.body).toBe(data.body);
    expect(response.body.data.user_id).toBe(data.user_id);
  });

  test("tidak dapat membuat artikel baru user_id", async () => {
    const data = {
      title: "article 1",
      body: "body article 1",
      user_id: 0,
    };
    const response = await request(app).post("/api/v1/articles").send(data);
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("user tidak ditemukan");
  });

  test("tidak boleh membuat article baru kosong", async () => {
    const data = {
      title: "",
      body: "",
      user_id: 0,
    };
    const response = await request(app).post("/api/v1/articles").send(data);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("data tidak lengkap");
  });
});

describe("test GET /api/v1/articles endpoint", () => {
  test("test get all articles -> success", async () => {
    const { statusCode, body } = await request(app).get("/api/v1/articles");

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("message");
    expect(body).toHaveProperty("data");
  });
});

describe("test PUT /api/v1/articles/:id endpoint", () => {
  test("test update article -> Success", async () => {
    const updatedData = {
      title: "update title",
      body: "update body",
      user_id: user.id,
    };
    const { statusCode, body } = await request(app)
      .put("/api/v1/articles/:id")
      .send(updatedData);
    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("message");
    expect(body).toHaveProperty("data");
    expect(body.data.title).toBe(updatedData.title);
    expect(body.data.body).toBe(updatedData.body);
    expect(body.data.user_id).toBe(updatedData.user_id);
  });

  test("test perbarui artikel dengan user_id yang tidak ada -> error", async () => {
    const updatedData = {
      title: "update title",
      body: "update body",
      user_id: 9999,
    };
    const { statusCode, body } = await request(app)
      .put("/api/v1/articles/:id")
      .send(updatedData);
    expect(statusCode).toBe(400);
    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("message");
    expect(body.message).toBe("user tidak ditemukan.");
  });

  test("test perbarui artikel yang tidak ada -> error", async () => {
    const updatedData = {
      title: "update title",
      body: "update body",
      user_id: user.id,
    };
    const { statusCode, body } = await request(app)
      .put("/api/v1/articles/9999")
      .send(updatedData);
    expect(statusCode).toBe(400);
    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("message");
    expect(body.message).toBe("article tidak ditemukan..");
  });
});

describe("test DELETE /api/v1/articles/:id endpoint", () => {
  test("test delete article -> success", async () => {
    const { statusCode, body } = await request(app).delete(
      "/api/v1/articles/:id"
    );
    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("message");
  });

  test("test hapus artikel yang tidak ada -> error", async () => {
    const { statusCode, body } = await request(app).delete(
      "/api/v1/articles/9999"
    );
    expect(statusCode).toBe(400);
    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("message");
    expect(body.message).toBe("article tidak ditemukan.");
  });
});

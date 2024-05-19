import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

const app = new Hono<{
  Bindings: { DATABASE_URL: string, TOKEN_KEY: string }
}>()

app.post('/api/v1/user/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password
      }
    })
    const token = await sign({ id: user.id }, c.env.TOKEN_KEY);
    return c.json({ jwt: token });
  } catch (e) {
    c.status(403);
    return c.json({ error: "Error while signup" });
  }
})


app.post('/api/v1/user/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const user = await prisma.user.findUnique(
    {
      where: {
        email: body.email
      }
    }
  );

  if (!user) {
    return c.json({
      msg: "User not found !"
    })
  }
  const token = await sign({ id: user.id }, c.env.TOKEN_KEY);
  return c.json({ token });
})


app.post('/api/v1/user/blog', (c) => {
  return c.text('Hello Hono!')
})

app.put('/api/v1/user/blog', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/user/blog/:id', (c) => {
  const id = c.req.param;
  return c.text('Hello Hono!')
})

export default app

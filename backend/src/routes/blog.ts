import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { creatingBlog, updatingBlog } from "@11-devvv/medium-common";
export const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_KEY: string;
    },
    Variables: {
        authorId: string;
    }
}>()

blogRoute.use('/*', async (c, next) => {
    const token = c.req.header("authorization") || "";  //this is typescript concept ||"" means if authorization doesnt have value it wont be undefined but "" empty.
    const user = await verify(token, c.env.JWT_KEY);
    if (!user) {
        c.status(403);
        return c.json({ msg: "User Not Verified !!" });
    }
    //@ts-ignore
    c.set("authorId", user.id)
    await next();
})

blogRoute.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const input = creatingBlog.safeParse(body);
    if (!input) {
        c.status(403)
        return c.json({ msg: "Invalid Input" })
    }
    const id = c.get("authorId")
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: id //from middleware
        }
    })
    return c.json({ msg: `Blog Created with id :${blog.id}` })
})

blogRoute.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const input = updatingBlog.safeParse(body);
    if (!input) {
        c.status(403)
        return c.json({ msg: "Invalid Input" })
    }
    const blog = await prisma.blog.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
    return c.json({ msg: `Blog ${blog.id} Updated!!` })
})

//add pagination
blogRoute.get('/all', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.blog.findMany();
    return c.json({ blogs })
})

blogRoute.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const id = c.req.param("id");
    const blog = await prisma.blog.findUnique({
        where: { id }
    })
    return c.json({ blog })
})



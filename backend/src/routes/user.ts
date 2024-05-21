import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signInInput, signUpInput } from "@11-devvv/medium-common";

export const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_KEY: string
    };
}>();

userRoute.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const input = signUpInput.safeParse(body);
    if(!input){
        c.status(403)
        return c.json({msg:"Invalid Input"})
    }
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password
            }
        })
        const token = await sign({ id: user.id }, c.env.JWT_KEY)
        return c.json({ token });
    }
    catch (e) {
        c.status(403);
        return c.text("Invalid")
    }
})

userRoute.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const input = signInInput.safeParse(body);
    if(!input){
        c.status(403)
        return c.json({msg:"Invalid Input"})
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        });
        if (!user) {
            c.status(403);
            return c.text('User Not Found');
        }
        const token = await sign({ id: user.id }, c.env.JWT_KEY);
        return c.json({ token });
    }
    catch (e) {
        c.status(411);
        return c.text("Invalid")
    }
})

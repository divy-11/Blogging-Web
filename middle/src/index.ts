import z from "zod";

export const signUpInput = z.object({
    username: z.string().email(),
    name: z.string().optional(),
    password: z.string().min(6),
})


export const signInInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
})


export const creatingBlog = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})


export const updatingBlog = z.object({
    title: z.string(),
    content: z.string(),
})


export type SignUpInput = z.infer<typeof signUpInput>
export type SignInInput = z.infer<typeof signInInput>
export type CreateBlog = z.infer<typeof creatingBlog>
export type UpdateBlog = z.infer<typeof updatingBlog>
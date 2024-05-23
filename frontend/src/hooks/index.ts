import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog {
    "content": string;
    "title": string;
    "id": string
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setloading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        })
            .then(resp => {
                setBlog(resp.data.blog);
                setloading(false);
            })
    }, [id])
    return ({ loading, blog })
}

export const useBlogs = () => {
    const [loading, setloading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/all`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        })
            .then(resp => {
                setBlogs(resp.data.blogs);
                setloading(false);
            })
    }, [])
    return ({ loading, blogs })
}
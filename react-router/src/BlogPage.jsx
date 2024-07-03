import React from "react"
import { Link, Outlet } from "react-router-dom"
import { blogdata } from "./blogdata"
import { useAuth } from './auth'


const BlogPage = () => {
    const { data } = useAuth()

    return (
        <>
        <h1>Blog</h1>

        <Outlet />

        <ul>
            {data.map(post => (
                <BlogLink post={post} key={post.slug} />
            ))}
        </ul>
        </>
    )
}

const BlogLink = ({ post }) => {
    return (
        <li>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
    )
}

export { BlogPage }
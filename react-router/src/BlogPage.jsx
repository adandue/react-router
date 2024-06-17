import React from "react"
import { Link, Outlet } from "react-router-dom"
import { blogdata } from "./blogdata"


const BlogPage = () => {
    return (
        <>
        <h1>Blog</h1>

        <Outlet />

        <ul>
            {blogdata.map(post => (
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
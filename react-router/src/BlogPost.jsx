import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { blogdata } from "./blogdata"
import { useAuth } from "./auth"

const BlogPost = () => {
    const navigate = useNavigate()
    const { slug } = useParams()
    const auth = useAuth()
    const blogpost = blogdata.find(post => post.slug === slug)
    const canDelete = auth.user?.isAdmin || blogpost.author === auth.user?.isAuthor
    const { user, data, deletePost } = useAuth()

    const returnToBlog = () => {
        navigate('/blog')
    }

    const deletedPost = () => {
        deletePost(slug)
        navigate('/blog')
    }

    return (
        <>
        <h2>{blogpost.title}</h2>
        <button onClick={returnToBlog}>Volver al Blog</button>
        <p>{blogpost.author}</p>
        <p>{blogpost.content}</p>

        {canDelete && (
            <button onClick={deletedPost}>Eliminar blogpost</button>
        )}
        </>
    )
}

export { BlogPost }
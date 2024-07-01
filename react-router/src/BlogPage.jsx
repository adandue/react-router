import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useData } from "./blogdata";
import { CreatePost } from "./CreatePost";

function BlogPage() {
    const [createPost, setCreatePost ] = React.useState(false);

    const blogdata = useData();
    return(
        <React.Fragment>
            <h2>BlogPage</h2>
            <ul>
                {console.log(blogdata)}
                {blogdata.data.map(post => (<BlogLink  key={post.slug} post={post}/>))}
            </ul>
            <Outlet />
            {!createPost && <button onClick={()=> setCreatePost(true)}>Nuevo Post</button>}
            {createPost && <CreatePost setCreatePost={setCreatePost} />}  
        </React.Fragment>
    );
};

function BlogLink({post}) {
    return(
        <li>
            <Link 
            to={/blog/`${post.slug}`}>
                {post.title}
            </Link>
        </li>
    );
}

export { BlogPage };
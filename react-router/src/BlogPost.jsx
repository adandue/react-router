import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './auth';
import { useData } from './blogdata';
// import { EditPost } from './EditPost';

function BlogPost() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const blogdata = useData();
    const auth = useAuth();


    const [editPost, setEditPost ] = React.useState(false);

    const blogpost = blogdata.data.find(post => post.slug === slug);

    const canDelete = auth.user?.isAdmin || blogpost.author === auth.user?.username;
    const canEdit = auth.user?.isEditor || blogpost.author === auth.user?.username;
    const canCheck = auth.user?.isReviewer;

    const returnToBlog = () => {
    navigate('/blog');
    };


    return (
    <>
        <h3>{blogpost.title}</h3>
        <button onClick={returnToBlog}>Volver al blog</button>
        <p>{blogpost.author}</p>
        <p>{blogpost.content}</p>

        {canDelete && (
        <button onClick={ () => blogdata.deleteData(blogpost.title)}>Eliminar blogpost</button>
        )}
        {canEdit && (
        <button onClick={() => setEditPost(true)}>Editar blogpost</button>
        )}
        {editPost && <EditPost setEditPost={setEditPost} oldTitle={blogpost.title} oldContent={blogpost.content} oldAuthor={blogpost.author} oldApproved={blogpost.approved}/>} 
        {canCheck && (
        <button onClick={() => blogdata.changeStatus(blogpost.title)}>Cambiar estado de aprobacion</button>
        )}
        {blogpost.approved && (<><br/><span>Revisado y aprobado</span><br/></>)}
        {!blogpost.approved && (<><br/><span>Aun no aprobado</span><br/></>)}
        {console.log(blogpost.approved)}
    </>
    );
}

export { BlogPost };
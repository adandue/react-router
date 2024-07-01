import React from "react";
import { useAuth } from "./auth";
import { useData } from "./blogdata";


function CreatePost({setCreatePost}) {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const auth = useAuth();

    const blogdata = useData();

    const resetGaps = () => {
        setTitle('');
        setContent('');
        setAuthor('');
        setCreatePost(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(auth.user)
        let newAuthor; 
        if(auth.user){
            newAuthor = auth.user.username;
        } else {
            newAuthor = author; 
        }
        blogdata.addData({
            title: `${title}`,
            slug: `${title.toLowerCase().replaceAll(' ', '-')}`,
            content: `${content}`,
            author: `${newAuthor}`,
            approved: false,  
        });
        resetGaps();
    }


    return(
        <form onSubmit={handleSubmit}>
            <label>
                Titulo:
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /> <br />
            </label>
            <label>
                Contenido:
                <textarea 
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea><br />
            </label>
            <label>
                Autor:
                {!auth.user &&
                    <input 
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    ></input>
                }
                {auth.user &&
                    <input 
                    type="text"
                    readOnly
                    value={auth.user.username}
                    ></input>
                }
                <br />
            </label>
            <button type="submit">Crear Post</button>
            <button type="button" onClick={() => resetGaps()}>Cancelar</button>
        </form>
    )
}

export { CreatePost};
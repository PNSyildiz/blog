import {useState} from 'react'


const Posts = () => { 
    const [posts, setposts ] = useState ('');
    
    const fetchPosts = () => {
         const storedPosts =localStorage.getItem('id');

         if (storedPosts){
            setposts(storedPosts);
         }
         else{
            alert('No Posts to show.');
         }
         }
        
    
  return (
     <div className='posts'>
       <h1>Read Posts</h1>
        <div>
            {posts}
        </div>
        <button onClick={fetchPosts}>Open Article</button>
     </div>
  )
  }

export default Posts

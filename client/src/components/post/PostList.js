import React, { useEffect, useState , useRef} from 'react'
import api from '../../axios';


const PostList = () => {

  const [posts,setPosts]=useState([]);
  const [loading, setLoading] = useState(false);
  const scrollPosition = useRef(0);
  
  useEffect(()=>{
      var page=1;
      const fetchPosts = async () => {
         try {
            setLoading(true);
            const token=localStorage.getItem('accessToken');
            // Fetch posts from the server
            const response = await api.get(`/posts?page=${page}`, {
              headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
              }
            });
            const data = response.data;
            if(data.length>0){
              setPosts(prevData=>[...prevData,...data]);
              page++;
            }
         }
         catch (error) {
            console.error('Error fetching initial posts:', error);
         } 
         finally {         
            setLoading(false);
         }
      };
     // Fetch initial posts when the component mounts
     fetchPosts();
     const handleScroll=()=>{
      scrollPosition.current = window.innerHeight + document.documentElement.scrollTop;
      if (
          document.documentElement.offsetHeight - scrollPosition.current<=0.8  &&
          !loading
      ) {
        fetchPosts();
      }
     };
      // Listen for scroll events
     window.addEventListener('scroll',handleScroll);
      // Remove scroll event listener when the component unmounts
     return ()=> window.removeEventListener('scroll',handleScroll);
  },[]);

  return (
    <div>
       <div>
         <h1 className='text-2xl font-semibold w-max mx-auto'>Posts List</h1>
       </div>
       <div className=''>
        {
          Array.isArray(posts) && posts.length > 0 ?<div className=' bg-slate-50 w-1/2 mt-4 mx-auto'>
             {posts.map((post,index)=>(
              <div className=' w-3/4 bg-slate-200 mb-5 mx-auto shadow-lg rounded' key={index}>
                  <div className='w-max mx-auto text-xl'><span className='font-medium'>Title: </span>{post.title}</div>
                  <div className='w-max mx-auto'>
                  <span className='font-medium'>category: </span>
                  {post.category}
                  </div>
                  <div className=''>
                    <img src={post.image} className=' h-50 w-4/5 mx-auto'></img>
                  </div> 
                  <div className='mx-auto w-max'>
                  {post.content}
                  </div> 
                  <div className='w-max mx-auto'>
                  <span className='font-medium'>created by : </span>
                  {post.author.username}
                  </div>

              </div>
            ))}
            </div>:<div> No Posts available</div>
        }
       </div>
    </div>
  )
}

export default PostList

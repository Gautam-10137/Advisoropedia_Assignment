const PostService=require('../services/postService');
const PostController={
    CreatePost: async (req,res)=>{
        try{
          const postData=req.body;
          const newPost=PostService.CreatePost(postData);
          res.status(200).json(newPost);

        }
        catch(error){
          res.status(500).json({message:'Post Creation failed',error:error.message});
        }
    },
    GetPosts: async (req,res)=>{
        try{
           const page=parseInt(req.query.page);
           console.log('page: '+page);
           const posts= await PostService.GetPosts(page);
           res.status(200).json(posts);
        }
        catch(error){
            res.status(500).json({message:'Post fetching failed',error:error.message});
        }
    }


}

module.exports=PostController;
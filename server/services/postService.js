const Post=require('../model/Post');

const postService={
     CreatePost: async (postData)=>{
        const{title,content,author,category,image}=postData;
        const newPost= new Post({title,content,author,category,image});
        newPost.save();
        return newPost;
     },
     GetPosts: async(page)=>{
        const skipPost=(page-1)*5;
        const totalPosts = await Post.countDocuments();
        if(skipPost>=totalPosts){
            return [];
        }
        const posts=await Post.find().skip(skipPost).limit(5).populate('author');
        return posts;
     }

}

module.exports=postService;


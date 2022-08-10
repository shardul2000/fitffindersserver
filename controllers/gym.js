const { createPost, getPosts  } = require("../models/gym_forum");
const { v4: uuidv4 } = require('uuid');
const { getGymListings, getGymDetails, createGymListing } = require("../models/gyms");


const createPostController = async(req,res,next) => {
   const data = req.body;
   data.post_id= uuidv4();
   try{
      await createPost(data);
      res.status(200).json({
        success:true
      })
   }
   catch(e){
    res.status(500).json({
        success:false,
        error:e
    })
   }
}

const getPostsController = async(req,res,bext) => {
    const gym = req.params.gym;
    try{
        const posts = await getPosts(gym);
        posts.Items.sort((a,b)=> parseFloat(b.timestamp) - parseFloat(a.timestamp));
        res.status(200).json({
          success:true,
          posts:posts
        })
     }
     catch(e){
      res.status(500).json({
          success:false,
          error:e
      })
     } 
}


const getGymListingsController = async(req,res,next) => {
  
  try{
      const gyms = await getGymListings();
      res.status(200).json({
        success:true,
        gyms:gyms.Items
      })
   }
   catch(e){
      res.status(500).json({
          success:false,
          error:e
      })
   } 
}


const getGymDetailsController = async(req,res,next) => {
  const gym = req.params.gym;
  try{
      const details = await getGymDetails(gym);
      res.status(200).json({
        success:true,
        details:details.Item
      })
   }
   catch(e){
      res.status(500).json({
          success:false,
          error:e
      })
      console.log("Gey you")
   } 
}


const createGymListingController = async(req,res,next) => {

   const data = req.body;
   
   try{
     await createGymListing(data);
     res.status(200).json({success:true})
   }catch(e){
      res.status(500).json({success:false, error: e})
   }
}

module.exports ={ createPostController, getPostsController, getGymListingsController, getGymDetailsController, createGymListingController }
const { v4: uuidv4 } = require('uuid');
const {createReview, getReviews}= require("../models/profile")


exports.postReview = async(req, res, next) => { 
    
    const data = req.body;
    data.id= uuidv4();
    try{
        await createReview(data);
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


exports.getReviews = async(req, res, next) => { 
    
    const data = req.params.id;
   // data.review_id= uuidv4();
    try{
        const reviews=await getReviews(data);
        res.status(200).json({
          success:true,
          reviews:reviews
        })
     }
     catch(e){
      res.status(500).json({
          success:false,
          error:e
      })
     }
    
}



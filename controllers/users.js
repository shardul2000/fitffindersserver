const { addData, getItem  } = require("../models/users");
const {s3}=require("../dynamo")
const { v4: uuidv4 } = require('uuid');


const addDataController = async(req,res,next) => {
   const data = req.body
   console.log(data);
   await addData(data);
   res.status(200).json({"success":true})
}

const uploadAvatar = async(req,res,next) => {
    const { avatar } = req.files;
    //console.log(avatar);
 
    const guid= uuidv4(); 
    const format=avatar.mimetype.split("/")[1];
    const key = (guid+"."+format).toString();
    
    var params = { Bucket: 'picsfitfinders', Key: key};
    const paramsStoredata = {
     ...params,
     Body: avatar.data
   }
 
    s3.upload(paramsStoredata, function(err, data) {
      if (err) {
        console.log(err)
          return res.status(500).send("Server Error, try again later")
      }else{
        let uri=data.Location;
        return res.status(200).json({"s3uri":uri});
      }
    });
 }
 
const getUserData = async(req,res,next) => {
 const userId=req.params.id;
  try{
    const userData = await getItem(userId)
    res.status(200).json({
       success:true,
       userData:userData.Item
     })
  }catch(e){
    res.status(500).json({
       success:false,
       error:e
    })
  }
}






const uploadPics = async(req,res,next) => {
  
  const { pics } = req.files;
  console.log(pics);

  let uriArray=[];
  for(let pic of pics){

      const guid= uuidv4(); 
      const format=pic.mimetype.split("/")[1];
      const key = (guid+"."+format).toString();
      
      var params = { Bucket: 'picsfitfinders', Key: key};
      const paramsStoredataPic = {
          ...params,
          Body: pic.data
      }

      try{
        let data = await s3.upload(paramsStoredataPic).promise();
        uriArray.push(data.Location);
      }catch(e){
        return res.status(500).send("Server Error, try again later\n" + e)
      }
  }
  
  console.log(uriArray);
  return res.status(200).json({"s3uri": uriArray});
 
  
 
 

}

module.exports={
    addDataController, uploadAvatar, getUserData, uploadPics
}
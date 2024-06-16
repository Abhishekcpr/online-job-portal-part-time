const User =  require('../models/user-schema')
const bcrypt = require('bcryptjs')
const sendMail = require('../utils/sendmail')
const cloudinary = require('../utils/cloudinary')

const homePage = async(req,res)=>{
    try{
        res.status(200).send("This is the home page using controllers")
    } catch(err)
    {
        res.status(400).send(err)
    }
}

const signup = async (req, res) => {
    try {
        console.log(req.body);

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({ msg: 'No file uploaded' });
        }

        const uploadedFile = req.files.profileImage;

        console.log(uploadedFile);

        let imageUrl;
        // Upload file to Cloudinary
        await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                if (error) {
                    console.error(error);
                    reject({ msg: 'Error uploading file.' });
                }
                // If upload is successful, resolve with the Cloudinary URL
                imageUrl = result.secure_url;
                console.log({ imageUrl: result.secure_url });
                resolve();
            }).end(uploadedFile.data);
        });

        const { username, email, phone, password, locationAdd, locationCoord, DOB,subject,message } = req.body;

        const userExist = await User.findOne({ phone });

        if (userExist) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const createUser = await User.create({
            username,
            password,
            email,
            phone,
            locationAdd,
            image: imageUrl,
            locationCoord,
            DOB,
            savedProfile: [],
            createdAt: new Date()
        });

        console.log("New user created " + createUser);
        const mailResponse = await sendMail({email, subject, message}, res);
        console.log("email ", mailResponse);
        res.status(201).json({ message: "user registered", token: await createUser.generateToken(), userId: createUser._id.toString() });

    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Some error occurred" + err });
    }
}


const login = async(req,res)=>{
    try{

        const {phone, password}  = req.body ;
        const userExist = await User.findOne({phone}) ;

        if(!userExist)
        {
           return res.status(401).json({msg : "User does not exist!!!"});
        }
        
        // console.log(userExist);

        const isMatched = await bcrypt.compare(password, userExist.password);
        // const isMatched =( password == userExist.password ? true : false );

        if(isMatched)
        {
            res.status(200).json({message : "Login successful", token : await userExist.generateToken(), userId : userExist._id.toString(), phone : userExist.phone, username : userExist.username, isAdmin : userExist.isAdmin, email : userExist.email}) ;
        }
        else
         return res.status(400).json({msg : "invalid credentials"});

    }catch(err)
    {
        res.send("Some error occurred :" + err)
    }
}

const profileData = async(req,res)=>{
    console.log("profiler");
    const _id = req.params.id ;

    try{
        const getData = await User.find({_id}) ;
    console.log(getData);
    if(getData.length == 0 || getData == undefined)
    {
        return res.status(400).json({msg : "No users found"});
        
    }

    res.status(200).send({msg : getData})}
catch(err)
{
    console.log(`error in fetching data ${err}`);
}

}

const getAllWorkers = async(req,res)=>{
    console.log("profiler");

    try{
        const getData = await User.find({}) ;
    console.log(getData);
    if(getData.length == 0 || getData == undefined)
    {
        return res.status(400).json({msg : "No users found"});
        
    }

    res.status(200).send({msg : getData})}
catch(err)
{
    console.log(`error in fetching data ${err}`);
}

}

const updateLocation = async(req, res)=>{
    try{
        const {userId, locationCoordinates,locationAdd,profileDetails} = req.body
      
        // const updatedLocation = await User.updateOne({_id : userId},{$set: {locationCoord :locationCoordinates, locationAdd}})

        const updatedLocation = await User.findOneAndUpdate({_id : userId},{$set: profileDetails},{new:true})

        if(updatedLocation)
        {
            console.log(updateLocation);
           return res.status(200).send({msg: "update done successfully"})
        }
        
        res.status(400).send({msg : "No update done"})
    } catch(err)
    {
        res.status(400).send({msg: `error :${err}`}) ;
    }
}


module.exports = {homePage,signup,login,profileData,updateLocation,getAllWorkers}
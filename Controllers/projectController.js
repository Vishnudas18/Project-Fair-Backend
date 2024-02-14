const projects =require('../Models/projectSchema')


//add project logic
exports.addUserProject=async(req,res)=>{
    console.log("inside AddUserProject");
//res.status(200).json("Add User Project request")
    //user id get
   const userId=req.payload
//    // Add project details
   const{title,language,github,link,overview}=req.body
   // get the image
projectImage=req.file.filename
console.log(projectImage);
    //logic of adding new user project
    try{
const existingUser=await projects.findOne({github})
if(existingUser){
    res.status(406).json("project already exists")
}
else{
    const newProject=new projects({title,language,github,link,overview,projectImage,userId})
    await newProject.save()//save new project details into mongodb
    res.status(200).json(newProject)//send response to the client
}
    }
    catch(err){
        res.status(404).json({message:err.message})
    }

}

//1 get user project
exports.getUserProject = async(req,res)=>{
    //get user id
    const userId = req.payload
    //api fetching
    try{//get project information of particular user 
        const userProject = await projects.find({userId})
        console.log(userProject);
        res.status(200).json(userProject)//send response to the client

    }
    catch(err){
        res.status(401).json(err.message)
    }
}

//2 get all projects
exports.getAllProject = async(req,res)=>{
    const searchKey = req.query.search
    const query={
        language:{
            $regex:searchKey,
            $options:"i"
        }
    }
    try{
        const AllProjects = await projects.find(query)
        res.status(200).json(AllProjects)//send response to the client

    }
    catch(err){
        res.status(401).json(err.message)

    }
}

//3 get home projects
exports.getHomeProject = async(req,res)=>{
    try{
        const HomeProject = await projects.find().limit(3)
        res.status(200).json(HomeProject)//send response to the client

    }
    catch(err){
        res.status(401).json(err.message)
        
    }
}

//4 Edit Project Details
exports.editProject = async(req,res)=>{
    const {title,language,github,link,overview,projectImage} = req.body;

    const uploadImage = req.file?req.file.filename:projectImage;

    const userId = req.payload

    const {id} = req.params

    try{
        //find the particular project id in mongodb and add the updated project details
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,link,overview,projectImage:uploadImage,userId},{new:true})
        //save the updated project details
        await updateProject.save()
        //response send back to the client
        res.status(200).json(updateProject)
        console.log(updateProject);



    }
    catch(err){
        res.status(401).json(err)
    }

}

//5 Delete Project Details
exports.deleteProject = async(req,res)=>{
    const {pid} = req.params

    try{
        const deleteData = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(deleteData)
    }
    catch(err){
        res.status(401).json(err)
    }

}
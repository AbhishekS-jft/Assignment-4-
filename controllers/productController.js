const User=require('../models/productmodel');
// get all products
async function getUsers(req,res)
{
    try {
        const users=await User.find();
        res.writeHead(200,{'Content-Type':'application/json'})
        console.log(users);
        res.end(JSON.stringify(users))
        
    } catch (error) {
        console.log(error);
    }
}


async function getUser(req,res,id)
{
    try {
            const user=await User.findbyId(id);
            res.writeHead(200,{'Content-Type':'application/json'})
            res.end(JSON.stringify(user))   
        } catch (error) {
        console.log(error);const user=await User.findbyId(id);
    }
}

// create a user
//post request
async function createUser(req,res)
{
    try {
            let body='';
            //fetching data
            req.on('data',(chunk)=>{
                body+=chunk;
            })
            req.on('end',async()=>{
                const {name,job,sal}=JSON.parse(body);
                const user={
                    name,
                    job,
                    sal
                }
                const new_user=await User.create(user);
                console.log(new_user);
                res.writeHead(201,{'Content-Type':'application/json'});
                res.end(JSON.stringify(new_user));
            })
        } catch (error) {
        console.log(error);
    }
}

//updating a user
//put request
async function updateUser(req,res,id){
    const user=await User.findbyId(id);
    if(!user)   //if that user doesn't exist
    {
        res.writeHead(404,{'Content-Type':'application/json'});
        res.end("<h1>User does not exist </h1>");
    }
    else{
        try{
            let body='';
            req.on('data',(chunk)=>{
                body+=chunk;
            })
            req.on('end',async()=>{
                const {name,job,sal}=JSON.parse(body);
                const new_user={
                    name:name||user.name,
                    job:job||user.job,
                    sal:sal||user.sal
                }
                const Update_user=await User.update(new_user,id);
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify(Update_user));
            })
        }
        catch(error){
            console.log(error);
        }
    }
}

//delete user
async function removeUser(req,res,id){
        try{
            console.log(id);
            await User.deleteUser(id);
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:`${id} is removed`}));

        }
        catch(error){
            console.log(error);
        }
}

module.exports={
    getUsers,
    getUser,
    createUser,
    updateUser,
    removeUser
}
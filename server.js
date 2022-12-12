const http=require('http');
const {getUsers,getUser,createUser,updateUser,removeUser}=require('./controllers/productController');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, content-type, Access-Control-Request-Method, Access-Control-Request-Headers");
    if(req.method==='OPTIONS')
    {
        res.writeHead(200);
        res.end();
    }
    else if(req.url=="/employees" && req.method==='GET')
    {
        getUsers(req,res);
    }
    else if(req.url.match(/\/employees\/([0-9]+)/) && req.method==='GET') //fetching particular id
    {
        const id=req.url.split('/')[2];
        getUser(req,res,id);
    }
    else if(req.url=="/employees" && req.method==='POST')    //create
    {
        createUser(req,res);
    }
    else if(req.url.match(/\/employees\/([0-9]+)/) && req.method==='PUT') //update
    {
        const id=req.url.split('/')[2];
        updateUser(req,res,id);
    }
    else if(req.url.match(/\/employees\/([0-9]+)/) && req.method==='DELETE') //delete
    {
        const id=req.url.split('/')[2];
        removeUser(req,res,id);
    }
    else{
        res.writeHead(404); // for setting status code - ERROR
        res.end("<h1>404 Page does not exist </h1>");
    }    
})

server.listen(3000,()=>console.log(`Server running `))

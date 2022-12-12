// let Emparr=[]   //Global Array
   
async function addEmployee(obj)   //Adding Employee
{
    const res=await fetch("http://localhost:3000/employees",{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    })
      return res.json();  
}

// function getArr() { //Returning array to app.js
//     return Emparr;
// }

async function DeleteEmp(id)  //Deleting Employee
{
    await fetch(`http://localhost:3000/employees/${id}`,{
        method:"DELETE",
    });
}

async function Edit(obj,ID)
{
    const o=await fetch(`http://localhost:3000/employees/${ID}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json"
        },
        body:JSON.stringify(obj)
    });
    return o.json();
}

async function display()
{
    const emp=await fetch('http://localhost:3000/employees',{
        method:"GET",
    });
    return emp.json();
}
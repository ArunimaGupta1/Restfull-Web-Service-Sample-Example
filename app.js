let express = require("express");

let app = express();

//We have to add the middleware to receive the value from body part
app.use(express.json());   // enable json data from body part.

let emp = {id:100,name:"Ravi",age:21} //Literal style object creation in JS
let empXML = `
        <Employee>
          <Emp>
          <Id>100</Id>
          <Name>Ravi</Name>
          <Salary>100000</Salary>
          </Emp>
        </Employee>
`

let employees = [
    {id:101,name:"Raj",age:25},
    {id:102,name:"Raj",age:26},
    {id:103,name:"Suraj",age:24},
    {id:104,name:"Easu",age:25},
    {id:105,name:"Prem",age:25}
]

//Text Format
app.get("/sayHello",(req,res)=>{
    res.send("Welcome to Simple Restfull Web Service");
})

//JSON Format
app.get("/empInfoInJSON",(req,res)=>{
    res.json(emp);              //automatically convert JS object to JSON format
    //res.send(emp);              //text consider
})


//XML Format
app.get("/empInfoInXML",(req,res)=>{
    res.set("Content-Type","application/xml");
    //res.send(o2x(emp));
    res.send(empXML);
})


//get all employees details in JSON format
// http://localhost:9090/employees
app.get("/employees",(req,res)=>{
    res.json(employees);
})


app.get("/singleQueryParam",(req,res)=>{
    //let user = req.query.name;
    let user = req.query["name"];
    res.send("Welcome to my single web application "+user);  //http://localhost:9090/singleQueryParam?name=RajDeep
})

app.get("/multipleQueryParam",(req,res)=>{    //http://localhost:9090/singleQueryParam?name=RajDeep
    let user = req.query["user"];
    let pass = req.query["pass"];
    if(user==="Raj"&&pass==="123"){
        res.json({"msg":"Successfully login"});
    }
    else{
        res.json({"msg":"Failure try once again"});
    }
})

// http://localhost:9090/singlePathParam/Raj
app.get("/singlePathParam/:user",(req,res) =>{
    let name = req.params.user;
    res.send("Welcome to path param "+name);
})

// http://localhost:9090/multiPathparam/Raj/123
app.get("/multipathparam/:user/:pass",(req,res)=>{
    let user = req.params.user;
    let pass = req.params.pass;
    if(user==="Raj"&&pass==="123"){
        res.json({"msg":"Successfully login"});
    }
    else{
        res.json({"msg":"Failure try once again"});
    }
})

// http://localhost:9090/simplePost
app.post("/simplePost",(req,res)=>{
    res.send("Welcome to simple post method");
})

// http://localhost:9090/storeEmployeeInfo
// if the method is post, data will be sent through body part
app.post("/storeEmployeeInfo",(req,res) =>{
    let emp = req.body;
    console.log(emp);          //store this information in array or file or database
    res.send("Post method with data received");
})


// http://localhost:9090/updateEmployeeDetails
app.put("/updateEmployeeDetails",(req,res)=>{
    let emp = req.body;
    emp.age = emp.age+2;      //This information we can update.
    res.json(emp);
})

//http://localhost:9090/deleteEmployeeInfo/100
app.delete("/deleteEmployeeInfo/:id",(req,res)=>{
    let empId = req.params.id;  //take empId and search in array or file or database to delete
    res.send("Your record deleted succesfully with id as "+empId);
})

app.listen(9090,()=>console.log("Server running on port number 9090"));
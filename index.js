//create a node backend server and write the endponts 
const express = require("express");
const jwt= require("jsonwebtoken");
const JWT_SECRET="souravmalviya23";
const mongoose= require("mongoose");
mongoose.connect("mongodb+srv://admin:Admin123456789@cluster0.mnlum0e.mongodb.net/todo-sourav-2323")

const { userModel, TodoModel } = require("./db"); //exported the both schema form 1 file to another 
const app = express();
app.use(express.json());
//will be creating a middlewear of Authentication 

//signup DONE
app.post("/signup", async  (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

     await userModel.create({ // u can await this promise 
        email: email,
        password: password,
        name: name
    });

    res.json({
        message: "you are logged in" //so basically if i will not get the data form the db then it will be giving me seedha this ans before getting the data 
    })
});

//sign-in
app.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //user will be first verifyed that wehther the user is signed up or not then only enrtyr

    const user = await userModel.findOne({ // here it is an promise cozz it will get into the db and it will awiat 
    email: email,
    password: password
}); // if this is true then i will return them a tocken  i will generate a token 
    if (user){
        const token= jwt.sign({
            id: user._id
        });
        res.json({
            token: token
        })

    }else{
        res.status(403).json({
            message: "incorrect credddd"
        })
    }

});

//appending the Todo  HERE ONLY ENTRY IF AUTHENTICATED
app.post("/todo", (req, res) => {

});

//get all the todos here 
app.get("/todos", (req, res) => {

});

app.listen(3000, () => {
    console.log("Your app is Runnig on Port 3000");
});

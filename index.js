const express = require("express");
const bcrypt= require("bcrypt");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {z, string}= require("zod");

mongoose.connect("")

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
    //if i want to do som input cheecks then i will use the zod obejct 
    const requireBody= z.object({
        email: z.string().min(3).max(10).email(),
        password: z.string().min(3).max(10),
        name: z.string().min(3).max(10)
        //assignments how i will check the emial that contain one uppercase and one lowercase kind os things 
    })
    //const parsedBody= requireBody.parse(req.body);
    const parsedatadatawithsuccess= requireBody.safeParse(req.body); // returns 2 things 
    if(!parsedatadatawithsuccess.success){
        res.json({
            message: "incorrect formate",
            error: parsedatadatawithsuccess.error
        })
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedpassword = await bcrypt.hash(password,5);
    console.log(hashedpassword)

    let errorthrown= false;
   try{
    await UserModel.create({
        email: email,
        password: hashedpassword,
        name: name
    });
    }catch{
        res.json({
            message:"User Already Exist Try Signing Up"
        })
        errorthrown= true;

    }

    if(!errorthrown){
        res.json({
        message: "You are signed up"
    })
    }

    
});


app.post("/signin", async function (req, res) {
    //user sign in we need to get the salt 
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email,
       // password: password,
    });
    
    if (!response){
        res.status(403).json({
            message: "user dont exist in our DB "

        })
    }

    const passwordMatch = await bcrypt.compare(password, response.password) // im comparing the password 

    if (passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })

    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


app.post("/todo", auth, async function (req, res) {
    const userId = req.userId; //user id contains the token 
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: "Todo created"
    })
});


app.get("/todos", auth, async function (req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    })
});

app.listen(3000, () => {
    console.log("app is Running")
});

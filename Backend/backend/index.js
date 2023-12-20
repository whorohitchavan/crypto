const express = require("express");
const cors =require("cors");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const { compare } = require("bcryptjs");

const jwt_code="qwtrquwroiasdashgdmzxcvm132146548zcxmcvajksfh7654)(*^%$@}{"

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect("mongodb+srv://cryptotracker:akrodhcryptotrack@cluster0.yvazy5e.mongodb.net/User-data", {useNewUrlParser: true, useUnifiedTopology: true } )

.then(() => console.log("DB Connected Successfully"))

.catch((err) => { console.error(err); });

const Schema = mongoose.Schema

const userSchema = new Schema({
    userid: {
        type:String,
        unique:true},
    rname: String,
    email: {
        type:String,
        unique:true},
    phn: {
        type:String,
        unique:true},
    rpass: String,
    address:String,
    city: String,
    rstate:String,
    pin: String,
    int1: String,
    int2: String,
    int3: String,
    int4: String
},{
    collection:'userinfo'
})

const User = mongoose.model("user", userSchema)

//routes
app.post("/register", async (req,res)=> {
    const {userid,rname,email,phn,rpass,address,city,rstate,pin,int1,int2,int3,int4}=req.body;
    const encypass= await bcrypt.hash(rpass,10);

    try {
            const oldUser= await User.findOne({email});    
            const oldid= await User.findOne({userid});
            const oldphn= await User.findOne({phn});

            if(oldUser){
                return res.json({error:"E-mail already exist"})
            }
            if(oldid){
                return res.json({error:"UserId already exist"})
            }
            if(oldphn){
                return res.json({error:"Phone already exist"})
            }
    
            await User.create({
                    userid,
                    rname,
                    email,
                    phn,
                    rpass: encypass,
                    address,
                    city,
                    rstate,
                    pin,
                    int1,
                    int2,
                    int3,
                    int4,
                });
                res.send({status:'Ok'})
        } catch (error) {
            res.send({status: "error"})
        }
})

app.post("/login", async(req,res)=>{
    const {email,password} = req.body;

    const user= await User.findOne({email});
    if(!user){
        return res.json({error:'User not found'});
    }

    if(await bcrypt.compare(password,user.rpass)){
        const token=jwt.sign({email: user.email},jwt_code); 
        if(res.status(201)){
            return res.json({status:"OK",data: token});
        }
        else{
            return res.json({error: "error"});
        }
    }
    res.json({status: "error",error:"Invalid Password"})
});

app.post("/success-log",async (req,res)=>{
    const {token}=req.body;
    try {
        const user = jwt.verify(token,jwt_code);
        const mail=user.email;
       User.findOne({email:mail})
        .then((data)=>{
            res.send({status:"Ok",data: data});
        })

    } catch (error) {
        res.send({status:"error",data:error});
    }
})

app.listen(8000,() => {
    console.log("Server started at port 8000")
})
const express = require('express');
const app=express();
const path=require('path')



const bodypaser=require('body-parser');
const sesstion=require('express-session');
const {v4:uuidv4}=require('uuid')
app.use('/static',express.static(path.join(__dirname,'public')))
app.set("view engine",'ejs');

const port = process.env.PORT||3000;
app.use((req,res,next)=>{
    res.set('Cache-Control', 'no-store')
    next();
})

app.use(bodypaser.json())
app.use(bodypaser.urlencoded({extended:true}))




app.use(sesstion({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));





app.get('/', (req,res)=>{

    if(!req.session.user){
        const error=req.session.error
        
        res.render('base',{titl:"Login System",error})
    } else {
        res.redirect("/dashboard")
    }
    
})



const credential={
    email:"admin@gmail.com",
    password:"admin123"
}

app.post('/login',(req,res)=>{
if(req.body.email==credential.email && req.body.password==credential.password){
    req.session.error=false;
req.session.user=req.body.email;
res.redirect('/dashboard')
// res.end("login Succusessful")
}else{
    req.session.error=true;
    res.redirect('/')
}

});


app.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.redirect('/')
    }

})

app.post('/logout',(req,res)=>{
    req.session.user=null;
    res.clearCookie('connect.sid');
    res.redirect('/');

    })



app.listen(port,()=>{console.log("Lostening to server on http://localhost:3000" )})
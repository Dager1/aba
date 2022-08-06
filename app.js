const express = require('express');
const port=process.env.PORT || 6969; //this port number
const path=require('path')
const app = express();// app or instance of express
const cookieParser=require('cookie-parser')
const fileUpload = require('express-fileupload');

//api middelware

app.use(express.json());// to accept data in jason format

app.use(express.urlencoded());// this basically to decode the data send through html form
app.use('/',express.static(path.join(path.join(__dirname,'../ABA'))))
app.use('/imgData',express.static(path.join(path.join(__dirname,'./uploads'))))
app.use(fileUpload({
    createParentPath:true
}))
app.use(cookieParser())

//API Routes
app.get('/form',(req,res)=>{
    res.sendFile(path.join(__dirname,'../ABA/upload.html'))
})


 
app.post('/formPost',(req,res)=>{
    // console.log(req);
    console.log(req.body);
    
    console.log('files below');
    if(req.files){
        // console.log(req.files)
        var file = req.files.file
        var filename = file.name
        req.body.filename=filename
        res.cookie(`${req.body.itemN}`,req.body)
        console.log(filename)

        file.mv('./uploads/'+filename,function(err){
            if(err){
                res.send(err)
            }
            else{
                // res.send({msg:'Uploaded successfully'})
                res.redirect('/')

            }
        })
    }else{
        res.send({msg:'Please upload a file.'})
    }
    
})

app.get('/browse',(req,res)=>{
    // console.log(req.cookies);
    res.sendFile(path.join(__dirname,'../ABA/brows.html'))
})
app.post('/browseData',(req,res)=>{
    console.log('body',req.body);
    console.log('cooki',req.cookies);
    let cookie=req.cookies[req.body.itm]
    console.log('billi->',cookie);
    res.send({data:cookie})
})

app.get('/imgData',(req,res)=>{
    console.log('dasdfsfdsfsdfs',req.query);
    
    res.sendFile(path.join(__dirname,'./uploads/'+req.query.filename))
})

//listen on port
app.listen(6969,()=>{
    console.log(`Server started at http://localhost:${port}`)
});


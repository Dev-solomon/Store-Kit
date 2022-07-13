const userdb = require('./database/model/register');
const userprodb = require('./database/model/product');
const carte = require('./database/model/cart');
const multer = require('multer');
 


//for registeration page
exports.register = (req,res)=>{ 
    
        if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    // if(userdb.find({email: req.body.email})){
    //    res.send('<h1 style="text-align: center"> SORRY EMAIL ALREADY EXISTS?<a href="/register">TRY AGAIN</a></h1>');
    // }else{
        const user = new userdb({
            first :  req.body.first,
            last :  req.body.last,
            email :  req.body.email,
            username :  req.body.username,
           gender:  req.body.gender,
            password :  req.body.password,
            confirmpass :  req.body.confirmpass,
            user : req.body.user,
            country: req.body.country
        });
        
        if(user.password == user.confirmpass){
            user
            .save(user)
            .then(data => {
                console.log("NEW USER CREATED SUCCESSFULLY");
                res.redirect('/');
            })
            .catch(err=>{
                console.log(err);
            })
         }else{
            res.send('<h1 style="text-align: center"> AN ERROR OCCURED <br>PASSWORDS DO NOT MATCH? <a href="/register">TRY AGAIN</a></h1>')
         }
    
        //}
     
}

//for saving image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "assest/uploads");
      },
    
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    
    
});

upload = multer({storage: storage}).single("photo");



//userdashboard panel
exports.userproduct = (req,res)=>{
      
     let sess = req.session;
     if(sess.userid){
        if(!req.body){
            res.status(400).send({ message : "Content can not be emtpy!"});
            return;
        }
        upload(req,res,(err)=>{
            if(err){
                console.log(err);
            }else{
                
              sess.product =  req.body.product;
              sess.description =  req.body.description;
              sess.price =  req.body.price;
              sess.file =  req.file.filename;
                const pro = new userprodb({
                    owner: sess.userid,
                    product : sess.product,
                    description : sess.description,
                    price :  sess.price,
                    img:   {
                        data: sess.file,
                        contentType: "image/png",
                    }
                });
            
                pro
                .save()
                .then(data => {
                    console.log("picture saved SUCCESSFULLY");
                    res.redirect('/user');
                })
                .catch(err=>{
                    console.log(err);
                })
            };
        });
     }
}

//for purchasing product
exports.purchase = (req, res) => {
    let sess = req.session;
        if(sess.userid){
            const id = req.query.id;

            userprodb.findById(id)
            .then(data =>{
                new carte({
                    owner:  sess.userid,
                    product: data.product,
                    price: data.price,
                    created_at: Date.now()
                })
                .save()
                .then(data =>{
                    res.redirect('/shop')
                })
                .catch(err =>{
                    console.log(err);
                })
            })
            .catch(err =>{
                console.log(err);
            })  
        
        }else{
            res.redirect('/login')
        }
   
   
}

 
// for deleting product from userdashboardpanel
exports.delete = (req,res) => {
    const id = req.query.id;

    userprodb.findByIdAndDelete(id)
    .then(pics => {
        if(!pics){
            res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
        }else{
           console.log("Deleted User Successfully");
           res.redirect('/user');
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });
}

// for deleting product from userdashboardpanel
exports.deletecart = (req,res) => {
    const id = req.query.id;

    carte.findByIdAndDelete(id)
    .then(cart => {
        if(!cart){
            res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
        }else{
           console.log("Deleted Cart");
           res.redirect('/checkout');
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });
}

//for the login credentials
exports.login = (req,res) =>{
     
    userdb.find()
    .then(data => {
        
        for(let i = 0; i < data.length; i++) {
        
            if(req.body.email == data[i].email && req.body.password == data[i].password){
            if(req.body.username == data[i].username){

            let sess = req.session;
                sess.userid = req.body.username;
                
                console.log(`${sess.userid} is logged in`);  
                res.redirect('/user');
                
            }else{
                res.send("ENTER A VALID USERNAME");

            }
        
        } 
     }      
        
            
    
        
    })
    .catch(err => {
            res.send("internal error")
    })  

    
   
};
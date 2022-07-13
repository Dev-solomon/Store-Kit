const express = require('express');
const route = express.Router();
const controller = require('./controller');
const userprodb = require('./database/model/product');
const carte = require('./database/model/cart');
 //Loaded modules already
 
//route for homepage
route.get('/', function(req,res){ 
    let sess = req.session;
    if(sess.userid){
        console.log("payment user");
        // res.render('pages/checkout');
        carte.find({owner: `${sess.userid}`}) 
        .then(carti=>{
 
            
              
            res.render('index', {nos:carti.length,}) 
                
                          

        
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
        });
    }else{      
            res.render('index', {nos:'',});
    }
         
     
}) 


//route for the shopping page
route.get('/shop',function(req,res){
    let sess = req.session;
    if(sess.userid){
        if(userprodb.find({}) == null){
            console.log("nothing available")
        }else{
        userprodb.find({}).limit(10).sort({created_at:-1})
        .then(image=>{
        
        res.render('pages/shop', {img:image, cuser: sess.userid});  
        
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
        })
        }
    }else{
        userprodb.find({}).limit(10).sort({created_at:-1})
        .then(image=>{
        
        res.render('pages/shop', {img:image, cuser: ''});  
        
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
        })
    }
   
});


//register page
route.get('/register', function(req,res){
    console.log("registering a user");
    res.render('pages/register', {mssg: ''});
})


//userdashboard page route
route.get('/user',function(req,res){
    let sess = req.session;    
    if(sess.userid){
            userprodb.find({owner: `${sess.userid}`})
            .then(data=>{
                
                    console.log(`${sess.userid} is logged in`)
                    res.render('pages/user', {img:data, cuser:`${sess.userid}`})              
  
            
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            });
        }else{
            res.redirect('/login');
        }
        
});


//payment page route
route.get('/checkout',function(req,res){

    let sess = req.session;
    if(sess.userid){
        console.log("payment user");
        // res.render('pages/checkout');
        carte.find({owner: `${sess.userid}`})
        .then(carti=>{
 
              const sum = carti.reduce((accumulator, object) => {
                return accumulator + object.price;
              }, 0);
              
            res.render('pages/checkout', {carti:carti, nos:carti.length, total:sum}) 
                
                          

        
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
        });
    }else{
        res.redirect('/login')
    }
    
    
    
   
})
//log-in a user route
route.get('/login',function(req,res){
   
        console.log("Loggin in a  user");
        res.render('pages/login');
    
   
})
//logging out and session destruction. 
route.get('/logout',function(req,res){
    req.session.destroy();
    console.log("A session has been  deleted!");
    res.redirect('/');
})
//testing route
// route.get('/test',function(req,res){
//     res.render('test');
// })



 // process Api routes
 route.get('/api/cart',controller.purchase);
route.post('/api/register',controller.register);
route.get('/api/delete',controller.delete);
route.get('/api/deletecart',controller.deletecart);
route.post('/api/userproduct', controller.userproduct);
route.post('/api/login',controller.login);
 


module.exports = route;
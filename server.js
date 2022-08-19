const express=require('express')
const mongoose=require('mongoose')
const User=require('./user')

app=express()
// connection mongo db
mongoose.connect(process.env.MONGO_URI, 
{ useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false, })
.then(()=>console.log("database connected successful"))
.catch(err=>console.error(err))

// Create and Save a Record of a Model:
let user=User({
    name:"souhir",
    age:21,
    favoriteFoods:["pizza","spaggetti"]
})
user.save((err,data)=>{
    err ? console.log(err):console.log("save user")
})
// Create Many Records with model.create()
User.create([{name:"salha ",age:22,favoriteFoods:["pizza","spaggetti"]},
{name:"wissal",age:23 ,favoriteFoods:["spaggetti","pizza"]},
{name:"ines",age:22,favoriteFoods:["kosksi","spagetti"]}],
(err,data)=>{
    err ? console.log(err):console.log("add users")
})
// Use model.find() to Search Your Database
User.find().limit(4)
.then(doc=>console.log("all users",doc) )
.catch(err=>console.log(err))

// Use model.findOne() to Return a Single Matching Document from Your Database
User.findOne({name:"souhir"})
.then(doc=>console.log("findone",doc.favoriteFoods))
.catch(err=>console.log(err))


// Use model.findById() to Search Your Database By _id
User.findById({_id:"62fe6e53ce0bc79cb28996bd"})
.then(doc=>console.log("byid",doc))
.catch(err=>console.log(err))

// Perform Classic Updates by Running Find, Edit, then Save
User.findById({_id:"62fe6e53ce0bc79cb28996bd"},(err,data)=>{
    if(err){
        console.log(err)
    } else {
        data.age=20;
        data.save((err,data)=>{
            err ? console.log(err):console.log("updateClassique",data)
        })
    }
})
// Perform New Updates on a Document Using model.findOneAndUpdate()
User.findOneAndUpdate({_id:"62fe6e53ce0bc79cb28996bd"},{$set:{age:22}})
.then(doc=>console.log("update",doc))
.catch(err=>console.log(err))

// Delete One Document Using model.findByIdAndRemove
User.findByIdAndDelete({_id:"62fe6e53ce0bc79cb28996bd"})
.then(doc=>console.log("remove",doc))
.catch(err=>console.log(err))

// Chain Search Query Helpers to Narrow Search Results
User.find({favoriteFoods:{$in:["kosksi"]}}).limit(2).select("-age").sort({name:"asc"}).exec()
.then(docs=>console.log(docs,"docs"))
.catch(err=>console.log(err))

app.listen(5000)

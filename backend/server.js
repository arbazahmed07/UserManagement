const exp=require("express")
const app=exp()
const userApp=require("./APIS/userAPI")
const path=require("path")
const mc=require("mongodb").MongoClient
app.use(exp.static(path.join(__dirname,"../usermanagement/dist")))
app.use(exp.json())

//connecting mongodb()
mc.connect("mongodb://localhost:27017")
.then(client=>{
  const dbObj=client.db("usermng")
  const usersCollectionObj=dbObj.collection("users")
  app.set("usersCollectionObj",usersCollectionObj)
  console.log("connected to database")
})
.catch(err=>{console.log("error in connecting db",err)})


app.use('/user-api',userApp)


app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,"../usermanagement/dist/index.html"))
})

app.use((err,req,res,next)=>{
  res.send({Errmsg:err.message})
})

app.listen(4000,()=>{
  console.log("server is running on port 4000");
})
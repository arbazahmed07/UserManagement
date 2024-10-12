const exp=require("express")
const userApp=exp.Router()



//post a new user
userApp.post('/new-user',async(req,res)=>{
  const usersCollectionObj=req.app.get("usersCollectionObj")
  let newUser=req.body;
  const ans =await usersCollectionObj.insertOne(newUser)
  // console.log(ans)
  res.send({msg:"new user created",payload:newUser})
})


//get all users
userApp.get('/all-users',async(req,res)=>{
  const usersCollectionObj=req.app.get("usersCollectionObj")
  const allUsers=await usersCollectionObj.find({status:true}).toArray()
  // console.log(allUsers)
  res.send({msg:"all users",payload:allUsers})
})



//removed users
userApp.get('/all-removedusers',async(req,res)=>{
  const usersCollectionObj=req.app.get("usersCollectionObj")
  const allUsers=await usersCollectionObj.find({status:false}).toArray()
  // console.log(allUsers)
  res.send({msg:"all users",payload:allUsers})
})
//restore users
userApp.put('/restore-users/:name',async(req,res)=>{
  const usersCollectionObj=req.app.get("usersCollectionObj")
  let name=req.params.name;
  console.log(name)
  const user = await usersCollectionObj.findOne({ name: name });
  if (user === null) {
    return res.status(404).send({ msg: "User not found" });
  }
  const result = await usersCollectionObj.updateOne(
    { name: name },
    { $set: { status: true } }
  );

  console.log(result);
  res.send({ msg: "User Restored", payload: user });

})


// Soft delete a user
userApp.put('/delete-user/:name', async (req, res) => {
  const usersCollectionObj = req.app.get("usersCollectionObj");
  const name = req.params.name;
  console.log(name);

  // First, find the user by name
  const user = await usersCollectionObj.findOne({ name: name });
  if (user === null) {
    return res.status(404).send({ msg: "User not found" });
  }

  const result = await usersCollectionObj.updateOne(
    { name: name },
    { $set: { status: false } }
  );

  console.log(result);
  res.send({ msg: "User deleted", payload: user });
});

//edit user
userApp.put('/edit-user/:name', async (req, res) => {
  const usersCollectionObj = req.app.get("usersCollectionObj");
  const editedObj = req.body; // This contains the updated user details
  const name = req.params.name; // The name passed as a parameter in the URL

  console.log("Edited object:", editedObj);
  console.log("User name:", name);

  // Destructure the updated fields from the request body
  const { email, mobile, message, subject } = editedObj;

  try {
    // Update the user in the database based on the name
    const result = await usersCollectionObj.updateOne(
      { name: name }, // Filter to find the user by name
      { 
        $set: { // Set the new values from the request body
          email: email,
          mobile: mobile,
          message: message,
          subject: subject
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports=userApp

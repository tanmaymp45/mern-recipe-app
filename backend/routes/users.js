const router = require("express").Router()
const User = require("../models/Users")

router.get("/:id", async (req,res)=>{
try{
const user = await User.findById(req.params.id)
res.json(user)
}catch(err){
res.status(500).json(err)
}
})

module.exports = router

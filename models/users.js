var mongoose=require('mongoose')

var userSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true}
    },
    {collection:'users'}
)

var model=mongoose.model('UserSchema',userSchema)

module.exports=model
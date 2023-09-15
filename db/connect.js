var mongoose=require('mongoose')

var connection=(url)=>{
    return mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
}

module.exports=connection
require('dotenv').config()
//const { DATABASE_URL } = process.env
const mongoose = require('mongoose')

/* mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log('Database connected')
  })
  .catch((e) => {
    console.log(e)
  }) */

 



const conectarDB = async () => {
   //Conectando mongo
          mongoose.connect(process.env.DATABASE_URL,
            {useNewUrlParser: true,
             useUnifiedTopology:true,
                
        
              }, (err) => {
                if(err){
                    console.log("error en la conexion")
                }else{
                    console.log("base de datos conectada re picante")
                }
              } 
              
              
              
              )};



module.exports = conectarDB
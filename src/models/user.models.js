import {Schema , model} from 'mongoose'
import bcrypt from 'bcryptjs';
const userSchema =   new Schema({
    username : {
        type : String ,
        unique : true ,
    },
    email: {
        type : String ,
        unique : true,
        require : true ,

    },
    password : {
        type : String ,
        require : true,
    },
    roles : [{
        ref: 'Role',
        type : Schema.Types.ObjectId
    }]
},{
    timestamps : true , 
    versionKey : false,

});

//--------------metodos para cifrar y comparar las contraseñas
userSchema.statics.encryptPassword = async (password ) =>{
    const salt = await bcrypt.genSalt(10) // esto me genera un algoritmo de dificultad 10 para encryptar una contraseña
    const passwordCifrada =  await bcrypt.hash(password , salt) // esto me genera una contraseña ya cifrada con la difucltad indicada anteriormente
    return passwordCifrada;
}

userSchema.statics.comparePassword = async ( password ,  receivePassword) =>{
    //esto me retorna un true si las contraseña coinciden si no nos devuelve un false;
    return await bcrypt.compare(password , receivePassword) // esto me compara la contraseña guardada en nuestra base de datos con la que nos estan mandando actualmente

}



export default model('User'  , userSchema);
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
        required : true ,
        trim : true,


    },
    password : {
        type : String ,
        require : true,
        trim:true
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

/*
//otra manera de indicar que tiene que encriptar la constraseña antes de guardarla.
//esta funcion se tiene que ejecutar antes de guardar la contraseña del usuario
UserSchema.pre('save' , async function(next){
    try{
        this.password = await bcrypt.hash(this.password,10)
    }catch(error){
        console.log(error);
    }
    next();
});
*/



export default model('User'  , userSchema);
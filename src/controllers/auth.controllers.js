import UserModels from '../models/user.models'
import jwt from 'jsonwebtoken';
import config from '../config'

export const singup= async(req , res) =>{

    const {username , email ,  password , roles } = req.body

    const newUser = new UserModels({
        username,
        email,
        password : await UserModels.encryptPassword(password),//con esto guardo la contraseña cifrada del usuario
    })
    console.log(newUser);
    const userSave = await newUser.save();

    //con esto vamos a crear un token que devolveremos para que el front end se encarge de mandar
    //peticones con este token.
    //mandaremos tres datos ,el primero seran datos , el segundo una clave secreta y el ultimo el objeto de configuracion
    const token = jwt.sign({id: userSave._id , } , config.SECRET , {
        expiresIn : 86400 //le estamos diciendo que en 24 horas expire nuestro token
    })

    res
    .status(200)
    .json({token : token})
}

export const singin = async (req , res) => {

    res
    .status(200)
    .json('singin')
}



/*
otra manera de validar que cuando el usuario vaya ha hacer login 
se compruebe que en la cabecera tenemos lo que son el token de autenticacion con los datos que necesitams
para dejarlos pasar  y realizar distintos tipos de peticiones 


validate : async (req , res , next) => {
        console.log(req.headers)
        const token = req.headers['x-access-token']
        console.log(token)

        try{

            if(!token){
                res
                    .status(400)
                    .json({error : 'no hay token'})
                    throw new Error()
            }
            jwt.verify(token , process.env.JWT_KEY, function(err , decoded){
                if(err){
                    res
                        .status(400)
                        .json({error : 'token invalido'})
                    throw new Error()
                }
                next()
            })
        }catch(error){
            console.log(error)
            res
                .status(400)
                .json({message : 'error desconocido'})
        }

    }

*/
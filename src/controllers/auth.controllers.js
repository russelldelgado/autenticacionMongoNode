import UserModels from '../models/user.models'
import jwt from 'jsonwebtoken';
import config from '../config'

import Role from '../models/roles.models'

export const singup= async(req , res) =>{

    const {username , email ,  password , roles } = req.body

    const newUser = new UserModels({
        username,
        email,
        password : await UserModels.encryptPassword(password),//con esto guardo la contraseña cifrada del usuario
    })
    console.log(newUser);

    //antes de guardar nuestro usuario comprobamos si existen roles relacionados con este usuario
    if(roles){
      const foundRoles=   await  Role.find({name : {$in : roles}});
      newUser.roles = foundRoles.map(role => role._id);
    }else{
        const role = await Role.findOne({name : "user"})
        newUser.roles = [role._id];
    }


    const userSave = await newUser.save();
    console.log(userSave)
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

    const userFound = await UserModels.findOne({email : req.body.email}).populate('roles');

    if(!userFound){
        res.status(400).json({message : 'User not found'})
    }

   const matcPassword = await UserModels.comparePassword(req.body.password , userFound.password)

    if(!matcPassword){
        res.status(400).json({token : null , message : 'invalid password'})
    }

    const token =  jwt.sign({id: userFound._id} , config.SECRET, {expiresIn : 86400})

    console.log(userFound)


    res
    .status(200)
    .json({token})
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
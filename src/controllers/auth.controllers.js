import UserModels from '../models/user.models'

export const singup= async(req , res) =>{
    const {username , email ,  password , roles } = req.body
    //console.log(req.body)

    const newUser = new UserModels({
        username,
        email,
        password : await UserModels.encryptPassword(password),//con esto guardo la contraseña cifrada del usuario
    })
    console.log(newUser);

    res
    .status(200)
    .json(newUser)
}

export const singin = async (req , res) => {

    res
    .status(200)
    .json('singin')
}
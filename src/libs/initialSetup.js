import Role from '../models/roles.models'

export const createRoles = async() => {
//este metodo me sirve para contar a ver si ya existen documentos en nuestra bbdd 
    try {
            const count = await Role.estimatedDocumentCount();
        if(count > 0 ){
            console.log('dentro del return inicial')
            return ;
        }

    const values =  await Promise.all(
           await new Role({name : 'user'}).save(),
           await new Role({name : 'moderador'}).save(),
            await new Role({name : 'admin'}).save()
        );

        console.log(values);
    } catch (error) {
        console.error(error);
    }
}
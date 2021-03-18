import Role from '../models/roles.models'

export const createRoles = async() => {
//este metodo me sirve para contar a ver si ya existen documentos en nuestra bbdd 
    const count = await Role.estimatedDocumentCount();
    if(count > 0 ){
        return ;
    }

}
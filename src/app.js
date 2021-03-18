//app me sirve para configurar el app
import express from "express"
import morgan from 'morgan'
import pkg from '../package.json'

import productRoutes from './routes/product.routes'

const app = express();

//metodos para colocar nombres y valoresa las varibales , podemos guardar una variable en espress y volver a obtener su valor.
app.set('pkg' , pkg);

//middelware
app.use(morgan('dev'))


app.get('/' , (req , res) =>{
    res.json({
        name : app.get('pkg').name,
        author : app.get('pkg').author,
        description : app.get('pkg').description ,
        version : app.get('pkg').version
    })
})

app.use('/products',productRoutes)

export default app;

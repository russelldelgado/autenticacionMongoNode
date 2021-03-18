//el index me vale para que arranque la aplicacion
import app from './app'
import './database'

app.listen(3000)
console.log('conectado en el puerto 3000')

/*
app.listen(PORT , HOST ,  ()=>{
    console.log(`servidor escuchando en el puerto  : ${PORT} y host : ${HOST}`)
})

*/
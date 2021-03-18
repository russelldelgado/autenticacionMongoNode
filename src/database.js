import mongoose from 'mongoose'

const opt = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  };


mongoose.connect("mongodb://localhost:/companydb",opt)
                                .then( console.log('BBDD CONECTADA ..... companydb'))
                                .catch(error =>{console.log(error)})


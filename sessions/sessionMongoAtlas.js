import mongoStore from 'connect-mongo'

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const sessionMongo =  {
    store: mongoStore.create({
        mongoUrl: 'mongodb+srv://coderhouse:coderhouse@desafiologin.ymi5ngo.mongodb.net/sessions',
        mongoOptions: advancedOptions
    }),
    secret: 'shhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    },
    rolling: true
}

export { sessionMongo }


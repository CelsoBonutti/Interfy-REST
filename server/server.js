//Configuração das variáveis de ambiente
const env = process.env.NODE_ENV || 'development';

console.log('env *****', env);

if (env === 'development') {
    process.env.PORT = 8000;
    process.env.MONGO_STR = 'mongodb://localhost:27017/dev';
    process.env.JWT_SECRET = 'segredomuitosecreto';
    process.env.URL = 'http://localhost:8000';
    process.env.CLOUD_NAME = '';
    process.env.CLOUR_KEY = '';
    process.env.CLOUR_SECRET = '';
}

//Bibliotecas
const bodyParser = require('body-parser');
const express = require('express');
const port = process.env.PORT;
const {mongoose} = require('./libs/mongoose');
const {ApolloServer} = require('apollo-server-express');


//Modelos
const {Accomodation} = require('./models/accomodation')
const {Addon} = require('./models/addon')
const {Country} = require('./models/country')
const {Course} = require('./models/course')
const {Exchange} = require('./models/exchange')
const {Intensity} = require('./models/intensity')
const {School} = require('./models/school')
const {Shift} = require('./models/shift')
const {User} = require('./models/user')
const {UserInfo} = require('./models/userInfo')


//Rotas
const addonRoutes = require('./routes/addons');
const courseRoutes = require('./routes/courses');
const schoolRoutes = require('./routes/schools');
const informationRoutes = require('./routes/userInfo');
const intensityRoutes = require('./routes/intensities');
const exchangeRoutes = require('./routes/exchanges');
const paymentRoutes = require('./routes/payments');
const countryRoutes = require('./routes/countries');
const shiftRoutes = require('./routes/shifts');
const userRoutes = require('./routes/users');



//Configuração dos pacotes
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Configuração do GraphQL
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context:{
        Accomodation,
        Addon,
        Country,
        Course,
        Exchange,
        Intensity,
        School,
        Shift,
        User,
        UserInfo
    }
})

server.applyMiddleware({
    app
})

//Setando CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth, X-Hub-Signature");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

//Configuração das rotas
app.use('/addons', addonRoutes);
app.use('/courses', courseRoutes);
app.use('/schools', schoolRoutes);
app.use('/userInfo', informationRoutes);
app.use('/intensities', intensityRoutes);
app.use('/exchanges', exchangeRoutes);
app.use('/pagamentos', paymentRoutes);
app.use('/countries', countryRoutes);
app.use('/shifts', shiftRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})
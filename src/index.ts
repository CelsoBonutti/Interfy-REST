
import {createConnection} from "typeorm";
import {School} from "../src/entity/School";
import {Accomodation} from "../src/entity/Accomodation";
import {Course} from "../src/entity/Course";
import {Intensity} from "../src/entity/Intensity";
import {Country} from "../src/entity/Country";
import {Addon} from "../src/entity/Addon";
import {User} from "../src/entity/User";
import {Shift} from "../src/entity/Shift";
import {UserInfo} from "../src/entity/UserInfo";
import {Exchange} from "../src/entity/Exchange";
//Configuração das variáveis de ambiente
const env = process.env.NODE_ENV || 'development';

console.log('env *****', env);

if (env === 'development') {
    process.env.PORT = "8000";
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
//const {postgresSQL} = require('../server/libs/mongoose');
const {ApolloServer} = require('apollo-server-express');

//Modelos
//const {Accomodation} = require('../server/models/accomodation')
//const {Addon} = require('../server/models/addon')
//const {Country} = require('../server/models/country')
//const {Course} = require('../server/models/course')
//const {Exchange} = require('../server/models/exchange')
//const {Intensity} = require('../server/models/intensity')
//const {School} = require('../server/models/school')
//const {Shift} = require('../server/models/shift')
//const {User} = require('../server/models/user')
//const {UserInfo} = require('../server/models/userInfo')


//Rotas
const addonRoutes = require('../server/routes/addons');
const courseRoutes = require('../server/routes/courses');
const schoolRoutes = require('../server/routes/schools');
const informationRoutes = require('../server/routes/userInfo');
const intensityRoutes = require('../server/routes/intensities');
const exchangeRoutes = require('../server/routes/exchanges');
const paymentRoutes = require('../server/routes/payments');
const countryRoutes = require('../server/routes/countries');
const shiftRoutes = require('../server/routes/shifts');
const userRoutes = require('../server/routes/users');


createConnection().then(async connection => {
//Configuração dos pacotes
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
const path = '/graphql';

//Configuração do GraphQL
const requireAuthDirective = require('../server/directives/auth')
const typeDefs = require('../server/graphql/schema');
const resolvers = require('../server/graphql/resolvers');
const server = new ApolloServer({
    playground: true,
    introspection: true,
    typeDefs: typeDefs,
    resolvers: resolvers,
    schemaDirectives: {
        requireAuth: requireAuthDirective
    },
    context:({req, res}) => ({
        token: req.headers['x-auth'],
        Accomodation,
        Addon,
        Country,
        Course,
        Exchange,
        Intensity,
        School,
        Shift,
        UserInfo,
        User
    })
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
    console.log(`Started on port http://localhost:${port}${server.graphqlPath}`);
})
}).catch(error => console.log("TypeORM connection error: ", error));

const {gql} = require('apollo-server-express');
const Accomodation = require('./accomodation');
const Addon = require('./addon');
const Country = require('./country');
const School = require('./school');
const User = require('./user');

const Query = gql`
    type Query{
        """
        Query de busca de escolas. TODO: Filtros
        """  
        hello: [Schoolhud]!
        findSchool: [Schoolhud]!
        
        """
        Query de busca de cursos. TODO: Filtros
        """
        findCourses(_id: ID, title: String): [Course]

        """
        Query de busca de intensidades. TODO: Filtros
        """
        findIntensities(_id: ID, title: String): [Intensity]

        """
        Query para pegar informações do usuário. 
        Autenticação necessária.
        """
        getUser: [User] @requireAuth

    }
    `

const Mutation = gql`
    type Mutation{
        """Mutation para inserir escola."""
        addSchool(name: String!, country: String!, city: String!, photos: [String]!, optionals: [OptionalInput]!, infrastructure: [String]!, extras: [String]!): School @requireAuth(role: ADMIN)
        """Mutation para remover escola."""
        deleteSchool(_id: ID): School @requireAuth(role: ADMIN)
        """Mutation para remover curso."""
        deleteCourse(_id: ID): Course @requireAuth(role: ADMIN)
        """Mutation para remover intensidade."""
        deleteIntensity(_id: ID): Intensity @requireAuth(role: ADMIN)
        """Mutation para remover turno."""
        deleteShift(_id: ID): Shift @requireAuth(role: ADMIN)
    }
`

const Schema = gql`
    schema{
        query: Query,
        mutation: Mutation
    }
    `

const typeDefs = [Schema, Query, Accomodation, Addon, Country, School, User, Mutation];

module.exports = typeDefs;
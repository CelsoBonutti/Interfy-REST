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
        findSchool(name: String): [School]
    }
    `

const Mutation = gql`
    type Mutation{
        userLogin(email: String!, password: String!): LoginResponse
    }
`

const Schema = gql`
    schema{
        query: Query
    }
    `

const typeDefs = [Schema, Query, Accomodation, Addon, Country, School, User];

module.exports = typeDefs;
const {gql} = require('apollo-server-express');
const {Accomodation} = require('./accomodation');
const {Addon} = require('./addon');
const {Country} = require('./country');
const {School} = require('./school');
const {User} = require('./user');

const Query = gql`
    type Query{
        findSchools: [School]
    }
    `

const Schema = gql`
    schema{
        query: Query
    }
    `
const typeDefs = [Schema, Query, Accomodation, Addon, Country, School, User];

module.exports = typeDefs;
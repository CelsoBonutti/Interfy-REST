const {gql} = require('apollo-server-express');

const Country = gql`
    type Climate{
        description: String!
        season: String!
        months: String!
        weather: String!
        minTemp: Float!
        maxTemp: Float!
    }

    type Visa{
        description: String!
        difficulty: Int!
    }

    type Country{
        name: String!
        acronym: String!
        capital: String!
        continent: String!
        languages: [String]!
        currency: String!
        description: String!
        visa: [Visa]
        climate: [Climate]
        tips: String!
    }
`

module.exports = Country;
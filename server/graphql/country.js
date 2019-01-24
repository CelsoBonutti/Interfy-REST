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

    input ClimateInput{
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

    input VisaInput{
        description: String!
        difficulty: Int!
    }

    type Country{
        name: String!
        acronym: String!
        capital: String!
        continent: String!
        languages: languages!
        currency: String!
        description: String!
        visa: [Visa]
        climate: [Climate]
        tips: String!
    }

    input inputCountry{
        name: String!
        acronym: String!
        capital: String!
        continent: String!
        languages: languages!
        currency: String!
        description: String!
        visa: [VisaInput]
        climate: [ClimateInput]
        tips: String!
    }

    enum languages{
        Mandarim,
        Espanhol,
        Ingles,
        Bengali,
        Portugues,
        Russo,
        Japones,
        Alemao,
        Chines,
        Javanes,
        Coreano,
        Frances,
        Vietnamita,
        Telugo,
        Cantones,
        Marati,
        Tamil,
        Turco,
        Urdu,
        Italiano
    }
`

module.exports = Country;
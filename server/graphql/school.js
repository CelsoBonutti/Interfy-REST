const {gql} = require('apollo-server-express');

const School = gql`
    type Duration{
        numberOfWeeks: Int!
        price: String
        dates: [String]!
    }

    type Optional{
        description: String!
        icon: String!
    }

    type School{
        name: String!
        country: String!
        city: String!
        photos: [String]!
        optionals: [Optional]!
        infrastructure: String!
        extras: [String]!
    }

    type Course{
        _id: ID
        title: String!
        description: String!
        School: School!
    }

    type Intensity{
        description: String!
        name: String!
        school: School!
        course: Course!
    }

    type Shift{
        title: String!
        description: String!
        duration: Duration!
        school: School!
        intensity: Intensity!
    }
`

module.exports = School;
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
        _id: ID
        name: String!
        country: String!
        city: String!
        photos: [String]!
        optionals: [Optional]!
        infrastructure: [String]!
        extras: [String]!
        courses: [Course]
    }

    type Course{
        _id: ID
        title: String!
        description: String!
        school: School!
        intensities: [Intensity]
    }

    type Intensity{
        _id: ID
        description: String!
        title: String!
        school: School!
        course: Course!
        shifts: [Shift]
    }

    type Shift{
        _id: ID
        title: String!
        description: String!
        duration: [Duration]!
        school: School!
        intensity: Intensity!
    }
`

module.exports = School;
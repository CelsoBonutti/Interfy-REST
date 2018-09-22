const {gql} = require('apollo-server-express');

const Addon  = gql`
    enum addonType{
        visa,
        material,
        insurance
    }

    type Addon{
        _id: ID
        description: String!
        price: String!
        required: Boolean!
        type: addonType
        coverage: String
        school: School
        country: Country
    }
`

module.exports = Addon;
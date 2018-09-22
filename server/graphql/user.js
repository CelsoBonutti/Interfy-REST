const {gql} = require('apollo-server-express');

const User = gql`
enum gender{
    M,
    F,
    O,
    N
}

type User{
    email: String!
    password: String!
    name: String!
    surname: String!
    phone: String!
    gender: String!
    active: Boolean!
    verificationCode: String!
    isAdmin: Boolean!
}

type Address{
    zip: String!
    state: String!
    city: String!
    neighborhood: String!
    street: String!
    number: Int!
    complement: String
}

type Contact{
    name: String!
    relationship: String!
    phone: String!
}

type MedicalInformation{
    specialConditions: String
    dietaryRestrictions: String
    extraInfo: String
}

type UserInfo{
    birthday: String!
    cpf: String!
    languageLevel: String!
    address: Address!
    medicalInformation: MedicalInformation!
    emergencyContacts: Contact!
    userId: ID!
}
`

module.exports = User;
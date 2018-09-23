const {gql} = require('apollo-server-express');

const User = gql`
enum Gender{
    M,
    F,
    O,
    N
}

enum Role{
    user,
    admin
}

type User{
    email: String!
    password: String!
    name: String!
    surname: String!
    phone: String!
    gender: Gender!
    active: Boolean!
    verificationCode: String!
    role: Role!
}

type LoginResponse{
    status: String!
    content: String!
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
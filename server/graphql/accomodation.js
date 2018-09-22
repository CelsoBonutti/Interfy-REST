const {gql} = require('apollo-server-express');

const Accomodation = gql`
    type Supply{
        name: String!
        description: String!
        price: String!
    }

    type DateRange{
        startDate: String!
        endDate: String!
        price: String!
    }

    type Accomodation{
        _id: ID
        roomType: RoomType!
        name: String!
        supplies: [Supply] 
        dateRange: [DateRange]
        school: School
    }

    enum RoomType{
        Single,
        Shared
    }
`;

module.exports = Accomodation;

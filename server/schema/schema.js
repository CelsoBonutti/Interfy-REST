const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList
  } = graphql;

const CountryType = new GraphQLObjectType({
    name: 'Country',
    fields: () =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        initials: {type: GraphQLString},
        capital: {type: GraphQLString},
        continent: {type: GraphQLString},
        languages:{type: new GraphQLList(GraphQLString)},
        currency: {type: String},
        description: {type: String},
        
    })
})

const SchoolType = new GraphQLObjectType({
    name: 'School',
    fields: () =>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        countryId: {type: GraphQLID},
        photos: {type: GraphQLList(GraphQLString)},
        infrastructure: {type: GraphQLList(GraphQLString)},
        extras: {type: GraphQLList(GraphQLString)},
        differential: {type: DifferentialType},
        course: {
            type: new GraphQLList(CourseType),
            resolve(parent, params){

            }
        },
        country: {
            type
        }
    })
})

const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        schoolId: {type: GraphQLID},
        intensities: {
            type: new GraphQLList(IntensityType),
            resolve(parent, params){

            }
        }
    })
})

const IntensityType = new GraphQLObjectType({
    name: 'Intensity',
    fields: () =>({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},

    })
})

const TurnoType = new GraphQLObjectType({
    name: 'Turno',
    fields: () =>({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        
    })
})

const DifferentialType = new GraphQLObjectType({
    name: 'Differential',
    fields: () =>({
        description: {type: GraphQLString},
        icon: {type: GraphQLString}
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        schools:{
            type: SchoolType,
            args: {countryName: {GraphQLString}},
            resolve(parent, args){

            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
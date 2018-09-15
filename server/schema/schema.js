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
const {Course} = require('../models/course');

const CountryType = new GraphQLObjectType({
    name: 'Country',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        acronym: {
            type: GraphQLString
        },
        capital: {
            type: GraphQLString
        },
        continent: {
            type: GraphQLString
        },
        languages: {
            type: new GraphQLList(GraphQLString)
        },
        currency: {
            type: String
        },
        description: {
            type: String
        },
        suggestion: {
            type: String
        }
    })
})

const SchoolType = new GraphQLObjectType({
    name: 'School',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        countryInitials: {
            type: GraphQLString
        },
        photos: {
            type: GraphQLList(GraphQLString)
        },
        infrastructure: {
            type: GraphQLList(GraphQLString)
        },
        extras: {
            type: GraphQLList(GraphQLString)
        },
        differentials: {
            type: GraphQLList(DifferentialType)
        },
        course: {
            type: new GraphQLList(CourseType),
            args: {
                courseName: {
                    type: new GraphQLList(GraphQLString)
                }
            },
            resolve(parent, params) {
                return Course.find({
                                        
                })
            }
        },
        country: {
            type: CountryType,
            resolve(parent, params) {

            }
        }
    })
})

const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        schoolId: {
            type: GraphQLID
        },
        intensities: {
            type: new GraphQLList(IntensityType),
            resolve(parent, params) {

            }
        },
        school: {
            type: SchoolType,
            resolve(parent, params) {

            }
        }
    })
})

const IntensityType = new GraphQLObjectType({
    name: 'Intensity',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        shifts: {
            type: new GraphQLList(ShiftType),
            resolve(parent, params){

            }
        },
        course: {
            type: CourseType
        }
    })
})

const ShiftType = new GraphQLObjectType({
    name: 'Shift',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        intensity: {
            type: IntensityType
        }
    })
})

const DifferentialType = new GraphQLObjectType({
    name: 'Differential',
    fields: () => ({
        description: {
            type: GraphQLString
        },
        icon: {
            type: GraphQLString
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        schools: {
            type: SchoolType,
            args: {
                countryName: {
                    type: GraphQLString
                },
                cityName: {
                    type: GraphQLString
                },
                courseName:{
                    type: new GraphQLList(GraphQLString)
                },
                intensityName:{
                    type: new GraphQLList(GraphQLString)
                },
                shiftName:{
                    type: new GraphQLList(GraphQLString)
                }
            },
            resolve(parent, args) {

            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
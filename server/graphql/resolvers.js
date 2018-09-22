const resolvers = {
    Query: {
        findSchool: (root, args, {School}) =>{
            return School.find().then((schools)=>{
                return schools;
            }) 
        }
    }
}

module.exports = resolvers;

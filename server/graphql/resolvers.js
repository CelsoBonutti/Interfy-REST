const resolvers = {
    Query: {
        findSchool: (root, args, {School}) =>{
            return School.find().then((schools)=>{
                return schools;
            })
        }
    },
    School: {
        courses: (root, args, {Course}) =>{
            return Course.find({school: root._id}).then((courses)=>{
                return courses;
            }) 
        }
    },
    Course: {
        intensities: (root, args, {Intensity}) =>{
            return Intensity.find({course: root._id}).then((intensities)=>{
                return intensities;
            })
        }
    },
    Intensity: {
        shifts: (root, args, {Shift}) =>{
            return Shift.find({intensity: root._id}).then((shifts)=>{
                return shifts;
            })
        }
    }
}

module.exports = resolvers;

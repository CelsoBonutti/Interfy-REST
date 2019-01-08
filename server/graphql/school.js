const {gql} = require('apollo-server-express');

const School = gql`
    """
    Modelo para inserir duração. Necessário pois MongoDB é uma bosta.
    """
    input DurationInput{
        numberOfWeeks: [Int]!
        price: String!
        dates: [String]!
    }

    """
    Modelo para duração, utilizado para informar de forma dinâmica as opções de duração de curso que um aluno terá.
    """
    type Duration{
        numberOfWeeks: [Int]!
        price: String!
        dates: [String]!
    }

    """
    Modelo de adicionais da escola, características que a torna uma escolha melhor dentre as outras.
    """
    input OptionalInput{
        description: String!
        icon: String!
    }

    type Optional{
        description: String!
        icon: String!
    }

    """
    Modelo de escola, representa uma instituição de ensino.
    """
    type School{
        _id: ID
        name: String!
        country: String!
        city: String!
        photos: [String]!
        optionals: [Optional]!
        infrastructure: [String]!
        extras: [String]!
        slug: String
        courses(title: String): [Course]
        """Pseudo-mutation para adicionar cursos."""
        addCourses(courses: [CourseInput]!): [Course] @requireAuth(role: ADMIN)
    }

    """
    Modelo para inserir cursos. Necessário pois MongoDB é uma bosta.
    """
    input CourseInput{
        title: String!
        description: String!
    }
    
    """
    Modelo de curso, representa as opções de curso que uma instituição representa e sua descrição.
    """
    type Course{
        _id: ID
        title: String!
        description: String!
        school: ID!
        schoolInfo: School
        intensities: [Intensity]
        """Pseudo-mutation para adicionar intensidades."""
        addIntensities(intensities: [IntensityInput]!): [Intensity] @requireAuth(role: ADMIN)
    }


    """
    Modelo para inserir intensidade, necessário pois MongoDB é uma bosta.
    """
    input IntensityInput{
        description: String!
        title: String!
    }

    """
    Modelo de intensidade, representa o quanto o aluno estudará por dia.
    """
    type Intensity{
        _id: ID
        description: String!
        title: String!
        school: ID!
        course: ID!
        schoolInfo: School
        courseInfo: Course
        shifts: [Shift]
        """Pseudo-mutation para adicionar turnos."""
        addShifts(shifts: [ShiftInput]!): [Shift] @requireAuth(role: ADMIN)
    }

    """
    Modelo para inserir turno. Necessário pois MongoDB é uma bosta.
    """
    input ShiftInput{
        title: String!
        description: String!
        duration: [DurationInput]!
    }

    """
    Modelo de turno, representa em que turno do dia o aluno estudará.
    """
    type Shift{
        _id: ID
        title: String!
        description: String!
        duration: [Duration]!
        school: ID!
        schoolInfo: School
        intensityInfo: Intensity
        courseInfo: Course
        intensity: ID!
    }
`

module.exports = School;
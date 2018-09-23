const {gql} = require('apollo-server-express');

const School = gql`

    """
    Modelo para duração, utilizado para informar de forma dinâmica as opções de duração de curso que um aluno terá.
    """
    type Duration{
        numberOfWeeks: Int!
        price: String
        dates: [String]!
    }

    """
    Modelo de adicionais da escola, características que a torna uma escolha melhor dentre as outras.
    """
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
        courses: [Course]
    }

    """
    Modelo de curso, representa as opções de curso que uma instituição representa e sua descrição.
    """
    type Course{
        _id: ID
        title: String!
        description: String!
        school: School!
        intensities: [Intensity]
    }

    """
    Modelo de intensidade, representa o quanto o aluno estudará por dia.
    """
    type Intensity{
        _id: ID
        description: String!
        title: String!
        school: School!
        course: Course!
        shifts: [Shift]
    }

    """
    Modelo de turno, representa em que turno do dia o aluno estudará.
    """
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
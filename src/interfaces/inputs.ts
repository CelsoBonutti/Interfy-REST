export interface Accomodation {

    roomType:roomType;
    name:string;
    supplies: Supplies[];
    school: School;
    dateRange: DateRange[];
}

enum roomType{
    Single,
    Shared
} 

export interface Supplies {
    accomodation: Accomodation;
    name: string;
    description:string;
    price:string;
}

export interface School {
    name: string;
    country: string;
    city: string;
    photos: string;
    age: number;
    infrastructure:string;
    extras:string;
    intensity:Intensity[];
    optionals:Optional[];
    course:Course[];
    accomodation:Accomodation[];
    addon:Addon[];
}


export interface Optional {
    School: School;
    description: string;
    icon: string;
}

export interface Addon {
    description: string;
    price: string;
    required: boolean;
    type:type;
    school: School;
    country: Country;
}

enum type{
    visa,
    material,
    insurance
}
export interface DateRange {
    accomodation: Accomodation;
    startDate: Date;
    endDate: Date;
    price:string;
}

export interface Country {
    name: string;
    acronym: string;
    capital: string;
    continent: string;
    languages:languages;
    currency: string;
    description: string;
    tips: string;
    visa:Visa[];
    climate:Climate[];
}

export interface Climate {
    description: string;
    season: string;
    months: string;
    weather: string;
    minTemp: number;
    maxTemp: number;
    country: Country;
}

export interface Visa {
    escription: string;
    difficulty: number;
    country: Country;
}

export interface Course {
    title: string;
    description: string;
    school: School;
    intensity:Intensity[];
}

enum languages{
   Mandarim,
   Espanhol,
   Ingles,
   Bengali,
   Portugues,
   Russo,
   Japones,
   Alemao,
   Chines,
   Javanes,
   Coreano,
   Frances,
   Vietnamita,
   Telugo,
   Cantones,
   Marati,
   Tamil,
   Turco,
   Urdu,
   Italiano
}

export interface Exchange {
    user: User;
    status:status;
    purchaseDate: Date;
    updateDate: Date;
    transactionId: number;
    exchangeCourse: ExchangeCourse;
}

enum status{
    processing,
    authorized,
    paid,
    refunded,
    waiting_payment,
    pending_refund,
    refused,
    chargedback
}

export interface ExchangeCourse {
    tipo: string;
    cargaHoraria: string;
    turno: string;
    qntSemanas: number;
    dtInicio: Date;
    dtFim: Date;
    valor: string;
    school: School;
}

export interface Intensity {
    title: string;
    description: string;
    school: School;
    course: Course;
}

export interface Shift {
    title: string;
    description:string;
    duration:Duration[];
    school: School;
    intensity: Intensity;
}

export interface Duration {
    numberOfWeeks: number;
    price: string;
    dates: DurationDate[];
    shift: Shift;
}

export interface DurationDate {
    duration: Duration;
    date: Date;
}

export interface User {
    email: string;
    password: string;
    name: string;
    surname: string;
    phone: number;
    gender:gender;
    active:boolean;
    verificationCode:string;
}

enum gender{
    M,
    F,
    O,
    N
}

enum role{
    USER,
    ADMIN,
}

export interface Address {
    zip: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    complement: string;
    number: number;
}

export interface Contact {
    name: string;
    relationship: string;
    phone: string;
    userInfo: UserInfo;
}

export interface MedicalInformation {
    specialConditions: string;
    dietaryRestrictions: string;
    extraInfo: string;
}

export interface UserInfo {
    birthday: Date;
    cpf: number;
    languageLevel: string;
    address: Address;
    medicalInformation: MedicalInformation;
    contact:Contact[];
    user: User;
}

export interface inputCountry {
    data: Country;
  }
  
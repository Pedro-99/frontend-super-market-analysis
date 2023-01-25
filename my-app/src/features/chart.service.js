import axios from 'axios';

const baseUrl = 'http://localhost:8000';


// upload csv file and save it into database
const insertDataViaCSV = async (file) => {
    const response = await axios.post(baseUrl + `/superMarket/insertFile`, file) 

    return response.data
}

// Get super market salles 
const getSuperMarketSalles = async () => {

    const response = await axios.get(baseUrl + `/all-salles`)

    return response.data
}

// Get super market salles grouped by product line 
const getSalles = async () => {

    const response = await axios.get(baseUrl + `/stats`)

    return response.data
}

// Get super market salles grouped by product line 
const getSallesGroupedByTypeAndGender = async () => {

    const response = await axios.get(baseUrl + `/total-salles`)

    return response.data
}

// Get average rating based on each gender
const getRatingByGender = async () => {

    const response = await axios.get(baseUrl + `/avg`)

    return response.data
}

const superMarketService = {
    insertDataViaCSV,
    getSalles,
    getSallesGroupedByTypeAndGender, 
    getRatingByGender
}

export default superMarketService

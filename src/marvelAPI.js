import axios from "axios"
import CryptoJS from "crypto-js"


const publicKey = '594cf5d3d493b51c784d2243ab9a271f'
const privateKey = '555c6fd8048c9d5ae04fad69480741e16f41200c'
const timestamp = new Date().getTime()
const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString()

const ComicsData = async () => {
    const url = `https://gateway.marvel.com/v1/public/comics?limit=50&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    try {
      const response = await axios.get(url)
      return response.data.data.results
  } catch (error) {
      console.log(error)
      return null
  }
}

const CharactersData = async () => {
    const url = `https://gateway.marvel.com/v1/public/characters?limit=50&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    try {
        const response = await axios.get(url)
        return response.data.data.results
    } catch (error) {
        console.log(error)
        return null
    }
}

const SeriesData = async () => {
    const apiUrl = `https://gateway.marvel.com:443/v1/public/series?limit=50&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    try {
      const response = await axios.get(apiUrl)
      return response.data.data.results
    } catch (error) {
      console.error(error)
      return null
    }
  }
  
  const ComicsForCharacterData = async (characterId) => {
    const apiUrl = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?limit=50&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    try {
      const response = await axios.get(apiUrl)
      return response.data.data.results
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const ComicsForSeriesData = async (seriesId) => {
    const apiUrl = `https://gateway.marvel.com:443/v1/public/series/${seriesId}/comics?limit=50&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    try {
      const response = await axios.get(apiUrl)
      return response.data.data.results
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const CharactersForSeriesData = async (characterId) => {
    const apiUrl = `https://gateway.marvel.com:443/v1/public/series/${characterId}/characters?limit=50&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    try {
      const response = await axios.get(apiUrl)
      return response.data.data.results
    } catch (error) {
      console.error(error)
      return null
    }
  }
  
  const SeriesForCharacterData = async (characterId) => {
    const apiUrl = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/series?limit=50&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    try {
      const response = await axios.get(apiUrl)
      return response.data.data.results
    } catch (error) {
      console.error(error)
      return null
    }
  }
  
  const CharactersForComicData = async (comicId) => {
    const apiUrl = `https://gateway.marvel.com:443/v1/public/comics/${comicId}/characters?limit=50&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    try {
      const response = await axios.get(apiUrl)
      return response.data.data.results
    } catch (error) {
      console.error(error)
      return null
    }
  }
  
  const CreatorsForComicData = async (comicId) => {
    const apiUrl = `https://gateway.marvel.com:443/v1/public/comics/${comicId}/creators?limit=50&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`
    try {
      const response = await axios.get(apiUrl)
      return response.data.data.results
    } catch (error) {
      console.error(error)
      return null
    }
  }
  
  export {
    ComicsData,
    CharactersForComicData,
    CreatorsForComicData,
    CharactersData,
    ComicsForCharacterData,
    SeriesForCharacterData,
    SeriesData,
    ComicsForSeriesData,
    CharactersForSeriesData
  }
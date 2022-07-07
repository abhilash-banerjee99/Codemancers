import axios from 'axios'

// const REGISTER_API_URL = 'http://localhost:5000/api/users/register'
// const LOGIN_API_URL = 'http://localhost:5000/api/users/login'
const API_URL = 'http://localhost:5000/api/users'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData, {
    headers:{
      Accept: 'application/json',
      "Content-Type": "application/json" ,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "http://localhost:3000/",
      "Access-Control-Allow-Methods": "*"      
    },
    withCredentials: true
  })

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData,{
    headers:{
      Accept: 'application/json',
      "Content-Type": "application/json" 
    },
    // withCredentials: true
  })

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
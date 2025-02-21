import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const LogoutComponent = () => {
    const navigate = useNavigate()
  localStorage.removeItem("authToken")
  localStorage.removeItem("email")
  localStorage.removeItem("userRole")
    useEffect(()=>{
      navigate("/auth")
    },[])
}

export default LogoutComponent;

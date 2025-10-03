import React from 'react'
import {Link} from "react-router-dom"

export const Landing = () => {

  return (
    <div>
        <Link to='/user/register' >Register</Link>
        <Link to='/user/login' >Login</Link>
    </div>
  )
}

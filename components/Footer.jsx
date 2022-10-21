import React from 'react'
import {AiFillGithub} from 'react-icons/ai'

const Footer = () =>{
 return(
   <div className="w-full text-center mt-5 mt-auto  rounded-3xl">
      <a className="inline-block" href="https://github.com/octagony" target='_blank' rel="noreferrer">
        <AiFillGithub className="mx-auto" size={40} />
      </a>
     <p className='text-primary font-bold'>Octagony / {new Date().getFullYear()}</p>
    </div> )
}

export default Footer

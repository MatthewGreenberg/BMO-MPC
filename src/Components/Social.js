import React from 'react'
import './social.scss'
import { FiTwitter, FiLinkedin } from 'react-icons/fi'

const Social = () => {
  return (
    <div className="social">
      <a
        rel="noreferrer noopener"
        target="_blank"
        href="https://twitter.com/McGreenBeats"
      >
        <FiTwitter size={'2em'} />
      </a>
      <a
        rel="noreferrer noopener"
        target="_blank"
        href="https://www.linkedin.com/in/mattcgreenberg/"
      >
        <FiLinkedin size={'2em'} />
      </a>
    </div>
  )
}

export default Social

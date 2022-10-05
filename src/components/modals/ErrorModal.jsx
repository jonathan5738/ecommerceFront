import React from 'react'
import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
function ErrorModal({ state, variants, setCloseErrorMessage, closeErrorMessage}) {
  return (
    <motion.div variants={variants}
        initial='initial'
        animate={state.status === 'failed' && !closeErrorMessage ? 'visible': ''}
        transition={{ duration: .3 }}
        className="error-message">
    <div className="error-message-content">
        <p>{state.error}</p>
        <FiX onClick={() => setCloseErrorMessage(true)} size={20} className='close-message'/>
    </div>
    </motion.div>
  )
}

export default ErrorModal
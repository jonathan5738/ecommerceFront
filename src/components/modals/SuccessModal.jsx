import React from 'react'
import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'

function SuccessModal({ state, variants, setCloseErrorMessage, closeErrorMessage, message}) {
  return (
    <motion.div variants={variants}
                initial='initial'
                animate={state.status === 'succeed' && !closeErrorMessage ? 'visible': ''}
                transition={{ duration: .3 }}
                className='success-message'
            >
        <div className="success-message-content">
            <p>{message}</p>
            <FiX onClick={() => setCloseErrorMessage(true)} size={20} className='close-message'/>
        </div>
    </motion.div>
  )
}

export default SuccessModal
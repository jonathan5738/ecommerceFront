import React from 'react'
import '../components/css/utils/Modal.css'
function Modal({modalTitle, modalContent, closeModal, actionHandle}) {
  return (
    <div className='modal-container'>
        <div className="modal-content">
            <h4>{modalTitle}</h4>
            <p>{modalContent}</p>
            <button onClick={actionHandle}>confirm</button>
            <button onClick={() => closeModal(prev => !prev)}>return</button>
        </div>
    </div>
  )
}

export default Modal
import React, {useState} from 'react';
import ReactModal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        width: '350px',
        border: "1px solid blue",
        height: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

type ModalProps = {
    openButtonText: string,
    children: React.ReactNode,
    handleAction: (id: number, setModalIsOpen: (modalIsOpen: boolean) => void) => void,
    id: number
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('#root');

function Modal({openButtonText, children, handleAction, id}: ModalProps) {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const handleOpenModal = () => setModalIsOpen(true);

    const handleCloseModal = () => setModalIsOpen(false);
  return (
      <>
          <button onClick={handleOpenModal}>{openButtonText}</button>
          <ReactModal isOpen={modalIsOpen} onRequestClose={handleCloseModal} style={customStyles}>
              <div>{children}</div>
              <div style={{
                  display: 'flex',
                  justifyContent: 'space-between'
              }}>
                  <button onClick={handleCloseModal}>No</button>
                  <button onClick={() => handleAction(id, setModalIsOpen)}>Yes</button>
              </div>
          </ReactModal>
      </>
  )
}

export default Modal;

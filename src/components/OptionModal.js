import React from 'react';
import Modal from 'react-modal';

const OptionModal = props => (
  <Modal
    className="modal"
    isOpen={!!props.selectedOption}
    onRequestClose={props.handleClearSelectedOption}
    contentLabel="Selected Option"
    closeTimeoutMS={200}
  >
    <h3 className="modal__title">Займись уже этим</h3>
    {props.selectedOption && (
      <p className="modal__content">{props.selectedOption}</p>
    )}
    <button className="button" onClick={props.handleClearSelectedOption}>
      Ок
    </button>
  </Modal>
);

export default OptionModal;

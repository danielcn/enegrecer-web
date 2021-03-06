import React from 'react';
import PropTypes from 'prop-types';

const Modal = props => (
  <div id={props.id} className="modal">
    <div className="modal-content">
      <h4>{props.tituloModal}</h4>
      <p>{props.textoModal}</p>
    </div>

    <div className="modal-footer">
      <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">
        {props.textoBotao}
      </a>
    </div>
  </div>
);

Modal.defaultProps = {
  id: '',
  tituloModal: '',
  textoModal: '',
  textoBotao: ''
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  tituloModal: PropTypes.string.isRequired,
  textoModal: PropTypes.string.isRequired,
  textoBotao: PropTypes.string.isRequired,
};

export default Modal;

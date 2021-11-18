
import { Component } from 'react';



class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }
  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.showModal();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.showModal();
    }
  };

  render() {
    return (
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">{this.props.children}</div>
      </div>)
  }
}

export default Modal;

//
// import { createPortal } from "react-dom";
// import { Component } from "react";
//
// import PropsType from "prop-types";
//
//
// const modalRoot = document.querySelector("#modal-root");
//
// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeyDown);
//   }
//
//   handleKeyDown = (e) => {
//     if (e.code === "Escape") {
//       this.props.onClose();
//     }
//   };
//   handleBackDropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };
//
//   render() {
//     return createPortal(
//       <div className="Overlay" onClick={this.handleBackDropClick}>
//         <div className="Modal">
//           <img src={this.props.modalUrl} alt={this.props.modalTitle} />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }
//
// Modal.propsType = {
//   onClose: PropsType.func,
// };
//
// export default Modal;

import React, { Component } from 'react';
import closeImage from '../assets/svg/close-circle.svg';
import './styles.scss';

class ModalWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        title: '',
        message: '',
        image: ''
      },
      errors: {
        title: '',
        message: '',
        image: ''
      }
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value
      },
      errors: {
        ...prevState.errors,
        [name]: ''
      }
    }));
  };

  handleSubmit = () => {
    if (this.validateForm()) {
      this.props.onClose(this.state.formData);
    }
  };

  handleModalClose = () => {
    this.props.onClose();
  };

  stopPropagation = (e) => {
    e.stopPropagation();
  };

  validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      message: '',
      image: ''
    };

    if (!this.state.formData.title) {
      newErrors.title = 'Please enter title';
      isValid = false;
    }

    if (!this.state.formData.message) {
      newErrors.message = 'Please enter message';
      isValid = false;
    }

    if (!this.state.formData.image) {
      newErrors.image = 'Please enter image url';
      isValid = false;
    }

    this.setState({ errors: newErrors });
    return isValid;
  };

  render() {
    return (
      <div onClick={this.handleModalClose} className="modal__blur">
        <div onClick={this.stopPropagation} className="modal__window">
          <div className="modal__content">
            <button onClick={this.handleModalClose} className="modal__close" type="button">
              <img src={closeImage} alt="X" className="modal__close--img" />
            </button>
            <h2 className="modal__title">Create New Congratulation</h2>
            <div className="input-wrapper">
              <label className="modal__label" htmlFor="title">
                Title
              </label>
              <input
                onChange={this.handleChange}
                className="modal__input"
                type="text"
                id="title"
                name="title"
              />
              {this.state.errors.title && (
                <p className="modal__error">{this.state.errors.title}</p>
              )}
            </div>
            <div className="input-wrapper">
              <label className="modal__label" htmlFor="message">
                Message
              </label>
              <textarea
                onChange={this.handleChange}
                className="modal__textarea"
                name="message"
                id="message"
                cols="30"
                rows="5"
              ></textarea>
              {this.state.errors.message && (
                <p className="modal__error">{this.state.errors.message}</p>
              )}
            </div>
            <div className="input-wrapper">
              <label className="modal__label" htmlFor="image">
                Image URL
              </label>
              <input
                onChange={this.handleChange}
                className="modal__input"
                type="text"
                id="image"
                name="image"
              />
              {this.state.errors.image && (
                <p className="modal__error">{this.state.errors.image}</p>
              )}
            </div>
            <button onClick={this.handleSubmit} className="modal__button" type="button">
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalWindow;

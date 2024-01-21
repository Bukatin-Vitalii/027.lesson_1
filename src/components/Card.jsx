import React, { Component } from 'react';
import './styles.scss';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      editedTitle: props.title,
      editedMessage: props.message,
    };
  }

  handleEditCard = () => {
    this.setState({
      isEditing: true,
      editedTitle: this.props.title,
      editedMessage: this.props.message,
    });
  };

  handleSave = () => {
    const params = {
      title: this.state.editedTitle,
      message: this.state.editedMessage,
    };
    this.props.handleSaveChanges(params);
    this.setState({ isEditing: false });
  };

  handleCancel = () => {
    this.setState({
      editedTitle: this.props.title,
      editedMessage: this.props.message,
      isEditing: false,
    });
  };

  handleTitleChange = (e) => {
    this.setState({ editedTitle: e.target.value });
  };

  handleMessageChange = (e) => {
    this.setState({ editedMessage: e.target.value });
  };

  render() {
    const { title, message, image, handleDeleteCard } = this.props;
    const { isEditing, editedTitle, editedMessage } = this.state;

    return (
      <div className="card">
        <div className="card__content">
          {isEditing ? (
            <>
              <input
                className="card__title card__input"
                type="text"
                value={editedTitle}
                onChange={this.handleTitleChange}
              />
              <textarea
                className="card__message card__input card__textarea"
                type="text"
                value={editedMessage}
                onChange={this.handleMessageChange}
              />
            </>
          ) : (
            <>
              <h2 className="card__title">{title}</h2>
              <p className="card__message">{message}</p>
            </>
          )}
        </div>
        <img className="card__image" src={image} alt="card" />
        <div className="card__buttons">
          {isEditing ? (
            <>
              <button onClick={this.handleSave} className="card__button" type="button">
                ✅
              </button>
              <button onClick={this.handleCancel} className="card__button" type="button">
                ❎
              </button>
            </>
          ) : (
            <>
              <button onClick={this.handleEditCard} className="card__button" type="button">
                ✏️
              </button>
              <button onClick={handleDeleteCard} className="card__button" type="button">
                ❌
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Card;

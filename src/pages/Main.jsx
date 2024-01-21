import React, { Component } from 'react';
import './styles.scss';
import Card from '../components/Card';
import ModalWindow from '../components/ModalWindow';
import { congratulationCards } from '../api';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userMessage: '',
      isLoading: false,
      congratulationsArray: [],
      shownCongratulations: [],
      currentCongratulation: null,
      isModalOpen: false,
    };
  }

  handleUserMessage = (message) => {
    this.setState({ userMessage: message });
    setTimeout(() => {
      this.setState({ userMessage: '' });
    }, 2000);
  };

  fetchCongratulationCards = async () => {
    try {
      this.setState({ isLoading: true });
      const { data } = await congratulationCards.get();
      this.setState({ congratulationsArray: data });
    } catch (error) {
      this.handleUserMessage(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  generateCongratulation = () => {
    const { congratulationsArray, shownCongratulations } = this.state;
    const remainingCongratulations = congratulationsArray.filter(
      (congratulation) => !shownCongratulations.includes(congratulation.id)
    );

    const randomIndex = Math.floor(Math.random() * remainingCongratulations.length);

    if (remainingCongratulations.length > 0) {
      const randomCongratulation = remainingCongratulations[randomIndex];
      this.setState((prevState) => ({
        shownCongratulations: [...prevState.shownCongratulations, randomCongratulation.id],
        currentCongratulation: randomCongratulation,
      }));
    } else {
      this.setState({ shownCongratulations: [], currentCongratulation: congratulationsArray[randomIndex] });
    }
  };

  showModal = () => {
    this.setState({ isModalOpen: true });
  };

  handleModalClose = (formData) => {
    this.setState({ isModalOpen: false });
    if (!formData) return;
    this.addNewCongratulation(formData);
  };

  addNewCongratulation = async (formData) => {
    const { congratulationsArray } = this.state;

    const newCongratulation = {
      id: congratulationsArray.length + 1,
      ...formData,
    };

    try {
      this.setState({ isLoading: true });
      const { data } = await congratulationCards.post(newCongratulation);
      this.setState((prevState) => ({
        congratulationsArray: [...prevState.congratulationsArray, data],
        currentCongratulation: data,
      }));
      this.handleUserMessage('Congratulation! card was created');
    } catch (error) {
      this.handleUserMessage(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleDeleteCard = async (id) => {
    const { congratulationsArray } = this.state;

    try {
      this.setState({ isLoading: true });
      await congratulationCards.delete(id);
      this.setState({
        congratulationsArray: congratulationsArray.filter((congratulation) => congratulation.id !== id),
        currentCongratulation: null,
      });
      this.handleUserMessage('Congratulation! card was deleted');
    } catch (error) {
      this.handleUserMessage(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSaveChanges = async (id, params) => {
    const { congratulationsArray } = this.state;

    try {
      this.setState({ isLoading: true });
      const { data } = await congratulationCards.put(id, params);
      this.setState({
        congratulationsArray: congratulationsArray.map((congratulation) =>
          congratulation.id === id ? data : congratulation
        ),
        currentCongratulation: data,
      });
      this.handleUserMessage('Congratulation! card was updated');
    } catch (error) {
      this.handleUserMessage(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.fetchCongratulationCards();
  }

  render() {
    const { userMessage, isLoading, currentCongratulation, isModalOpen } = this.state;

    return (
      <main className="main">
        {userMessage && (
          <div className="user-message">
            <p className="user-message__text">{userMessage}</p>
          </div>
        )}
        {isLoading && (
          <div className="loader">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        <div className="main__container">
          <div className="main__buttons">
            <button onClick={this.generateCongratulation} type="button" className="main__button">
              Generate Congratulation
            </button>
            <button onClick={this.showModal} type="button" className="main__button">
              Create New Congratulation
            </button>
          </div>
          {currentCongratulation && (
            <Card
              title={currentCongratulation.title}
              message={currentCongratulation.message}
              image={currentCongratulation.image}
              handleDeleteCard={() => this.handleDeleteCard(currentCongratulation.id)}
              handleSaveChanges={(params) => this.handleSaveChanges(currentCongratulation.id, params)}
            />
          )}
          {isModalOpen && <ModalWindow onClose={this.handleModalClose} />}
        </div>
      </main>
    );
  }
}

export default Main;

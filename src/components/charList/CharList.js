import './charList.scss';
import { Component } from 'react';
import marvelService from '../../services/MarvelServise';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
  state = {
    charsData: [],
    isLoading: true,
    isError: false,
  };

  componentDidMount() {
    this.loadCharList();
  }

  loadCharList = () => {
    marvelService.getAllCharacters().then(this.onCharsLoad).catch(this.onError);
  };

  onCharsLoad = (chars) => {
    this.setState({
      charsData: chars,
      isLoading: false,
    });
  };

  onError = () => {
    this.setState({
      isLoading: false,
      isError: true,
    });
  };

  render() {
    const { charsData, isLoading, isError } = this.state;
    const spinner = isLoading ? <Spinner /> : null;
    const errorMessage = isError ? <ErrorMessage /> : null;
    const charsList =
      isError || isLoading
        ? null
        : charsData.map((char) => <CharCard char={char} key={char.name} />);
    console.log(charsList);
    return (
      <div className="char__list">
        {spinner}
        {errorMessage}
        <ul className="char__grid">{charsList}</ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const CharCard = ({ char: { name, thumbnail } }) => {
  return (
    <li className="char__item">
      <img src={thumbnail} alt={name} />
      <div className="char__name">{name}</div>
    </li>
  );
};

export default CharList;

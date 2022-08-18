import './charList.scss';
import { Component } from 'react';
import marvelService from '../../services/MarvelServise';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
  state = {
    charsList: [],
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
      charsList: chars,
      isLoading: false,
    });
  };

  onError = () => {
    this.setState({
      isLoading: false,
      isError: true,
    });
  };

  renderItems(arr) {
    const items = arr.map(({ name, thumbnail, id }) => {
      const imgStyle = thumbnail.includes('image_not_available') ? { objectFit: 'unset' } : null;

      return (
        <li
          className="char__item"
          key={id}
          onClick={() => {
            this.props.onCharSelected(id);
          }}>
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { charsList, isLoading, isError } = this.state;
    const spinner = isLoading ? <Spinner /> : null;
    const errorMessage = isError ? <ErrorMessage /> : null;
    const items = this.renderItems(charsList);
    const content = isError || isLoading ? null : items;
    return (
      <div className="char__list">
        {spinner}
        {errorMessage}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;

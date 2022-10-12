import './charList.scss';
import { Component } from 'react';
import marvelService from '../../services/MarvelServise';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
  state = {
    charsList: [],
    listLoading: true,
    isError: false,
    newItemsLoading: false,
    offset: 210,
  };

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListloading();
    marvelService.getAllCharacters(offset).then(this.onCharsLoad).catch(this.onError);
  };

  onCharListloading = () => {
    this.setState({
      newItemsLoading: true,
    });
  };

  onCharsLoad = (newCharList) => {
    this.setState(({ charsList, offset }) => ({
      charsList: [...charsList, ...newCharList],
      listLoading: false,
      newItemsLoading: false,
      offset: offset + 9,
    }))
  };

  onError = () => {
    this.setState({
      listLoading: false,
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
    const { charsList, listLoading, isError, offset, newItemsLoading } = this.state;
    const spinner = listLoading ? <Spinner /> : null;
    const errorMessage = isError ? <ErrorMessage /> : null;
    const items = this.renderItems(charsList);
    const content = isError || listLoading ? null : items;
    return (
      <div className="char__list">
        {spinner}
        {errorMessage}
        {content}
        <button 
          className="button button__main button__long"
          disabled={newItemsLoading}
          onClick={() => this.onRequest(offset)}>
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;

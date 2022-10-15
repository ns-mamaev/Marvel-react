import './charList.scss';
import { Component } from 'react';
import PropTypes from 'prop-types';
import marvelService from '../../services/MarvelServise';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
  state = {
    charsList: [],
    listLoading: true,
    isError: false,
    newItemsLoading: false,
    offset: 1550,
    listEnded: false,
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
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    this.setState(({ charsList, offset }) => ({
      charsList: [...charsList, ...newCharList],
      listLoading: false,
      newItemsLoading: false,
      offset: offset + 9,
      listEnded: ended,
    }))
  };

  onError = () => {
    this.setState({
      listLoading: false,
      isError: true,
    });
  };

  itemsRefs = [];

  setRef = (ref) => {
    this.itemsRefs.push(ref)
  };

  focusOnItem = (id) => {
    this.itemsRefs.forEach((item) => item.classList.remove('char__item_selected'));
    this.itemsRefs[id].classList.add('char__item_selected');
    this.itemsRefs[id].focus();
  };

  renderItems(arr) {
    const items = arr.map(({ name, thumbnail, id }, i) => {
      const imgStyle = thumbnail.includes('image_not_available') ? { objectFit: 'unset' } : null;

      return (
        <li
          className="char__item"
          tabIndex={0}
          key={id}
          ref={this.setRef}
          onClick={() => {
            this.props.onCharSelected(id);
            this.focusOnItem(i);
          }}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              this.props.onCharSelected(id);
              this.focusOnItem(i);
            }
          }}>
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { 
      charsList, 
      listLoading, 
      isError, 
      offset, 
      newItemsLoading, 
      listEnded, 
    } = this.state;
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
          onClick={() => this.onRequest(offset)}
          style={{ 'display': listEnded ? 'none' : 'block' }}>
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};

export default CharList;

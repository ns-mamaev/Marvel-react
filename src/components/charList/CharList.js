import './charList.scss';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelServise';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = ({ onCharSelected }) => {
  const [charsList, setCharsList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [listEnded, setListEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => onRequest(offset, true), []);

  const onRequest = (offset, initial) => {
    setNewItemsLoading(!initial); 
    getAllCharacters(offset)
      .then(onCharsLoad);
  };

  const onCharsLoad = (newCharList) => {
    if (newCharList.length < 9) {
      setListEnded(true);
    }
    setCharsList(charsList => ([...charsList, ...newCharList ]));
    setNewItemsLoading(false);
    setOffset(offset => offset + 9);
  };

  const itemsRefs = useRef([]);

  const focusOnItem = (id) => {
    itemsRefs.current.forEach((item) => item.classList.remove('char__item_selected'));
    itemsRefs.current[id].classList.add('char__item_selected');
    itemsRefs.current[id].focus();
  };

  const renderItems = (arr) => {
    const items = arr.map(({ name, thumbnail, id }, i) => {
      const imgStyle = thumbnail.includes('image_not_available') ? { objectFit: 'unset' } : null;

      return (
        <li
          className="char__item"
          tabIndex={0}
          key={id}
          ref={el => itemsRefs.current[i] = el}
          onClick={() => {
            onCharSelected(id);
            focusOnItem(i);
          }}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              onCharSelected(id);
              focusOnItem(i);
            }
          }}>
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  const spinner = loading && !newItemsLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const items = renderItems(charsList);
  return (
    <div className="char__list">
      {spinner}
      {errorMessage}
      {items}
      <button 
        className="button button__main button__long"
        disabled={newItemsLoading}
        onClick={() => onRequest(offset)}
        style={{ 'display': listEnded ? 'none' : 'block' }}>
        <div className="inner">load more</div>
      </button>
    </div>
  );
  
}

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};

export default CharList;

import './charList.scss';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import marvelService from '../../services/MarvelServise';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = ({ onCharSelected }) => {
  const [charsList, setCharsList] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(1550);
  const [listEnded, setListEnded] = useState(false);

  useEffect(() => onRequest(), []);

  const onRequest = (offset) => {
    onCharListloading();
    marvelService.getAllCharacters(offset).then(onCharsLoad).catch(onError);
  };

  const onCharListloading = () => {
    setNewItemsLoading(false);
  };
  const onCharsLoad = (newCharList) => {
    if (newCharList.length < 9) {
      setListEnded(true);
    }
    setCharsList(charsList => ([...charsList, ...newCharList ]));
    setListLoading(false);
    setNewItemsLoading(false);
    setOffset(offset => offset + 9);
  };

  const onError = () => {
    setListLoading(false);
    setIsError(true);
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

  const spinner = listLoading ? <Spinner /> : null;
  const errorMessage = isError ? <ErrorMessage /> : null;
  const items = renderItems(charsList);
  const content = isError || listLoading ? null : items;
  return (
    <div className="char__list">
      {spinner}
      {errorMessage}
      {content}
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

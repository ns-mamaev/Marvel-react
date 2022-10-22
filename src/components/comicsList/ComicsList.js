import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './comicsList.scss';
import useMarvelService from '../../services/MarvelServise';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(200);
  const [listEnded, setListEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => onRequest(offset, true), []);

  const onRequest = (offset, initial) => {
    setNewItemsLoading(!initial); 
    getAllComics(offset)
      .then(onComicsLoad);
  };

  const onComicsLoad = (newComicsList) => {
    if (newComicsList.length < 8) {
      setListEnded(true);
    }
    setComicsList(list => ([...list, ...newComicsList ]));
    setNewItemsLoading(false);
    setOffset(offset => offset + 8);
  };

  const renderItems = (arr) => {
    const items = arr.map(({ title, price, thumbnail, id }) => {
      const imgStyle = thumbnail.includes('image_not_available') ? { objectFit: 'unset' } : null;
      return (
        <li className="comics__item" key={id}>
          <Link to={`./${id}`}>
            <img 
              src={thumbnail}
              alt={title}
              style={imgStyle}
              className="comics__item-img"
            />
            <div className="comics__item-name">{title}</div>
            <div className="comics__item-price">{price}</div>
          </Link>
        </li>
      )
    });
    
    return <ul className="comics__grid">{items}</ul>;
  }

  const spinner = loading && !newItemsLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const items = renderItems(comicsList);

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            {items}
            <button
              className="button button__main button__long"
              disabled={loading}
              onClick={() => onRequest(offset)}
              style={{ 'display': listEnded ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
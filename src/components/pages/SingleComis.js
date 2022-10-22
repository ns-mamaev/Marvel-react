import { useParams, Link } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelServise';
import './singleComicPage.scss';
import { useEffect, useState } from 'react';

const SingleComic = () => {
    const { comicsId } = useParams(); 
    const [comic, setComic] = useState(null);
    const { loading, error, getComics, clearError } = useMarvelService();
    
    useEffect(() => {
        updateComic(comicsId);
    }, [comicsId]);
    
    const updateComic = () => {
    if (!comicsId) {
        return;
    }
    if (error) {
        clearError();
    }
    getComics(comicsId)
        .then(onComicLoaded)
    };

    const onComicLoaded = (comic) => {
        setComic(comic);
    };
    
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = (!loading || !error) && comic ? <View comic={comic} /> : null; 

    return (
        <div className="single-comic">
            {spinner}
            {errorMessage}
            {content}
        </div>    
    )   
}

const View = ({ comic }) => {
    const { title, description, pageCount, price, thumbnail } = comic;
    
    return (
        <>
            <img alt={title} className="single-comic__img" src={thumbnail}/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='./..' className="single-comic__back">Back to all</Link>
        </>
    )
};

export default SingleComic;
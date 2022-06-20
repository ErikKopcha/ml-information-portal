
import './singleComicPage.scss';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import Error from '../../errorMessage/Error';

const SingleComicPage = () => { 
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);

  const { loading, error, getComic, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
    clearError();

    getComic(comicId).then(onComicLoaded);
  };

  const onComicLoaded = comic => {
    setComic(comic);
  };

  const isError = error ? <Error /> : null;
  const isSpinner = loading ? <Spinner /> : null;
  const isRender = !(loading || error || !comic) ? (
    <View comic={comic} />
  ) : null;

  return isError || isSpinner || isRender;
}

const View = ({ comic }) => {
  const { title, description, pageCount, thumbnail, language, price } = comic;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt="x-men" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount} p.</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>

      <Link to={'/comics'} className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
}

export default SingleComicPage;
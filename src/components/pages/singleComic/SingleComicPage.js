import { Helmet } from 'react-helmet';

import './singleComicPage.scss';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../../services/MarvelService';
import AppBanner from '../../appBanner/AppBanner';
import { processTypes } from '../../../types/types';
import { setContent } from '../../../utils/setContent';

const SingleComicPage = () => { 
  const { id } = useParams();
  const [comic, setComic] = useState(null);

  const { process, setProcess, getComic, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [id]);

  const updateComic = () => {
    clearError();

    getComic(id).then(onComicLoaded).then(() => setProcess(processTypes.confirmed));
  };

  const onComicLoaded = comic => {
    setComic(comic);
  };

  return setContent({
    process,
    data: comic,
    ViewComponent: View,
  });
}

const View = ({ data }) => {
  const { title, description, pageCount, thumbnail, languages, price } = data;

  return (
    <>
      <Helmet>
        <meta name="description" content={`${title} comic book`} />
        <title>{title}</title>
      </Helmet>

      <AppBanner />

      <div className="single-comic">
        <img src={thumbnail} alt="x-men" className="single-comic__img" />
        <div className="single-comic__info">
          <h2 className="single-comic__name">{title}</h2>
          <p className="single-comic__descr">{description}</p>
          <p className="single-comic__descr">
            Pages: <b>{pageCount}</b>
          </p>
          <p className="single-comic__descr">
            Language: <b>{languages || '-'}</b>
          </p>
          <div className="single-comic__price">
            {price ? `${price}$` : 'NOT AVAILABLE'}
          </div>
        </div>

        <Link to={'/comics'} className="single-comic__back">
          Back to all
        </Link>
      </div>
    </>
  );
}

export default SingleComicPage;
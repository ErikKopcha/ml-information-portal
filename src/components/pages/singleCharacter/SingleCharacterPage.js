import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './singleCharacterPage.scss';
import useMarvelService from '../../../services/MarvelService';
import AppBanner from '../../appBanner/AppBanner';
import { processTypes } from '../../../types/types';
import { setContent } from '../../../utils/setContent';

const SingleCharacterPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const { process, setProcess, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [id]);

  const updateComic = () => {
    clearError();

    getCharacter(id).then(onCharacterLoaded).then(() => setProcess(processTypes.confirmed));
  };

  const onCharacterLoaded = data => {
    setData(data);
  };

  return setContent({
    data,
    process,
    ViewComponent: View,
  });
};

const View = ({ data }) => {
  const { name, fullDescription, thumbnail } = data;

  return (
    <>
      <Helmet>
        <meta name="description" content={`${name} character book`} />
        <title>{name}</title>
      </Helmet>

      <AppBanner />

      <div className="single-character">
        <img
          src={thumbnail}
          alt={name}
          className="single-character__char-img"
        />
        <div className="single-character__info">
          <h2 className="single-character__name">{name}</h2>
          <p className="single-character__descr">{fullDescription}</p>
        </div>

        <Link to={'/'} className="single-character__back">
          Back to all
        </Link>
      </div>
    </>
  );
};

export default SingleCharacterPage;

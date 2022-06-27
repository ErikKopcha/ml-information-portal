import './singleCharacterPage.scss';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import Error from '../../errorMessage/Error';
import AppBanner from '../../appBanner/AppBanner';

const SingleCharacterPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [id]);

  const updateComic = () => {
    clearError();

    getCharacter(id).then(onCharacterLoaded);
  };

  const onCharacterLoaded = data => {
    setData(data);
  };

  const isError = error ? <Error /> : null;
  const isSpinner = loading ? <Spinner /> : null;
  const isRender = !(loading || error || !data) ? <View data={data} /> : null;

  return isError || isSpinner || isRender;
};

const View = ({ data }) => {
    const { name, fullDescription, thumbnail } = data;

  return (
    <>
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

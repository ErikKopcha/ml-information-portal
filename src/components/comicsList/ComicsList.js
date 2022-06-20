import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import Error from '../errorMessage/Error';
import useMarvelService from '../../services/MarvelService';
import './comicsList.scss';

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);
  const [newItemsLoading, setnewItemsLoading] = useState(false);
  
  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    loadComics(offset, true);
  }, []);

  const loadComics = (offset, initial) => {
    setnewItemsLoading(!initial);
    getAllComics(offset).then(onComicsLoaded).catch();
  };

  const onComicsLoaded = newComics => {
    let ended = false;

    if (newComics.length < 8) {
      ended = true;
    }

    setComicsList([...comicsList, ...newComics]);
    setOffset(offset => offset + newComics.length);
    setComicsEnded(ended);
    setnewItemsLoading(false);
  };
  
  const randomNum = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const getComicsList = (array) => {
    return (
      <ul className="comics__grid">
        {array.map(comics => (
          <ComicsItem
            key={randomNum(comics.id, (comics.id + randomNum(1, 1000)))}
            data={comics}
          />
        ))}
      </ul>
    );
  }
  
  const isError = error && <Error />;
  const isSpinner = loading && !newItemsLoading && <Spinner />;
  const list = getComicsList(comicsList);
  const isDisabledBtn = newItemsLoading || loading;

  return (
    <div className="comics__list">
      {isError || isSpinner}
      {list}

      {!comicsEnded && (
        <button
          disabled={isDisabledBtn}
          onClick={() => loadComics(offset)}
          className={`${
            isDisabledBtn ? 'opacity' : ''
          } button button__main button__long`}
        >
          <p className="inner">{isDisabledBtn ? `loading...` : `load more`}</p>
        </button>
      )}
    </div>
  );
};

const ComicsItem = (props = {}) => {
  const { title, price, thumbnail, id } = props.data;

  return (
    <li className="comics__item">
      <Link to={`/comics/${id}`}>
        <img src={thumbnail} alt="x-men" className="comics__item-img" />
        <div className="comics__item-name">{title}</div>
        <div className="comics__item-price">
          {price ? `${price}$` : `NOT AVAILABLE`}
        </div>
      </Link>
    </li>
  );
};

export default ComicsList;

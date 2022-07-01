import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import './comicsList.scss';
import { processTypes } from '../../types/types';
import { setContent } from '../../utils/setContent';

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);
  const [newItemsLoading, setnewItemsLoading] = useState(false);
  
  const { process, setProcess, getAllComics } = useMarvelService();

  useEffect(() => {
    loadComics(offset, true);
  }, []);

  const loadComics = (offset, initial) => {
    setnewItemsLoading(!initial);
    getAllComics(offset).then(onComicsLoaded).then(() => setProcess(processTypes.confirmed))
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

  const getComicsList = ({ data }) => {
    return (
      <ul className="comics__grid">
        <TransitionGroup component={null}>
          {data.map(comics => (
            <ComicsItem
              key={randomNum(comics.id, (comics.id + randomNum(1, 1000)))}
              data={comics}
            />
          ))}
        </TransitionGroup>
      </ul>
    );
  }
  
  const isDisabledBtn = newItemsLoading || process === processTypes.loading;

  const setData = {
    process,
    data: comicsList,
    ViewComponent: getComicsList,
    uniqueLoadingBehavior: () => {
      return newItemsLoading ? getComicsList(comicsList) : <Spinner />;
    }
  };

  return (
    <div className="comics__list">
      { setContent(setData) }

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
    <CSSTransition key={id} timeout={500} classNames="char__item">
      <li className="comics__item">
        <Link to={`/comics/${id}`}>
          <img src={thumbnail} alt="x-men" className="comics__item-img" />
          <div className="comics__item-name">{title}</div>
          <div className="comics__item-price">
            {price ? `${price}$` : `NOT AVAILABLE`}
          </div>
        </Link>
      </li>
    </CSSTransition>
  );
};

export default ComicsList;

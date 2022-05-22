import { useEffect, useState } from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import Error from '../errorMessage/Error';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

const CharList = ({ onCharSelected, selectedCharId }) => {
  const marvelService = new MarvelService();
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = offset => {
    onCharListLoading();

    marvelService.getAllCharacters(offset).then(onCharLoaded).catch(onError);
  };

  const onCharLoaded = newChars => {
    let ended = false;

    if (newChars.length < 9) {
      ended = true;
    }

    setChars(chars => [...chars, ...newChars]);
    setLoading(false);
    setError(false);
    setNewItemsLoading(false);
    setOffset(offset => offset + newChars.length);
    setCharEnded(ended);
  };

  const onCharListLoading = () => {
    setNewItemsLoading(true);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
    setNewItemsLoading(false);
  };

  const isLoading = loading ? <Spinner /> : null;
  const isError = error ? <Error /> : null;
  const isRender =
    !loading && !error ? (
      <CharItems
        chars={chars}
        onCharSelected={id => { onCharSelected(id) }}
        selectedCharId={selectedCharId}
      />
    ) : null;

  return (
    <div className={`char__list ${newItemsLoading ? 'opacity' : ''}`}>
      {isLoading || isError || isRender}
      <button
        onClick={() => {
          onRequest(offset);
        }}
        className="button button__main button__long"
        style={{ display: charEnded ? 'none' : 'block' }}
      >
        <div className="inner">
          {loading || newItemsLoading ? `loading...` : `load more`}
        </div>
      </button>
    </div>
  );
};

const CharItems = ({ chars, onCharSelected, selectedCharId }) => {
  const charItems = chars.map(el => {
    const { thumbnail, name, id } = el;
    const isSelected = selectedCharId === id ? 'char__item_selected' : '';

    let imgStyle = { objectFit: 'cover' };

    if (
      thumbnail ===
      'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ) {
      imgStyle = { objectFit: 'contain' };
    }

    return (
      <li
        onClick={() => {
          onCharSelected(id);
        }}
        className={`char__item ${isSelected}`}
        key={id}
      >
        <img style={imgStyle} src={thumbnail} alt={name} />
        <div className="char__name">{name}</div>
      </li>
    );
  });

  return <ul className="char__grid">{charItems}</ul>;
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;

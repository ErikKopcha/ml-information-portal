import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './charList.scss';
import Error from '../errorMessage/Error';
import useMarvelService from '../../services/MarvelService';

const CharList = ({ onCharSelected, selectedCharId }) => {
  const [chars, setChars] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  // fix useEffect (react 18), state vrs is not working
  let isPending = false;

  useEffect(() => {
    if (!isPending) {
      onRequest();
    }
  }, []);

  const onRequest = offset => {
    isPending = true;
    setNewItemsLoading(true);
    getAllCharacters(offset).then(onCharLoaded).catch(onError);
  };

  const onCharLoaded = newChars => {
    isPending = false;
    let ended = false;

    if (newChars.length < 9) {
      ended = true;
    }

    setChars(chars => [...chars, ...newChars]);
    setNewItemsLoading(false);
    setOffset(offset => offset + newChars.length);
    setCharEnded(ended);
  };

  const onError = () => {
    setNewItemsLoading(false);
  };

  const isError = error ? <Error /> : null;
  const isRender = !error ? (
    <CharItems
      chars={chars}
      onCharSelected={id => {
        onCharSelected(id);
      }}
      selectedCharId={selectedCharId}
    />
  ) : null;

  return (
    <div className="char__list">
      {isError || isRender}
      <button
        onClick={() => {
          onRequest(offset);
        }}
        className={`${
          newItemsLoading ? 'opacity' : ''
        } button button__main button__long`}
        style={{ display: charEnded ? 'none' : 'block' }}
      >
        <p className="inner">
          {loading || newItemsLoading ? `loading...` : `load more`}
        </p>
      </button>
    </div>
  );
};

const CharItems = ({ chars, onCharSelected, selectedCharId }) => {
  const charItems = chars.map((el, i) => {
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
      <CSSTransition key={id} timeout={500} classNames="char__item">
        <li
          onClick={() => {
            onCharSelected(id);
          }}
          onKeyPress={e => {
            if (e.key === ' ' || e.key === 'Enter') {
              onCharSelected(id);
            }
          }}
          className={`char__item ${isSelected}`}
        >
          <img style={imgStyle} src={thumbnail} alt={name} />
          <div className="char__name">{name}</div>
        </li>
      </CSSTransition>
    );
  });

  return (
    <ul className="char__grid">
      <TransitionGroup component={null}>
        {charItems}
      </TransitionGroup>
    </ul>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;

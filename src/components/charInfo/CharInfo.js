import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import { processTypes } from '../../types/types';
import "./charInfo.scss";
import { setContent } from '../../utils/setContent';

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState();
  const [wait, setWait] = useState();

  const {
    process,
    setProcess,
    getCharacter,
    clearError
  } = useMarvelService();

  useEffect(() => {
    updateChar()
  }, [charId]);


  const updateChar = () => {
    clearError();
    setWait(true);

    if (!charId) { return; }

    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => { setProcess(processTypes.confirmed) })
  }

  const onCharLoaded = char => {
    setChar(char);
    setWait(false);
  };

  return (
    <div className={`char__info ${wait ? 'opacity' : ''}`}>
      { setContent({ process, data: char, ViewComponent: View }) }
    </div>
  );
}

const View = ({ data }) => {
  const { thumbnail, name, homepage, wiki, description, comics } = data;

  let imgStyle = { objectFit: 'cover' };

  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = { objectFit: 'contain' };
  }

  const comicsList = comics.map((el, i) => {
    return (
      <li className="char__comics-item" key={i}>{el.name}</li>
    )
  });

  return (
    <>
      <div className="char__basics">
        <img style={imgStyle} src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comicsList.length ? comicsList : <span className="red-text">There is no comics with this character</span>}
      </ul>
    </>
  )
};

CharInfo.propTypes = {
  charId: PropTypes.number
};

export default CharInfo;

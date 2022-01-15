import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../errorMessage/Error';
import Skeleton from '../skeleton/Skeleton';
import "./charInfo.scss";

class CharInfo extends Component {
  marvelService = new MarvelService();

  state = {
    char: null,
    loading: false,
    error: false,
    wait: false,
  };

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    this.setState({ wait: true });
    const { charId } = this.props;

    if (!charId) { return; }

    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  onCharLoading = () => {
    this.setState({ loading: true, error: false, wait: false });
  }

  onCharLoaded = char => {
    this.setState({ char, loading: false, error: false, wait: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true, wait: false });
  };

  render() {
    const { char, loading, error, wait } = this.state;

    const isSkeleton = !(char || loading || error) ? <Skeleton /> : null;
    const isError = error ? <Error /> : null;
    const isSpinner = loading ? <Spinner /> : null;
    const isRender = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className={`char__info ${wait ? 'opacity' : ''}`}>
        {isSkeleton || isError || isSpinner || isRender}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { thumbnail, name, homepage, wiki, description, comics } = char;

  let imgStyle = { objectFit: 'cover' };

  if (
    thumbnail ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
  ) {
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

export default CharInfo;

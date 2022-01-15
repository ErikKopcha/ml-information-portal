import { Component } from 'react';
import './randomChar.scss';
import MarvelService from '../../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import Error from '../errorMessage/Error';

class RandomChar extends Component {
  marvelService = new MarvelService();

  state = {
    char: {
      name: null,
      description: null,
      thumbnail: null,
      homepage: null,
      wiki: null,
    },
    loading: true,
    error: false,
    wait: false,
  };

  componentDidMount() {
    this.updateChar();
  }

  onCharLoaded = char => {
    this.setState({ char, loading: false, error: false, wait: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true, wait: false });
  };

  updateChar = () => {
    this.setState({ wait: true });
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const { char, loading, error, wait } = this.state;

    const isLoading = loading || wait ? <Spinner /> : null;
    const isError = error ? <Error /> : null;
    const isRender = (!error && !loading && !wait) ? <View char={char} /> : null;

    return (
      <div className={`randomchar ${loading || wait ? `opacity` : ''}`}>
        {isLoading || isError || isRender}

        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button onClick={this.updateChar} className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = char => {
  const {
    char: { name, description, thumbnail, homepage, wiki },
  } = char;

  let imgStyle = { objectFit: 'cover' };

  if (
    thumbnail ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
  ) {
    imgStyle = { objectFit: 'contain' };
  }

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        style={imgStyle}
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a target="_blank" href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a target="_blank" href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;

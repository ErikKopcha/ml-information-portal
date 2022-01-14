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
    const isSpinner = loading || wait ? <Spinner /> : null;
    const isRender = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {isSkeleton || isError || isSpinner || isRender}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { thumbnail, name, homepage, wiki, description } = char;

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />
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
        <li className="char__comics-item">
          All-Winners Squad: Band of Heroes (2011) #3
        </li>
        <li className="char__comics-item">Alpha Flight (1983) #50</li>
        <li className="char__comics-item">Amazing Spider-Man (1999) #503</li>
        <li className="char__comics-item">Amazing Spider-Man (1999) #504</li>
        <li className="char__comics-item">
          AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
        </li>
        <li className="char__comics-item">
          Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
        </li>
        <li className="char__comics-item">
          Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
        </li>
        <li className="char__comics-item">Vengeance (2011) #4</li>
        <li className="char__comics-item">Avengers (1963) #1</li>
        <li className="char__comics-item">Avengers (1996) #1</li>
      </ul>
    </>
  )
};

export default CharInfo;

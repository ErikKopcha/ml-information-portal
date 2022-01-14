import { Component } from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import Error from '../errorMessage/Error';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
  marvelService = new MarvelService();

  state = {
    chars: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  onCharLoaded = chars => {
    this.setState({ chars, loading: false, error: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  render() {
    const { chars, loading, error } = this.state;

    return (
      <div className="char__list">
        {loading ? (
          <Spinner />
        ) : error ? (
          <Error />
        ) : (
          <CharItems chars={chars} onCharSelected={this.props.onCharSelected} />
        )}

        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const CharItems = ({ chars, onCharSelected}) => {
  const charItems = chars.map((el) => {
    const { thumbnail, name, id } = el;

    let imgStyle = { objectFit: 'cover' };

    if (
      thumbnail ===
      'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ) {
      imgStyle = { objectFit: 'contain' };
    }

    return (
      <li onClick={() => { onCharSelected(id) }} className="char__item" key={id}>
        <img style={imgStyle} src={thumbnail} alt={name} />
        <div className="char__name">{name}</div>
      </li>
    );
  });

  return <ul className="char__grid">{charItems}</ul>;
};

export default CharList;

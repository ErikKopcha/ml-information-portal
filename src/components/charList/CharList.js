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
    newItemsLoading: false,
    error: false,
    offset: 210,
    charEnded: false
  };

  componentDidMount() {
    this.onRequest();
  }

  onCharLoaded = newChars => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }

    this.setState(({ offset, chars }) => ({
      chars: [...chars, ...newChars],
      loading: false,
      error: false,
      newItemsLoading: false,
      offset: (offset + newChars.length),
      charEnded: ended
    }));
  };

  onCharListLoading = () => {
    this.setState({ newItemsLoading: true })
  }

  onError = () => {
    this.setState({ loading: false, error: true, newItemsLoading: false });
  };

  onRequest = (offset) => {
    this.onCharListLoading();

    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  render() {
    const { chars, loading, error, newItemsLoading, charEnded } = this.state;

    const isLoading = loading ? <Spinner /> : null;
    const isError = error ? <Error /> : null;
    const isRender = (!loading && !error) ? <CharItems chars={chars} onCharSelected={this.props.onCharSelected} selectedCharId={this.props.selectedCharId} /> : null;

    return (
      <div className={`char__list ${newItemsLoading ? 'opacity' : ''}`}>
        {isLoading || isError || isRender}
        <button
          onClick={() => { this.onRequest(this.state.offset) }}
          className="button button__main button__long"
          style={{ display: charEnded ? 'none' : 'block' }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const CharItems = ({ chars, onCharSelected, selectedCharId }) => {
  const charItems = chars.map((el) => {
    const { thumbnail, name, id } = el;
    const isSelected = selectedCharId === id ? 'char__item_selected' : '';

    let imgStyle = { objectFit: 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
      imgStyle = { objectFit: 'contain' };
    }

    return (
      <li onClick={() => { onCharSelected(id) }} className={`char__item ${isSelected}`} key={id}>
        <img style={imgStyle} src={thumbnail} alt={name} />
        <div className="char__name">{name}</div>
      </li>
    );
  });

  return <ul className="char__grid">{charItems}</ul>;
};

export default CharList;

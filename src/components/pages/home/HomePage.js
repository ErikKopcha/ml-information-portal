import RandomChar from '../../randomChar/RandomChar';
import CharList from '../../charList/CharList';
import CharInfo from '../../charInfo/CharInfo';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
import decoration from '../../../resources/img/vision.png';

const HomePage = ({ onCharSelected, selectedChar }) => {
  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList
            onCharSelected={onCharSelected}
            selectedCharId={selectedChar}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo charId={selectedChar} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default HomePage;

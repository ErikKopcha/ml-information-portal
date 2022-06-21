import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404/404'));
const HomePage = lazy(() => import('../pages/home/HomePage'));
const ComicsPage = lazy(() => import('../pages/comics/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/singleComic/SingleComicPage'));

const App = () => {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <Router>
      <div className="app">
        <AppHeader />

        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    selectedChar={selectedChar}
                    onCharSelected={id => onCharSelected(id)}
                  />
                }
              />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<SingleComicPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import { HomePage, ComicsPage } from '../pages';

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
            <Route path="/comics" element={ <ComicsPage /> } />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

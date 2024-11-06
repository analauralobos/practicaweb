import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CountryList from './components/CountryList';
import ProvinceList from './components/ProvinceList';
import LocalityList from './components/LocalityList';

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <main>
          {!selectedCountry ? (
            <CountryList onSelectCountry={setSelectedCountry} />
          ) : !selectedProvince ? (
            <ProvinceList country={selectedCountry} onSelectProvince={setSelectedProvince} />
          ) : (
            <LocalityList province={selectedProvince} />
          )}
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

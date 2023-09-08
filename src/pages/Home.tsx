import React, { useContext } from 'react';
import { MyContext } from '../App';
import Navigation from './Navigation';
import Posts from './Posts';

const Home = () => {
    const id = useContext(MyContext);
  return (
    <div>
        <Navigation />
        <Posts />
    </div>
  );
};

export default Home;

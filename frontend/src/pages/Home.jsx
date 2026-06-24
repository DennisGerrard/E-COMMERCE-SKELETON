import React from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';

const Home = () => (
  <>
    <Hero />
    <OurPolicy />
    <LatestCollection />
    <BestSeller />
    <NewsletterBox />
  </>
);

export default Home;

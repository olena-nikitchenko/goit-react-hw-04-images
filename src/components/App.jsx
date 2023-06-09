import React, { useState, useEffect, useRef } from 'react';
import Notiflix from 'notiflix';
import { ImageApi } from '../services/ImageApi';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import './App.css';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);

  const abortController = useRef(new AbortController());

  useEffect(() => {
    const fetchData = async () => {
      abortController.current.abort();
      abortController.current = new AbortController();
      try {
        setStatus('pending');
        const { totalHits, hits } = await ImageApi(inputData, page, {
          signal: abortController.current.signal,
        });

        if (hits.length < 1) {
          setStatus('idle');
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        const newHits = hits.map(({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        }));
        setItems(prevItems => [...prevItems, ...newHits]);
        setTotalHits(totalHits);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
      }
    };
    if (inputData.trim() !== '') {
      fetchData();
    }
    return () => {
      abortController.current.abort();
    };
  }, [inputData, page]);

  const handleSubmit = inputData => {
    setItems([]);
    setInputData(inputData);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      {status === 'resolved' ? (
        <>
          <ImageGallery items={items} />
          {totalHits > items.length && (
            <Button onClick={handleNextPage}>Load more</Button>
          )}
        </>
      ) : (
        status === 'pending' && <Loader />
      )}
      {status === 'rejected' && (
        <p>Something went wrong, please try again later</p>
      )}
    </div>
  );
};

export default App;

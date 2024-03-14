import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import SingleCard from './SingleCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SearchedCard from './SearchedCard';

const Search = () => {
  const [searchedYT, setSearchedYT] = useState();
  const { searchID } = useParams();
  const [id, setId] = useState('');

  const getSearch = async () => {
    const url = `https://youtube-v31.p.rapidapi.com/search?q=${id}&part=snippet%2Cid&regionCode=US&maxResults=50&order=date`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'bb9a624fdfmsh7719d6070ff5a1fp100f86jsnc30c55e8e5da',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };

    try {

      const response = await fetch(url, options);
      const result = await response.json();

      console.log(result);
      setSearchedYT(result?.items)

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => { setId(searchID) }, [searchID])
  useEffect(() => {
    getSearch()
  }, [id])




  return (
    <Container sx={{ marginTop: "50px" }}>
      <Grid container spacing={4} >
        {
          searchedYT?.map((element, index) => {
            console.log(element);
            return (
              <Grid item lg={4} sm={12}>
                <SearchedCard videoData={element}></SearchedCard>
              </Grid>
            )
          })
        }
      </Grid>
    </Container>
  )
}

export default Search
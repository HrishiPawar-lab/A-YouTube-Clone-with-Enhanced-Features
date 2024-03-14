import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import ReactPlayer from 'react-player/youtube'
import { Container, Paper } from '@mui/material';
import SuggestedVideos from './SuggestedVideos';
import Comments from './Comments';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});



const Videos = () => {
    const id = useParams()
    const [videoId, setVideoId] = useState('');
    useEffect(() => {
        setVideoId(id?.videoId)
    }, [id])


    const getVideos = async () => {
        const url = `https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'cd9f0496fdmshd0bf036b5b5ac09p139410jsnbca7645212b8',
                'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            // result?.items?.length && setVideoId(result?.items[0]?.id)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getVideos()
    }, [videoId]);

    const url = `https://www.youtube.com/watch?v=${videoId}`

    return (
        <ThemeProvider theme={darkTheme}>
            <Container maxWidth='xl'>
                <Grid container spacing={4} py={5}>
                    <Grid item lg={9}>
                        <ReactPlayer pip={true} controls height={'70vh'} width={'100%'} url={url}></ReactPlayer>
                        <Paper style={{ marginTop: "50px", padding: "20px", color: 'white' }} >
                            <Typography variant='h5' mb={3} color={'white'}>Comments</Typography>
                            <hr style={{ opacity: .3 }} />
                            <Comments></Comments>
                        </Paper>
                    </Grid>
                    <Grid item lg={3}>
                        <SuggestedVideos setVideoId={setVideoId} id={videoId}></SuggestedVideos>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default Videos
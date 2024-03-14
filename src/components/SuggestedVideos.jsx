import React, { useState, useEffect } from 'react';
import SingleCard from './SingleCard';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
const SuggestedVideos = ({ id, setVideoId }) => {
    const [suggestedVideos, setSuggestedVideos] = useState([])
    const getSuggestedVideos = async () => {
        const url = `https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=${id}&part=id%2Csnippet&type=video&maxResults=50`;
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
            setSuggestedVideos(result?.items)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSuggestedVideos()
    }, [id])



    return (
        <div>
            <Typography variant='body1' color='#f3f3f3' mb={2}>Suggested Videos</Typography>
            {
                suggestedVideos?.map((element, index) => {
                    return (
                        <>
                            <Grid direction={'column'} sx={{ gap: "10px" }} container spacing={3}>
                                <Grid item my={1}>
                                    <SingleCard setVideoId={setVideoId} videoDetail={element}></SingleCard>
                                </Grid>
                            </Grid>
                        </>
                    )
                })
            }
        </div>
    )
}

export default SuggestedVideos
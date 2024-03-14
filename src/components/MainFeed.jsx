import React from 'react';
import Grid from "@mui/material/Grid";
import SingleCard from './SingleCard';

const MainFeed = ({ videos , loading }) => {
    console.log(videos.items)
    return (
        <>
            {
                videos?.items?.map((element, index) => {
                    return (
                        <Grid key={index} item lg={4} md={6} sx={{ color: 'white' }} sm={12}>
                            <SingleCard loading={loading} videoDetail={element} />
                        </Grid>
                    )
                })
            }
        </>
    )
}

export default MainFeed

import React, { useState, useRef } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReactPlayer from 'react-player';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const SearchedCard = ({ videoData }) => {



    return (
        <Link to={`/video/${videoData?.id?.videoId}`}>
            <ThemeProvider theme={darkTheme}>
                <Card
                    sx={{ height: '100%' }}
                >
                    {(
                        <CardMedia
                            component="img"
                            alt={videoData?.snippet?.title}
                            height={180}
                            image={videoData?.snippet?.thumbnails?.medium?.url}
                        />
                    )
                    }
                    <CardContent>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <Typography variant="h6" gutterBottom>
                                {videoData?.snippet?.channelTitle}
                            </Typography>
                            <CheckCircleIcon />
                        </div>
                        <Typography variant="body2" color="textSecondary">
                            {videoData?.snippet?.title}
                        </Typography>
                    </CardContent>
                </Card>
            </ThemeProvider>
        </Link>
    );
};

export default SearchedCard;

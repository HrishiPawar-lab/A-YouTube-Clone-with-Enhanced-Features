import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReactPlayer from 'react-player/youtube';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const SingleCard = ({ videoDetail, loading, setVideoId }) => { // Removed default value for setVideoId

    const [hovered, setHovered] = useState(false);
    const [playing, setPlaying] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
        setPlaying(true);
    }

    const handleMouseLeave = () => {
        setHovered(false);
        setPlaying(false);
    }

    const url = `https://www.youtube.com/watch?v=${videoDetail?.id?.videoId}`; // Declare url as a constant

    return (
        <Link to={`/video/${videoDetail?.id?.videoId}`}>
            <ThemeProvider theme={darkTheme}>
                <Card sx={{ height: "100%" }} onClick={() => {
                    setVideoId(videoDetail?.id);
                }}>
                    {hovered ? (
                        <ReactPlayer
                            controls
                            onMouseLeave={handleMouseLeave}
                            onMouseEnter={handleMouseEnter}
                            fallback={'...'}
                            playing={playing}
                            muted={true}
                            height={200}
                            width={'100%'}
                            url={url}
                        />
                    ) : (
                        <CardMedia
                            onMouseOver={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className={`card_image ${loading ? 'loading' : ''}`}
                            sx={{ height: 200 }}
                            image={videoDetail?.snippet?.thumbnails?.high?.url}
                            title="green iguana"
                        />
                    )}
                    <CardContent sx={{ p: 1 }}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: "center" }}>
                            <Typography className={`card_title ${loading ? 'loading' : ''}`} gutterBottom variant="h6" component="div">
                                {videoDetail?.snippet?.channelTitle}
                            </Typography>
                            <CheckCircleIcon fontSize='12' />
                        </div>
                        <Typography variant="body2" className={`card_description ${loading ? 'loading' : ''}`} color="text.secondary">
                            {videoDetail?.snippet?.title}
                        </Typography>
                    </CardContent>
                </Card>
            </ThemeProvider>
        </Link>
    );
}

export default SingleCard;

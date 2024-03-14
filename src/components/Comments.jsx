import React, { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [commentsExist, setCommentsExist] = useState(false);
    const [videoId, setVideoId] = useState('');
    const [loadedComments, setLoadedComments] = useState(0);
    const loaderRef = useRef(null);

    const id = useParams();

    useEffect(() => {
        setVideoId(id?.videoId);
    }, [id]);

    useEffect(() => {
        getInitialComments();
    }, [videoId]);

    const getInitialComments = async () => {
        const url = `https://youtube-v31.p.rapidapi.com/commentThreads?part=snippet&videoId=${videoId}&maxResults=100`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'cd9f0496fdmshd0bf036b5b5ac09p139410jsnbca7645212b8',
                'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
            },
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (result?.items) {
                setComments(result?.items);
                setLoadedComments(10);
                setCommentsExist(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getMoreComments = () => {
        setLoadedComments((prevLoadedComments) => prevLoadedComments + 10);
    };

    const handleObserver = (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            // When the loader becomes visible, load more comments
            getMoreComments();
        }
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(handleObserver, options);

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [loaderRef, handleObserver]);

    return (
        <div style={{ color: 'white' }}>
            {comments.slice(0, loadedComments).map((element, index) => (
                <div style={{ display: 'flex' }} key={index}>
                    <div className="profile-image">
                        <img src={element?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} alt="" />
                    </div>
                    <Typography my={1} variant="subtitle1">
                        {parse(element?.snippet?.topLevelComment?.snippet?.textDisplay)}
                    </Typography>
                </div>
            ))}
            {loadedComments < comments.length && (
                <div ref={loaderRef} style={{ height: '20px', background: 'transparent' }}>
                    {/* Loader indicator */}
                </div>
            )}
        </div>
    );
};

export default Comments;

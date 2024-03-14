import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Sidebar from './Sidebar';
import axios from 'axios'
import MainFeed from './MainFeed';
const Feed = () => {
    const [category, setCategory] = useState("New")
    const [video, setVideo] = useState([])
    const [loading, setLoading] = useState(false)


    const fetchFromEndPoints = async (category) => {
        setLoading(true)
        const url = `https://youtube-v3-lite.p.rapidapi.com/search?q=${category}&part=id%2Csnippet`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'cd9f0496fdmshd0bf036b5b5ac09p139410jsnbca7645212b8',
                'X-RapidAPI-Host': 'youtube-v3-lite.p.rapidapi.com'
            }
        };
        try {

            const response = await fetch(url, options);
            const result = await response.json();
            setVideo(result)
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFromEndPoints(category)
    }, [category])


    return (
        <div
        >
            <Grid container spacing="4" sx={{ height: "100%" }}>
                <Grid lg={2} sx={{ p: 2, borderRight: "1px solid #fff3", height: "100vh", overflowY: 'auto', display: 'flex', justifyContent: "center", position: 'sticky', top: "10px" }} item>
                    <Sidebar category={category} setCategory={setCategory} />
                </Grid>
                <Grid lg={10} item>
                    <Grid px={3} py={5} container spacing={2}>
                        <MainFeed loading={loading} videos={video}></MainFeed>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Feed

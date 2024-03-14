import React from 'react'
import { logo } from '../utils/Constants';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        if (e.target.value.trim().length > 5) {
            navigate(`/search/${e.target.value}`)
        }

    }



    return (


        <div style={{ backgroundColor: "#000", position: "relative", zIndex: "99", borderBottom: "1px solid #fff3", padding: "10px 0" }}>
            <Container>
                <Stack sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Link to='/'>
                        <div className='navbar-brand' style={{ width: "30px", display: 'flex', gap: "10px", color: "white", alignItems: "center" }}>
                            <img src={logo} alt="" style={{ width: '100%' }} />
                            <h3>Youtube</h3>
                        </div>
                    </Link>
                    <Paper sx={{ overflow: 'hidden', borderRadius: "30px", backgroundColor: "#191919", padding: "7px 20px" }}>
                        <div>
                            <input onChange={handleInputChange} style={{ outline: "none", border: "none", backgroundColor: "#191919", color: "#fff" }} type="text" name="" placeholder='Search a video' />
                        </div>
                    </Paper>
                </Stack>
            </Container>
        </div>
    )
}

export default Navbar

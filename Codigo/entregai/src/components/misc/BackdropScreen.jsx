'use client'

const { Backdrop, CircularProgress } = require("@mui/material")

const BackdropScreen = () => {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default BackdropScreen
import { Backdrop, CircularProgress, Theme } from "@mui/material"

const CustomBackdrop = () => {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default CustomBackdrop
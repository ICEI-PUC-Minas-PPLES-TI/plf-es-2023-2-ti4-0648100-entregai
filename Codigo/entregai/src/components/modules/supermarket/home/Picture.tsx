import { Box, Fade } from "@mui/material"
import styles from './Picture.module.scss'

const Picture = ({ imageUrl }: { imageUrl: string }) => {

    return (
        <Fade in timeout={500}>
            <Box>
                <div className={styles.imageWrapper}>
                    {imageUrl === '' ? null : (
                        <div className={styles.imageContainer}>
                            <div className={styles.blurLayer}></div>
                            <img
                                src={imageUrl}
                                alt=""
                                className={styles.image}
                            />
                            <img
                                src={imageUrl}
                                alt=""
                                className={`${styles.image} ${styles.blurredImage}`}
                            />
                        </div>
                    )}
                </div>
            </Box>
        </Fade>
    );
}

export default Picture
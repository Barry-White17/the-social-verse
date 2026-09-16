import Typography from '@mui/material/Typography'
import './Home.css'
import imageTwo from './../assets/imageTwo.jpg'

// keyFrame is an animation object in which you specify what a certain object looks like at a certain point in time

// Some animation event listener

export default function Home() {
    return (
        <div className='root'>
            <div className='textAnime'>
                <Typography sx={{ fontSize: '40px', fontWeight: 600 }}>
                    Welcome to
                </Typography>
                <Typography sx={{ fontSize: '40px', fontWeight: 800 }}>
                    The Social Verse
                </Typography>
            </div>
            <img src={imageTwo} alt='Img' className='img__specs' />
        </div>
    )
}
@keyframes slide-in {
    from {
        translate: 150vh 0;
        scale: 200% 1;
    }
    to {
        translate: 0 0;
        scale: 100% 1;
    }
}
.textAnime {
    animation-duration: 3s;
    display: inline-block;
    animation-iteration-count: infinite;
    animation-name: slide-in;
    animation-direction: alternate;
}
@keyframes grow-shrink {
    25%,
    50% {
        scale: 200%;
        color: aqua;
    }
    ,
    75% {
        scale: 100%;
    }
}
.slide-in {
    animation-duration: 3s;
    animation-name: slide-in;
    animation-iteration-count: 3;
}
@keyframes fade-in {
    0% {
        opacity: 0;
        display: none;
    }
    100% {
        opacity: 1;
        display: block;
    }
}

@keyframes fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
.root {
    display: flex;
    align-items: center;
    overflow: auto;
    justify-content: center;
}
.img__specs {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 50%;
    bottom: 1vh;
}
.text {
    font-size: 16px;
    font-weight: 800;
}
.textAnime {
    display: flex;
    top: 90%;
    position: absolute;
}

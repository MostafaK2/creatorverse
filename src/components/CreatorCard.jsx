import {Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import ModeIcon from '@mui/icons-material/Mode';
import InfoIcon from '@mui/icons-material/Info';
import { YouTube } from "@mui/icons-material";

// Function to check if a URL is valid
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
};

const defaultImage = 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'

function CreatorCard({id, name, handle, description, imageUrl}){
    const handleOnClick = ()=>{
        // go to youtube handle

        const youtubeUrl = `https://www.youtube.com/${handle}`;
        window.open(youtubeUrl, '_blank');
        
    }

  
    

    return (

        <Card className="bg-orange-200 shadow-2xl rounded-2xl" 
        sx={{
            backgroundColor: 'rgb(254 215 170)'
        }}>           
            <CardMedia
                component="img" 
                image={isValidUrl(imageUrl) ? imageUrl : defaultImage}
                alt="image of a creator"
                sx = {{
                    height:'20vh'
                }}
            >
            </CardMedia>
            
            <CardContent>
                <div className="flex flex-row justify-between">
                    <Typography gutterBottom variant="h5">
                        {name}
                    </Typography>
                    <div>
                        <Link to={`/edit/${id}`}>
                            <Button size="small"><ModeIcon/></Button>
                        </Link>
                        <Link to={`/${id}`}>
                            <Button size="small"><InfoIcon/></Button>
                        </Link>
                    </div>
                </div>
                <Typography variant="body2" color="text.secondary">
                    {description.length > 75 ? `${description.substring(0, 75)} ....` : description}
                    {description.length > 75 && (
                        <Link to={`/${id}`}>
                            <Button>
                                (See more)
                            </Button>
                        </Link>
                    )}
                </Typography>
            </CardContent>
            <Button color="error" id = 'youtube-handle-button' onClick={handleOnClick}>
                <YouTube />
            </Button>
            
            
        </Card>
    )
}
    

export default CreatorCard;
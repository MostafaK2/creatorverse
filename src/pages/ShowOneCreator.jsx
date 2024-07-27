import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { supabase } from "../client";

import LoadingCircular from "../components/LoadingCircular";
import ErrorMessage from "../components/ErrorMessage";
import { Button, Link } from '@mui/material';
import { YouTube } from '@mui/icons-material';

const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
};

const defaultImage = 'https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'

function ShowOneCreator(){
    const { creatorId } = useParams();

    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOneCreator = async () => {
            try {
              console.log("creatorsid", creatorId);
              const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', creatorId)
                .single();
      
              if (error) throw error;
              console.log(data);
              setCreator(data);
            } catch (err) {
              console.error('Error fetching content creator:', err);
              setError(err.message);
            } finally {
              setLoading(false);
             
            }
          };

        fetchOneCreator();
    }, [creatorId])
    
    if (loading) return <LoadingCircular/>;
    if (error) return <ErrorMessage error={error}/>;
    return (
        <div className = "text-white flex flex-col gap-5 bg-black mt-10 px-5 py-5 shadow-2xl p-10 rounded-2xl">
            <h1>{creator.name}</h1>
            <p>{creator.description}</p>
            <a href={`https://www.youtube.com/${creator.handle}`} target="_blank" rel="noopener noreferrer">
                <Button variant="contained" color="error">
                    <div className='flex gap-2 justify-center items-center text-center'>
                        <p>Youtube Link</p>
                        <YouTube/> 
                    </div>
                </Button>
            </a>
            <img src={isValidUrl(creator.imageUrl) ? creator.imageUrl : defaultImage}/>
        </div>);
}

export default ShowOneCreator;
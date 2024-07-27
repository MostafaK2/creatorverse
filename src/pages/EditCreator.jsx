import { useParams } from 'react-router-dom';

import { FormGroup, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../client";
import { useNavigate } from 'react-router-dom';

import LoadingCircular from '../components/LoadingCircular';
import ErrorMessage from "../components/ErrorMessage";


function EditCreator(){
    const { creatorId } = useParams();

    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [handle, setHandle] = useState("");
    const [description, setDescription] = useState("");

    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function handleFormSubmit(e){
        e.preventDefault();

        const {data, error} = await supabase.from('creators').update(
            {name, imageUrl, handle, description}
        ).eq('id', creatorId)

        if (error) {
            console.error('Error adding content creator:', error);
          } else {
            console.log('Content creator added:', data);
            navigate('/');
        }   
    }

    async function handleDelete(e){
        e.preventDefault()

        const { data, error } = await supabase
            .from('creators') // Replace with your table name
            .delete()
            .eq('id', creatorId);

        if (error) {
            console.error('Error deleting record:', error);
            return;
        }

        console.log('Record deleted:', data);
        navigate('/');
    }


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
              console.log(data)
              setName(data.name);
              setDescription(data.description);
              setImageUrl(data.imageUrl)
              setHandle(data.handle);
            } catch (err) {
              console.error('Error fetching content creator:', err);
              setError(err.message);
            } finally {
              setLoading(false);
             
            }
          };

        fetchOneCreator()
    }, [creatorId])

    if (loading) return <LoadingCircular/>;
    if (error) return <ErrorMessage error={error}/>;
    return (
        <div className="pt-10 text-center flex flex-col gap-10 justify-center">
        <Typography 
            className="bg-orange-200 shadow-2xl py-10 px-10 rounded-2xl text-3d" 
            variant="h4"
            sx={{
                fontFamily: "unset",
                fontWeight: 700,
                color: "brown",
                
            }}
        >
            Edit Creator Details
        </Typography>

        <form 
            className="flex flex-col gap-10"
            onSubmit={handleFormSubmit}
        >
            <FormGroup className="bg-orange-200 shadow-2xl rounded-2xl flex flex-col gap-2 py-10 px-10">
                <Typography
                     
                    variant="h5" 
                    className="text-left text-3d" 
                    sx={{
                        fontFamily: "unset",
                        fontWeight: 700,
                        color: "brown"
                    }}
                >
                        Name
                </Typography>
                <TextField
                    placeholder="Creators Name" 
                    variant="filled"
                    onChange = {(e) => setName(e.target.value)}
                    value={name}  
                />
            </FormGroup>

            <FormGroup className="bg-orange-200 shadow-2xl rounded-2xl flex flex-col gap-2 py-10 px-10">
                <Typography 
                    variant="h5" 
                    className="text-left text-3d" 
                    sx={{
                        fontFamily: "unset",
                        fontWeight: 700,
                        color: "brown"
                    }}>
                        Image Url
                </Typography>
                <Typography variant="subtitle" className="text-left italic" >Provide a link to an image of your creator. Be sure to include https//</Typography>
                <TextField 
                    placeholder="Image Url" 
                    variant="filled" 
                    onChange = {(e) => setImageUrl(e.target.value)}
                    value={imageUrl}
                    
                />
            </FormGroup>

            <FormGroup className="bg-orange-200 shadow-2xl rounded-2xl flex flex-col gap-2 py-10 px-10">
                <Typography 
                    variant="h5" 
                    className="text-left text-3d" 
                    sx={{
                        fontFamily: "unset",
                        fontWeight: 700,
                        color: "brown"
                    }}>
                        Description
                </Typography>
                <TextField 
                    placeholder="Description" 
                    variant="filled"
                    onChange = {(e) => setDescription(e.target.value)}
                    multiline
                    minRows={3}
                    maxRows={4}
                    value={description}
                    
                />
            </FormGroup>

            <FormGroup className="bg-orange-200 shadow-2xl rounded-2xl flex flex-col gap-2 py-10 px-10">
                <Typography 
                        variant="h5" 
                        className="text-left text-3d" 
                        sx={{
                            fontFamily: "unset",
                            fontWeight: 700,
                            color: "brown"
                        }}
                >
                    Youtube Handle
                </Typography>
                <Typography variant="subtitle" className="text-left italic">Provide the youtube handle of the creator. Be sure to include the @</Typography>
                <TextField 
                    placeholder="Youtube Url" 
                    variant="filled" 
                    onChange = {(e) => setHandle(e.target.value)}
                    value={handle}
                    
                />
            </FormGroup>
            <div className='flex gap-11'>
                <Button className="px-10 w-1/2 h-14" variant="contained" type='submit'>Save</Button>
                <Button color="error" className="px-10 w-1/2" variant="contained" onClick={handleDelete}>Delete</Button>
            </div>
        </form>
    </div>
    
    );
}

export default EditCreator;
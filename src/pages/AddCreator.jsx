import { FormGroup, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { supabase } from "../client";
import { useNavigate } from 'react-router-dom';

function AddCreator(){
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [handle, setHandle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    async function handleFormSubmit(e){
        e.preventDefault();

        const {data, error} = await supabase.from('creators').insert(
            [{name, imageUrl, handle, description}]
        )

        if (error) {
            console.error('Error adding content creator:', error);
          } else {
            console.log('Content creator added:', data);
            navigate('/');
          }   
    }

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
            Adding Creator Details
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
                <TextField placeholder="Image Url" variant="filled" onChange = {(e) => setImageUrl(e.target.value)}/>
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
                />
            </FormGroup>
            
            <Button className="px-10" variant="contained" type='submit'>Submit</Button>
        </form>
    </div>
    );
}

export default AddCreator;



import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";

import ErrorMessage from "../components/ErrorMessage";
import LoadingCircular from "../components/LoadingCircular";

function ViewCreator(){

    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCreators = async () => {
          try {
            const { data, error } = await supabase
              .from('creators')
              .select('*');
    
            if (error) throw error;
    
            setCreators(data);
          } catch (err) {
            console.error('Error fetching content creators:', err);
            setError(err.message);
          } finally {
            setLoading(false);
           
          }
        };
    
        fetchCreators(); // Call the fetch function
        console.log(creators)  
      }, []);

    if (loading) return <LoadingCircular/>;
    if (error) return <ErrorMessage error={error}/>;

    return (
      <div className="items-center pt-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {creators.length === 0 ? (
          <Typography variant="h6">No content creators found.</Typography>
        ) : (
          creators.map((c) => <CreatorCard id={c.id} name={c.name} handle={c.handle} imageUrl={c.imageUrl} description={c.description}/>)
        )}
      </div>
    </div>
    );
}

export default ViewCreator;
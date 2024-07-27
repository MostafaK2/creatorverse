import { Button, Typography  } from "@mui/material";

function Header(){
    return (
        <div className="bg-orange-200 shadow-2xl p-10 rounded-2xl flex flex-col gap-[3vh] items-center justify-center">
            <Typography
                align = 'center' 
                variant = 'h2' 
                noWrap={false}
                sx={{
                    fontFamily: "unset",
                    fontWeight: 700,
                    color: "brown"
                }}
                >Creator Verse</Typography>
            <div className="flex flex-row gap-2">
                <Button onClick={()=>window.location.href = '/'}  variant="contained">Show Creators</Button>
                <Button href ='/addcreator' variant="contained">Add Creator</Button>
            </div>
        
        </div>  
    );  
}

export default Header;


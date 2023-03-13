import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { getAllCars } from "../api/car-request";
import { LinkImage } from "../components/LinkImage";
import { NavBar } from "../components/NavBar";


export function HomePage(){

    const router = useNavigate();
    
    const {isLoading, isError, data = []} = useQuery("carcache", getAllCars);

    if(isLoading){
        return <p>LOADING</p>
    }

    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }

    const myStyle = {
        bar:{
            width:"100%",
            display:"flex",
            backgroundColor:"slategrey",
            justifyContent:"space-between",
            alignItems:"center"
        },
        container:{
            display:"flex",
            backgroundColor:"slategray",
            justifyContent:"space-between"
        }
    };

    return <>
        <NavBar left={[{text:"Cars",callback:()=>{}}]} right={[{text:"New Car",callback:()=>{router("/car")}}]} />
        <div style={{...myStyle.container, flexWrap: 'wrap', paddingLeft:"10px", paddingRight:"10px"}}>
            {data.map(c=><LinkImage url={c.imgUrl} alt={c.make+" "+c.model} link={"/cars/"+c.id} foot={`${c.year} ${c.make} ${c.model}`}/>)}
        </div>
    </>
}
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCar, getCar } from "../api/car-request";
import { NavBar } from "../components/NavBar";


export function DisplayCarPage(){

    const queryClient = useQueryClient();
    const {carid} = useParams();
    const Id = Number(carid);
    const router = useNavigate();
    
    const {isLoading, isError, data} = useQuery(["singlecarcache",Id], ()=>getCar(Id));
    const deleteCarMutation = useMutation(deleteCar, {
        onSuccess: () => {queryClient.invalidateQueries("carcache");router("/")} 
    });

    if(isLoading){
        return <p>LOADING</p>
    }

    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }

    function removeCar(){
        if(data)
        deleteCarMutation.mutate(data.id)
    }

    if(deleteCarMutation.isLoading){
        return <p>DELETING CAR</p>
    }

    function routeHome(){
        router("/");
    }

    function routeUpdate(){
        router("/car/"+data?.id);
    }

    return <>
        <NavBar left={[{text:"Cars",callback:routeHome}]} right={[{text:"Update Car",callback:routeUpdate},{text:"Delete Car",callback:removeCar}]} />
        
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div style={{margin:"25px"}}>
                <img src={data?.imgUrl} alt={`${data?.year} ${data?.make} ${data?.model}`} style={{borderRadius:"25px"}}/>
            </div>
            <div>
                <h2>{`Year: ${data?.year}`}</h2>
                <h2>{`Manufacturer: ${data?.make}`}</h2>
                <h2>{`Model: ${data?.model}`}</h2>
                <h2>{`Color: ${data?.color}`}</h2>
                <h2>{`Engine Displacement: ${data?.displacement}`}</h2>
                <h2>{`Engine Horepower: ${data?.hp}`}</h2>
            </div>
        </div>
    </>
}
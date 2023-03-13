import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Car, getCar, jsonCarFormDef, updateCar } from "../api/car-request";
import { Form } from "../components/Form";
import { NavBar } from "../components/NavBar";


export function UpdateCarPage(){

    const queryClient = useQueryClient();
    const {carid} = useParams();
    const Id = Number(carid);
    const router = useNavigate();
    
    const {isLoading, isError, data} = useQuery(["singlecarcache",Id], ()=>getCar(Id));
    const updateCarMutation = useMutation(updateCar, {
        onSuccess: () => {queryClient.invalidateQueries("carcache");queryClient.invalidateQueries("singlecarcache"); router("/")} 
    });

    if(isLoading){
        return <p>LOADING</p>
    }

    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }

    function update(car:Car){
        updateCarMutation.mutate(car);
       
        console.log(car)
    }

    const updateDef = JSON.parse(jsonCarFormDef);
    updateDef.updateCar = updateDef.newCar;
    delete updateDef.newCar;

    return(
        <>
        <NavBar left={[{text:"Home",callback:()=>{router("/")}}]} right={[]} />
        <Form def={JSON.stringify(updateDef)} initState={JSON.stringify(data)} handler={update} buttonText="Update Car"/>
        </>
    )
}
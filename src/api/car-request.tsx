
export const jsonCarDef: string = `
{
    "id": 0,
    "make": "",
    "model": "",
    "color": "",
    "imgUrl": "",
    "year": 0,
    "displacement": 0,
    "hp": 0
}
`
export const jsonCarFormInitState: string = `
{
    "make": "",
    "model": "",
    "color": "",
    "imgUrl": "",
    "year": 0,
    "displacement": 0,
    "hp": 0
}
`
export const jsonCarFormDef: string = `
{
    "newCar":{
    "make": "Dodge",
    "model": "Charger R/T",
    "color": "Burnt Red",
    "imgUrl": "",
    "year": 1969,
    "displacement": 440,
    "hp": 375
    }
}
`

// Generated by https://quicktype.io

export type CarForm = {
    make:         string;
    model:        string;
    color:        string;
    imgUrl:       string;
    year:         number;
    displacement: number;
    hp:           number;
}

// Generated by https://quicktype.io

export type Car = {
    id:           number;
    make:         string;
    model:        string;
    color:        string;
    imgUrl:       string;
    year:         number;
    displacement: number;
    hp:           number;
}


export async function getAllCars():Promise<Car[]>{
    const httpResponse = await fetch("http://127.0.0.1:8080/cars");
    const cars: Car[] = await httpResponse.json();
    return cars;
}

export async function createNewCar(newCar:CarForm):Promise<Car>{
    const httpResponse = await fetch("http://127.0.0.1:8080/cars",{
        method:"POST",
        body:JSON.stringify(newCar),
        headers:{"Content-Type":"application/json"}
    });
    const car: Car = await httpResponse.json();
    return car;
}

export async function getCar(id:number):Promise<Car>{
    const httpResponse = await fetch("http://127.0.0.1:8080/cars/"+id);
    const car: Car = await httpResponse.json();
    return car;
}

export async function deleteCar(id:number):Promise<boolean>{
    const httpResponse = await fetch("http://127.0.0.1:8080/cars/"+id,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    });
    const deleted: boolean = await httpResponse.json();
    return deleted;
}

export async function updateCar(updatedCar:Car):Promise<Car>{
    const httpResponse = await fetch("http://127.0.0.1:8080/cars",{
        method:"PUT",
        body:JSON.stringify(updatedCar),
        headers:{"Content-Type":"application/json"}
    });
    const car: Car = await httpResponse.json();
    return car;
}
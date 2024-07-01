import { _retrieveData } from "../../../localStorage";

export function candidateCurrentElection (){
    return new Promise(async(resolve,reject)=>{
        const jwt_token=await _retrieveData("jwt_token");
        try{
            const response=await fetch("http://192.168.0.143:4000/candidate/currenelection",{
                method:'GET',
                headers:{'Authorization':`Bearer ${jwt_token}`}
            })

            const data=await response.json();
            resolve({data});
        }catch(error){
            reject({error})
        }
    })
}
export function showCandidateRegisterElection (){
    return new Promise(async(resolve,reject)=>{
        const jwt_token=await _retrieveData("jwt_token");
        try{
            const response=await fetch("http://192.168.0.143:4000/candidate/showregisterelection",{
                method:'GET',
                headers:{'Authorization':`Bearer ${jwt_token}`}
            })

            const data=await response.json();
            resolve({data});
        }catch(error){
            reject({error})
        }
    })
}
export function RegisterElection (ElectionData){
    return new Promise(async(resolve,reject)=>{
        const jwt_token=await _retrieveData("jwt_token");
        try{
            const response=await fetch("http://192.168.0.143:4000/candidate/register",{
                method:'POST',
                body:JSON.stringify(ElectionData),
                headers:{'Authorization':`Bearer ${jwt_token}`,'content-type':'application/json'},

            })

            const data=await response.json();
            resolve({data});
        }catch(error){
            reject({error})
        }
    })
}
export function removeName (_id){
    return new Promise(async(resolve,reject)=>{
        const jwt_token=await _retrieveData("jwt_token");
        try{
            const response=await fetch("http://192.168.0.143:4000/candidate/remove",{
                method:'PUT',
                body:JSON.stringify(_id),
                headers:{'Authorization':`Bearer ${jwt_token}`,'content-type':'application/json'},

            })

            const data=await response.json();
            resolve({data});
        }catch(error){
            reject({error})
        }
    })
}
export function showLiveResult (){
    return new Promise(async(resolve,reject)=>{
        const jwt_token=await _retrieveData("jwt_token");
        try{
            const response=await fetch("http://192.168.0.143:4000/candidate/liveresult",{
                method:'GET',
                headers:{'Authorization':`Bearer ${jwt_token}`}
            })

            const data=await response.json();
            resolve({data});
        }catch(error){
            reject({error})
        }
    })
}
export function showWinElection (){
    return new Promise(async(resolve,reject)=>{
        const jwt_token=await _retrieveData("jwt_token");
        try{
            const response=await fetch("http://192.168.0.143:4000/candidate/winelection",{
                method:'GET',
                headers:{'Authorization':`Bearer ${jwt_token}`}
            })

            const data=await response.json();
            resolve({data});
        }catch(error){
            reject({error})
        }
    })
}
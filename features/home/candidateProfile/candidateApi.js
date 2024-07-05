import { _retrieveData } from "../../../localStorage";
import env from "../../../env.js"

export function candidateCurrentElection (){
    return new Promise(async(resolve,reject)=>{
        const jwt_token=await _retrieveData("jwt_token");
        try{
            const response=await fetch(`${env.BASE_URL}/candidate/currenelection`,{
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
            const response=await fetch(`${env.BASE_URL}/candidate/showregisterelection`,{
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
            const response=await fetch(`${env.BASE_URL}/candidate/register`,{
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
            const response=await fetch(`${env.BASE_URL}/candidate/remove`,{
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
            const response=await fetch(`${env.BASE_URL}/candidate/liveresult`,{
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
            const response=await fetch(`${env.BASE_URL}/candidate/winelection`,{
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

import { _retrieveData } from "../../localStorage";
import env from "../../env.js"

export function upcomeingElection (voterData){
    return new Promise(async(resolve,reject)=>{
        const jwt_token=await _retrieveData("jwt_token");
        try{
            const response=await fetch(`${env.BASE_URL}/voter/upcomingelection`,{
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
export function showVoterRegisterElection (voterData){
    return new Promise(async(resolve,reject)=>{
        const jwt_token=await _retrieveData("jwt_token");
        try{
            const response=await fetch(`${env.BASE_URL}/voter/registervote`,{
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
export function showUnAttemptedVoter (){
    return new Promise(async(resolve,reject)=>{
        const jwt_token=await _retrieveData("jwt_token");
        try{
            const response=await fetch(`${env.BASE_URL}/voter/unattemptedvote`,{
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
export function showTodayElaction (){
    return new Promise(async(resolve,reject)=>{
        // console.log("eter sdfldjfldsjfljsdlfjsdjlf sldflkds  ")
        const jwt_token=await _retrieveData("jwt_token");
        try{
            const response=await fetch(`${env.BASE_URL}/voter/todayvote`,{
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
            const response=await fetch(`${env.BASE_URL}/voter/register`,{
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
export function removeName (ElectionData){
    return new Promise(async(resolve,reject)=>{
        const jwt_token=await _retrieveData("jwt_token");
        try{
            const response=await fetch(`${env.BASE_URL}/voter/remove`,{
                method:'PUT',
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
export function SubmitVote (votingInfo){
    return new Promise(async(resolve,reject)=>{
        const jwt_token=await _retrieveData("jwt_token");
        try{
            const response=await fetch(`${env.BASE_URL}/voter/vote`,{
                method:'POST',
                headers:{'Authorization':`Bearer ${jwt_token}`,'content-type':'application/json'},
                body:JSON.stringify(votingInfo),
            })

            const data=await response.json();
            resolve({data});
        }catch(error){
            console.log("error from submitvote")
            reject({error})
        }
    })
}


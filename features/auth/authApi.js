import AsyncStorage from "@react-native-async-storage/async-storage";
import { _retrieveData } from "../../localStorage";

export function signInVoter (voterData){
    return new Promise(async(resolve,reject)=>{
        try{
            const response=await fetch("http://192.168.0.143:4000/voter/signin",{
                method:'POST',
                body:JSON.stringify(voterData),
                headers:{'content-type':'application/json'}
            })
            const data=await response.json();
            const {jwt_token}=data;
            if(jwt_token) {
                await AsyncStorage.setItem("jwt_token",jwt_token)
            }
            resolve({data});
        }catch(error){
            reject({error})
        }
    })
}
export function signUpVoter (voterData){
    return new Promise(async(resolve,reject)=>{
        try{
            const response=await fetch("http://192.168.0.143:4000/voter/signup",{
                method:'POST',
                body:JSON.stringify(voterData),
                headers:{'content-type':'application/json'}
            })
            const data=await response.json();
            // console.log(data)
            resolve({data});
        }catch(error){
            reject({error})
        }
    })
}
export function signInCandidate (candidateData){
    return new Promise(async(resolve,reject)=>{
        try{
            const response=await fetch("http://192.168.0.143:4000/candidate/signin",{
                method:'POST',
                body:JSON.stringify(candidateData),
                headers:{'content-type':'application/json'}
            })
            const data=await response.json();
            const {jwt_token}=data;
            if(jwt_token) {
                await AsyncStorage.setItem("jwt_token",jwt_token)
            }
            resolve({data});
        }catch(error){
            reject({error})
        }
    })
}
export function signUpCandidate (candidateData){
    return new Promise(async(resolve,reject)=>{
        try{
            const response=await fetch("http://192.168.0.143:4000/candidate/signup",{
                method:'POST',
                body:JSON.stringify(candidateData),
                headers:{'content-type':'application/json'}
            })
            const data=await response.json();
            // console.log(data)
            resolve({data});
        }catch(error){
            reject({error})
        }
    })
}
export function voterdetais (){
    return new Promise(async(resolve,reject)=>{
        try{
            const jwt_token=await _retrieveData("jwt_token");
            const response=await fetch("http://192.168.0.143:4000/voter/voterdetais",{
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
export function candidatedetais (){
    return new Promise(async(resolve,reject)=>{
        try{
            const jwt_token=await _retrieveData("jwt_token");
            const response=await fetch("http://192.168.0.143:4000/candidate/candidatedetais",{
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

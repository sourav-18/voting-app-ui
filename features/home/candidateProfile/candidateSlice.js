import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit"
import { RegisterElection, candidateCurrentElection, removeName, showCandidateRegisterElection, showLiveResult, showWinElection } from "./candidateApi";
const initialState={
    status:"idel",
    currentElectionData:[],
    candidateRegisterElection:[],
    error:null,
    targetElectionCandidate:null,
    message:null,
    liveResult:null,
    winElection:null,
}
export const currentElectionAsync=createAsyncThunk('candidate/currentElection',
    async(candidateData,{rejectWithValue})=>{
        try{
            const response=await candidateCurrentElection(candidateData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const candidateShowRegisterElectionAsync=createAsyncThunk('candidate/registerElection',
    async(candidateData,{rejectWithValue})=>{
        try{
            const response=await showCandidateRegisterElection(candidateData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const registerElecionCandidateAsync=createAsyncThunk('candidate/registerElectonCandidate',
    async(electionData,{rejectWithValue})=>{
        try{
            const response=await RegisterElection(electionData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const showLiveResultAsync=createAsyncThunk('candidate/showLiveResult',
    async(electionData,{rejectWithValue})=>{
        try{
            const response=await showLiveResult(electionData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const winElectionAsync=createAsyncThunk('candidate/winElection',
    async(electionData,{rejectWithValue})=>{
        try{
            const response=await showWinElection(electionData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const removeNameAsync=createAsyncThunk('candidate/removeName',
    async(electionData,{rejectWithValue})=>{
        try{
            const response=await removeName(electionData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const candidateSlice=createSlice({
    name:'candidate',
    initialState,
    reducers:{
        increment:(state)=>{
            state.value+=1;
        },
    upDatetargetElectionCandidate:(state,action)=>{
            state.targetElectionCandidate=action.payload
    },
    updteMessageFromCandidaet:(state,action)=>{
        state.message=action.payload;
    }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(currentElectionAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(currentElectionAsync.fulfilled,(state,action)=>{
            state.status="idle"
            const {electionData}=action.payload;
            if(electionData){
                state.currentElectionData=electionData
            }else{
                state.error=action.payload
            }
        })
        .addCase(currentElectionAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(candidateShowRegisterElectionAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(candidateShowRegisterElectionAsync.fulfilled,(state,action)=>{
            state.status="idle"
            const {data}=action.payload;
            if(data){
                state.candidateRegisterElection=data
            }else{
                state.error=action.payload
            }
        })
        .addCase(candidateShowRegisterElectionAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(registerElecionCandidateAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(registerElecionCandidateAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.message=action.payload;
        })
        .addCase(registerElecionCandidateAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(showLiveResultAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(showLiveResultAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.liveResult=action.payload;
        })
        .addCase(showLiveResultAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(winElectionAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(winElectionAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.winElection=action.payload;
        })
        .addCase(winElectionAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(removeNameAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(removeNameAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.message=action.payload;
        })
        .addCase(removeNameAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
    }

})
// export const {increment}=authSlice.actions;
export const {upDatetargetElectionCandidate}=candidateSlice.actions;
export const {updteMessageFromCandidaet}=candidateSlice.actions;
export const selectCurrentElectionData=(state)=>state.candidate.currentElectionData;
export const selectCandidateRegisterElection=(state)=>state.candidate.candidateRegisterElection;
export const selectTargetElectionCandidate=(state)=>state.candidate.targetElectionCandidate;
export const selectMessFromCandidate=(state)=>state.candidate.message;
export const selectLiveResult=(state)=>state.candidate.liveResult;
export const selectWinElection=(state)=>state.candidate.winElection;

export default candidateSlice.reducer;
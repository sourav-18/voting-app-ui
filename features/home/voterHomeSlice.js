import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit"
import { upcomeingElection,showVoterRegisterElection, RegisterElection, showTodayElaction, SubmitVote, showUnAttemptedVoter, removeName } from "./voterHomeapi";
const initialState={
    status:"idel",
    upcomeingElectionData:[],
    voterRegisterElection:[],
    error:null,
    targetElection:null,
    message:null,
    todayElection:[],
    submitVote:null,
    unAttemptedVote:[],
}
export const unAttemptedVoterAsync=createAsyncThunk('voterHome/unAttemptedVoter',
    async(voterData,{rejectWithValue})=>{
        try{
            const response=await showUnAttemptedVoter();
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const upcomeingElectionAsync=createAsyncThunk('voterHome/upcomeingElection',
    async(voterData,{rejectWithValue})=>{
        try{
            const response=await upcomeingElection(voterData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const voterShowRegisterElectionAsync=createAsyncThunk('voterHome/registerElection',
    async(voterData,{rejectWithValue})=>{
        try{
            const response=await showVoterRegisterElection(voterData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const registerElectionAsync=createAsyncThunk('voterHome/registerElectionForVote',
    async(voterData,{rejectWithValue})=>{
        try{
            const response=await RegisterElection(voterData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const showTodayElectionAsync=createAsyncThunk('voterHome/showTodayElection',
    async(voterData,{rejectWithValue})=>{
        try{
            const response=await showTodayElaction();
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const submitVoteAsync=createAsyncThunk('voterHome/submitVote',
    async(voterData,{rejectWithValue})=>{
        try{
            const response=await SubmitVote(voterData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const removeNameAsync=createAsyncThunk('voterHome/removeName',
    async(voterData,{rejectWithValue})=>{
        try{
            const response=await removeName(voterData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const userHomeSlice=createSlice({
    name:'voterHome',
    initialState,
    reducers:{
        increment:(state)=>{
            state.value+=1;
        },
        upDatetargetElection:(state,action)=>{
            state.targetElection=action.payload
        },
        updataeMessageFromVoter:(state,action)=>{
            state.message=action.payload;
        },
        updateSubmitVote:(state,action)=>{
            state.submitVote=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(upcomeingElectionAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(upcomeingElectionAsync.fulfilled,(state,action)=>{
            state.status="idle"
            const {electionData}=action.payload;
            if(electionData){
                state.upcomeingElectionData=electionData
            }else{
                state.error=action.payload
            }
        })
        .addCase(upcomeingElectionAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(voterShowRegisterElectionAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(voterShowRegisterElectionAsync.fulfilled,(state,action)=>{
            state.status="idle"
            const {data}=action.payload;
            if(data){
                state.voterRegisterElection=data
            }else{
                state.error=action.payload
            }
        })
        .addCase(unAttemptedVoterAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(unAttemptedVoterAsync.fulfilled,(state,action)=>{
            state.status="idle"
            const {data}=action.payload;
            if(data){
                state.unAttemptedVote=data
            }else{
                state.error=action.payload
            }
        })
        .addCase(unAttemptedVoterAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(registerElectionAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(registerElectionAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.message=action.payload
        })
        .addCase(registerElectionAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(showTodayElectionAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(showTodayElectionAsync.fulfilled,(state,action)=>{
            state.status="idle"
            if(action.payload.data){
                state.todayElection=action.payload.data
            }else{
                action.error=action.payload.message
            }
        })
        .addCase(showTodayElectionAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(submitVoteAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(submitVoteAsync.fulfilled,(state,action)=>{
            state.status="idle"
           state.message=action.payload
        })
        .addCase(submitVoteAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(removeNameAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(removeNameAsync.fulfilled,(state,action)=>{
            state.status="idle"
           state.message=action.payload
        })
        .addCase(removeNameAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
    }

})
// export const {increment}=authSlice.actions;
export const {upDatetargetElection}=userHomeSlice.actions;
export const {updataeMessageFromVoter}=userHomeSlice.actions;
export const {updateSubmitVote}=userHomeSlice.actions;

export const selectUpcomingElection=(state)=>state.voterHome.upcomeingElectionData;
export const selectRegisterElection=(state)=>state.voterHome.voterRegisterElection;
export const selectTargetElection=(state)=>state.voterHome.targetElection;
export const selectMessFromVoter=(state)=>state.voterHome.message;
export const selectTodayElection=(state)=>state.voterHome.todayElection;
export const selectSubmitVoteData=(state)=>state.voterHome.submitVote;
export const selectUnAttemptedVoter=(state)=>state.voterHome.unAttemptedVote;

export default userHomeSlice.reducer;
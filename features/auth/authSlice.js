import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { candidatedetais, signInCandidate, signInVoter, signUpCandidate, signUpVoter, voterdetais } from "./authApi"

const initialState={
    status:"idel",
    signInVoterData:null,
    signUpVoterData:null,
    signInCandidateData:null,
    signUpCandidateData:null,
    voterdetais:null,
    message:"",
    value:1,
    error:null,
    candidateDetails:null,
}
export const voterDetaisAsync=createAsyncThunk('auth/voterDetais',
    async(voterData,{rejectWithValue})=>{
        try{
            const response=await voterdetais();
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
})
export const candidateDetaisAsync=createAsyncThunk('auth/candidateDetais',
    async(voterData,{rejectWithValue})=>{
        try{
            const response=await candidatedetais();
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
})
export const signInVoterAsync=createAsyncThunk('auth/signInVoter',
    async(voterData,{rejectWithValue})=>{
        try{
            const response=await signInVoter(voterData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const signUpVoterAsync=createAsyncThunk('auth/signUpVoter',
    async(voterData,{rejectWithValue})=>{
        try{
            const response=await signUpVoter(voterData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const signUpCandidateAsync=createAsyncThunk('auth/signUpCandidate',
    async(candidateData,{rejectWithValue})=>{
        try{
            const response=await signUpCandidate(candidateData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const signInCandidateAsync=createAsyncThunk('auth/signInCandidate',
    async(candidateData,{rejectWithValue})=>{
        try{
            const response=await signInCandidate(candidateData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        increment:(state)=>{
            state.value+=1;
        },
        setsignInVoterData:(state,action)=>{
            state.signInVoterData=action.payload;
        },
        setsignInCandidateData:(state,action)=>{
            state.signInCandidateData=action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(signInVoterAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(signInVoterAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.signInVoterData=action.payload.jwt_token
            state.message=action.payload.message;
        })
        .addCase(signInVoterAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(signUpVoterAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(signUpVoterAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.signUpVoterData=action.payload
        })
        .addCase(signUpVoterAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(signInCandidateAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(signInCandidateAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.signInCandidateData=action.payload.jwt_token
            state.message=action.payload.message;
            // console.log(action.payload)
        })
        .addCase(signInCandidateAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(signUpCandidateAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(signUpCandidateAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.signUpCandidateData=action.payload
        })
        .addCase(signUpCandidateAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(voterDetaisAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(voterDetaisAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.voterdetais=action.payload
        })
        .addCase(voterDetaisAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(candidateDetaisAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(candidateDetaisAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.candidateDetails=action.payload.data
        })
        .addCase(candidateDetaisAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
    }

})
export const {increment}=authSlice.actions;
export const {setsignInVoterData}=authSlice.actions;
export const {setsignInCandidateData}=authSlice.actions;
export const selectSignInVoter=(state)=>state.auth.signInVoterData;
export const selectStatus=(state)=>state.auth.status;
export const selectError=(state)=>state.auth.error;
export const selectSignUpVoter=(state)=>state.auth.signUpVoterData;
export const selectSignUpCandidate=(state)=>state.auth.signUpCandidateData;
export const selectSignInCandidate=(state)=>state.auth.signInCandidateData;
export const selectVoterDetais=(state)=>state.auth.voterdetais;
export const selectCndidteDetais=(state)=>state.auth.candidateDetails;
export const selectAuthMessage=(state)=>state.auth.message;

export default authSlice.reducer;
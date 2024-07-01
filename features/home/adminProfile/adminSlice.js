import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { adminProfileData, calculateElection, createNewElection, deleteElection, showAllElection, showAllResult, showEditedElection, showElection, showPopulerElection, showResult, showTodayResultElection, signInAdmin, updateElection } from "./adminApi";

const initialState={
    status:"idel",
    adminToken:null,
    error:null,
    message:null,
    createNewElectionData:null,
    todayResultElection:null,
    calculateElectionData:null,
    responseOfCalculateElection:null,
    allResult:[],
    result:null,
    allElection:null,
    election:null,
    edited:null,
    populer:null,
    adminProfileValue:null,
}
export const adminSignInAsync=createAsyncThunk('admin/adminSignin',
    async(admindata,{rejectWithValue})=>{
        try{
            const response=await signInAdmin(admindata);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const createNewElectionAsync=createAsyncThunk('admin/createNewElection',
    async(electionData,{rejectWithValue})=>{
        try{
            const response=await createNewElection(electionData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const showTodayResultElectionAsync=createAsyncThunk('admin/showTodayElectionResult',
    async(electionData,{rejectWithValue})=>{
        try{
            const response=await showTodayResultElection();
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const calculateElectionAsync=createAsyncThunk('admin/calculateElection',
    async(id,{rejectWithValue})=>{
        try{
            const response=await calculateElection(id);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const showAllResultAsync=createAsyncThunk('admin/showAllResult',
    async(id,{rejectWithValue})=>{
        try{
            const response=await showAllResult(id);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const showResultAsync=createAsyncThunk('admin/showResult',
    async(_id,{rejectWithValue})=>{
        try{
            const response=await showResult(_id);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const showAllElectionAsync=createAsyncThunk('admin/showAllElection',
async(_id,{rejectWithValue})=>{
        try{
            const response=await showAllElection();
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const showEditedElectionAsync=createAsyncThunk('admin/showEditedElection',
async(_id,{rejectWithValue})=>{
        try{
            const response=await showEditedElection();
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const showElectionAsync=createAsyncThunk('admin/showElection',
async(_id,{rejectWithValue})=>{
        try{
            const response=await showElection(_id);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const deleteElectionAsync=createAsyncThunk('admin/deleteElection',
async(_id,{rejectWithValue})=>{
        try{
            const response=await deleteElection(_id);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const updateElectionAsync=createAsyncThunk('admin/updateElection',
async(updateData,{rejectWithValue})=>{
        try{
            const response=await updateElection(updateData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const PopulerElectionAsync=createAsyncThunk('admin/PopulerElection',
async(updateData,{rejectWithValue})=>{
        try{
            const response=await showPopulerElection(updateData);
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const AdminProfileAsync=createAsyncThunk('admin/adminProfile',
async(updateData,{rejectWithValue})=>{
        try{
            const response=await adminProfileData();
            return response.data
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const adminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{
        increment:(state)=>{
            state.value+=1;
        },
        updatecreateNewElectionData:(state,action)=>{
            state.createNewElectionData=action.payload;
        },
        updateCalculateElectionDataData:(state,action)=>{
            state.calculateElectionData=action.payload;
        },
        updateMessageDataFromAdmin:(state,action)=>{
            state.message=action.payload;
        },
        updateAdminToken:(state,action)=>{
            state.adminToken=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(adminSignInAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(adminSignInAsync.fulfilled,(state,action)=>{
            state.status="idle"
                state.adminToken=action.payload.jwt_token
                state.message=action.payload

        })
        .addCase(adminSignInAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(createNewElectionAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(createNewElectionAsync.fulfilled,(state,action)=>{
            state.status="idle"
                state.createNewElectionData=action.payload

        })
        .addCase(createNewElectionAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(showTodayResultElectionAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(showTodayResultElectionAsync.fulfilled,(state,action)=>{
            state.status="idle"
                state.todayResultElection=action.payload
            
        })
        .addCase(showTodayResultElectionAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(calculateElectionAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(calculateElectionAsync.fulfilled,(state,action)=>{
            state.status="idle"
                state.responseOfCalculateElection=action.payload
            
        })
        .addCase(calculateElectionAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(showAllResultAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(showAllResultAsync.fulfilled,(state,action)=>{
            state.status="idle"
                state.allResult=action.payload
            
        })
        .addCase(showAllResultAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(showResultAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(showResultAsync.fulfilled,(state,action)=>{
            state.status="idle"
                state.result=action.payload
        })
        .addCase(showResultAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(showAllElectionAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(showAllElectionAsync.fulfilled,(state,action)=>{
            state.status="idle"
                state.allElection=action.payload
        })
        .addCase(showAllElectionAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(showElectionAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(showElectionAsync.fulfilled,(state,action)=>{
            state.status="idle"
                state.election=action.payload
        })
        .addCase(showElectionAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(deleteElectionAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(deleteElectionAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.message=action.payload
        })
        .addCase(deleteElectionAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(updateElectionAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(updateElectionAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.message=action.payload
        })
        .addCase(updateElectionAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(showEditedElectionAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(showEditedElectionAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.edited=action.payload
        })
        .addCase(showEditedElectionAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(PopulerElectionAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(PopulerElectionAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.populer=action.payload
        })
        .addCase(PopulerElectionAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
        .addCase(AdminProfileAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(AdminProfileAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.adminProfileValue=action.payload
        })
        .addCase(AdminProfileAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error=action.error
        })
    }

})
// export const {increment}=admin.actions;
export const {updatecreateNewElectionData}=adminSlice.actions;
export const {updateCalculateElectionDataData}=adminSlice.actions;
export const {updateMessageDataFromAdmin}=adminSlice.actions;
export const {updateAdminToken}=adminSlice.actions;

export const selectAdminToken=(state)=>state.admin.adminToken;
export const selectAdminMessage=(state)=>state.admin.message;
export const selectcreateNewElectionData=(state)=>state.admin.createNewElectionData;
export const selecttodayResultElection=(state)=>state.admin.todayResultElection;
export const selectAllresut=(state)=>state.admin.allResult;
export const selectEdited=(state)=>state.admin.edited;
export const selectResut=(state)=>state.admin.result;
export const selectCalculateElection=(state)=>state.admin.calculateElectionData;
export const selectResponseOfCalculateElection=(state)=>state.admin.responseOfCalculateElection;
export const selectAllElection=(state)=>state.admin.allElection;
export const selectElection=(state)=>state.admin.election;
export const selectPopulerElection=(state)=>state.admin.populer;
export const selectAdminProfileData=(state)=>state.admin.adminProfileValue;


export default adminSlice.reducer;
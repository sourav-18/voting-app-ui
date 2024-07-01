import { StyleSheet} from 'react-native'
 export const AuthFromStyle = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:120
        // backgroundColor:"whitesmoke"
    },
    inputCard:{
       marginBottom:30,
       marginHorizontal:18,
       
    },
    inputItem:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:12,
        elevation:10,
        backgroundColor:"#FAF9F6",
        paddingHorizontal:10,
        // shadowColor:"red",
        borderRadius:10
        
    },
    input:{
        flex:1,
        padding:15
    },
    btn:{
        // backgroundColor:"black",
        // padding:15,
        // borderRadius:10,
        marginHorizontal:18,
        // flexDirection:"row",
        // alignItems:"center",
        // justifyContent:"center"
    },
    btnText:{
        color:"white",
        alignSelf:"center",
        fontSize:17,
    },
    titleCard:{
        marginHorizontal:18,
        marginBottom:20
    },
    title:{
        fontSize:30,
        fontWeight:"bold"
    },
    smallTitle:{
        fontSize:15
    },
    foterItem:{
        alignItems:"center",
        marginTop:20,
        alignSelf:"flex-end",
        // justifyContent:"center",
        flexDirection:"row",
        marginRight:6
    },
    foterTextFirst:{
        color:"gray",
        fontSize:15,
    },
    foterTextLast:{
        color:"black",
        fontSize:17,
        fontWeight:"bold",
        marginLeft:6,
        marginRight:20
    },
    error:{
        color:"red",
        position:"absolute",
        top:60,
        left:10,
        fontWeight:"600"
    },
    authMessage:{
        textAlign:"center",
        textTransform:"capitalize",
        color:"red",
        fontSize:13,
        marginTop:10,
    }

})
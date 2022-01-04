import { StyleSheet } from "react-native";

export default StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:'black',
        justifyContent:'space-evenly',
        padding:10
      },
      Button:{
        padding:10,
        backgroundColor:'gray',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:50,
        borderRadius:10,
        marginVertical:10
      },
      Text:{
        color:'white',
        fontWeight:'bold',
      },
      TextInput:{
        backgroundColor:'white',
        color:'black',
        width: '90%',
        padding:10,
        borderRadius:10
      }
})
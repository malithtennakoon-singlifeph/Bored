import React, {useState} from 'react'
import {Text, View , SafeAreaView} from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import styles from '../Styes';
import API from '../services';
import Button from '../Components/Button';
import Countries from '../countries.json';

const ToastTypes = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info'
  }
  
  const showToast = ({type, text1, text2}) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2
    });
  }
  

export default function IPInfo() {

    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const [ip, setIp] = useState('');

    async function getIPAddress (){
        const rawIPresult = await API.create(
            API.HTTP_METHOD.GET,
            API.END_POINTS.GET_IP
        )
        try{
            const resultIP = await rawIPresult.json();
            if(resultIP.ip){
                setIp(resultIP.id)
            }
        }catch(error){
            console.log("Error:", error);
        }
    }

    async function onPressGetIpInfo () {
        setLoading(true);
        const rawIPresult = await API.create(
            API.HTTP_METHOD.GET,
            API.END_POINTS.GET_IP
        )
        try{
            const resultIP = await rawIPresult.json();
            if(resultIP.ip){
               //Start API 2
               let url =  `${API.END_POINTS.GET_IP_INFO}${resultIP.ip}/geo`
               console.log("url:",url);
               const rawResult = await API.create(
                 API.HTTP_METHOD.GET,
                 url
               );
               try{
                 const result = await rawResult.json();
                 if(result.org){
                   console.log(result);
                   setInfo(result);
                   setLoading(false);
                 }else{
                   console.log("Something went wrong!");
                   showToast({type:ToastTypes.ERROR, text1:"Oops 👋", text2:"Something went wrong!"});
                   setLoading(false);
                 }
               }catch(error){
                 console.log(error);
                 showToast({type:ToastTypes.ERROR, text1:"Oops 👋", text2:"Something went wrong!"});
                 setLoading(false);
               }
               //End API 2
            }else{
                console.log("Something went wrong!");
                showToast({type:ToastTypes.ERROR, text1:"Oops 👋", text2:"Something went wrong!"});
                setLoading(false);
            }
        }catch(error){
            console.log("Error:", error);
        }
      }

      function Search(id){
        return Countries.find(item=>item.code===id).name;
      }

    return (
        <SafeAreaView style={styles.Container}>
            <View style={{alignItems:'center'}}>
                <Button title="Get Information" onPress={onPressGetIpInfo} loading={loading} width='60%'/>
                {
                    info!=="" && 
                    <View>
                        <Text style={[styles.Text,{marginVertical:5}]}>• IP : {info.ip}</Text>   
                        <Text style={[styles.Text,{marginVertical:5}]}>• Host Name : {info.hostname ? info.hostname : "NaN"}</Text>   
                        <Text style={[styles.Text,{marginVertical:5}]}>• City : {info.city}</Text>   
                        <Text style={[styles.Text,{marginVertical:5}]}>• Region : {info.region}</Text>   
                        <Text style={[styles.Text,{marginVertical:5}]}>• Country : {Search(info.country)}</Text>   
                        <Text style={[styles.Text,{marginVertical:5}]}>• Location : {info.loc}</Text>   
                        <Text style={[styles.Text,{marginVertical:5}]}>• Organization : {info.org}</Text>   
                        <Text style={[styles.Text,{marginVertical:5}]}>• Postal : {info.postal}</Text>   
                        <Text style={[styles.Text,{marginVertical:5}]}>• Timezone : {info.timezone}</Text>   
                        <Text style={[styles.Text,{marginVertical:5}]}>• Readme : {info.readme}</Text>   
                    </View>
                }
            </View>
            <Toast/>
        </SafeAreaView>
    )
}

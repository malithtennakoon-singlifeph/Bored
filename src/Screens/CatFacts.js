import React, {useState} from 'react'
import {Text, View , SafeAreaView} from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import styles from '../Styes';
import API from '../services';
import Button from '../Components/Button';

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
  

export default function CatFacts() {

    const [fact, setFact] = useState("");
    const [loadingBored, setLoadingBored] = useState(false);

    async function onPressBored () {
        setLoadingBored(true);
        const rawResult = await API.create(
          API.HTTP_METHOD.GET,
          API.END_POINTS.CAT_FACTS,
        );
        try{
          const result = await rawResult.json();
          if(result.fact){
            console.log(result);
            setFact(result.fact);
            setLoadingBored(false);
          }else{
            console.log("Something went wrong!");
            showToast({type:ToastTypes.ERROR, text1:"Oops 👋", text2:"Something went wrong!"});
            setLoadingBored(false);
          }
        }catch(error){
          console.log(error);
          showToast({type:ToastTypes.ERROR, text1:"Oops 👋", text2:"Something went wrong!"});
          setLoadingBored(false);
        }
      }

    return (
        <SafeAreaView style={styles.Container}>
            <View style={{alignItems:'center'}}>
                <Button title="Tell me a Cat Fact" onPress={onPressBored} loading={loadingBored} width='60%'/>
                <Text style={styles.Text}>{fact}</Text>
            </View>
            <Toast/>
        </SafeAreaView>
    )
}

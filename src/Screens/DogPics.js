import React, {useState} from 'react'
import {Image, View , SafeAreaView, ActivityIndicator, Dimensions} from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import styles from '../Styes';
import API from '../services';
import Button from '../Components/Button';

const {width, height} = Dimensions.get('window')

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
  

export default function DogPics() {

    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    async function onPressBored () {
        setLoading(true);
        const rawResult = await API.create(
          API.HTTP_METHOD.GET,
          API.END_POINTS.DOG_PICS,
        );
        try{
          const result = await rawResult.json();
          if(result.status==="success"){
            console.log(result);
            setImage(result.message);
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
      }

    return (
        <SafeAreaView style={styles.Container}>
            <View style={{alignItems:'center'}}>
                <Button title="Show me a Dog image" onPress={onPressBored} loading={loading} width='70%'/>
                { image!=="" &&
                    <Image 
                    style={{width: width*0.9, height: width*1.2}} 
                    resizeMode='contain'
                    source={{uri:image}} 
                    loadingIndicatorSource={<ActivityIndicator color={"white"}/>}
                />
                }
            </View>
            <Toast/>
        </SafeAreaView>
    )
}

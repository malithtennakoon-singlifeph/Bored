import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
} from 'react-native';
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

export default GuessGender = () =>{

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  async function onPressGuessGender () {
    if(name===""){
      console.log("Please enter you name!");
      showToast({type:ToastTypes.ERROR, text1:"Hi 👋", text2:"Please Enter your name!"});
    }else{
      setLoading(true);
      let url = `${API.END_POINTS.GUESS_GENDER}${name}`
      console.log('url:',url);
      const rawResult = await API.create(
        API.HTTP_METHOD.GET,
        url,
      );
      try{
        const result = await rawResult.json();
        if(result.name){
          if(result.gender === null){
            console.log("Sorry, I'm confused 🥴 😵‍💫", result);
            showToast({type:ToastTypes.ERROR, text1:"Oops 😵‍💫", text2:"Sorry, I'm confused, Try first name!🥴 😵‍💫"});
          }else{
            console.log(result);
            setGender(result.gender);
          }
          setName("");
          setLoading(false);
        }else{
          console.log("Something went wrong!");
          setLoading(false);
        }
      }catch(error){
        console.log(error);
        setLoading(false);
      }
    }
  }

  function setText(text){
    setName(text);
  }

  return (
    <SafeAreaView style={styles.Container}>
      <View style={{alignItems:'center'}}> 
        <TextInput 
          style={styles.TextInput} 
          placeholder='What is you name?' 
          placeholderTextColor='gray'
          value={name}
          onChangeText={setText}
        />
        <Button title="Are you male or female?" onPress={onPressGuessGender} loading={loading}/>
        {
          gender===""? 
            <Text style={[styles.Text,{textAlign:'center'}]}> 
              Please enter your first name and click the above button!
            </Text>
          : <Text style={[styles.Text,{textAlign:'center'}]}>
              You are {gender}. ☺️ 
            </Text>
        }
      </View>
      {
        !gender=="" &&
            <Text style={[styles.Text, {position:'absolute',bottom:20, alignSelf:'center', textAlign:'center', paddingHorizontal:10}]}>
                I know who you really are. Don't worry, I won't tell anyone 😌✌️.
            </Text>
      }
      <Toast/>
    </SafeAreaView>
  );
};

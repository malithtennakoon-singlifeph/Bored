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

export default GuessAge = () =>{

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  async function onPressGuessAge () {
    if(name===""){
      console.log("Please enter you name!");
      showToast({type:ToastTypes.ERROR, text1:"Hi 👋", text2:"Please Enter your name!"});
    }else{
      setLoading(true);
      let url = `${API.END_POINTS.GUESS_AGE}${name}`
      console.log('url:',url);
      const rawResult = await API.create(
        API.HTTP_METHOD.GET,
        url,
      );
      try{
        const result = await rawResult.json();
        if(result.name){
          if(result.age === null){
            console.log("Sorry, I'm confused 🥴 😵‍💫", result);
            showToast({type:ToastTypes.ERROR, text1:"Oops 😵‍💫", text2:"Sorry, I'm confused, Try first name!🥴 😵‍💫"});
          }else{
            console.log(result);
            setAge(result.age);
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
        <Button title="Guess my age" onPress={onPressGuessAge} loading={loading}/>
        {
          age===""? 
            <Text style={[styles.Text,{textAlign:'center'}]}> 
              Please enter your first name and click the above button!
            </Text>
          : <Text style={[styles.Text,{textAlign:'center'}]}>
              You are {age} years old. ☺️ 
            </Text>
        }
      </View>
      {
        !age=="" &&
            <Text style={[styles.Text, {position:'absolute',bottom:20, alignSelf:'center', textAlign:'center', paddingHorizontal:10}]}>
                I might be wrong. I'm just a computer program. No matter how old you are, you are a good person. Keep it up. 😌✌️
            </Text>
      }
      <Toast/>
    </SafeAreaView>
  );
};

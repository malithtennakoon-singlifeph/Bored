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

const App = () =>{

  const [name, setName] = useState("");
  const [countryNames, setCountryNames] = useState([]);
  const [loadingCountry, setLoadingCountry] = useState(false);

  async function onPressGuessCountry () {
    if(name===""){
      console.log("Please enter you name!");
      showToast({type:ToastTypes.ERROR, text1:"Hi 👋", text2:"Please Enter your name!"});
    }else{
      setLoadingCountry(true);
      let url = `${API.END_POINTS.NATIONALIZE_URL}name=${name}`
      const rawResult = await API.create(
        API.HTTP_METHOD.GET,
        url,
      );
      try{
        const result = await rawResult.json();
        if(result.name){
          if(result.country.length==0){
            console.log("Sorry, I'm confused 🥴 😵‍💫");
            showToast({type:ToastTypes.ERROR, text1:"Hi 👋", text2:"Sorry, I'm confused 🥴 😵‍💫"});
          }else{
            console.log(result);
            setCountryNames(Filter(result.country));
          }
          setName("");
          setLoadingCountry(false);
        }else{
          console.log("Something went wrong!");
          setLoadingCountry(false);
        }
      }catch(error){
        console.log(error);
        setLoadingCountry(false);
      }
    }
  }

  function Search(id){
    return Countries.find(item=>item.code===id);
  }

  function Filter(arr){
    let countryName = []
    arr.forEach(item=>{
      countryName.push(Search(item.country_id).name);
    });
    return countryName;
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
        <Button title="Guess where I'm from" onPress={onPressGuessCountry} loading={loadingCountry}/>
        {
          countryNames.length===0? 
            <Text style={[styles.Text,{textAlign:'center'}]}> 
              Please enter your first name and click the above button!
            </Text>
          : countryNames.length===1? 
            <Text style={[styles.Text,{textAlign:'center'}]}>
              You are probably from {countryNames[0]}
            </Text>
          : <Text style={[styles.Text,{textAlign:'center'}]}>
              You are from one of the following countries 
              {countryNames.map(item=> ` ${item} ,`)}
            </Text>
        }
      </View>
      <Toast/>
    </SafeAreaView>
  );
};

export default App;

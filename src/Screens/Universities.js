import React, {useState} from 'react'
import { StyleSheet, Text,TextInput, View, TouchableOpacity, Linking, FlatList } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import mainStyles from '../Styes'
import API from '../services'

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

const Item = ({title, web_page}) => {
  function onPressLink (){
    Linking.openURL(web_page);
  }
  return(
    <TouchableOpacity onPress={onPressLink} style={{paddingVertical:5}}>
      <Text style={mainStyles.Text} ellipsizeMode='tail' numberOfLines={1}>•{"  "}{title}</Text>
    </TouchableOpacity>
  )
}

export default function Universities() {

  const [country, setCountry] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function onPressGetData (){
    if(country===""){
      showToast({type:ToastTypes.ERROR, text1:"Hi 👋", text2:"Please enter the name of the country!"});
    }else{
      setLoading(true);
      let country_name= country.trim().split(" ").join('+');
      console.log("Name", country_name)
      let url =   `${API.END_POINTS.UNIVERSITIES_LIST}${country_name}`;
      console.log("url",url)
      const resultRaw = await API.create(
        API.HTTP_METHOD.GET,
        url
      );
      try{
        const result = await resultRaw.json();
        if(result){
          if(result.length===0){
            setLoading(false)
            showToast({type:ToastTypes.ERROR, text1:"Hi 👋", text2:"Please check your country name! 🤦‍♀️"});
          }else{
            setData(result);
            setLoading(false)
          }
        }else{
          setLoading(false)
          showToast({type:ToastTypes.ERROR, text1:"Error ❌", text2:"Something went wrong! Please try again 🤷‍♀️"});
          console.log("Something went wrong! Please try again");
        }
      }catch(error){
        setLoading(false)
        console.log('Error', error)
      }
    }
  }

  const onChangeText =(text)=>{
    setCountry(text)
  }

  const keyExtractor = item =>{
    return item.name;
  }

  const renderItem = ({ item }) => (
    <Item title={item.name} web_page={item.web_pages[0]}/>
  );


  return (
    <View style={Styles.Container}>

        <View style={{alignItems:'center'}}>
          <TextInput 
            style={mainStyles.TextInput} 
            placeholder='What is you Country?' 
            placeholderTextColor='gray'
            onChangeText={onChangeText}
            value={country}
          />
          <Button title="List of Universities" onPress={onPressGetData} loading={loading}/>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsVerticalScrollIndicator={false}
        />
        <Toast/>
    </View>
  )
}

const Styles = StyleSheet.create({
  Container:{
    flex:1,
    backgroundColor:'black',
    padding:10,
  },
})

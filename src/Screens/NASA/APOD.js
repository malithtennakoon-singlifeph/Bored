import React, {useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import mainStyles from '../../Styes';
import API from '../../services';
import Button from '../../Components/Button';

const ToastTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
};

const showToast = ({type, text1, text2}) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
  });
};

const {width} = Dimensions.get('window');

export default function APOD() {
  const [content, setContent] = useState({
    date: '',
    explanation: '',
    hdurl: '',
    media_type: '',
    service_version: '',
    title: '',
    url: '',
  });
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  async function getPicture() {
    setLoading(true);
    let url =
      `https://api.nasa.gov/planetary/apod?api_key=${API.API_KEY}`;
    const rawResult = await API.create(API.HTTP_METHOD.GET, url);
    try {
      const result = await rawResult.json();
      if (result.title) {
        setContent(result);
        setLoading(false);
      } else {
        console.log('Something went wrong!');
        showToast({
          type: ToastTypes.ERROR,
          text1: 'Hi 👋',
          text2: 'Something went wrong!',
        });
        setLoadingBored(false);
      }
    } catch (error) {
      console.log(error);
      showToast({
        type: ToastTypes.ERROR,
        text1: 'Hi 👋',
        text2: 'Something went wrong!',
      });
      setLoadingBored(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {content.title !== '' ? (
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            padding: 10,
          }}
          style={{}}>
          <Text style={styles.textTitle}>{content.title}</Text>
          <ImageBackground
            resizeMode="cover"
            source={{
              uri: content.url,
            }}
            style={{width: width, height: width, marginVertical: 10, justifyContent:'center', alignItems:'center'}}
            onLoadStart={()=> setImageLoading(true)}
            onLoadEnd={()=> setImageLoading(false)}
          >
            <ActivityIndicator animating={imageLoading} color={'white'} size={20}/>
          </ImageBackground>
          <Text style={styles.subText}>{content.explanation}
          </Text>
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button
            title="Get Details"
            onPress={getPicture}
            loading={loading}
            width="50%"
          />
        </View>
      )}

      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  textTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  subText: {
    color: 'white',
    textAlign: 'justify',
  },
});

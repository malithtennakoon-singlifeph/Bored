import React, {useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  Image,
} from 'react-native';
import ExpandLess from '../Assets/expand_less.png';
import ExpandMore from '../Assets/expand_more.png';

const {width} = Dimensions.get('window');

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function CollapsibleHeader({navigation, state, indexes}) {
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);

  const onPress = () => {
    setTouched(val => !val);
    LayoutAnimation.easeInEaseOut();
    setOpen(!open);
  };

  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={1}>
      <View
        style={[styles.row, {backgroundColor: touched ? 'white' : 'black'}]}>
        <Text style={{fontWeight: '500', color: touched ? 'black' : 'white'}}>
          NASA
        </Text>
        <Image
          source={open ? ExpandLess : ExpandMore}
          style={{width: width * 0.05, height: width * 0.05}}
        />
      </View>
      {open &&
        indexes.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.subItem,
                {
                  backgroundColor: state === item.index ? 'white' : 'black',
                },
              ]}
              onPress={() => navigation.navigate(item.name)}>
              <Text
                style={{color: state === item.index ? 'black' : 'white'}}
                numberOfLines={1}
                ellipsizeMode="tail">
                {`• ${item.title}`}
              </Text>
            </TouchableOpacity>
          );
        })}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    padding: 10,
    overflow: 'hidden',
    marginBottom: 1,
  },
  subItem: {
    padding: 10,
    marginTop: 5,
    marginLeft: 5,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: width * 0.12,
    paddingHorizontal: '4%',
    borderRadius: 4,
  },
});

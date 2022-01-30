import React from 'react';
import {Text, Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import CollapsibleHeader from '../Components/CollapsibleHeader';

const {width} = Dimensions.get('window');

export default function CustomDrawerContent({navigation, ...props}) {
  const DrawerScreens = Object.keys(props.descriptors).map(
    item => props.descriptors[item],
  );
  const FilteredScreens = DrawerScreens.filter(
    item => item.route.name.slice(0, 4) !== 'NASA',
  );
  const NASAScreensIndexes = DrawerScreens.map((item, index) => {
    if (item.route.name.slice(0, 4) === 'NASA') {
      return {
        name: item.route.name,
        title: item.options.title,
        index,
      };
    }
  }).filter(item => item !== undefined);

  function NavItem({item, index}) {
    const selected = index === props.state.index;
    return (
      <TouchableOpacity
        style={[
          styles.NavItemContainer,
          {backgroundColor: selected ? 'white' : 'black'},
        ]}
        onPress={() => navigation.navigate(item.route.name)}>
        <Text style={{fontWeight: '500', color: selected ? 'black' : 'white'}}>
          {item.options.title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <DrawerContentScrollView {...props}>
      <CollapsibleHeader
        navigation={navigation}
        indexes={NASAScreensIndexes}
        state={props.state.index}
      />
      {FilteredScreens.map((item, index) => (
        <NavItem key={index} item={item} index={index} />
      ))}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  NavItemContainer: {
    justifyContent: 'center',
    width: '93%',
    height: 20,
    marginLeft: width * 0.025,
    marginBottom: width * 0.03,
    height: width * 0.12,
    paddingHorizontal: '4%',
    borderRadius: 4,
  },
});

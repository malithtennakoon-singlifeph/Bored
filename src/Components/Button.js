import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import styles from '../Styes'

export default Button = ({title, onPress, loading, width='70%'}) => (
    <TouchableOpacity style={[styles.Button, {width:width, height:40}]} onPress={onPress}>
      {loading?
          <ActivityIndicator color="white"/>
         :
         <Text style={styles.Text}>{title}</Text>
      }
      
    </TouchableOpacity>
)
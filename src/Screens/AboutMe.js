import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Linking } from 'react-native'

export default function AboutMe() {
    return (
        <SafeAreaView style={styles.Container}>
            <Text style={styles.Text}>Hello, my people 👋.</Text>
            <Text style={styles.Text}>Let me tell you about this app.</Text>
            <Text style={styles.Text}>This app is an 3 day project done by me</Text>
            <Text style={styles.Text}>to kill my time and to learn React Native</Text>
            <Text style={styles.Text}>Public APIs are used as the backends</Text>
            <Text style={styles.Text}>and they are taken from this website</Text>
            <TouchableOpacity onPress={()=>Linking.openURL("https://apipheny.io/free-api/#data-apis")}>
                <Text style={styles.Text}>https://apipheny.io/free-api/#data-apis</Text>
            </TouchableOpacity>
            <Text style={styles.Text}>You can find the repo from this link</Text>
            <TouchableOpacity onPress={()=>Linking.openURL("https://github.com/malithtennakoon/Bored")}>
                <Text style={styles.Text}>https://github.com/malithtennakoon/Bored</Text>
            </TouchableOpacity>
            <Text style={styles.Text}>Let me know things I can improve</Text>
            <Text style={styles.Text}>Thank you for using me!</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'black',
        padding:10
    },
    Text:{
        color:'white',
        fontWeight:'bold',
        padding:5
      },
});
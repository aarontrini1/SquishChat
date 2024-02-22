import {StyleSheet, Text, View} from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { UserType } from '../UserContext';

const HomeScreen = () => {
    const navigation = useNavigation();
    const {userId, setUserId} = useContext(UserType);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle:"",
            headerLeft:() => (
                <Text style={{fontSize:16,fontWeight:"bold"}}>SquishChat</Text>
            ),
            headerRight:() => (
                <View style={{flexDirection:"row", alignItems:"center",gap:8}}>
                    <Ionicons name="chatbubble-outline" size={24} color="black" />
                    <Ionicons name="people-outline" size={24} color="black" />
                </View>
            )
        })
    })
    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
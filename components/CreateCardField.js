import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'

export default function CreateCardField() {
    const theme = useSelector(state => state.theme.darkTheme)
    return (
        <View>
            <Text style={{fontSize:30, color:theme?'black':'white'}}>
                THIS FIELD WILL BE USED FOR CREATING NEW WORD CARDS!
            </Text>
        </View>
    )
}

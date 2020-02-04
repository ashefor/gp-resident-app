import React from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { DrawerItems, DrawerNavigatorItems } from 'react-navigation-drawer';
import { resHeight, resFont, resWidth } from '../utils/utils';

const { width, height } = Dimensions.get('window')
export default DrawerComponent = props => (
    <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../assets/images/gatepass.png')} />
            <View style={styles.divider} />
            <ScrollView>
                <DrawerItems {...props} />
            </ScrollView>
        </View>
    </SafeAreaView>
)

const styles = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // alignSelf: 'center',
    },
    container: {
        flex: 1,
        paddingTop: resHeight(10),
        // width: resWidth(45), 
        // backgroundColor: 'red',
        // alignItems: 'center'
        alignSelf: 'flex-start'
    },
    image: {
        width: resWidth(40),
        resizeMode: 'contain', 
        height: resHeight(10), 
        // alignSelf: 'center' 
    },
    divider: {
        height: 1,
        backgroundColor: 'white',
        marginVertical: resHeight(4)
    }
})
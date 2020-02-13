import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { withNavigationFocus } from 'react-navigation';
import { ButtonGroup, Text } from 'react-native-elements';
import FloatingButton from './FloatingButton';
import { resHeight, resWidth, resFont } from '../utils/utils';

const { height, width } = Dimensions.get('screen');
const data = [
    {
        url: '../assets/images/noticeboard.png',
        title: 'Notices',
        color1: 'rgba(111, 111, 111, .1)',
        color2: 'rgba(222, 222, 222, .08)',
    },
    {
        url: '../assets/images/complaints.png',
        title: 'Complaints',
        color1: 'rgba(111, 111, 111, .1)',
        color2: 'rgba(222, 222, 222, .08)',
    }, 
    {
        url: '../assets/images/staff.png',
        title: 'Staff',
        color1: 'rgba(111, 111, 111, .1)',
        color2: 'rgba(222, 222, 222, .08)',
    },
    {
        title: '',
        color1: 'rgba(111, 111, 111, 0)',
        color2: 'rgba(222, 222, 222, 0)',
    },
];
const BottomButtonsCommunityCentre = props => {

  const button0 = () => {
    const thisIndex = 0;
    const { title, color1, color2, url } = data[thisIndex];
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <TouchableWithoutFeedback onPress={()=> props.navigation.navigate(title)}>
            <View style={styles.imgBkg}>
               <LinearGradient 
               style={styles.comCenImg}
               colors={[color1, color2]}>
               <Image source={require('../assets/images/noticeboard.png')}  
               style={{
                width:resFont(25),
                  height:resFont(25),
                  resizeMode: 'contain'

}}/>
               </LinearGradient>
            </View>
            </TouchableWithoutFeedback>
            <Text allowFontScaling={false}   
                
            style={styles.comCenImgText}
        >{title}
        </Text>
      </View>
    )
  }
  const button1 = () => {
    const thisIndex = 1;
    const { title, color1, color2, url } = data[thisIndex];
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <TouchableWithoutFeedback onPress={()=> props.navigation.navigate(title)}>
            <View style={styles.imgBkg}>
               <LinearGradient 
               style={styles.comCenImg}
               colors={[color1, color2]}>
               <Image 
               source={require('../assets/images/complaints.png')}  
               style={{width:resFont(25), 
                  height:resFont(25),
                  resizeMode: 'contain'
                }}
                />
               </LinearGradient>
            </View>
            </TouchableWithoutFeedback>
            <Text allowFontScaling={false}   
                
            style={styles.comCenImgText}
        >{title}
        </Text>
      </View>
    )
  }
  const button2 = () => {
    const thisIndex = 2;
    const { title, color1, color2, url } = data[thisIndex];
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <TouchableWithoutFeedback onPress={()=> props.navigation.navigate(title)}>
            <View style={styles.imgBkg}>
               <LinearGradient 
               style={styles.comCenImg}
               colors={[color1, color2]}>
               <Image 
               source={require('../assets/images/staff.png')}  
               style={{width:resFont(25), 
                  height:resFont(25),
                  resizeMode: 'contain'
                }}
                />
               </LinearGradient>
            </View>
            </TouchableWithoutFeedback>
            <Text allowFontScaling={false}   
                
            style={styles.comCenImgText}
        >{title}
        </Text>
      </View>
    )
  }
  const button3 = () => {
    return (
      <View style={{}}>
      <FloatingButton 
        style={{ 
          top: resHeight(3), 
        }} 
      />

      </View>
    )
  }

    return (
      <View
        style={{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: width*0.74
        }}
      >
      {button0()}
      {button1()}
      {button2()}
      {button3()}
      </View>
    )
}


const styles = StyleSheet.create({
    item: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        paddingLeft: 1,
        elevation: 1,
        height: resHeight(26),
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    imageContainer: {
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'blue',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
        borderRadius: 5,
        width: resWidth(92),
        // height: resHeight(13),
    },
    containerCustomStyle: {
        alignSelf: 'center',
    },
    content: {
        alignItems: 'center',
    },
    containerCustomStyle2: {
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    content2: {
        alignItems: 'center',
        height: resHeight(12),
    },
    comCenImg: {
        width: resHeight(8), 
        height: resHeight(8), 
        marginBottom: resHeight(1),
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: resHeight(8)/ 2, 
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0,
        shadowRadius: 2,
        elevation: 5,
    },
    imgBkg: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    comCenImgText: { 
        color: '#222455', 
        fontSize: resFont(10), 
        marginTop: resHeight(1),
        fontFamily: 'josefin-sans-reg',
        paddingHorizontal: resWidth(1.5)
    },
     spotlight: {
        width: '100%',
        alignSelf: 'center',
        marginTop: resHeight(2),
        marginBottom: resHeight(1)
    },
    spotlightText: {
        fontSize: resFont(16),
        color: '#222455',
        fontFamily: 'josefin-sans-semi-bold'
    },
})


export default withNavigationFocus(BottomButtonsCommunityCentre);
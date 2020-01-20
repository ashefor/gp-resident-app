import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Container, Header, View, Button, Icon, Fab, Text } from 'native-base';

import { MonoText } from '../components/StyledText';
import CardSlider from '../components/CardSlider';
import FeaturedCardSlider from '../components/CardSlider/featured';
import pColours from '../constants/Colors' ;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default function HomeScreen() {
  const [ fabPanicActive, setFabPanicActive ] = React.useState(false);
  const [ fabChatActive, setFabChatActive ] = React.useState(false);
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.container}>
          <Image 
            source={ require('../assets/images/pixels/featuredCard.png')} 
            style = {{
              flex:1,
              width: viewportWidth,
              alignSelf: 'center'
            }}
              resizeMode="contain"
          />
        </View>
       

        <View style={styles.container2}>
          <CardSlider />
          <CardSlider />

      </View>
      </ScrollView>

        <View>
          <Fab
            active={fabChatActive}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: pColours.pBlueDark }}
            position="bottomLeft"
            onPress={() => setFabChatActive(!fabChatActive)}>
              <Icon name="share" />
              <Button style={{ backgroundColor: '#34A34F' }}>
                <Icon name="logo-whatsapp" />
              </Button>
              <Button style={{ backgroundColor: '#3B5998' }}>
                <Icon name="logo-facebook" />
              </Button>
              <Button disabled style={{ backgroundColor: '#DD5144' }}>
                <Icon name="mail" />
              </Button>
          </Fab>

          <Fab
            active={fabPanicActive}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: 'red' }}
            position="bottomRight"
            onPress={() => setFabPanicActive(!fabPanicActive)}>
              <Icon name="share" />
              <Button style={{ backgroundColor: '#34A34F' }}>
                <View
                  style={{
                    position: 'absolute',
                    alignItems: 'center',
                    right: 48,
                    width:160,
                    backgroundColor: '#fff',
                    borderColor: '#fff',
                    padding: 2,
                    borderWidth: 1,
                    borderRadius: 4
                  }}
                >
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 12,
                      fontFamily: 'Poppins-Light',
                    }}
                  >
                    Fire
                  </Text>
                </View>
                <Icon name="logo-whatsapp" />
              </Button>

               <Button style={{ backgroundColor: '#34A34F' }}>
                <View
                  style={{
                    position: 'absolute',
                    alignItems: 'center',
                    right: 48,
                    width:160,
                    backgroundColor: '#fff',
                    borderColor: '#fff',
                    padding: 2,
                    borderWidth: 1,
                    borderRadius: 4
                  }}
                >
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 12,
                      fontFamily: 'Poppins-Light',
                    }}
                  >
                    Domestic Violence
                  </Text>
                </View>
                <Icon name="logo-whatsapp" />
              </Button>

               <Button style={{ backgroundColor: '#34A34F' }}>
                <View
                  style={{
                    position: 'absolute',
                    alignItems: 'center',
                    right: 48,
                    width:160,
                    backgroundColor: '#fff',
                    borderColor: '#fff',
                    padding: 2,
                    borderWidth: 1,
                    borderRadius: 4
                  }}
                >
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 12,
                      fontFamily: 'Poppins-Light',
                    }}
                  >
                    Health
                  </Text>
                </View>
                <Icon name="logo-whatsapp" />
              </Button>

               <Button style={{ backgroundColor: '#34A34F' }}>
                <View
                  style={{
                    position: 'absolute',
                    alignItems: 'center',
                    right: 48,
                    width:160,
                    backgroundColor: '#fff',
                    borderColor: '#fff',
                    padding: 2,
                    borderWidth: 1,
                    borderRadius: 4
                  }}
                >
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 12,
                      fontFamily: 'Poppins-Light',
                    }}
                  >
                    Crime
                  </Text>
                </View>
                <Icon name="logo-whatsapp" />
              </Button>
             
          </Fab>
          
        </View>

    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

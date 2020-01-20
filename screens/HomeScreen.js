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
import { Container, Header, View, Button, Icon, Fab, Text, Left, Body, Right, Title } from 'native-base';

import { MonoText } from '../components/StyledText';
import CardSlider from '../components/CardSlider';
import FeaturedCardSlider from '../components/CardSlider/featured';
import pColours from '../constants/Colors' ;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default function HomeScreen() {
  const [ fabPanicActive, setFabPanicActive ] = React.useState(false);
  const [ fabChatActive, setFabChatActive ] = React.useState(false);
  return (
    <Container style={styles.container}>
     <Header transparent>
          <Left>
            <Button transparent>
              <Icon name='menu' 
                style={{
                  color: pColours.pBlueDark
                }} 
              />
            </Button>
          </Left>
          <Body>
            <Title>
              Demo Estate
            </Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='md-person' 
                style={{
                  color: pColours.pBlueDark
                }} 
              />
            </Button>
          </Right>
        </Header>
      <ScrollView
        contentContainerStyle={styles.container2}
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
          <Text style={styles.tabBarInfoText}>Community Spotlight</Text>
          <CardSlider />
          <Text style={styles.tabBarInfoText}>Community Centre Coming Soon</Text>

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

    </Container>
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
    paddingHorizontal: 16,
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
    paddingVertical: 4,
  },
  tabBarInfoText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'rgba(96,100,109, 1)',
    textAlign: 'left',
    paddingHorizontal: 4,
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

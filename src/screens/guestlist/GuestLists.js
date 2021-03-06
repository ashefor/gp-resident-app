import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Animated, SafeAreaView, ActivityIndicator } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Accordion from '../../components/Accordion';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import CheckedInGuest from '../../components/CheckedInGuest';
import IncomingGuest from '../../components/IncomingGuest';
import { LinearGradient } from 'expo-linear-gradient';
import { withNavigationFocus } from 'react-navigation';
import { scaleValue, translateX } from '../../functions/toggleDrawer'
import Header from '../../components/Header';
import { resHeight, resFont, resWidth } from '../../utils/utils';

import firebase from "firebase";
import firestore from "firebase/firestore";
import { getGatepasses } from '../../../api/Store';

const { width, height } = Dimensions.get('window');

class GuestLists extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 'Guest',
            data: [],
            modalVisible: false,
            checkedInGuests: [],
            incomingGuests: [],
            scale: scaleValue,
            opacity: new Animated.Value(1),
            translateY: new Animated.Value(1),
            translateX: translateX,
            contentHeight: 0,
            loading: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
            this.setState({
                activeTab: 'Guest'
            })
        }
    }

    onGatepassesReceived = (incomingGuests) => {
        console.log('incomingGuests');
        console.log(incomingGuests);
        this.setState( prevState => ({
            incomingGuests: prevState.incomingGuests = incomingGuests,
            loading: false
        }));
    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        getGatepasses(this.onGatepassesReceived);
    }

    currentItem = (index) => {
        this.setState({
            contentHeight: index
        })
    }
    favoritesComponent = () => (
        this.state.incomingGuests
        .filter( ({favorite}) => favorite == true )
        .map((item, index) =>
            <Accordion
                scrollToPosition={this.currentItem}
                itemIndex={index}
                key={index}
                checkedIn={item.checkedIn}
                bgColor='#8A8AB5'
                type='favorites'
            />)
    )

    guestComponent = () => (
        <View style={{ flex: 1}} >
            <View style={{ flex: 5, width: resWidth(89), alignSelf: 'center', overflow: 'hidden' }}>
                <View style={{ marginVertical: resHeight(1.2) }}>
                    <Text allowFontScaling={false} style={styles.sectionTitle}>Incoming</Text>
                </View>
                <View style={{ flex:1, paddingRight: 10, }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.state.loading ? (
                            <ActivityIndicator />
                        ) : this.state.incomingGuests.map((guest, index) => (
                            <IncomingGuest key={index} guest={guest} />
                            )
                        )}
                    </ScrollView>
                </View>
            </View>

            <View style={{ flex: 6 }}>
                <View style={[styles.tabsContainer, { justifyContent: 'center', marginTop: resHeight(1.25), }]}>
                    <Text allowFontScaling={false} style={styles.sectionText}>Checked In</Text>
                </View>
                <View style={{ flex:1, paddingRight: 10, }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.state.loading ? (
                            <ActivityIndicator />
                        ) : this.state.incomingGuests
                            .filter( ({checked_in, checked_out }) => {
                                return checked_in == true
                                    && checked_out != true;
                            })
                            .map((guest, index) => (
                                <CheckedInGuest key={index} guest={guest} />
                            )
                        )}
                    </ScrollView>
                </View>
            </View>
            <View style={styles.bottomWrapper}>
                <View style={{ width: resWidth(55) }}>
                    <ButtonWithIcon
                    style={{ backgroundColor:'#fff', width: resWidth(50) }}
                        title='New Gatepass'
                        textColor='#65658A'
                        icon='plus'
                        iconColor='#65658A'
                        onPress={() => this.props.navigation.navigate('Create Gatepass')} />
                </View>
            </View>
        </View>
    )
    setActiveTab = (tabName) => {
        this.setState({
            activeTab: tabName
        })
    }
    guestListComponent = () => {
        if (this.state.activeTab === 'Guest') {
            return this.guestComponent()
        } else {
            return (
                <View style={{ alignItems: 'center', height: resHeight(65) }}>
                    <ScrollView
                        ref='_scrollView'
                        onContentSizeChange={() => { this.refs._scrollView.scrollTo({ x: 0, y: this.state.contentHeight * 120, animated: true }) }}
                        showsVerticalScrollIndicator={false}
                    >
                        {this.favoritesComponent()}
                    </ScrollView>
                </View>
            )
        }
    }
    toggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }
    render() {
        const { navigation } = this.props;
        console.log(navigation)
        return (
            <Animated.View
                style={[
                    { transform: [{ scale: this.state.scale }, { translateX: this.state.translateX }], opacity: this.state.opacity },
                    StyleSheet.absoluteFill]}>
                <LinearGradient colors={['#fff', '#fff', '#5766BA', '#5766BA']} style={[StyleSheet.absoluteFillObject]}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <Header navigation={navigation} history='Guest History' />
                            <View style={{ flex: 7, alignItems: 'center', }}>
                                <View style={styles.tabsContainer}>
                                    <TouchableWithoutFeedback onPress={() => this.setActiveTab('Guest')} containerStyle={styles.tabs}>
                                        <View>
                                            <Text allowFontScaling={false} style={[styles.tabText, { color: this.state.activeTab === 'Guest' ? '#222455' : '#8A8AB5' }]}>Guest</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => this.setActiveTab('Favorites')} containerStyle={styles.tabs}>
                                        <View>
                                            <Text allowFontScaling={false} style={[styles.tabText, { color: this.state.activeTab === 'Favorites' ? '#222455' : '#8A8AB5' }]}>Favorites</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={[styles.active, { alignSelf: this.state.activeTab === 'Guest' ? 'flex-start' : 'flex-end' }]} />
                                <View style={{ flex: 1 }}>
                                    {this.guestListComponent()}
                                </View>
                            </View>
                            
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </Animated.View>
        )
    }
}


export default withNavigationFocus(GuestLists)

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    tabsContainer: {
        backgroundColor: 'rgba(87,102,186, 0.1)',
        flexDirection: 'row',
        height: resHeight(6)
    },
    tabs: {
        backgroundColor: 'transparent',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        color: '#8A8AB5',
        fontSize: resFont(18),
        fontFamily: 'josefin-sans-semi-bold'
    },
    active: {
        backgroundColor: '#65658A',
        height: 4,
        width: '50%'
    },
    sectionTitle: {
        color: 'rgba(34,36,85, 0.5)',
        fontSize: resFont(14),
        fontFamily: 'josefin-sans-semi-bold'
    },
    sectionText: {
        color: 'rgba(34,36,85, 0.5)',
        fontFamily: 'josefin-sans-semi-bold',
        fontSize: resFont(14),
        width: resWidth(100),
        paddingHorizontal: resWidth(6),
        alignSelf: 'center'
    },
    bottomWrapper: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5766BA',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        bottom: 0,
    },
})
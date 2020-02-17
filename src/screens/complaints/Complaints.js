import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, SafeAreaView, TouchableOpacity, ScrollView, Animated, StatusBar } from 'react-native';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { scaleValue, translateX } from '../../functions/toggleDrawer';
import { withNavigationFocus } from 'react-navigation';
import { SearchBar } from 'react-native-elements';

import Header from '../../components/Header';
import { resWidth, resHeight, resFont } from '../../utils/utils';


import firebase from "firebase";
import firestore from "firebase/firestore";

const CardElement = ({ subject, category, issueDate, status, pressed }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <View style={{ marginRight: resWidth(5) }}>
                <Text allowFontScaling={false} style={styles.cardTitle}>
                    {subject}
                </Text>
                <Text allowFontScaling={false} style={styles.cardSubtitle}>
                    {category}
                </Text>
            </View>
            <View
                style={[styles.complaintColor,
                { backgroundColor: status === 'pending' ? '#FF0000' : status === 'resolved' ? '#34D881' : '#FFB100' }]}
            />
        </View>
        <View style={styles.cardFooter}>
            <View>
                <Text allowFontScaling={false} style={[styles.cardTime, styles.cardSubtitle]}>
                    {new Date(issueDate).toDateString()}
        </Text>
            </View>
            <View style={styles.cardBody}>
                <TouchableOpacity style={[styles.cardAction, { borderColor: status === 'pending' ? '#C7C7C7' : 'resolved' ? '#34D881' : '#C7C7C7' }]} onPress={pressed}>
                    <Text allowFontScaling={false} style={[styles.cardBtnText, { color: status === 'pending' ? '#3A58FC' : '#34D881' }]}>Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
)
class Complaints extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: [
                {
                    checkedIn: 'January 20, 2014 10:30am',
                },
                {
                    checkedIn: 'January 21, 2014 10:30am',
                },
                {
                    checkedIn: 'January 22, 2014 10:30am',
                },
                {
                    checkedIn: 'January 23, 2014 10:30am',
                },
            ],
            scale: scaleValue,
            opacity: new Animated.Value(1),
            translateY: new Animated.Value(1),
            translateX: translateX,
            contentHeight: 0,
            activeTab: 'Pending',
            search: '',
            complaints: [
                {
                    title: 'Noise from the next house',
                    content: 'A lot of partying going on over there.',
                    status: 'pending'
                },
                {
                    title: 'Parking on weekends',
                    content: 'Some people just like to scatter the whole place with Their owambes. What is it?',
                    status: 'pending'
                },
                {
                    title: 'Noise from the next house',
                    content: 'They throw parties till late at night. Please assist.',
                    status: 'resolved'
                },
                {
                    title: 'Water Leakage',
                    content: '',
                    status: 'resolved'
                },
                {
                    title: 'Parking on weekends',
                    content: 'Some people just like to scatter the whole place with Their owambes. What is it?',
                    status: 'resolved'
                }
            ]
        }
    }

    setActiveTab = (tabName) => {
        this.setState({
            activeTab: tabName
        })
    }
        
    async componentDidUpdate(prevProps) {
        const pThis = this;
        var db = firebase.firestore();
        var complaints = [];
        if (prevProps.isFocused !== this.props.isFocused) {
            this.setState({
                activeTab: 'Pending'
            })
        }

        const user = await firebase.auth().onAuthStateChanged(async function(user) {
          if (user) {
            // User is signed in.
            const { uid } = user;
             await db.collection("complaints")
                .where("uid", "==", uid)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
                        complaints.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
                pThis.setState({ 
                    complaints,
                    loading: false,
             });
          } else {
            // No user is signed in.
          }
        });

    }
    updateSearch = search => {
        this.setState({ search });
    };

    handleDetails = (complaint) => {
        this.props.navigation.navigate('Complaint Details', {complaint: complaint})
    }

    pendingComplaintsTab = () => (
        <Fragment>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={this.state.search}
                containerStyle={styles.searchBarContainer}
                inputStyle={styles.searchBar}
                inputContainerStyle={styles.inputContainer}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                {this.state.complaints.filter(complaint => complaint.status === 'pending').map((item, index) => <CardElement
                    {...item}
                    key={index} 
                    pressed={()=>this.handleDetails(item)}/>)}
            </ScrollView>
        </Fragment>
    )
    resolvedComplaintsTab = () => (
        <Fragment>
            <ScrollView showsVerticalScrollIndicator={false}>
                {this.state.complaints.filter(complaint => complaint.status === 'resolved').map((item, index) => <CardElement
                    {...item}
                    key={index} 
                    pressed={()=>this.handleDetails(item)}/>)}
            </ScrollView>
        </Fragment>
    )
    getComplaints = () => {
        if (this.state.activeTab === 'Pending') {
            return this.pendingComplaintsTab()
        } else {
            return this.resolvedComplaintsTab()
        }
    }
    render() {
        const { navigation } = this.props
        return (
            <Animated.View
                style={[
                    { transform: [{ scale: this.state.scale }, { translateX: this.state.translateX }], opacity: this.state.opacity },
                    styles.animatedContainer]}>
                <LinearGradient colors={['#fff', '#fff', '#5766BA', '#5766BA']} style={[StyleSheet.absoluteFill]}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.mainContainer}>
                            <Header navigation={navigation} />
                            <View style={{ flex: 5, alignItems: 'center', marginBottom: 5 }}>
                                <View style={styles.tabsContainer}>
                                    <TouchableWithoutFeedback onPress={() => this.setActiveTab('Pending')}>
                                        <View style={styles.tabs}>
                                            <Text allowFontScaling={false} style={[styles.tabText, { color: this.state.activeTab === 'Pending' ? '#222455' : '#8A8AB5' }]}>Pending</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => this.setActiveTab('Resolved')} >
                                        <View style={styles.tabs}>
                                            <Text allowFontScaling={false} style={[styles.tabText, { color: this.state.activeTab === 'Resolved' ? '#222455' : '#8A8AB5' }]}>Resolved</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={[styles.active, { alignSelf: this.state.activeTab === 'Pending' ? 'flex-start' : 'flex-end' }]} />
                                <View style={styles.pendingContent}>
                                    {this.getComplaints()}
                                </View>
                            </View>
                            <View style={styles.bottomWrapper}>
                                <View style={{ width: resWidth(55) }}>
                                    <ButtonWithIcon
                                        title='New Complaint'
                                        textColor='#65658A'
                                        icon='plus'
                                        iconColor='#65658A'
                                        backgroundColor='#fff'
                                        onPress={() => navigation.navigate('New Complaint')} />
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </Animated.View>
        )
    }
}

export default withNavigationFocus(Complaints)
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    animatedContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    tabsContainer: {
        backgroundColor: 'rgba(87,102,186, 0.1)',
        flexDirection: 'row',
        width: '100%',
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
    pendingContent: {
        width: resWidth(89)
    },
    searchBar: {
        backgroundColor: 'transparent',
        height: resHeight(6.5),
        borderWidth: 0,
        borderColor: 'transparent',
        fontSize: resFont(14),
        fontFamily: 'josefin-sans-reg',

    },
    inputContainer: {
        backgroundColor: 'transparent',
        height: resHeight(6.5),
    },
    searchBarContainer: {
        backgroundColor: 'white',
        height: resHeight(7),
        justifyContent: 'center',
        borderBottomColor: 'white',
        borderTopColor: 'white',
        marginVertical: resHeight(2),
        // borderColor: 'rgba(0,0,0,.05)',
        // borderWidth: 1,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        borderRadius: 5,
    },

    bottomWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5766BA',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    card: {
        paddingVertical: resWidth(4),
        paddingHorizontal: resWidth(5),
        borderColor: '#ECECEC',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        borderRadius: 5,
        marginVertical: resHeight(2),
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardTitle: {
        fontSize: resFont(16),
        fontFamily: 'josefin-sans-reg',
        color: '#313450',
        marginBottom: resHeight(0.65)
    },
    cardSubtitle: {
        fontSize: resFont(10),
        fontFamily: 'josefin-sans-reg',
        color: '#898A8F',
    },
    complaintColor: {
        width: resWidth(3),
        height: resWidth(3),
        borderRadius: resWidth(3) / 2,
        // backgroundColor: 'red'
    },
    cardFooter: {
        marginTop: resHeight(1.5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardAction: {
        backgroundColor: '#fff',
        borderRadius: 5,
        height: resHeight(4.5),
        width: resWidth(20),
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardBtnText: {
        // color: '#65658A',
        fontFamily: 'josefin-sans-reg',
        fontSize: resFont(12),
    },
})
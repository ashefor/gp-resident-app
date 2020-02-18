import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, SafeAreaView, TouchableOpacity, TextInput, Image, Modal } from 'react-native';
import CustomText from '../../components/CustomText';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { withNavigationFocus } from 'react-navigation';
import { scaleValue, translateX } from '../../functions/toggleDrawer'
import Header from '../../components/Header';

import { resHeight, resFont, resWidth } from '../../utils/utils';
import ButtonWithIcon from '../../components/ButtonWithIcon';


const NoticeCard = ({post, showDetails}) => (
    <View style={{
        width: resWidth(89),
        marginVertical: 20
        , alignSelf: 'center', shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        borderRadius: 5,
        borderColor: '#ECECEC',
        borderWidth: 1,
    }}>
        <View style={{ backgroundColor: '#FAFAFA', padding: resWidth(4), borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <CustomText content={post.name} style={{ color: '#3E3F68', fontFamily: 'josefin-sans-bold', fontSize: resFont(15) }} />
                    <CustomText content='Jan. 2, 2020' style={{ color: '#8A8AB5', fontFamily: 'josefin-sans-reg', fontSize: resFont(9) }} />
                </View>
                <View style={{justifyContent: 'flex-end'}}>
                    <CustomText content={post.type} style={{ color: '#222455', fontFamily: 'josefin-sans-reg', fontSize: resFont(9), textTransform: 'capitalize'}} />
                </View>
            </View>
            <View style={{ height: resHeight(0.05), backgroundColor: '#707070', marginVertical: resHeight(1.5) }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <View style={{ width: '85%' }}>
                    <CustomText numberOfLines={4} content={post.message} style={{ color: '#898A8F', fontFamily: 'josefin-sans-bold', fontSize: resFont(10), textAlign: 'justify', marginBottom: resHeight(0.5) }} />
                </View>
               <TouchableOpacity style={{ justifyContent: 'flex-end' }} onPress={showDetails}>
               <Feather name='chevron-right' color='#8A8AB5' size={resFont(25)} />
               </TouchableOpacity>
            </View>
        </View>
        <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-between', padding: resWidth(4), borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
            <Feather name='heart' color='#8A8AB5' size={resFont(25)} />
            <Feather name='message-square' color='#8A8AB5' size={resFont(25)} />
            <Feather name='share-2' color='#8A8AB5' size={resFont(25)} />
        </View>
    </View>
)
const NoticeDetails = ({isOpen, post, closeModal}) => (
    <Modal transparent={true} visible={isOpen}>
        <View style={{backgroundColor: 'rgba(0,0,0,.25)', flex: 1, justifyContent: 'center'}}>
          <View style={{width: resWidth(89), alignSelf: 'center'}}>
                <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={closeModal}>
                <Ionicons name='ios-close-circle' color='#FFF' size={resFont(30)} />
                </TouchableOpacity>
        <View style={{
            marginTop: resHeight(3),
            shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        borderRadius: 5,
        borderColor: '#ECECEC',
        borderWidth: 1,
    }}>
        <View style={{ backgroundColor: '#fff', padding: resWidth(4), borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <CustomText content={post.name} style={{ color: '#3E3F68', fontFamily: 'josefin-sans-bold', fontSize: resFont(15) }} />
                    <CustomText content='Jan. 2, 2020' style={{ color: '#8A8AB5', fontFamily: 'josefin-sans-reg', fontSize: resFont(9) }} />
                </View>
                <View style={{justifyContent: 'flex-end'}}>
                    <CustomText content={post.type} style={{ color: '#222455', fontFamily: 'josefin-sans-reg', fontSize: resFont(9), textTransform: 'capitalize'}} />
                </View>
            </View>
            <View style={{ height: resHeight(0.05), backgroundColor: '#707070', marginVertical: resHeight(0.75) }} />
            <CustomText content={post.title} style={{ color: '#222455', fontFamily: 'josefin-sans-reg', fontSize: resFont(14), textTransform: 'capitalize'}} />
            <View style={{ height: resHeight(0.05), backgroundColor: '#707070', marginTop: resHeight(0.75), marginBottom: resHeight(1.5) }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <View style={{ width: '95%' }}>
                    <CustomText content={post.message} style={{ color: '#898A8F', fontFamily: 'josefin-sans-bold', fontSize: resFont(11), textAlign: 'justify', marginBottom: resHeight(0.5) }} />
                </View>
            </View>

            <View style={{ height: resHeight(0.05), backgroundColor: '#707070', marginVertical: resWidth(4)}} />
            <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-between', borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
            <Feather name='heart' color='#8A8AB5' size={resFont(25)} />
            <Feather name='message-square' color='#8A8AB5' size={resFont(25)} />
            <Feather name='share-2' color='#8A8AB5' size={resFont(25)} />
        </View>
        </View>
    </View>
    </View>
        </View>
    </Modal>
)
class NoticeBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scale: scaleValue,
            opacity: new Animated.Value(1),
            translateY: new Animated.Value(1),
            translateX: translateX,
            posts: {
                    latest: [
                        {
                            name: 'Tobi DuroJaiye',
                            type: 'maintenance',
                            title: 'upcoming generator maintenance',
                            message: 'There will be will be maintenance on the estate generator this coming weekend and all tenants will experience extends periods without power.  \n \nManagement would please ask that you bear with us while all issues get resolved.  \n \nThank You.'
                        }
                    ],
                    older: [
                        {
                            name: 'Community Manager',
                            type: 'news',
                            title: 'upcoming generator maintenance',
                            message: 'There will be will be maintenance on the estate generator this coming weekend and all tenants will experience extends periods without power.  \n \nManagement would please ask that you bear with us while all issues get resolved.  \n \nThank You.'
                        }
                    ]
            },
            post: {},
            isDetailModalVisible: false
        }
    }

    handleViewDetails = (post) => {
        this.setState({isDetailModalVisible: true, post
        })
    }
    render() {
        const { navigation } = this.props;
        const {posts: {latest}, posts: {older}, isDetailModalVisible, post} = this.state;
        return (
            <Animated.View
                style={[
                    { transform: [{ scale: this.state.scale }, { translateX: this.state.translateX }], opacity: this.state.opacity },
                    StyleSheet.absoluteFill]}>
                <LinearGradient colors={['#fff', '#fff']} style={[StyleSheet.absoluteFillObject]}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <Header navigation={navigation} goBack='Home' />
                            <NoticeDetails isOpen={isDetailModalVisible} closeModal={()=> this.setState({isDetailModalVisible: false})} post={post}/>
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: 'white',
                                borderColor: '#ECECEC',
                                borderWidth: 1, 
                                alignItems: 'center', 
                                height: resHeight(7), 
                                width: resWidth(89), 
                                alignSelf: 'center', 
                                borderRadius: 5, 
                                paddingHorizontal: resWidth(3),
                                marginBottom: resHeight(1),
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.1,
                                shadowRadius: 2,
                                elevation: 1,
                            }}>
                                <Image source={require('../../assets/images/filter.png')} style={{width: resFont(25),
                                                    height: resFont(25),
                                                    resizeMode: 'contain'}}/>
                                <TextInput placeholder='Filter'
                                    placeholderTextColor='#8A8AB5'
                                    style={{ flex: 1,
                                     paddingHorizontal: 
                                     resWidth(3), 
                                     fontSize: resFont(15),
                                     height: '100%', 
                                     fontFamily: 'josefin-sans-reg' }} />
                                <Feather name='chevron-down' color='#8A8AB5' size={resFont(25)} />
                            </View>
                            <ScrollView style={{ flex: 1, marginBottom: resHeight(0.65) }}>
                                <View style={{ flex: 1, marginBottom: resHeight(1) }}>
                                    <View style={[styles.tabsContainer, { justifyContent: 'center' }]}>
                                        <Text allowFontScaling={false} style={styles.sectionText}>Latest</Text>
                                    </View>
                                    <View>
                                        {latest.map((post, key) => <NoticeCard key={key} 
                                        showDetails={()=>this.handleViewDetails(post)}
                                        post={post} /> )}
                                    </View>
                                </View>
                                <View style={{marginBottom: resHeight(1) }}>
                                    <View style={[styles.tabsContainer, { justifyContent: 'center' }]}>
                                        <Text allowFontScaling={false} style={styles.sectionText}>Older</Text>
                                    </View>
                                    <View>
                                    {older.map((post, key) => <NoticeCard key={key}showDetails={()=>this.handleViewDetails(post)} 
                                    post={post} /> )}
                                    </View>
                                </View>
                            </ScrollView>
                            <View style={{
                                justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center', marginBottom: resHeight(1) }}>
                                <ButtonWithIcon
                                    style={{ backgroundColor: '#5766BA', width: resWidth(50) }}
                                    title='New Post'
                                    textColor='#fff'
                                    icon='plus'
                                    iconColor='#fff'
                                    onPress={() => navigation.navigate('New Post')} />
                            </View>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </Animated.View>
        )
    }
}


export default withNavigationFocus(NoticeBoard)

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
        color: '#222455',
        fontFamily: 'josefin-sans-semi-bold',
        fontSize: resFont(18),
        width: resWidth(89),
        alignSelf: 'center'
    },
})
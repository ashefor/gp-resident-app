
import React, { Component, createRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient'
import { resHeight, resWidth, resFont } from '../utils/utils';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const { height, width } = Dimensions.get('screen')

const CarouselPaginationBar = props => (
    <TouchableOpacity
        onPress={() => {
            props.carouselRef.current.snapToItem(props.index);
        }}
    >
        <View
            width={props.width}
            marginHorizontal={4}
            height={6}
            borderRadius={3}
            borderColor='#CBCBCB'
            borderWidth={1}
            backgroundColor={
                props.inactive ? '#CBCBCB' : '#fff'
            }
        ></View>
    </TouchableOpacity>
)
class CommunitySpotlightCarousel extends Component {
    carouselRef = createRef(null);
    constructor(props) {
        super(props)
        this.state = {
            activeSlide: 0,
            images: [
                {
                    url: require('../assets/images/ad1.png'),
                    title: 'item 1'
                },
                {
                    url: require('../assets/images/ad2.png'),
                    title: 'item 3'
                }, {
                    url: require('../assets/images/ad1.png'),
                    title: 'item 1'
                },
                {
                    url: require('../assets/images/ad2.png'),
                    title: 'item 3'
                },
            ],
        }
    }

    _renderItems({ item, index }) {
        return (
            <View style={styles.item}>
                <Image
                    source={(item.url)}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                />
            </View>
        );
    }
    get pagination() {
        const { images, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={images.length}
                activeDotIndex={activeSlide}
                containerStyle={{
                    backgroundColor: 'white',
                    paddingVertical: 8,
                }}
                dotElement={
                    <CarouselPaginationBar width={6} carouselRef={this.carouselRef} />
                }
                inactiveDotElement={
                    <CarouselPaginationBar
                        width={6}
                        carouselRef={this.carouselRef}
                        inactive
                    />
                }
                tappableDots={true}
                carouselRef={this.carouselRef}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }
    render() {
        return (
            <View 
                style={{
                    flex: 1,
                    justifyContent: 'center',
                }}>
                <Carousel
                    ref={this.carouselRef}
                    data={this.state.images}
                    sliderWidth={resWidth(89)}
                    itemWidth={resWidth(72)}
                    renderItem={this._renderItems}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                    contentContainerCustomStyle={styles.content}
                    lockScrollWhileSnapping={true}
                    containerCustomStyle={styles.containerCustomStyle}
                    activeSlideAlignment={'start'}
                    inactiveSlideScale={1}
                />
                {this.pagination}
            </View>
        )
    }
}

class CommunityCentre extends Component {
    carouselRef = createRef(null);
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0,
            data: [
                {
                    url: require('../assets/images/noticeboard.png'),
                    title: 'Notices',
                    color1: 'rgba(21, 21, 21, .1)',
                    color2: 'rgba(7, 7, 7, .08)',
                },
                {
                    url: require('../assets/images/complaints.png'),
                    title: 'Complaints',
                    color1: 'rgba(21, 21, 21, .1)',
                    color2: 'rgba(7, 7, 7, .08)',
                }, 
                {
                    url: require('../assets/images/staff.png'),
                    title: 'Staff',
                    color1: 'rgba(21, 21, 21, .1)',
                    color2: 'rgba(7, 7, 7, .08)',
                },
                {
                    title: '',
                    color1: 'rgba(21, 21, 21, 0)',
                    color2: 'rgba(7, 7, 7, 0)',
                },
            ],
            communityCentreData: [],
        }
    }

    pageSplitter = () => {
        const slides = [];
        const entries = this.state.data
        let itemsPerPage = 4;
        while (entries.length > 0) {
            slides.push(entries.splice(0, itemsPerPage));
        }
        // console.log(slides[0])
        this.setState({
            communityCentreData: slides
        })
    }
    componentDidMount() {
        this.pageSplitter()
    }
    propsShow = () => {
        console.log('property')
    }
    _renderItems({ item}) {
        return (
            <View style={{ flexDirection: "row", justifyContent: 'space-between', flexWrap: "wrap" }}>
                {item.map((item, i) => {
                    return (
                        <View key={i} style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                            <TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate(item.title)}>
                            <View style={styles.imgBkg}>
                               <LinearGradient 
                               style={styles.comCenImg}
                               colors={[item.color1, item.color2]}>
                               <Image source={item.url}  style={{width:resFont(25), 
        height:resFont(25),
        resizeMode: 'contain'}}/>
                               </LinearGradient>
                            </View>
                            </TouchableWithoutFeedback>
                            <Text allowFontScaling={false}   
                                
                            style={styles.comCenImgText}
                        >{item.title}
                        </Text>
                            </View>
                    )
                })}
            </View>
        );
    }
    get pagination() {
        const { communityCentreData, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={communityCentreData.length}
                activeDotIndex={activeSlide}
                containerStyle={{
                    backgroundColor: 'white',
                    paddingVertical: 8,
                }}
                dotElement={
                    <CarouselPaginationBar width={6} carouselRef={this.carouselRef} />
                }
                inactiveDotElement={
                    <CarouselPaginationBar
                        width={6}
                        carouselRef={this.carouselRef}
                        inactive
                    />
                }
                tappableDots={true}
                carouselRef={this.carouselRef}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }
    render() {
        const {navigation} = this.props
        return (
            <View style={{ 
                justifyContent: 'center', 
            }}>
                {/* {this.pageSplitter()} */}
                <Carousel
                    ref={this.carouselRef}
                    data={this.state.communityCentreData}
                    sliderWidth={resWidth(89)}
                    itemWidth={width * 0.9}
                    renderItem={this._renderItems.bind(this)}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                    contentContainerCustomStyle={styles.content2}
                    lockScrollWhileSnapping={true}
                    containerCustomStyle={styles.containerCustomStyle2}
                    activeSlideAlignment={'start'}
                    inactiveSlideScale={1}
                />
                {this.pagination}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        paddingLeft: 1,
        elevation: 1,
        height: resHeight(24),
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
        width: resWidth(66),
        // height: resHeight(13),
    },
    containerCustomStyle: {
        alignSelf: 'center',
    },
    content: {
        alignItems: 'center',
        height: resHeight(24),
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
        shadowOpacity: 0.3,
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
    }
})

export { CommunitySpotlightCarousel, CommunityCentre }
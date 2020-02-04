import React, { Component, createRef } from 'react';
import {ScrollView, Animated, Text, Dimensions, Image, View, StyleSheet, FlatList} from 'react-native';

const {width} = Dimensions.get('window');
export default class AdvertCarousel extends Component {
    scrollRef = createRef();
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0
        }
    }
    setSelectedIndex = event => {
        // const viewSize = event.nativeEvent.layoutMeasurement.width;
        // const contentOffset = event.nativeEvent.contentOffset.x;
        // const selectedIndex = Math.ceil(contentOffset/ viewSize)
        // console.log(event)
        // this.setState({
        //     selectedIndex
        // })
    }
    _renderItems = ({item}) => {
        return (
            <Image 
                        
                        source={item.url}
                        style={styles.backImg}/>
        )
    }
    render() {
        const {images} = this.props
        const {selectedIndex} = this.state;
        return (
            <View style={{width: width*0.9,alignSelf: 'center', height: 120}}>
                {/* <ScrollView 
                horizontal 
                pagingEnabled 
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={this.setSelectedIndex}
                >
                    {images.map((image, index) => (
                        <Image 
                        key={index}
                        source={image.url}
                        style={styles.backImg}/>
                    ))}
                </ScrollView> */}
                <FlatList 
                data={images}
                renderItem={this._renderItems}
                horizontal
                pagingEnabled
                snapToInterval={width*0.9 + 10}
                snapToAlignment={'start'}
                decelerationRate= {'fast'}
                onMomentumScrollEnd ={this.setSelectedIndex}/>
                <View style={styles.circleDiv}>
                    {images.map((image, index)=> (
                        <View 
                        key={index}
                        style={[styles.whiteCircle, {backgroundColor: index===selectedIndex? '#C1C1C1': '#FFF'}]}/>
                    ))}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backImg: {
        // width: 250,
        // marginRight: 20,
        height: 100,
    },
    circleDiv: {
        position: 'absolute',
        bottom: 0,
        height: 19,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    whiteCircle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 5,
        borderColor: '#C1C1C1',
        borderWidth: 1
    }
})
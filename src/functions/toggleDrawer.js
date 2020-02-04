import {Animated, Easing} from 'react-native';
import { resWidth } from '../utils/utils';

const scaleValue = new Animated.Value(1);

const translateX =  new Animated.Value(0);

const AnimatePage = () => {
    Animated.parallel([
        Animated.timing(scaleValue, {
            toValue: 0.7,
            duration: 150,
            easing: Easing.in()
        }),
        Animated.spring(translateX, {
            toValue: resWidth(65),
            duration: 150
        }),
    ]).start()
}

const deAnimatePage = () => {
    Animated.parallel([
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 150,
            easing: Easing.in()
        }),
        Animated.timing(translateX, {
            toValue: 0,
            duration: 150,
        }),
    ]).start();
}

export {AnimatePage, scaleValue, translateX, deAnimatePage}
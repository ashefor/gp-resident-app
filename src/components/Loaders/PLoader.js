import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

export default class PLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        visible: !this.state.visible
      });
    }, 2000);
  }

  render() {
    const { visible } = this.state;
    return (
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.85)"
        source={require("./data/pulseLoader.json")}
        animationStyle={styles.lottie}
        speed={1}
        loop={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  }
});
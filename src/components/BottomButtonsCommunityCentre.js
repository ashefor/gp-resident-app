import React from 'react';
import { View, Dimensions,  } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { ButtonGroup, Text } from 'react-native-elements';
import FloatingButton from './FloatingButton';

const { height, width } = Dimensions.get('screen');

class BottomButtonsCommunityCentre extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 2,
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
    this.updateIndex = this.updateIndex.bind(this);
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

  updateIndex(selectedIndex) {
    this.setState({selectedIndex});
  }

  component1 = () => <Text>Hello</Text>
  component2 = () => <Text>World</Text>
  component3 = () => <Text>ButtonGroup</Text>

  render () {
    const buttons = [{ element: this.component1 }, { element: this.component2 }, { element: this.component3 }];
    const { selectedIndex } = this.state;
    return (
      
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{ 
        }} 
      />
    )
  }

}

export default withNavigationFocus(BottomButtonsCommunityCentre);
import React, {Component} from 'react';
import { TouchableOpacity, Text, Image, Linking, View } from 'react-native';
import { Card } from 'react-native-elements';

class AmazonProductCard extends Component {
    productClicked = () => {
        Linking.openURL(this.props.item.detailPageURL)
    }
    render() {
        return (
            <Card>
                {/* <TouchableOpacity onPress={this.productClicked}>
                    <Image style={{width: this.props.imgWidth, height: this.props.imgHght}} resizeMode="contain"  source={{uri: this.props.item.images.primary.large.url}} />
                    <Text>{this.props.item.itemInfo.title.displayValue}</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={this.productClicked}>
                    <View style={{flexDirection: 'row', flex: 2, maxHeight: 100}}>
                        <View style={{flex: 2}}>
                            <Image style={{width: this.props.imgWidth, height: this.props.imgHght, maxHeight: 90}} resizeMode="contain"  source={{uri: this.props.item.images.primary.large.url}} />
                        </View>
                        <View style={{flex: 4, paddingTop: 3}}>
                            <Text numberOfLines={2} ellipsizeMode='tail'>{this.props.item.itemInfo.title.displayValue}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Card>
        )
    }
}

export default AmazonProductCard;
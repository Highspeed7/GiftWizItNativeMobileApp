import React, {Component} from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';

class AmazonProductCard extends Component {
    render() {
        return (
            <Card>
                <TouchableOpacity>
                    <Image style={{width: this.props.imgWidth, height: this.props.imgHght}} resizeMode="contain"  source={{uri: this.props.item.images.primary.large.url}} />
                    <Text>{this.props.item.itemInfo.title.displayValue}</Text>
                </TouchableOpacity>
            </Card>
        )
    }
}

export default AmazonProductCard;
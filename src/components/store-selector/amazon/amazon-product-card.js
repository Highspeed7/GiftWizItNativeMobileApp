import React, {Component} from 'react';
import { TouchableOpacity, Text, Image, Linking, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import FontAweomse from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class AmazonProductCard extends Component {
    productClicked = () => {
        Linking.openURL(this.props.item.detailPageURL)
    }
    addItemToWishList = () => {
        var data = {
            name: this.props.item.itemInfo.title.displayValue,
            url: this.props.item.detailPageURL,
            domain: "https://www.amazon.com",
            image: this.props.item.images.primary.large.url
        };

        this.props.onItemAdded(data);
    }
    render() {
        return (
            <Card>
                <TouchableOpacity onPress={this.productClicked}>
                    <View style={{flexDirection: 'row', flex: 2, maxHeight: 100}}>
                        <View style={{flex: 2}}>
                            <Image style={{width: this.props.imgWidth, height: this.props.imgHght, maxHeight: 90}} resizeMode="contain"  source={{uri: this.props.item.images.primary.large.url}} />
                        </View>
                        <View style={{flex: 4, paddingTop: 3}}>
                            <View style={{flexDirection: 'row', flex: 4}}>
                                <Text numberOfLines={2} ellipsizeMode='tail'>{this.props.item.itemInfo.title.displayValue}</Text>
                            </View>
                            <View style={{flexDirection: 'row', flex: 2}}>
                                <Text style={{fontWeight: 'bold'}}>
                                    {
                                        this.props.item.offers.listings[0].price !== null 
                                        ? this.props.item.offers.listings[0].price.displayAmount
                                        : "Click for price..."
                                    }
                                </Text>
                            </View>
                            
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{flex: 1, alignContent: 'center'}}>
                    <Button 
                        title="Add to wish list"
                        onPress={this.addItemToWishList}
                        type="outline"
                    />
                </View>
            </Card>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onItemAdded: (data) => dispatch(actions.addWishListItem(data)),
        uiStartSpinner: () => dispatch(actions.uiStartLoading())
    }
}

export default connect(null, mapDispatchToProps)(AmazonProductCard);
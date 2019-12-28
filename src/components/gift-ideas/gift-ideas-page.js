import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Image, Linking, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

import * as actions from '../../store/actions/index';
import { Card, Overlay } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

class GiftIdeasPage extends Component {
    inAuthView = false;
   
    componentDidMount = () => {
        this.props.setIdeaCollectionItems(this.props.activeCollection);
        this.inAuthView = (this.props.navigation.dangerouslyGetParent().state.routeName == "GiftIdeasAuthed");
    }
    acknowledgeAffiliateOverlay = () => {
        this.setState({
            affiliateNotifOpen: false
        });
        this.props.setAffiliateNotifStatus(true);
    }
    productClicked = (item) => {
        // TODO: Fix spelling of affiliate link.
        var productLink = item.linkItemPartners.length > 0 ? item.linkItemPartners[0].affliateLink : null;

        if(productLink == null) {
            var productData = JSON.parse(item.productId);
            if(this.inAuthView) {
                this.props.navigation.navigate("Products", productData);
            }else {
                try {
                    this.props.navigation.navigate("Products", {...productData, startDiscussion: false, enableWishListAdd: false});

                }catch(err) {
                    console.log(err);
                }
            }
        }else {
            Linking.openURL(productLink);        
        }
    }
    getPartnerName = (item) => {
        itemUrl = item.linkItemPartners[0].affliateLink;
        if(itemUrl == null) {
            return false;
        }
        domainPartial = itemUrl.substring(0, itemUrl.lastIndexOf(".com"));
        domain = domainPartial.substring(domainPartial.indexOf("www.")+4);

        return domain;
    }
    render() {
        const collectionsItems = (this.props.collectionItems && this.props.collectionItems.length > 0)
            ? <FlatList
                horizontal={false}
                style={styles.listContainer}
                numColumns={2}
                columnWrapperStyle={{maxWidth: '50%'}}
                horizontal={false}
                data={this.props.collectionItems}
                renderItem={({item, index}) => (
                    <TouchableOpacity style={{margin: 1, padding: 10, maxHeight: 250, backgroundColor: 'white'}} onPress={() => this.productClicked(item)}>
                        {(this.getPartnerName(item) == "amazon")
                            ? <View style={styles.partnerLogoContainer}>
                                <Image style={{width: '100%', height: '100%'}} resizeMode={'contain'} source={{uri: 'https://gwresourceblob.blob.core.windows.net/images/available_at_amazon_en_vertical_drk.png'}} />
                            </View>
                            : null
                        }
                        <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 20}}>
                            <Image style={{width: 100, height: 100}} source={{uri: item.image}} />
                        </View>
                        <View>
                            <Text 
                                style={{fontSize: 12}}
                                ellipsizeMode="tail"
                                numberOfLines={3}
                            >{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            : null
        return (
            <LinearGradient colors={['#1e5799', '#2989d8', '#7db9e8']} style={styles.contentContainer}>
                <Text style={{color: 'white', fontSize: 18}}>{this.props.title}</Text>
                {collectionsItems}
                
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        padding: 10,
        flex: 1,
        backgroundColor: '#9FC8E8'
    },
    productThumb: {
        maxHeight: 250,
        backgroundColor: 'white'
    },
    partnerLogoContainer: {
        width: 50,
        height: 50,
        position: 'absolute',
        zIndex: 99999,
        resizeMode: 'contain',
        left: 3,
        top: 0
    }
});

mapDispatchToProps = dispatch => {
    return {
        setIdeaCollectionItems: (collectionId) => dispatch(actions.setIdeaCollectionItems(collectionId)),
    }
};

mapStateToProps = state => {
    return {
        activeCollection: state.giftIdeasReducer.activeCollection,
        collectionItems: state.giftIdeasReducer.collectionItems,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GiftIdeasPage);
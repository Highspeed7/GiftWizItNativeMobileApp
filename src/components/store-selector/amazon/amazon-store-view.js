import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Overlay, Card } from 'react-native-elements';
import { View, Text, TextInput, StyleSheet, Image, Button, ScrollView, FlatList, Keyboard, TouchableOpacity, Linking, Alert } from 'react-native';

import * as actions from '../../../store/actions/index';
import AmazonProductCard from './amazon-product-card';
import WizardImg from '../../../../assets/images/wizard-finger.png';

class AmazonStoreView extends Component {
    state = {
        searchTerm: "",
        affiliateNotifOpen: true,
        showAmazonSearchCard: false
    }
    acknowledgeAffiliateOverlay = () => {
        this.setState({
            affiliateNotifOpen: false
        });
    }
    textEntered = (val) => {
        val.replace(",", "");
        
        this.setState({
            searchTerm: val
        });
    }
    getNextPage = () => {
        if(this.isResultEnd()) {
            this.setState({
                showAmazonSearchCard: true
            });
            return;
        }

        let searchQuery = {
            keywords: this.state.searchTerm,
            page: ++this.props.pageNum
        }

        this.props.searchAmazon(searchQuery);
    }
    isResultEnd = () => {
        let totalResultCount = this.props.raw.totalResultCount;
        if(totalResultCount > 100) {
            // We're only allowed 100 results with PAAPI v5
            totalResultCount = 100;
        }
        let nextPage = ++this.props.pageNum;
        if(totalResultCount <= 10) {
            return true;
        }else {
            if((totalResultCount/10) < nextPage) {
                return true;
            }else {
                return false;
            }
        }
    }
    searchAmazon = () => {
        Alert.alert("Going to amazon app now...");
        // Linking.openURL()
    }
    runSearchQuery = () => {
        Keyboard.dismiss();
        this.props.resetResultPage();
        let searchQuery = {
            keywords: this.state.searchTerm,
            page: 1
        }

        this.props.searchAmazon(searchQuery);
    }
    render() {
        return (
            <View style={styles.viewContainer}>
                <View>
                    <View>
                        <TextInput 
                            placeholder="Enter your search..."
                            onChangeText={this.textEntered}
                        ></TextInput>
                    </View>
                    <View>
                        <Button
                            title="Search"
                            onPress={this.runSearchQuery}
                        />
                    </View>
                </View>
                <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    onEndReached={this.getNextPage}
                    onEndReachedThreshold={1}
                    data={this.props.currentItems}
                    extraData={this.state.showAmazonSearchCard}
                    renderItem={({item}) => {
                        // If there is no image or offers, we don't need to display it for now.
                        if(item.images != null && item.offers != null) {
                            let imgHght = item.images.primary.large.width/4;
                            let imgWidth = item.images.primary.large.height/4;

                            return (
                                <AmazonProductCard item={item} imgHght={imgHght} imgWidth={imgWidth} />
                            )
                        }
                    }}
                    ListFooterComponent={
                        (this.state.showAmazonSearchCard == true)
                        ? <Card>
                            <TouchableOpacity
                                onPress={this.searchAmazon}
                            >
                                <Text>Click here to continue searching on Amazon...</Text>
                            </TouchableOpacity>
                        </Card>
                        : null
                    }
                />
                {/* <View>
                    {
                        
                    }
                </View> */}
                <Overlay
                    isVisible={this.state.affiliateNotifOpen == true}
                    onBackdropPress={this.acknowledgeAffiliateOverlay}
                >
                    <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
                        <Image source={WizardImg} style={{width: 200, height: 'auto', flex: 1}} resizeMode={'contain'} />
                    </View>
                    <View style={{marginBottom: 35}}>
                        <Text>Please note, we earn a small commission from products listed within this part of the application.</Text>
                    </View>
                    <View style={{marginBottom: 50}}>
                        <Text>Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates</Text>
                    </View>
                    <View>
                        <Button title="I understand" onPress={this.acknowledgeAffiliateOverlay} />
                    </View>
                </Overlay>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: 10,
        flex: 1,
        flexDirection: 'column'
    }
});

mapDispatchToProps = dispatch => {
    return {
        searchAmazon: (searchQuery) => dispatch(actions.searchAmazon(searchQuery)),
        resetResultPage: () => dispatch(actions.resetResultPage())
    }
}

mapStateToProps = state => {
    return {
        currentItems: state.partnersReducer.currentItems,
        pageNum: state.partnersReducer.pageNum,
        raw: state.partnersReducer.raw
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AmazonStoreView);
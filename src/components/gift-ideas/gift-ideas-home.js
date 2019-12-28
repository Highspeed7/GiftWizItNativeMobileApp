import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import { NavigationActions, StackActions, ScrollView, FlatList } from 'react-navigation';
import { Card, Overlay } from 'react-native-elements';
import { getGiftIdeaNavigationRoute } from '../../utils/giftIdea-utils';

import * as actions from '../../store/actions/index';
import LinearGradient from 'react-native-linear-gradient';
import WizardImg from '../../../assets/images/wizard-finger.png';

class GiftIdeasHome extends Component {
    // inAuthView = false;
    // componentDidMount = () => {
    //     this.inAuthView = (this.props.navigation.dangerouslyGetParent().state.routeName == "GiftIdeasAuthed");
    // }
    // openStoreFront = () => {
    //     this.props.uiStartLoading();
    //     if(this.inAuthView) {
    //         this.props.navigation.navigate("Store", {getPrevCheckout: true})
    //     }else {
    //         this.props.navigation.navigate("Store");
    //     }
    // }
    state = {
        affiliateNotifOpen: false
    }
    componentDidMount = async () => {
        if(this.props.affiliateNotificationSent == false) {
            this.setState({
                affiliateNotifOpen: true
            })
        }
        await this.props.getAllPromoCollections();
    }
    acknowledgeAffiliateOverlay = () => {
        this.setState({
            affiliateNotifOpen: false
        });
        this.props.setAffiliateNotifStatus(true);
    }
    navigateToIdeaPage = (collName, collectionId) => {
        this.props.setIdeaCollectionActive(collectionId);
        var route = getGiftIdeaNavigationRoute(collName)
        this.props.navigation.navigate(route);
    }
    render(){
        const promo_collections = (this.props.promoCollections && this.props.promoCollections.length > 0)
            ? <FlatList
                data={this.props.promoCollections}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => this.navigateToIdeaPage(item.name, item.id)}>
                        <Card>
                            <Text>{item.name}</Text>
                        </Card>
                    </TouchableOpacity>
                )}
            />
            : null
        return (
            <LinearGradient colors={['#1e5799', '#2989d8', '#7db9e8']} style={styles.contentContainer}>
                <Text style={styles.titleText}>Gift Ideas</Text>
                {promo_collections}
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
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    contentContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#9FC8E8'
    }
});

mapDispatchToProps = dispatch => {
    return {
        uiStartLoading: () => dispatch(actions.uiStartLoading()),
        getAllPromoCollections: () => dispatch(actions.getAllPromoCollections()),
        setIdeaCollectionActive: (collectionId) => dispatch(actions.setIdeaCollectionActive(collectionId)),
        setAffiliateNotifStatus: (value) => dispatch(actions.setAffiliateNotifStatus(value))
    };
};

mapStateToProps = state => {
    return {
        promoCollections: state.giftIdeasReducer.promoCollections,
        affiliateNotificationSent: state.giftIdeasReducer.affiliateNotificationSent
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GiftIdeasHome);

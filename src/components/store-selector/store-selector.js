import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    View, 
    Button, 
    Text, 
    Dimensions, 
    ScrollView, 
    TouchableOpacity, 
    Modal, 
    StyleSheet, 
    ImageBackground,
    Linking
} from 'react-native';

import * as actions from '../../store/actions/index';
import Swatch from '../swatch/swatch';
import AmazonView from './amazon/amazon-view';
import WalmartView from './walmart/walmart-view';
import TargetView from './target/target-view';

class StoreSelector extends Component {
    state = {
        amazonModalOpen: null,
        targetModalOpen: null,
        walmartModalOpen: null,
        orientation: '',
        canGoBack: false,
        webViewRef: null
    }
    componentDidMount = () => {
        this.getOrientation();

        Dimensions.addEventListener('change', () => {
            this.getOrientation();
        });
    }
    getOrientation = () => {
        if(this.refs.rootView) {
            if(Dimensions.get('window').width < Dimensions.get('window').height ) {
                this.setState({orientation: 'portrait'});
            }else {
                this.setState({orientation: 'landscape'});
            }
        }
    }
    openStoreModal = async(store) => {
        switch(store) {
            case "Amazon":
                this.setState({
                    amazonModalOpen: true,
                    targetModalOpen: null,
                    walmartModalOpen: null
                });
                break;
            case "Walmart":
                this.setState({
                    amazonModalOpen: null,
                    targetModalOpen: null,
                    walmartModalOpen: true
                });
                break;
            case "Target":
                this.setState({
                    amazonModalOpen: null,
                    targetModalOpen: true,
                    walmartModalOpen: null
                });
                break;
        }
    }
    closeModal = () => {
        if(this.state.canGoBack) {
            this.state.webViewRef.goBack();
        }else {
            this.setState({
                amazonModalOpen: null,
                targetModalOpen: null,
                walmartModalOpen: null
            });
        }
    }
    onItemAdded = async(data) => {
        await this.props.onItemAdded(data);
    }
    setGoBackStatus = (navState) => {
        console.log(navState.canGoBack);
        this.setState({
            canGoBack: navState.canGoBack
        })
    }
    setWebViewRef = (input) => {
        this.setState({
            webViewRef: input
        });
    }
    render() {
        return (
            <View ref="rootView">
                <View>
                    <Button title="Close" onPress={this.props.onClose} />
                </View>
                <ScrollView style={{marginTop: 10, paddingLeft: 10}}>
                    <View style={styles.listsContainer}>
                        <TouchableOpacity style={styles.touchableSwatch} onPress={() => this.openStoreModal("Amazon")}>
                            <Swatch>
                                <Text>Amazon</Text>
                                <Modal
                                    visible={this.state.amazonModalOpen}
                                    onRequestClose={this.closeModal}
                                >
                                    <AmazonView
                                        setRef={this.setWebViewRef}
                                        canGoBack={this.setGoBackStatus}
                                        url={{uri: 'https://www.amazon.com'}}
                                        onItemAdded={this.onItemAdded}
                                    />
                                </Modal>
                            </Swatch>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableSwatch} onPress={() => this.openStoreModal("Target")}>
                            <Swatch style={this.state.orientation == 'landscape' ? styles.storeSwatch : null}>
                                <View>
                                    <Text>Target</Text>
                                </View>
                                <View style={[{width: 50, height: 50, flexDirection: 'column'}, this.state.orientation == 'landscape' ? {alignContent: 'center'} : null]}>
                                    <ImageBackground style={{resizeMode: 'contain', width: '100%', height: '100%'}} source={{uri: "https://gwresourceblob.blob.core.windows.net/images/BullseyeNoR_17_200x200_rgb-min.jpg"}} />
                                </View>
                                <Modal
                                    visible={this.state.targetModalOpen}
                                    onRequestClose={this.closeModal}
                                >
                                    <TargetView 
                                        setRef={this.setWebViewRef}
                                        canGoBack={this.setGoBackStatus}
                                        url={{uri: 'https://www.target.com'}}
                                        onItemAdded={this.onItemAdded}   
                                    />
                                </Modal>
                            </Swatch>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchableSwatch} onPress={() => this.openStoreModal("Walmart")}>
                            <Swatch style={this.state.orientation == 'landscape' ? styles.storeSwatch : null}>
                                <View>
                                    <Text>Walmart</Text>
                                </View>
                                <View style={{width: 50, height: 50, flexDirection: 'column'}}>
                                    <ImageBackground style={{resizeMode: 'contain', width: '100%', height: '100%'}} source={{uri: "https://gwresourceblob.blob.core.windows.net/images/Walmart_Logos_TheSpark_blu_rgb.png"}}/>
                                </View>
                                <Modal
                                    visible={this.state.walmartModalOpen}
                                    onRequestClose={this.closeModal}
                                >
                                    <WalmartView 
                                        setRef={this.setWebViewRef}
                                        canGoBack={this.setGoBackStatus}
                                        url={{uri: 'https://www.walmart.com'}} 
                                    />
                                </Modal>
                            </Swatch>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    touchableSwatch: {
        width: '24%',
        margin: 1
    }, 
    listsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    storeSwatch: {
        flexDirection: 'column', 
        alignContent: 'center',
        alignItems: 'center'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onItemAdded: (data) => dispatch(actions.addWishListItem(data))
    }
}

export default connect(null, mapDispatchToProps)(StoreSelector);
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, TextInput, StyleSheet, Image, Button, ScrollView, FlatList } from 'react-native';

import * as actions from '../../../store/actions/index';
import AmazonProductCard from './amazon-product-card';

class AmazonStoreView extends Component {
    state = {
        searchTerm: ""
    }
    textEntered = (val) => {
        val.replace(",", "");
        
        this.setState({
            searchTerm: val
        });
    }
    runSearchQuery = (value) => {
        let searchQuery = {
            keywords: this.state.searchTerm,
            page: ++this.props.pageNum
        }

        this.props.searchAmazon(searchQuery);
    }
    render() {
        // let listItems = this.props.currentItems || undefined;
        // amazonItems = (typeof listItems.length == 'undefined' && listItems.items.length > 0)
        //     ? listItems.items.map((item) => (
        //         <Text>{item.itemInfo.title.displayValue}</Text>
        //     ))
        //     :null
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
                    data={this.props.currentItems.items}
                    renderItem={({item}) => {
                        let imgHght = item.images.primary.large.width/4;
                        let imgWidth = item.images.primary.large.height/4;
                        return (
                            <AmazonProductCard item={item} imgHght={imgHght} imgWidth={imgWidth} />
                        )
                    }}
                />
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
        searchAmazon: (searchQuery) => dispatch(actions.searchAmazon(searchQuery))
    }
}

mapStateToProps = state => {
    return {
        currentItems: state.partnersReducer.currentItems,
        pageNum: state.partnersReducer.pageNum
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AmazonStoreView);
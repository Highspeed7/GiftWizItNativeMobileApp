import StoreSelector from '../store-selector/store-selector';
import { createStackNavigator } from 'react-navigation-stack';
import AmazonStoreView from '../store-selector/amazon/amazon-store-view';

const StoreSelectorModalStack = createStackNavigator({
    "Main": {
        screen: StoreSelector
    },
    "AmazonStore": {
        screen: AmazonStoreView
    }
},
{
    headerMode: 'none',
    mode: 'modal'
});

const WishListModalStack = createStackNavigator({
    "StoreSelector": {
        screen: StoreSelectorModalStack
    }
},
{
    headerMode: 'none'
});

export default WishListModalStackNavigator = createStackNavigator({
    "WishListModals": {
        screen: WishListModalStack
    }
},
{
    headerMode: 'none',
    mode: 'modal'
});
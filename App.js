import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProductScreen from './components/ProductScreen';
import ProductDetailsScreen from './components/ProductDetailsScreen';
import ProductAddScreen from './components/ProductAddScreen';
import ProductEditScreen from './components/ProductEditScreen';

const RootStack = createStackNavigator(
  {
    Product: ProductScreen,
    ProductDetails: ProductDetailsScreen,
    AddProduct: ProductAddScreen,
    EditProduct: ProductEditScreen,
  },
  {
    initialRouteName: 'Product',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777777',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const RootContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <RootContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, ActivityIndicator, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Database from '../Database';

const db = new Database();

export default class ProductDetailScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Lista de Produto',
      headerRight: (
        <Button
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
          onPress={() => { 
            navigation.navigate('AddProduct', {
              onNavigateBack: this.handleOnNavigateBack
            }); 
          }}
        />
      ),
    };
  };

  constructor() {
    super();
    this.state = {
      isLoading: false,
      product: {},
      id: '',
    };
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      const { navigation } = this.props;
      db.productById(navigation.getParam('prodId')).then((data) => {
        console.log(data);
        product = data;
        this.setState({
          product,
          isLoading: false,
          id: product.prodId
        });
      }).catch((err) => {
        console.log(err);
        this.setState = {
          isLoading: false
        }
      })
    });
  }

  deleteProduct(id) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    db.deleteProduct(id).then((result) => {
      console.log(result);
      this.props.navigation.goBack();
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }

  render() {
  if(this.state.isLoading){
    return(
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
  return (
    <ScrollView>
      <Card style={styles.container}>
        <View style={styles.subContainer}>
          <View>
            <Image
              style={{width: 150, height: 150}}
              source={{uri: this.state.product.prodImage}}
            />
          </View>
          <View>
            <Text style={{fontSize: 16}}>ID: {this.state.product.prodId}</Text>
          </View>
          <View>
            <Text style={{fontSize: 16}}>Nome: {this.state.product.prodName}</Text>
          </View>
          <View>
            <Text style={{fontSize: 16}}>Descriçao: {this.state.product.prodDesc}</Text>
          </View>
          <View>
            <Text style={{fontSize: 16}}>Preço: {this.state.product.prodPrice}</Text>
          </View>
        </View>
        <View style={styles.detailButton}>
          <Button
            large
            backgroundColor={'#CCCCCC'}
            leftIcon={{name: 'edit'}}
            title='Editar'
            onPress={() => {
              this.props.navigation.navigate('EditProduct', {
                prodId: `${this.state.id}`,
              });
            }} />
        </View>
        <View style={styles.detailButton}>
          <Button
            large
            backgroundColor={'#999999'}
            color={'#FFFFFF'}
            leftIcon={{name: 'delete'}}
            title='Excluir'
            onPress={() => this.deleteProduct(this.state.id)} />
        </View>
      </Card>
    </ScrollView>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailButton: {
    marginTop: 10
  }
})
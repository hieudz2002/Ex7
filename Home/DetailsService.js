import React from 'react';
import { View, Text, Button, Alert, Pressable} from 'react-native';


const DetailService = ({ route }) => {
  const { serviceName, price } = route.params;
const OrderService = () => {
  Alert.alert("Success","Order Successfully")
}
  return (
    <View>
    <View style={{padding: 10}}>
      <Text>Service Name: {serviceName}</Text>
      <Text>Price: {price}</Text>
    </View>
    <View style={{justifyContent: 'center', padding: 10,paddingTop:0 }}>
                <Pressable 
                style={{backgroundColor: "red", 
                alignItems:'center',
                padding: 15, 
                borderRadius:10, 
            }}
            onPress={OrderService}>
                   <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>Order Now</Text>
                </Pressable>
                </View>
    </View>
  );
};



export default DetailService;

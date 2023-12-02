import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Pressable, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-virtualized-view'
import { UserProvider, UserContext } from '../context/UseContext';

const Service = ({ navigation }) => {
    const [services, setServices] = useState([]);
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        const unsubscribe = firestore().collection('services').onSnapshot((snapshot) => {
            const servicesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setServices(servicesData);
        });

        return () => unsubscribe();
    }, []);

    const handleDetails = (service) => {
        navigation.navigate('DetailsService', {
            serviceName: service.serviceName,
            price: service.price,
        });
    };

    const handleEdit = (service) => {
        navigation.navigate('EditService', { id: service.id });
    };

    const handleDelete = async (service) => {
        try {
            Alert.alert(
                'Warning',
                'Are you sure?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Delete',
                        onPress: async () => {
                            await firestore().collection('services').doc(service.id).delete();
                        },
                        style: 'destructive',
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Error deleting service: ', error);
            Alert.alert('Error', 'An error occurred while deleting the service');
        }
    };

    return (
        <View>
            <View style={styles.container}>
                <View>
                    <Text style={{ fontWeight: '600' }}>Danh sách dịch vụ</Text>
                </View>
                {userInfo && userInfo.role === 'admin' ? (
                    <TouchableOpacity onPress={() => navigation.navigate('AddService')}>
                        <Text>
                            <Icon name="add-circle" size={45} style={{ color: 'blue' }} />
                        </Text>
                    </TouchableOpacity>
                ):null}
            </View>
            <ScrollView>
                <FlatList
                    data={services}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <View style={styles.item}>
                                <TouchableOpacity onPress={() => handleDetails(item)}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.serviceName}</Text>
                                            <Text>{item.price + " đ"}</Text>
                                        </View>
                                        {userInfo && userInfo.role === 'admin' && (
                                            <View style={{ flexDirection: 'row' }}>
                                                <Pressable onPress={() => handleEdit(item)}>
                                                    <View style={{ backgroundColor: 'green', padding: 10, borderRadius: 50, marginRight: 10 }}>
                                                        <Text>
                                                            <Icon name="edit" size={20} style={{ color: 'white' }} />
                                                        </Text>
                                                    </View>
                                                </Pressable>
                                                <Pressable onPress={() => handleDelete(item)}>
                                                    <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 50 }}>
                                                        <Text>
                                                            <Icon name="delete" size={20} style={{ color: 'white' }} />
                                                        </Text>
                                                    </View>
                                                </Pressable>
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    item: {
        width: '100%',
        borderWidth: 1,
        padding: 15,
        borderColor: 'gray',
        borderRadius: 10,
    }
});

export default Service;

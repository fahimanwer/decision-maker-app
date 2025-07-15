import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '../types';

// Import screens (will be created in subsequent tasks)
// import HomeScreen from '../screens/HomeScreen';
// import CreateDecisionScreen from '../screens/CreateDecisionScreen';
// import DecisionDetailScreen from '../screens/DecisionDetailScreen';
// import AnalysisScreen from '../screens/AnalysisScreen';

const Stack = createStackNavigator<RootStackParamList>();

// Placeholder component for screens not yet implemented
const PlaceholderScreen = ({ route }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {route.name} Screen - Coming Soon
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={PlaceholderScreen}
          options={{ title: 'Decision Maker' }}
        />
        <Stack.Screen 
          name="CreateDecision" 
          component={PlaceholderScreen}
          options={{ title: 'Create Decision' }}
        />
        <Stack.Screen 
          name="DecisionDetail" 
          component={PlaceholderScreen}
          options={{ title: 'Decision Details' }}
        />
        <Stack.Screen 
          name="Analysis" 
          component={PlaceholderScreen}
          options={{ title: 'Decision Analysis' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
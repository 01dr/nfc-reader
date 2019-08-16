import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NfcManager from 'react-native-nfc-manager';

const App = () => {
  const [tag, setTag] = useState(null);

  useEffect(() => {
    NfcManager.start()
      .then(result => {
        NfcManager.registerTagEvent(setTag);
      })
      .catch(console.error);

    return () => {
      NfcManager.unregisterTagEvent()
        .then('NfcManager stopped')
        .catch(console.error);
    };
  });

  return (
    <View style={styles.container}>
      {tag ? (
        <Text style={styles.text}>tag ID: {tag.id}</Text>
      ) : (
        <Text style={styles.text}>Scan something</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#50d8d7',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#333',
  },
});

export default App;

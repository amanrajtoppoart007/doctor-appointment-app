import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const PaymentGateway = props => {
  const {paymentUrl} = props.route.params;
  const runFirst = 'window.ReactNativeWebView.postMessage("");';
  return (
    <WebView
      source={{uri: paymentUrl}}
      onMessage={response => {
        console.log('Response ', response);
      }}
      javaScriptEnabled={true}
      injectedJavaScript={runFirst}
      style={Styles.container}
    />
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PaymentGateway;

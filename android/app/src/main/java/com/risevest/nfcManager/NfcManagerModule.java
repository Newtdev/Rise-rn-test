package com.Risevest.nfcManager;

import android.content.Intent;
import android.nfc.NfcAdapter;
import android.provider.Settings;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ReactApplicationContext;


public class NfcManagerModule extends ReactContextBaseJavaModule {

    private NfcAdapter mNfcAdapter;
    //initialize the NFC Adapters
    public NfcManagerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mNfcAdapter = NfcAdapter.getDefaultAdapter(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "NfcManager";
    }



    @ReactMethod
    public void isNfcAvailable(Promise promise) {
        try {
            boolean isAvailable = mNfcAdapter != null;
            if(!isAvailable){
                promise.resolve(false);
            }else{
                promise.resolve(true);
                checkNfcEnabled();
            }

        } catch (Exception e) {
            promise.reject("NFC Availability Error", e);
        }
    }


    @ReactMethod
    public boolean isNfcEnabled() {
        return mNfcAdapter.isEnabled();
    }

    @ReactMethod
    public void launchNfcSettings() {
        Intent intent = new Intent(android.provider.Settings.ACTION_NFC_SETTINGS);
        getReactApplicationContext().startActivity(intent);
    }


    public String checkNfcEnabled() {

        if (mNfcAdapter != null) {
            if (!mNfcAdapter.isEnabled()) {
                showWirelessSettings();
            } else {
                sendEvent("nfcEnabled", null);

            }
        } else {

            sendEvent("nfcNotSupported", null);
            return "not supported";
        }
        return null;
    }

    private void showWirelessSettings() {
        Toast.makeText(getReactApplicationContext(), "You need to enable NFC", Toast.LENGTH_SHORT).show();
        Intent intent = new Intent(Settings.ACTION_NFC_SETTINGS);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK); // Allow starting from background
        getReactApplicationContext().startActivity(intent);
    }

    private void sendEvent(String eventName, WritableMap data) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, data);
    }
}
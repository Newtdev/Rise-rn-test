package com.Risevest.sound;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Package for the SoundModule native module.
 */
public class SoundModulePackage implements ReactPackage {

    /**
     * Creates view managers for the package.
     *
     * @param reactContext React application context.
     * @return List of view managers.
     */
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return new ArrayList<>();
    }

    /**
     * Creates native modules for the package.
     *
     * @param reactContext React application context.
     * @return List of native modules.
     */
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        // Java 9 and later
        return List.of(new SoundModule(reactContext));
        // Java 8 and earlier
        // return Collections.singletonList(new SoundModule(reactContext));
    }
}
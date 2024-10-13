package com.Risevest.sound;

import android.media.MediaPlayer;

import com.Risevest.R;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Sound module for React Native.
 */
public class SoundModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext context;
    private MediaPlayer mediaPlayer;

    /**
     * Constructor.
     *
     * @param reactContext React application context.
     */
    public SoundModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "Sound";
    }

    /**
     * Releases the media player resources.
     */
    private void releaseMediaPlayer() {
        if (mediaPlayer != null) {
            if (mediaPlayer.isPlaying()) {
                mediaPlayer.stop();
            }
            mediaPlayer.release();
            mediaPlayer = null;
        }
    }

    /**
     * Plays a sound.
     */
    @ReactMethod
    public void playSound() {
        try {
            releaseMediaPlayer();
            mediaPlayer = MediaPlayer.create(this.getReactApplicationContext(), R.raw.sound);
            mediaPlayer.start();
        } catch (Exception e) {
            // Log or report the error
            e.printStackTrace();
        }
    }

    /**
     * Stops the sound.
     */
    @ReactMethod
    public void stopSound() {
        releaseMediaPlayer();
    }
}
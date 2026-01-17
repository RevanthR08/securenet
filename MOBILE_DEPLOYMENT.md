# SentinelX Mobile App Deployment Guide

## 📱 Capacitor Integration Complete!

Your React web app is now ready to be deployed as **native mobile apps** for iOS and Android using the **same codebase**!

---

## 🚀 Quick Start Commands

### Build for Web
```bash
npm run build
```

### Build for Mobile (Android + iOS)
```bash
npm run build:mobile
```
This builds your web app and syncs it with both Android and iOS projects.

### Open in Android Studio
```bash
npm run open:android
```

### Open in Xcode (macOS only)
```bash
npm run open:ios
```

### Sync Changes to Mobile
```bash
npm run sync
```
Use this after making code changes to update the mobile apps.

---

## 📦 Project Structure

```
securenet/
├── android/           # Native Android project
├── ios/               # Native iOS project (macOS only)
├── dist/              # Built web files (generated)
├── src/               # Your React source code
└── capacitor.config.json  # Capacitor configuration
```

---

## 🔧 Development Workflow

### 1. Develop on Web First
```bash
npm run dev
```
Test all features in the browser at http://localhost:5173

### 2. Build for Mobile
```bash
npm run build:mobile
```

### 3. Test on Android
```bash
npm run open:android
```
- Click "Run" button in Android Studio
- App will launch on emulator or connected device

### 4. Test on iOS (macOS only)
```bash
npm run open:ios
```
- Select target device/simulator in Xcode
- Click "Play" button to run

---

## 📱 Android Development

### Prerequisites
- **Android Studio** installed
- **Java JDK 11+** installed
- Android SDK configured

### Building APK
1. Open Android Studio: `npm run open:android`
2. Build → Build Bundle(s) / APK(s) → Build APK(s)
3. APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Building Release AAB (for Google Play)
1. Open Android Studio
2. Build → Generate Signed Bundle / APK
3. Follow the signing wizard
4. Upload to Google Play Console

---

## 🍎 iOS Development

### Prerequisites (macOS only)
- **Xcode** installed
- **CocoaPods** installed: `sudo gem install cocoapods`
- Apple Developer Account ($99/year for App Store)

### Building for iOS
1. Open Xcode: `npm run open:ios`
2. Select your development team in signing settings
3. Choose target device or simulator
4. Click "Run" button

### Building for App Store
1. Product → Archive in Xcode
2. Distribute App → App Store Connect
3. Upload to TestFlight or submit for review

---

## 🔄 Updating the App After Code Changes

Whenever you modify your React code:

```bash
# Rebuild and sync
npm run build:mobile

# Or just sync if you only changed web assets
npm run sync
```

Then re-run the app in Android Studio or Xcode.

---

## 🎨 App Icons & Splash Screens

### Generate Assets
1. Create a 1024x1024px icon: `resources/icon.png`
2. Create a 2732x2732px splash: `resources/splash.png`
3. Install Capacitor Assets:
   ```bash
   npm install @capacitor/assets --save-dev
   npx capacitor-assets generate
   ```

---

## 🔌 Adding Capacitor Plugins

SentinelX can use native device features!

### Example: Camera Access
```bash
npm install @capacitor/camera
npx cap sync
```

### Example: File System
```bash
npm install @capacitor/filesystem
npx cap sync
```

### Available Plugins
- Camera
- Geolocation
- Storage
- Network
- Push Notifications
- Biometric Auth
- And many more!

See: https://capacitorjs.com/docs/plugins

---

## 🐛 Troubleshooting

### "Command not found: npx"
- Make sure Node.js is installed
- Restart your terminal

### Android Studio won't open
- Make sure Android Studio is installed
- Set ANDROID_HOME environment variable

### Xcode won't build
- Run `pod install` in the `ios/App` directory
- Clean build folder: Product → Clean Build Folder

### App not updating
```bash
npm run build:mobile
```
Make sure to rebuild and sync after code changes.

---

## 📲 App Configuration

Edit `capacitor.config.json` to customize:

```json
{
  "appId": "com.sentinelx.app",
  "appName": "SentinelX",
  "webDir": "dist",
  "server": {
    "androidScheme": "https"
  }
}
```

---

## 🎯 Next Steps

1. **Test on real devices** - Use your Android phone or iPhone
2. **Add app icons** - Create branded icons and splash screens
3. **Enable native features** - Add Capacitor plugins as needed
4. **Prepare for release** - Generate signed builds for app stores
5. **Submit to stores** - Publish to Google Play and App Store

---

## 📚 Resources

- **Capacitor Docs**: https://capacitorjs.com/docs
- **Android Publishing**: https://developer.android.com/distribute
- **iOS Publishing**: https://developer.apple.com/app-store/submissions/

---

**Congratulations!** 🎉 Your SentinelX app is now ready for mobile deployment!

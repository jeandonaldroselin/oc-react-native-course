Movies And Me
=============


This project is created while following a [React Native course on Open Classrooms](https://openclassrooms.com/fr/courses/4902061-developpez-une-application-mobile-react-native).

This mobile application allow you to search films from [The Movie Database ( themoviedb.org )](https://themoviedb.org).

Available features are :
 
-> Search a film ( search field )

-> Load more films ( infinite scroll )

-> See the detail of a film,

-> (Un)Mark a film as your favorite


Installation
-------------

As this mobile application is a React Native app with native code, you will need to follow theses steps :


* Install Epo cli globally

```npm install -g react-native-cli```


* Install the project JS dependencies

```
$ cd oc-react-native-course/
$ npm i
$ npm start
```


* Install the project IOS dependencies and run IOs

```
$ cd oc-react-native-course/ios/
$ pod install --repo-update
$ cd ../
$ npm run ios
```

* Install the project Android dependencies and run Android

```
$ cd oc-react-native-course/android/
$ xyz_command
$ cd ../
$ npm run android
```

* Finally

If you have an Iphone device, open your camera in front of the QR Code, it will suggest you to open the 

expo client app. just click and the app will launch !! :)

If you have an Android device, open the expo client app, then use the scan QR Code functionality,

and the app will launch !! :)

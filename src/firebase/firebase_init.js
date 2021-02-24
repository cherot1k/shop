import firebase from "firebase/app";

export default function init (){
    var firebaseConfig = {
        apiKey: "AIzaSyDL5p1aGkZWDe9qlvY0Kn-n2RMtg__xTmk",
        authDomain: "framessite-244e2.firebaseapp.com",
        projectId: "framessite-244e2",
        storageBucket: "framessite-244e2.appspot.com",
        messagingSenderId: "43789150410",
        appId: "1:43789150410:web:219e69e8330cc4f8952c33"
    };
// Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}
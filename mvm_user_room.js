
// Your web app's Firebase configuration
const firebaseConfig = {
      apiKey: "AIzaSyB3OnCPSR94JQdCsHLEna2RFDQtmRdrODU",
      authDomain: "maharishi-original.firebaseapp.com",
      databaseURL: "https://maharishi-original-default-rtdb.firebaseio.com",
      projectId: "maharishi-original",
      storageBucket: "maharishi-original.appspot.com",
      messagingSenderId: "745844309953",
      appId: "1:745844309953:web:0c2fe9aeb5f84551893940"
    };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);




document.getElementById("uy").onclick=function(){
  
        
user_name=document.getElementById("user_name1").value;
firebase.database().ref("/").child(user_name).update({
      purpose:"adding user"
});
localStorage.setItem("user_name",user_name);
room_name=document.getElementById("room_name2").value;
firebase.database().ref("/").child(room_name).update({
      purpose:"adding room"
});
localStorage.setItem("room_name",room_name);
window.location="mvm_page.html";
}
document.getElementById("pr3").onclick=function(){
      window.location="tips.html";
}

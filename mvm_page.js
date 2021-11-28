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


  user_name= localStorage.getItem("user_name");
  room_name= localStorage.getItem("room_name");

document.getElementById("user").innerHTML="Welcome_"+user_name+"!"

document.getElementById("s-btn").onclick=function(){
  alert("Pls upload the image of the issue");
      message= document.getElementById("send_message").value;
      firebase.database().ref(room_name).push({
        name:user_name,
        message:message,
        
        
      });
   document.getElementById("send_message").value="";
      
}
window.addEventListener("keydown",my_keydown)

function my_keydown(e){
  keyPressed = e.keyCode;
  console.log(keyPressed);
  if(keyPressed==13){
    alert("Plese upload the image of the issue");
      message= document.getElementById("send_message").value;
      firebase.database().ref(room_name).push({
        name:user_name,
        message:message,
        
        
      });
   document.getElementById("send_message").value="";
  }
}

function getData() 
{ firebase.database().ref("/"+room_name).on('value', function(snapshot)
 { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot)
  { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose")
   {
     firebase_message_id = childKey;
     message_data = childData;

//Start code

  console.log(firebase_message_id);
  console.log(message_data);
  user_name=message_data["name"];
  message=message_data["message"];

  image=message_data["Image"];
  image_with_tag="<h4> <button class='form-group' id='r-btn' onclick='retrie(this.id)'>"+'Retrieve picture'+"</button></h3><hr>";
  name_with_tag="<h4>"+user_name+"<img class='user_tick' src='images.jpg' style=width:20px; </h4>";
  message_with_tag="<h4 class='message_h4'>"+message+"</h4>";

  row= name_with_tag+ message_with_tag+ image_with_tag;
  document.getElementById("output").innerHTML +=row;
  console.log(row)
//End code

  }
 }); 
 });
 }
getData();


function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location="mvm.html";
}

var ImageName, ImageUrl;
var files=[];
var reader;

function select(e){
  var input=document.createElement('input');
  input.type='file';
 

  input.onchange= e=>{
        files=e.target.files;
        reader= new FileReader();
        reader.onload= function(){
              document.getElementById('myimg').src=reader.result;
        }
        reader.readAsDataURL(files[0])
  }
  input.click();
}


document.getElementById("u-btn").onclick=function(){
  ImageName= document.getElementById('image_name').value;
 
  if(ImageName==""){
    alert("Pls enter image name");
  }
 else{

  var uploadTask= firebase.storage().ref('Photo/'+ImageName+'.png').put(files[0]);

  uploadTask.on('state_changed', function(snapshot){
   var progress= (snapshot.bytesTransferred/ snapshot.totalBytes)*100;
   document.getElementById('bytes').innerHTML='Upload'+progress+'%';
  },
  function(error){
        alert('error in saving image');
  },

  function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(url){
              ImageUrl= url;
       
            firebase.database().ref('pictures/'+ImageName).set({
                  Name: ImageName,
                  Link: ImageUrl
            });
          }
          );
        alert('Image added successfully');
       });
}
}

function retrie(){
  alert("Pls wait for sometime");
  ImageName=document.getElementById("image_name").value;
  if(ImageName==""){
    alert("Pls enter the image name in the 2nd text box and click on this button again");
}
else{
  firebase.database().ref('pictures/'+ImageName).on('value',function(snapshot){
document.getElementById("myimg").src=snapshot.val().Link;
  });
}
}



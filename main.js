import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js'

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics


// Add Firebase products that you want to use
import {getAuth, signInAnonymously,onAuthStateChanged,GoogleAuthProvider,signInWithPopup, signInWithRedirect ,getRedirectResult, browserSessionPersistence,setPersistence, inMemoryPersistence} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js'
import {getFirestore,collection, addDoc, getDoc, doc,setDoc,onSnapshot,query, where } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js'
import { getDatabase, ref, push, set, get ,onChildAdded, onChildChanged, onChildRemoved, onValue, child, update, remove } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js'

const firebaseConfig = {
    apiKey: "AIzaSyDNvlEll99XzGCGwzT53dwYv2PZOUuCsPM",
    authDomain: "einkaufsliste-mussger.firebaseapp.com",
    databaseURL: "https://einkaufsliste-mussger-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "einkaufsliste-mussger",
    storageBucket: "einkaufsliste-mussger.appspot.com",
    messagingSenderId: "994549872336",
    appId: "1:994549872336:web:05ef42227c4c9d0e8650d5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  console.log("connection test")

  const auth = getAuth(app);

  
  var user 
 
  var users = new Array

  const schoppingList = ref(db, 'Shopping');

 


 

 
            
            function loginGoogle () {
             
    const provider = new GoogleAuthProvider()
 signInWithRedirect(auth, provider)

                 
            }
                    // This gives you a Google Access Token. You can use it to access the Google API.
  

                    getRedirectResult(auth)
                        .then((result) => {
                            const credential = GoogleAuthProvider.credentialFromResult(result);
                            const token = credential.accessToken;
                            // The signed-in user info.
                            console.log(result)
                            user = result.user;
                            users[users.length]= user
                            logUser()
                           
                        }).catch((error) => {
                            // Handle Errors here.
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // The email of the user's account used.
                          
                            // The AuthCredential type that was used.
                            const credential = GoogleAuthProvider.credentialFromError(error);

                            console.log(errorCode,errorMessage,credential)
                            // ...
                            if (!user) { loginGoogle()
                                console.log("redirecting")}
                        })
                       
                       
                    



            function loginAnon() {
                console.log("logging in undercover")
                signInAnonymously(auth)
                    .then((result) => {
                                 user = result.user;
                                 user.displayName = "anon"
                                 users[users.length]= user
                                })
                                .catch((error) => {
                                    const errorCode = error.code;
                                    console.log(errorCode,errorMessage)
                                    const errorMessage = error.message;
                                    })


                                    onAuthStateChanged(auth, (usertest) => {
                                        if (user) {
                                            // https://firebase.google.com/docs/reference/js/firebase.User
                                            // User is signed in, see docs for a list of available properties
                                            
                                            const uid = useretst.uid;
                                 
                                                } 
                                        
                                        else {
                                        }
                                        // ...
                                    })
                                    
            }

    

            function logUser() {
                console.log(user)
                var greeting = document.createElement("h2")
                greeting.innerText = "Hallo " + user.displayName
                greeting.style.setProperty("--test", "url(" + user.photoURL + ")")
                greeting.setAttribute("img-data",user.photoURL)
                greeting.classList.add("greeting")
                document.body.prepend(greeting)

                
            }

             
       

            document.getElementById("addItem").addEventListener("click", addItem);
            function addItem () {
                
              var Item = document.getElementById("Item").value
              var Shop = document.getElementById("Shops").value
             
                if ( !document.getElementById("Item").value) {
                    alert("no Item!") 
                    return
                }

                if ( !document.getElementById("Shops").value) {
                    Shop = "Lidl"
                }

                else {
                    var Shop = document.getElementById("Shops").value
                }
            
            const newPostRef = push(schoppingList);

            let theKey = newPostRef.key
            set(newPostRef, {
               Item : Item,
               Shop : Shop,
               Critical : document.getElementById("Critical").checked,
               
               bought : false,
                added : new Date().toLocaleDateString('de-de'),
                by : user.displayName,
                key : theKey
               



            });
            document.getElementById('myform').reset()
        }





onValue(schoppingList, (snapshot) => {
    var theList = document.getElementById("List")
    theList.innerHTML=""
  const data = snapshot.val();
        
    console.log(Object.values(data))
    

    let i = 0
    Object.values(data).forEach(Item => {
        var listItem = document.createElement("div")
        listItem.classList.add("list-item")

        var itemName = document.createElement("h2")
        itemName.innerText = Item.Item
        listItem.append(itemName)

        var shop = document.createElement("span")
        shop.innerText = Item.Shop
        shop.setAttribute("shop", Item.Shop)
        shop.classList.add("shop")
        shop.classList.add(Item.Shop)
        listItem.append(shop)
        
        var dateR = document.createElement("span")
        dateR.innerText = Item.added
        dateR.setAttribute("date",Item.added)
        dateR.classList.add("date")
        listItem.append(dateR)

        
        if (Item.Critical) {
                                listItem.classList.add("critical")}
        
        
   
        
        
        var del = document.createElement("button")
        
        listItem.append(del)
        
        del.dataset.Index = Item.key
        del.addEventListener("click", removeItem, false)
  
        theList.append(listItem)

        i++
    })


}
)

function removeItem(event) {
  

  const updates = {};
  updates['/Shopping/'+ event.currentTarget.dataset.Index] = null;
  update(ref(db), updates)

}



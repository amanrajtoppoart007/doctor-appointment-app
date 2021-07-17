import firebase from 'firebase';

class FireChat {
  constructor() {
    this.init();

    // this.observeAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: 'AIzaSyBHkdXbexZfVhTR32djelOun8l-DX2Ge2g',
        authDomain: 'telemedicine-30401.firebaseapp.com',
        databaseURL: 'https://telemedicine-30401-default-rtdb.firebaseio.com',
        projectId: 'telemedicine-30401',
        storageBucket: 'telemedicine-30401.appspot.com',
        messagingSenderId: '986814259509',
        appId: '1:986814259509:web:3e54ebb624b20af59bec7c',
      });
    }
  };

  observeAuth = () => {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  };

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({message}) {
        alert(message);
      }
    }
  };

  get db() {
    return firebase.database();
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  get userRef() {
    return firebase.database().ref('messages');
  }

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  off() {
    this.ref.off();
  }

  parse = snapshot => {
    const {timestamp: numberStamp, text, user} = snapshot.val();
    const {key: _id} = snapshot;

    const timestamp = new Date(numberStamp);

    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  senderMsg = async (msgValue, currentUserId, guestUserId) => {
    let currentDate = new Date();
    var dd = String(currentDate.getDate()).padStart(2, '0');
    var mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = currentDate.getFullYear();
    console.log(msgValue, currentUserId, guestUserId);
    try {
      return await firebase
        .database()
        .ref('messeges/' + currentUserId)
        .child(guestUserId)
        .push({
          messege: {
            sender: currentUserId,
            reciever: guestUserId,
            msg: msgValue,
            time:
              String(currentDate.getHours()) +
              ':' +
              String(currentDate.getMinutes()) +
              ' ' +
              dd +
              '-' +
              mm +
              '-' +
              yyyy,
          },
        });
    } catch (error) {
      return error;
    }
  };

  receiveMsg = async (msgValue, currentUserId, guestUserId) => {
    let currentDate = new Date();
    var dd = String(currentDate.getDate()).padStart(2, '0');
    var mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = currentDate.getFullYear();
    try {
      return await firebase
        .database()
        .ref('messeges/' + guestUserId)
        .child(currentUserId)
        .push({
          messege: {
            sender: currentUserId,
            reciever: guestUserId,
            msg: msgValue,
            time:
              String(currentDate.getHours()) +
              ':' +
              String(currentDate.getMinutes()) +
              ' ' +
              dd +
              '-' +
              mm +
              '-' +
              yyyy,
          },
        });
    } catch (error) {
      return error;
    }
  };

  getMessages = (currentUserId, guestUserId, onResponse) => {
    try {
      firebase
        .database()
        .ref('messeges')
        .child(currentUserId)
        .child(guestUserId)
        .on('value', dataSnapshot => {
          let msgs = [];
          dataSnapshot.forEach(child => {
            msgs.push({
              sendBy: child.val().messege.sender,
              recievedBy: child.val().messege.reciever,
              text: child.val().messege.msg,
              type: child
                .val()
                .messege.msg.includes('https://firebasestorage.googleapis.com')
                ? 'image'
                : 'text',
              time:
                child.val().messege.time === undefined
                  ? ''
                  : child.val().messege.time,
            });
          });
          onResponse(msgs);
        });
    } catch (error) {}
  };

  getUserChatList = (currentUserId, onResponse) => {
    try {
      firebase
        .database()
        .ref('messeges')
        .child(currentUserId)
        .on('value', dataSnapshot => {
          const chatList = [];
          dataSnapshot.forEach(userChild => {
            const messageCount = Object.keys(userChild.val());
            const lastMessage =
              userChild.val()[messageCount[messageCount.length - 1]];
            this.getUserData(userChild.key, response => {
              let message = lastMessage.messege.msg.includes(
                'https://firebasestorage.googleapis.com',
              )
                ? 'Photo Uploaded'
                : lastMessage.messege.msg;
              chatList.push({
                name: response.name,
                sendBy: lastMessage.messege.sender,
                recievedBy: lastMessage.messege.reciever,
                message:
                  currentUserId == lastMessage.messege.sender
                    ? `You: ${message}`
                    : message,
                guestUserId: userChild.key,
              });
              onResponse(chatList);
            });
          });
        });
    } catch (error) {}
  };

  addUser = async (id, data) => {
    console.log(id, data);
    try {
      return await this.db
        .ref(`users/${id}`)
        .once('value')
        .then(dataSnapshot => {
          if (dataSnapshot.val() != null) {
            this.updateUser(id, data, dataSnapshot);
          } else {
            this.createUser(id, data);
          }
        });
    } catch (error) {
      return error;
    }
  };

  updateUser = async (id, data, dataSnapshot) => {
    for (let autoKey in dataSnapshot.val()) {
      try {
        return await this.db.ref(`users/${id}`).child(autoKey).update(data);
      } catch (error) {
        return error;
      }
    }
  };

  createUser = async (id, data) => {
    try {
      return await this.db.ref(`users/${id}`).push(data);
    } catch (error) {
      return error;
    }
  };

  getUserData = async (id, onResponse) => {
    try {
      return await firebase
        .database()
        .ref('users/' + id)
        .once('value', dataSnapshot => {
          dataSnapshot.forEach(child => {
            onResponse(child.val());
          });
        });
    } catch (error) {
      return error;
    }
  };

  uploadImageToStoarge = async (
    location,
    filename,
    uploadUri,
    mime,
    onResponse,
  ) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uploadUri, true);
      xhr.send(null);
    });

    const uploadTask = firebase
      .storage()
      .ref(location)
      .child(filename)
      .put(blob, {contentType: mime});

    uploadTask.on(
      'state_changed',
      snapshot => {
        console.log(snapshot.totalBytes);
      },
      err => {
        console.log(err);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          onResponse(downloadURL);
        });
      },
    );
  };

  append = message => this.ref.push(message);
}
FireChat.shared = new FireChat();
export default FireChat;

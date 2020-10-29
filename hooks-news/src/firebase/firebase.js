import app from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from './config'

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig)
    this.auth = app.auth()
  }

  async register(name, email, password) {
    // user作成
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    )
    console.log(newUser)
    // 作成したuserにnameをset
    return await newUser.user.updateProfile({
      displayName: name,
    })
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password)
  }

  async logout() {
    await this.auth.signOut()
  }
}

const firebase = new Firebase()
export default firebase

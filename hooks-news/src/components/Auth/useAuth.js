import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'

function useAuth() {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    // listenerをreturn
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
    })
    // cleaning up listener
    return () => unsubscribe()
  }, [])

  return authUser
}

export default useAuth

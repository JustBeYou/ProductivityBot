import React, {Component} from 'react';
import firebase from "firebase"
import Main from './Main'
import Navigation from './Navigation'
import AboutUs from './AboutUs'
import Footer from './Footer'
import SignIn from './SignIn'

firebase.initializeApp({
  apiKey: "AIzaSyAhndV4fRgIsRKYuSJWoSgylRIUnR6G8Dg",
  authDomain:"facebookwarninguh.firebaseapp.com",
  databaseURL: "https://facebookwarninguh.firebaseio.com/"
})


class App extends Component{
  state = {
    isSignedIn: false
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions : [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        console.log("You are signed in!");
        return true;
      },
    }
  }

  componentDidMount () {

    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn : !!user})
    })
  }
  render () {
    return (
      <div className="App">
        <Navigation />
        {this.state.isSignedIn ? (
        <Main config={this.uiConfig}/>
        ) : (
          <SignIn uiConfig={this.uiConfig}/>
        )}
      <AboutUs />
      <Footer />


      </div>
    )
  }
  
}

export default App;

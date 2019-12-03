import React, {Component} from 'react';
import firebase from "firebase"
import Firebase from 'firebase'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import '../Assets/Main.css'
import M from 'materialize-css'

class Main extends Component{

state = {
    message: '',
    status: null
}


componentDidMount(){
    //aici o sa dam retrive la informatiile din database
    this.getUserData();
}

messageChange = event => {
    this.setState({ message: event.target.value });
    console.log(this.state.message);
  };

onRefresh = event => {
    this.writeUserData();
    // eslint-disable-next-line no-lone-blocks
    {this.state.status === true ? M.toast({html: `Success! You set a blocker with message: ${this.state.message}`}) : M.toast({html: `You disable the blocker!`})}
    
    console.log(this.state);
  };


  getUserData = () => {
      console.log(firebase.auth().currentUser.uid);
    let ref = Firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`);
    console.log(ref);
    ref.on('value', snapshot => {
      const state = snapshot.val();
      this.setState(state);
      console.log(state)
    });
    console.log(this.state);
  }

  writeUserData = () => {
    Firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).set(this.state);
    console.log('DATA SAVED');
  }


  onReact = event => {
    this.setState({ status: !this.state.status });
    console.log(this.state.status);
  };



  render () {
    return (
    <div className="container">
        <div className="row">
            <div className="col s3">
                <img className="rimg" src={firebase.auth().currentUser.photoURL} alt={firebase.auth().currentUser.displayName}/>
                <h5>Salut, {firebase.auth().currentUser.displayName}!</h5>
                <br></br>
                <button className="waves-effect light-blue lighten-1 btn" onClick={() => {
                    firebase.auth().signOut();
                }}><i className="material-icons left">cloud</i>Logout</button>
            </div>

            <div className="col s9">
                <div className="refreshForm">
                    <div className="input-field col s12">
                      <p>Your message!</p>
                        <input 
                        id="message" 
                        type="text" 
                        className="validate"
                        value={this.state.message}
                        onChange={this.messageChange}
                        ></input>
                    </div>
                    
                    <div className="switch" >
                        <label>
                        Off
                        <input type="checkbox" onChange={this.onReact} checked={this.state.status || ''} ></input>
                        <span className="lever" ></span>
                        On
                        </label>
                        
                    </div>
                        <button className="waves-effect light-blue lighten-1 btn" onClick={this.onRefresh}><i className="material-icons left">cloud</i>Accept</button>
                </div>
            </div>
        </div>
        
    </div>   
    )
  }
  
}

export default Main;

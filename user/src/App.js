import React from 'react';
import react from 'react';
import axios from 'react-axios';
import './App.css';

class App extends React.Component {
  //#### Fetch the User Data & Set State
  state = {
    user: '',
    followers: [],
  };

  componentDidMount() {
    axios
      .get('https://api.github.com/users/dancingheart714')
      .then((resp) => {
        this.setState({
          user: resp.data.login,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (e) => {
    this.setState({
      user: e.target.value,
    });
  };

  //#### Fetch the User's Followers & Set State
  fetchFollowers = () => {
    axios
      .get('https://api.github.com/users/${this.state.user}/followers')
      .then((resp) => {
        console.log(resp);
        this.setState({
          user: resp.data.login,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user !== this.state.user) {
      console.log('previous props');
    }
  }

  //#### Display the User Data
  render() {
    return (
      <div>
        <h1>Github User Card v.2</h1>
        <input
          value={this.state.user}
          onChange={this.handleChange}
          placeholder="user"
        />
        <button onClick={this.fetchFollowers}>Submit</button>
        <div>
          {this.state.followers.map((follower) => {
            return <h3>{follower.login}</h3>;
          })}
        </div>
      </div>
    );
  }
}

export default App;

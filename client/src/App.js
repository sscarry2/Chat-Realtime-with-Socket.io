import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      input: '',
      message: [],
      endpoint: "http://localhost:9000"
    }
  }

  componentDidMount = () => {
    this.response()
  }

  send = (message) => {
    const { input, endpoint } = this.state
    const socket = SocketIOClient(endpoint)
    socket.emit('sent-message', input)
    this.setState({ input: '' })
  }

  response = () => {
    const { endpoint, message } = this.state
    const temp = message
    const socket = SocketIOClient(endpoint)
    socket.on('new-message', (newMessage) => {
      temp.push(newMessage)
      this.setState({ message: temp })
    })
  }

  changeInput = (e) => {
    this.setState({input : e.target.value })
  }

  render() {
    const { input, message } = this.state
    return (
      <div>
        <div>
          <input value={input} onChange={this.changeInput} ></input>
          <button onClick={() => this.send()}>send</button>
          {
            message.map((data, i) =>
            <div key={i}  >
              {i + 1} : {data}
            </div>
          )
          }
        </div>
      </div>
    )

  }
}

export default App;

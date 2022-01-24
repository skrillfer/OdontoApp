import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class SocketExample extends Component {
    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: "http://127.0.0.1:4001"
        };
    }
    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("userConected", data => this.setState({ response: data }));
    }
    render() {
        const { response } = this.state;
        return (
            <main role="main" class="landingpage">
                <div style={{ textAlign: "center" }} className="mt-5">
                    {response
                        ? <p>
                            Counter: {response}
              </p>
                        : <p>Loading...</p>}
            
                </div>
            </main >
        );
    }
}

export default SocketExample;

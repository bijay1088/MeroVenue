import React, { Component } from 'react'

export default class contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: ""
        };
    }
    componentDidMount() {
        fetch("http://localhost:5000/user", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({ userData: data.data });
            }

            )
    }

    render() {
        return (
            <div>
                Name {this.state.userData.fname}
                Email {this.state.userData.email}
            </div>
        );
    }
}
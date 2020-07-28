import React from 'react';
import { RouteComponentProps } from 'react-router';

interface State {
    customAssistantUrl: string
}

export default class Setup extends React.Component<RouteComponentProps, State> {
    constructor(props) {
        super(props);
        this.state = {
            customAssistantUrl: ''
        }
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            customAssistantUrl: e.target.value
        })
    }

    handleNavigate(e) {
        e.preventDefault();

        const url = new URL(this.state.customAssistantUrl);
        console.log(url)
        // get the params out
        const params = url.search.substring(1).split('&').map(a => a.split('='));

        this.props.history.push(`/chat/${url?.hostname}/${params[0][1]}/${params[1][1]}`)
    }

    render() {
        return <div>
            <h1>Voicify React Chat Sample</h1>
            <p>Enter a Voicify Custom Assistant URL that you want to use as a test. Then you can start sending messages to your app. You can get your custom assistant url from your App's Deployment settings in Voicify.</p>
            <form onSubmit={this.handleNavigate.bind(this)}>
                <input value={this.state.customAssistantUrl} onChange={this.handleChange.bind(this)} />
                <button>Start Chat</button>
            </form>
        </div>
    }
}
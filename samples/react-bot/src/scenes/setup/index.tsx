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

    handleNavigate() {
        const url = new URL(this.state.customAssistantUrl);
        console.log(url)
        // get the params out
        const params = url.search.substring(1).split('&').map(a => a.split('='));

        this.props.history.push(`/chat/${url?.hostname}/${params[0][1]}/${params[1][1]}`)
    }
    
    render() {
        return <div>
            <input value={this.state.customAssistantUrl} onChange={this.handleChange.bind(this)}/>
            <button type="button" onClick={this.handleNavigate.bind(this)}>Start Chat</button>
        </div>
    }
}
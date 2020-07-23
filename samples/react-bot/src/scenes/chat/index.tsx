import React from 'react';
import { RouteComponentProps } from 'react-router';
import {CustomAssistantApiFp} from '@voicify/voicify-sdk-assistant'
interface ChatProps {
    host: string
    appId: string
    appSecret: string
}
interface ChatState {
    messages: string[],
    currentMessage: string
}

export default class Chat extends React.Component<RouteComponentProps<ChatProps>, ChatState> {
    assistantApi
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            currentMessage: ''
        }
        this.assistantApi = CustomAssistantApiFp({
            basePath: `https://${this.props.match.params.host}`
        })
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            currentMessage: e.target.value
        })
    }

    handleSend() {
       const messages = this.state.messages;
       messages.push(this.state.currentMessage);

       this.setState({
           ...this.state,
           currentMessage: '',
           messages
       });

       // TODO: send message then get response
       this.assistantApi.handleRequest(this.props.match.params.appId, this.props.match.params.appSecret, )
        
    }
    
    render() {
        return <div>
            <input value={this.state.currentMessage} onChange={this.handleChange.bind(this)}/>
            <button type="button" onClick={this.handleSend.bind(this)}>send</button>
            <div>
                {this.state.messages.map(m => <p>{m}</p>)}
            </div>
        </div>
    }
}
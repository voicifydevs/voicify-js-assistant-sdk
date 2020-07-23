import React from 'react';
import { RouteComponentProps } from 'react-router';
import { CustomAssistantApiFp, CustomAssistantUser, CustomAssistantDevice } from '@voicify/voicify-sdk-assistant'
import { uniqueId } from 'lodash';
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
    user: CustomAssistantUser = {
        id: 'sample',
        name: 'Sample'
    }
    device: CustomAssistantDevice = {
        id: 'sample',
        name: 'Sample',
        supportsDisplayText: true,
        supportsTextInput: true
    }
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            currentMessage: ''
        }
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            currentMessage: e.target.value
        })
    }

    handleSend(e) {
        e.preventDefault();
        const messages = this.state.messages;
        messages.push(this.state.currentMessage);
        const message = this.state.currentMessage
        this.setState({
            ...this.state,
            currentMessage: '',
            messages
        });

        CustomAssistantApiFp().handleRequest(this.props.match.params.appId, this.props.match.params.appSecret, {
            requestId: this.uuidv4(),
            user: this.user,
            device: this.device,
            context: {
                channel: "Voicify React Sample App",
                locale: "en-US",
                sessionId: this.uuidv4(),
                requestType: "IntentRequest",
                originalInput: message,
                requiresLanguageUnderstanding: true
            }
        })(undefined, `https://${this.props.match.params.host}`).then((value) => {
            this.setState({
                ...this.state,
                messages: [...this.state.messages, value.outputSpeech]
            })
        })

    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    render() {
        return <form onSubmit={this.handleSend.bind(this)}>
            <h1>Voicify App Sample Chat</h1>
            <p>You can type your message and hit send to start a conversation. To start a new session, just refresh the page.</p>
            <input value={this.state.currentMessage} onChange={this.handleChange.bind(this)} placeholder="type a message" />
            <button>send</button>
            <div>
                {this.state.messages.map((m, i) => <p key={i}>{m}</p>)}
            </div>
        </form>
    }
}
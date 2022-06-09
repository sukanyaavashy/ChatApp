import { LogBox} from 'react-native'
import React,{useState,useCallback} from 'react'
import { GiftedChat } from 'react-native-gifted-chat';


const ChatScreen = () => {

    const [messages, setMessages] = useState([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: { _id: 2, name: 'Name' },
      },
    ]);

    const onSend = useCallback((newMessages) => {
      setMessages(prevMessages => [...newMessages, ...prevMessages])
      }, [])

    return (
      <GiftedChat
        messages={messages}
        onSend={newMessage => onSend(newMessage)}
        user={{
          _id: 1,
        }}
      />
    );
  };

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export default ChatScreen


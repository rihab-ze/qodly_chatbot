import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useState, useEffect } from 'react';
import { LuMessageCircle } from 'react-icons/lu';
import { IoClose } from 'react-icons/io5';

import { IOpenAiChatbotProps } from './OpenAiChatbot.config';

const OpenAiChatbot: FC<IOpenAiChatbotProps> = ({ style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const [apiKey, setApiKey] = useState<string>(''); //name of the connected user
  const {
    sources: { datasource: ds },
  } = useSources();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!ds) return;
    const listener = async (/* event */) => {
      const v = await ds.getValue();
      setApiKey(v);
    };
    listener();
    ds.addListener('changed', listener);
    return () => {
      ds.removeListener('changed', listener);
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: { sender: 'user' | 'bot'; text: string }[] = [
      ...messages,
      { sender: 'user', text: input },
    ];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: input }],
        }),
      });

      const data = await response.json();
      const botMessage = data.choices[0].message.content;

      // Add bot response to chat
      setMessages([...newMessages, { sender: 'bot', text: botMessage }]);
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
    }

    setLoading(false);
  };

  return (
    <span ref={connect} style={style} className={cn(className, classNames)}>
      <div className=" bottom-4 right-4 flex ">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
          >
            <LuMessageCircle size={24} />
          </button>
        )}

        {isOpen && (
          <div className="w-80 bg-white border shadow-lg flex flex-col justify-between chat_content overflow-hidden">
            <div className="p-3 flex justify-between items-center border-b bg-gray-100 ">
              <span className="font-semibold">Chatbot</span>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500">
                <IoClose size={20} />
              </button>
            </div>

            <div className="grow p-4 overflow-y-auto ">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 mb-3 rounded-xl max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white self-end ml-auto user_message'
                      : 'bg-gray-200 text-gray-800 self-start bot_message'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && <div className="text-gray-500 text-sm">Thinking...</div>}
            </div>
            <div className="p-2 border-t bg-gray-100 flex ">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <LuMessageCircle size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </span>
  );
};

export default OpenAiChatbot;

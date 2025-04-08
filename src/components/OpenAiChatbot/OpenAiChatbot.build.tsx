import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useState } from 'react';

import { LuMessageCircle } from 'react-icons/lu';
import { IoClose } from 'react-icons/io5';

import { IOpenAiChatbotProps } from './OpenAiChatbot.config';

const OpenAiChatbot: FC<IOpenAiChatbotProps> = ({ style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span ref={connect} style={style} className={cn(className, classNames)}>
      <div className=" bottom-4 right-4">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
          >
            <LuMessageCircle size={24} />
          </button>
        )}

        {isOpen && (
          <div className="w-80 bg-white border  shadow-lg flex flex-col justify-between chat_content overflow-hidden">
            <div className="p-3 flex justify-between items-center border-b bg-gray-100 ">
              <span className="font-semibold">Chatbot</span>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500">
                <IoClose size={20} />
              </button>
            </div>

            <div className="h-64 p-4 overflow-y-auto"> </div>

            <div className="p-2 border-t bg-gray-100 flex ">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ">
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

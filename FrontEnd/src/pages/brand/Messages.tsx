import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  unread: boolean;
}

export default function BrandMessages() {
  const { theme } = useTheme();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<Message[]>([
    {
      id: '1',
      sender: {
        id: '1',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      content: 'Hi! I would love to collaborate with your brand.',
      timestamp: '2 hours ago',
      unread: true
    },
    {
      id: '2',
      sender: {
        id: '2',
        name: 'Mike Wilson',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      content: 'Thank you for the opportunity!',
      timestamp: '1 day ago',
      unread: false
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    // TODO: Implement message sending
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          <div className="space-y-4">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedConversation === conversation.id
                    ? 'bg-primary-50 dark:bg-primary-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={conversation.sender.avatar}
                    alt={conversation.sender.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium truncate">{conversation.sender.name}</p>
                      <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{conversation.content}</p>
                    {conversation.unread && (
                      <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mt-1"></span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Message View */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <img
                  src={conversations.find(c => c.id === selectedConversation)?.sender.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium">
                    {conversations.find(c => c.id === selectedConversation)?.sender.name}
                  </h3>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Sample messages */}
              <div className="flex justify-end">
                <div className="bg-primary-500 text-white rounded-lg py-2 px-4 max-w-sm">
                  <p>Hello! I'm interested in collaborating with you.</p>
                  <p className="text-xs mt-1 opacity-75">2:30 PM</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg py-2 px-4 max-w-sm">
                  <p>Hi! I would love to collaborate with your brand.</p>
                  <p className="text-xs mt-1 text-gray-500">2:31 PM</p>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
                >
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
} 
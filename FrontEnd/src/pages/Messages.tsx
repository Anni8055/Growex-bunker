import { useState } from 'react';

interface Message {
  id: string;
  sender: string;
  preview: string;
  timestamp: string;
  unread: boolean;
}

export default function Messages() {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Sarah Johnson',
      preview: 'Hi, I would love to collaborate on your summer collection...',
      timestamp: '2h ago',
      unread: true,
    },
    {
      id: '2',
      sender: 'Mike Chen',
      preview: 'Thank you for your interest in our campaign...',
      timestamp: '1d ago',
      unread: false,
    },
  ]);

  return (
    <div className="min-h-full">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {messages.map((message) => (
                  <li key={message.id} className="hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className={`text-sm font-medium ${message.unread ? 'text-gray-900' : 'text-gray-500'}`}>
                            {message.sender}
                          </p>
                          {message.unread && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{message.timestamp}</p>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">{message.preview}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
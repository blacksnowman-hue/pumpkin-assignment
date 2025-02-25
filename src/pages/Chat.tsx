import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { Search, Send, UserPlus } from 'lucide-react';

const Chat = () => {
  const { user, chatUsers, addChatUser } = useUserStore();
  const [messages, setMessages] = useState<any[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchPhone, setSearchPhone] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPhone.trim()) return;

    // Simulating user search - in a real app, this would make a server request
    const foundUser = {
      name: `User ${searchPhone.slice(-4)}`, // Simulated name
      phone: searchPhone,
      lastMessage: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      online: true
    };

    addChatUser(foundUser);
    setSearchPhone('');
    setShowAddUser(false);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const newMessage = {
      content: currentMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: user?.name,
    };

    setMessages([...messages, newMessage]);
    setCurrentMessage('');
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r">
        <div className="p-4">
          <button
            onClick={() => setShowAddUser(!showAddUser)}
            className="w-full flex items-center justify-center space-x-2 mb-3 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <UserPlus className="h-5 w-5" />
            <span>Add New Chat</span>
          </button>

          {showAddUser && (
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
          )}

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search conversations"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="overflow-y-auto">
          {chatUsers.map((chatUser, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-3"
              onClick={() => setSelectedUser(chatUser)}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                  {chatUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                {chatUser.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-900">{chatUser.name}</h3>
                  <span className="text-xs text-gray-500">{chatUser.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chatUser.lastMessage || 'Start a conversation'}</p>
              </div>
              {chatUser.unread && (
                <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">{chatUser.unread}</span>
                </div>
              )}
            </div>
          ))}
          {chatUsers.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500">
              <p>No conversations yet</p>
              <p className="text-sm">Search for users to start chatting</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedUser ? (
          <>
            <div className="p-4 bg-white border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                  {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{selectedUser.name}</h2>
                  <p className="text-sm text-gray-500">{selectedUser.phone}</p>
                  {selectedUser.online && <span className="text-sm text-green-500">Online</span>}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === user?.name ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === user?.name
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-900'
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs opacity-75 block mt-1">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="p-4 bg-white border-t">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Type a message"
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
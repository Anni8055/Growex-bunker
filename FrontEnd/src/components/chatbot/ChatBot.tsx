import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  XMarkIcon, 
  PaperAirplaneIcon, 
  ChatBubbleLeftRightIcon, 
  SparklesIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

type UserType = 'brand' | 'influencer' | null;
type QueryStatus = 'initial' | 'type-selection' | 'query-selection' | 'chat' | 'resolved' | 'not-resolved' | 'search';

interface AuthUser {
  type: UserType;
  isAuthenticated: boolean;
}

interface QueryOption {
  id: string;
  text: string;
  answer: string;
}

const brandQueries: QueryOption[] = [
  { 
    id: 'brand-1', 
    text: 'How do I find the right influencers?', 
    answer: 'Our platform uses AI-powered matching to connect you with the perfect influencers for your brand. Create a profile, set your preferences, and our system will suggest the best matches based on audience demographics, engagement rates, and content style. You can also browse our marketplace and filter by niche, follower count, and location.' 
  },
  { 
    id: 'brand-2', 
    text: 'What are the payment options?', 
    answer: "We offer secure payment processing through our platform with options including credit cards, PayPal, and bank transfers. All payments are protected by our escrow system, ensuring you only release funds once you're satisfied with the influencer's work. We also provide invoicing and payment tracking for all your campaigns."
  },
  { 
    id: 'brand-3', 
    text: 'How do I create a campaign?', 
    answer: 'To create a campaign, navigate to the "Campaigns" section and click "Create New". Fill in the campaign details including objectives, deliverables, timeline, and budget. You can then invite specific influencers or open it to applications. Our platform guides you through each step to ensure your campaign is set up for success.' 
  },
  { 
    id: 'brand-4', 
    text: 'How to measure campaign results?', 
    answer: 'Our platform provides comprehensive analytics for all your campaigns. Track impressions, engagement, click-through rates, conversions, and ROI in real-time. You can also access demographic data about the audience reached. We generate automated reports that you can customize and export for your team.' 
  },
  {
    id: 'brand-7',
    text: 'How to optimize my campaign budget?',
    answer: 'Our AI analyzes market trends and campaign performance data to help you optimize your budget allocation. We provide recommendations on influencer selection, content types, and posting schedules to maximize ROI. You can also use our budget planning tools to forecast campaign reach and engagement.'
  },
  {
    id: 'brand-8',
    text: 'What types of content can I request?',
    answer: 'You can request various content types including photos, videos, Stories, Reels, TikToks, blog posts, and more. Each content type can be customized with specific requirements like duration, style, messaging, and usage rights. Our platform helps you define clear content guidelines for influencers.'
  },
  {
    id: 'brand-9',
    text: 'How to leverage AI for targeting?',
    answer: 'Our AI system analyzes vast datasets to identify the most suitable influencers based on your target audience. It considers factors like audience overlap, engagement authenticity, and content relevance to ensure optimal matching.'
  },
  {
    id: 'brand-10',
    text: 'What are the latest trends?',
    answer: 'Our platform continuously monitors social media trends, content performance, and user behavior to provide real-time insights. You can access trending hashtags, popular content formats, and emerging influencer niches specific to your industry.'
  },
  {
    id: 'brand-11',
    text: 'How to ensure authentic engagement?',
    answer: 'We use advanced analytics to verify influencer authenticity and engagement quality. Our system flags suspicious activity and provides detailed audience quality scores to help you make informed decisions.'
  }
];

const influencerQueries: QueryOption[] = [
  { 
    id: 'influencer-1', 
    text: 'How do I get matched with brands?', 
    answer: 'After creating your profile, our AI-powered matching system will connect you with compatible brands. Make sure your profile is complete with your niche, content examples, audience demographics, and engagement metrics. You can also browse available campaigns and apply directly to those that interest you.' 
  },
  { 
    id: 'influencer-2', 
    text: 'When and how will I get paid?', 
    answer: 'Payments are processed through our secure platform. Once you complete the deliverables and the brand approves your work, funds are released from escrow to your account. You can withdraw via direct deposit, PayPal, or other supported methods. Payment timelines vary by campaign but are clearly outlined in each agreement.' 
  },
  { 
    id: 'influencer-3', 
    text: 'How do I negotiate rates?', 
    answer: 'You can negotiate rates directly through our messaging system. We provide market rate insights based on your metrics to help you price fairly. When you receive an offer, you can accept, decline, or counter with your preferred rate. Our platform also allows you to create different packages for brands to choose from.' 
  },
  { 
    id: 'influencer-4', 
    text: 'Can I track my performance?', 
    answer: 'Yes, our analytics dashboard shows your performance across all campaigns. Track engagement rates, audience growth, and campaign impact. This data helps you demonstrate your value to brands and improve your content strategy. You can generate performance reports to share with current or prospective brand partners.' 
  },
  {
    id: 'influencer-7',
    text: 'How to improve my engagement rates?',
    answer: 'Our platform provides AI-powered insights on content optimization, best posting times, and audience engagement patterns. We analyze your top-performing content and provide recommendations to improve reach and engagement. You can also access industry benchmarks and trending content formats.'
  },
  {
    id: 'influencer-8',
    text: 'What tools are available for content creation?',
    answer: 'We offer various tools to enhance your content creation process, including trending hashtag suggestions, caption generators, and performance predictions. You can also access our media editing tools, scheduling features, and cross-platform posting capabilities.'
  },
  {
    id: 'influencer-9',
    text: 'How to build my personal brand?',
    answer: 'Our platform offers AI-powered insights on personal branding, including content strategy recommendations, audience growth tactics, and niche optimization. We analyze successful creators in your space to provide actionable guidance.'
  },
  {
    id: 'influencer-10',
    text: 'What are the best practices?',
    answer: 'Access our comprehensive guide on influencer best practices, covering content creation, engagement strategies, brand collaboration tips, and professional conduct. Stay updated with industry standards and platform-specific guidelines.'
  },
  {
    id: 'influencer-11',
    text: 'How to diversify my income?',
    answer: 'Explore multiple revenue streams through our platform, including brand partnerships, affiliate marketing, merchandise, and digital products. Our AI suggests personalized monetization strategies based on your niche and audience.'
  }
];

const moreQueries = {
  'brand': [
    { 
      id: 'brand-5', 
      text: 'How to set my campaign budget?', 
      answer: 'Our platform offers budget guidance based on your campaign goals, industry benchmarks, and the types of influencers you want to work with. You can set budgets per influencer or for the entire campaign. We also provide cost estimation tools to help you allocate your budget effectively across different platforms and content types.'
    },
    { 
      id: 'brand-6', 
      text: 'What content rights do I get?', 
      answer: 'Content rights are defined in each campaign agreement. By default, you receive rights to share the content on your own channels with proper attribution. Extended usage rights (like paid advertising or product packaging) can be negotiated directly with influencers. Our platform includes customizable contract templates that clearly outline content rights.'
    }
  ],
  'influencer': [
    { 
      id: 'influencer-5', 
      text: 'How to improve my profile visibility?', 
      answer: 'Complete your profile with high-quality content examples, detailed audience demographics, and engagement metrics. Regularly update your stats and portfolio. Use relevant keywords and tags in your bio. Our algorithm boosts profiles with complete information, good response rates, and positive brand reviews.'
    },
    { 
      id: 'influencer-6', 
      text: 'What if a brand doesn\'t pay?', 
      answer: 'Our escrow system protects influencers from non-payment. Brands deposit funds before you begin work, and we only release them when deliverables are approved. If any disputes arise, our support team mediates and resolves them according to our platform policies and the terms in your agreement.'
    }
  ]
};

const ChatBot: React.FC = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<QueryStatus>('initial');
  const [userType, setUserType] = useState<UserType>(null);
  const [selectedQuery, setSelectedQuery] = useState<QueryOption | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser>({ type: null, isAuthenticated: false });

  useEffect(() => {
    const checkAuth = () => {
      const storedUserType = localStorage.getItem('userType');
      const userType = storedUserType ? (storedUserType as UserType) : null;
      const isAuth = localStorage.getItem('isAuthenticated') === 'true';
      
      setAuthUser({ type: userType, isAuthenticated: isAuth });
      if (isAuth && userType) {
        setUserType(userType);
        setStatus('search');
      }
    };

    checkAuth();
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userType' || e.key === 'isAuthenticated') {
        checkAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
      }
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: ${theme === 'dark' ? '#1F2937' : '#F3F4F6'};
        border-radius: 3px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: ${theme === 'dark' ? '#4B5563' : '#D1D5DB'};
        border-radius: 3px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: ${theme === 'dark' ? '#6B7280' : '#9CA3AF'};
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [theme]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setChatMessages(prev => [
      ...prev,
      { text: `Searching for ${authUser.type === 'brand' ? 'influencers' : 'brands'} matching "${searchQuery}"...`, isUser: false }
    ]);

    setIsTyping(true);
    setTimeout(() => {
      const results = `Here are some ${authUser.type === 'brand' ? 'influencers' : 'brands'} that match your search:
      ${authUser.type === 'brand' ? 
        '1. @lifestyle_creator (100k followers)\n2. @travel_expert (50k followers)\n3. @tech_reviewer (75k followers)' :
        '1. TechBrand (Tech Products)\n2. FashionCo (Fashion & Lifestyle)\n3. TravelGear (Travel Equipment)'}`;
      
      setChatMessages(prev => [...prev, { text: results, isUser: false }]);
      setIsTyping(false);
      setSearchQuery('');
    }, 1500);
  };

  const toggleChat = () => {
    if (isOpen) {
      setStatus(authUser.isAuthenticated ? 'search' : 'initial');
      setSelectedQuery(null);
      setChatMessages([]);
      setMessage('');
      setSearchQuery('');
    }
    setIsOpen(!isOpen);
  };

  const handleUserTypeSelection = (type: UserType) => {
    setUserType(type);
    setStatus('query-selection');
    
    const welcomeMessage = type === 'brand' 
      ? 'Welcome, Brand Manager! How can I help you today?' 
      : 'Welcome, Influencer! How can I assist you today?';
    
    setChatMessages([{text: welcomeMessage, isUser: false}]);
  };

  const handleQuerySelection = (query: QueryOption) => {
    setSelectedQuery(query);
    setStatus('resolved');
    
    setIsTyping(true);
    
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev, 
        {text: query.text, isUser: true},
        {text: query.answer, isUser: false}
      ]);
      setIsTyping(false);
      
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {text: 'Did that solve your query?', isUser: false}
        ]);
      }, 1000);
    }, 1500);
  };

  const handleQueryResolution = (resolved: boolean) => {
    if (resolved) {
      setChatMessages(prev => [
        ...prev,
        {text: 'Yes, thank you!', isUser: true},
        {text: 'Great! Is there anything else I can help you with?', isUser: false}
      ]);
      setStatus('query-selection');
      setSelectedQuery(null);
    } else {
      setChatMessages(prev => [
        ...prev,
        {text: 'No, I need more help.', isUser: true},
        {text: 'I understand. Let me suggest some related queries that might help:', isUser: false}
      ]);
      setStatus('not-resolved');
    }
  };

  const handleCustomQuery = () => {
    setStatus('chat');
    setChatMessages(prev => [
      ...prev,
      {text: 'My question isn\'t listed here.', isUser: true},
      {text: 'I understand. Please describe your issue and our support team will get back to you as soon as possible.', isUser: false}
    ]);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setChatMessages(prev => [
      ...prev,
      {text: message, isUser: true}
    ]);
    
    setIsTyping(true);
    setMessage('');
    
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {text: 'Thank you for your message. Our support team will contact you shortly to address your specific query. For faster assistance, please check your email for updates.', isUser: false}
      ]);
      setIsTyping(false);
    }, 2000);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <div 
          className={`mb-3 w-64 sm:w-72 rounded-2xl overflow-hidden shadow-xl border transform transition-all duration-300 ease-in-out
            ${theme === 'dark' ? 'bg-gray-800/95 border-gray-700/50' : 'bg-white/95 border-gray-200/50'}`}
          style={{ 
            boxShadow: theme === 'dark' ? '0 8px 20px -5px rgba(0, 0, 0, 0.3)' : '0 8px 20px -5px rgba(0, 0, 0, 0.1)',
            maxHeight: 'calc(100vh - 80px)'
          }}
        >
          <div className={`flex items-center justify-between p-2.5 sticky top-0 z-30
            ${theme === 'dark' ? 'bg-primary-600' : 'bg-primary-500'}`}
          >
            <div className="flex items-center">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20">
                <ChatBubbleLeftRightIcon className="h-4 w-4 text-white" />
              </div>
              <div className="ml-2">
                <h3 className="text-sm font-semibold text-white">Avni</h3>
                <p className="text-[9px] text-white/80">Virtual Assistant</p>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
            >
              <XMarkIcon className="h-4 w-4 text-white" />
            </button>
          </div>

          <div className={`flex flex-col h-[350px] ${theme === 'dark' ? 'bg-gray-800/95' : 'bg-gray-50/95'}`}>
            <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
              {status === 'initial' && !authUser.isAuthenticated && (
                <div className="flex flex-col items-center justify-center h-full space-y-3">
                  <div className={`text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    <h3 className="text-base font-semibold mb-1.5">Hello there! 👋</h3>
                    <p className="text-xs">Please tell me who you are so I can help you better:</p>
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-xs">
                    <button
                      onClick={() => handleUserTypeSelection('brand')}
                      className={`w-full px-4 py-2.5 text-sm font-medium rounded-lg text-white 
                        ${theme === 'dark' ? 'bg-primary-600 hover:bg-primary-700' : 'bg-primary-500 hover:bg-primary-600'} 
                        transition-all duration-200 hover:shadow-md active:transform active:scale-95`}
                    >
                      I'm a Brand
                    </button>
                    <button
                      onClick={() => handleUserTypeSelection('influencer')}
                      className={`w-full px-4 py-2.5 text-sm font-medium rounded-lg text-white 
                        ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}
                        transition-all duration-200 hover:shadow-md active:transform active:scale-95`}
                    >
                      I'm an Influencer
                    </button>
                  </div>
                </div>
              )}

              {status === 'search' && (
                <div className="flex flex-col space-y-4">
                  <div className="text-center animate-fadeIn">
                    <h3 className={`text-base font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      {authUser.type === 'brand' ? 'Find Influencers' : 'Discover Brands'}
                    </h3>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {authUser.type === 'brand' ? 
                        'Search for influencers that match your brand' : 
                        'Find brands looking for collaborations'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 p-2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder={`Search ${authUser.type === 'brand' ? 'influencers' : 'brands'}...`}
                      className={`flex-1 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-white placeholder:text-gray-400'
                          : 'bg-white text-gray-800 placeholder:text-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-primary-500/50`}
                    />
                    <button
                      onClick={handleSearch}
                      disabled={!searchQuery.trim()}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        !searchQuery.trim()
                          ? 'bg-gray-400/80 cursor-not-allowed'
                          : 'bg-primary-600 hover:bg-primary-700'
                      } text-white`}
                    >
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {(status !== 'initial' || chatMessages.length > 0) && (
                <div className="space-y-3">
                  {chatMessages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                    >
                      {!msg.isUser && (
                        <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center mr-2 flex-shrink-0">
                          <SparklesIcon className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div 
                        className={`max-w-[85%] rounded-xl px-4 py-2.5 ${
                          msg.isUser 
                            ? 'bg-primary-600 text-white rounded-tr-none shadow-md ml-2' 
                            : theme === 'dark' 
                              ? 'bg-gray-700 text-white rounded-tl-none shadow-md'
                              : 'bg-white text-gray-800 rounded-tl-none shadow-md'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      </div>
                      {msg.isUser && (
                        <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center ml-2 flex-shrink-0">
                          <span className="text-white text-[10px] font-semibold">You</span>
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start animate-fadeIn">
                      <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center mr-2">
                        <SparklesIcon className="w-4 h-4 text-white" />
                      </div>
                      <div className={`rounded-xl px-4 py-2.5 ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-white rounded-tl-none shadow-md'
                          : 'bg-white text-gray-800 rounded-tl-none shadow-md'
                      }`}>
                        <div className="flex space-x-1.5 items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce delay-100"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} className="h-1" />
                </div>
              )}
            </div>

            <div className={`p-3 border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-800/95' : 'border-gray-200 bg-white/95'}`}>
              {status === 'query-selection' && userType && (
                <div className="space-y-2.5">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Select your query:
                  </p>
                  <div className="overflow-y-auto max-h-36 pr-2 -mr-2 custom-scrollbar"
                    style={{ 
                      scrollbarWidth: 'thin',
                      scrollbarColor: theme === 'dark' ? '#4B5563 #1F2937' : '#D1D5DB #F3F4F6'
                    }}
                  >
                    <div className="space-y-2">
                      {(userType === 'brand' ? brandQueries : influencerQueries).map((query) => (
                        <button
                          key={query.id}
                          onClick={() => handleQuerySelection(query)}
                          className={`text-left w-full px-4 py-2.5 text-sm rounded-lg transition-all duration-200 
                            ${theme === 'dark'
                              ? 'bg-gray-700 hover:bg-gray-600 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                            } hover:shadow-md hover:translate-y-[-1px] active:transform active:scale-[0.98]`}
                        >
                          {query.text}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleCustomQuery}
                      className={`mt-2.5 text-left w-full px-4 py-2.5 text-sm rounded-lg transition-all duration-200
                        ${theme === 'dark'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                        } hover:shadow-md hover:translate-y-[-1px] active:transform active:scale-[0.98]`}
                    >
                      My question isn't listed here
                    </button>
                  </div>
                </div>
              )}

              {status === 'resolved' && (
                <div className="space-y-2">
                  <p className={`text-xs font-medium mb-1.5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Was your query resolved?
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleQueryResolution(true)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-green-500 text-white hover:bg-green-600 flex-1 transition-all duration-200 hover:shadow-sm active:transform active:scale-98"
                    >
                      Yes, thank you!
                    </button>
                    <button
                      onClick={() => handleQueryResolution(false)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-gray-500 text-white hover:bg-gray-600 flex-1 transition-all duration-200 hover:shadow-sm active:transform active:scale-98"
                    >
                      No, I need more help
                    </button>
                  </div>
                </div>
              )}

              {status === 'not-resolved' && userType && (
                <div className="space-y-2">
                  <p className={`text-xs font-medium mb-1.5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Here are some more specific queries:
                  </p>
                  <div className="overflow-x-auto -mx-3 px-3 pb-2">
                    <div className="flex flex-nowrap gap-2 sm:grid sm:grid-cols-1">
                      {userType && moreQueries[userType] && moreQueries[userType].map((query) => (
                        <button
                          key={query.id}
                          onClick={() => handleQuerySelection(query)}
                          className={`text-left px-3 py-1.5 text-xs rounded-lg whitespace-nowrap sm:whitespace-normal transition-all duration-200 
                            ${theme === 'dark'
                              ? 'bg-gray-700 hover:bg-gray-600 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                            } hover:shadow-sm active:transform active:scale-98 flex-shrink-0 sm:flex-shrink`}
                        >
                          {query.text}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleCustomQuery}
                      className={`mt-2 text-left px-3 py-1.5 text-xs rounded-lg transition-all duration-200 w-full
                        ${theme === 'dark'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                        } hover:shadow-sm active:transform active:scale-98`}
                    >
                      I still need help with something else
                    </button>
                  </div>
                </div>
              )}

              {status === 'chat' && (
                <div className="flex items-center space-x-1.5">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message here..."
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs ${
                      theme === 'dark'
                        ? 'bg-gray-700/80 border-gray-600/50 text-white placeholder:text-gray-400'
                        : 'bg-gray-100/80 border-gray-300/50 text-gray-800 placeholder:text-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200`}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className={`p-1.5 rounded-lg transition-all duration-200 hover:shadow-sm transform hover:scale-105
                      ${!message.trim() 
                        ? 'bg-gray-400/80 cursor-not-allowed' 
                        : 'bg-primary-600/90 hover:bg-primary-700/90'} text-white`}
                  >
                    <PaperAirplaneIcon className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={toggleChat}
        className={`p-2.5 rounded-full shadow-lg transition-all duration-300 
          ${isOpen ? 'bg-gray-600' : 'bg-primary-600 hover:bg-primary-700'} 
          ${!isOpen && 'animate-pulse'}`}
      >
        <ChatBubbleLeftRightIcon className="h-5 w-5 text-white" />
      </button>
    </div>
  );
};

export default ChatBot; 
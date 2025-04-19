import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  SunIcon, 
  MoonIcon, 
  UserCircleIcon, 
  ArrowRightOnRectangleIcon, 
  UserIcon, 
  EnvelopeIcon, 
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  SparklesIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../contexts/ThemeContext';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [clickedFeature, setClickedFeature] = useState<string | null>(null);

  // Reset clicked feature when dropdown closes
  const handleFeatureClose = () => {
    setTimeout(() => {
      setClickedFeature(null);
    }, 200);
  };

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-card border-b border-border shadow backdrop-blur-sm bg-opacity-90">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link to="/" className="text-2xl font-bold gradient-text">
                  adgorithm
                </Link>
              </div>

              {/* Search bar - made smaller */}
              <div className="hidden md:block flex-1 max-w-xs mx-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-9 pr-3 py-1.5 text-sm rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    placeholder="Search influencers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Desktop Navigation - improved spacing */}
              <div className="hidden md:flex md:items-center md:space-x-8">
                {/* Platform dropdown - changed to Features */}
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300',
                          'group inline-flex items-center text-sm font-medium hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary-600 hover:to-blue-600 dark:hover:from-primary-400 dark:hover:to-blue-400 px-3 py-2 rounded-md hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                        )}
                      >
                        <span>Features</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? 'text-primary-600 dark:text-primary-400 rotate-180' : 'text-gray-500 dark:text-gray-400',
                            'ml-1 h-4 w-4 transition-transform duration-200 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                        afterLeave={handleFeatureClose}
                      >
                        <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-2 sm:px-0">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                            <div className="relative bg-card/95 backdrop-blur-sm p-4">
                              <div className="grid grid-cols-1 gap-2">
                                
                                {/* Feature buttons */}
                                {['AI-Powered Matching', 'Direct DM Communication', 'Secure Escrow Payments', 'Real-time Analytics', 'Fraud Detection'].map((feature) => (
                                  <div key={feature}>
                                    {clickedFeature === feature ? (
                                      <div className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-primary-200 dark:border-primary-800">
                                        <div className="flex items-center space-x-3">
                                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-100 to-blue-100 dark:from-primary-900 dark:to-blue-900 flex items-center justify-center">
                                            <SparklesIcon className="h-4 w-4 text-primary-500" aria-hidden="true" />
                                          </div>
                                          <div className="flex-1">
                                            <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400">Coming Soon</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Currently we are working on it. Thanks for your patience!</p>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <Popover.Button
                                        as="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setClickedFeature(feature);
                                        }}
                                        className="w-full text-left px-3 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 shadow-sm hover:shadow transition-all duration-200 border border-gray-100 dark:border-gray-700 hover:scale-[1.02] group"
                                      >
                                        <div className="flex items-center space-x-2">
                                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-100 to-blue-100 dark:from-primary-900 dark:to-blue-900 flex items-center justify-center">
                                            <SparklesIcon className="h-3 w-3 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                                          </div>
                                          <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-blue-600 dark:group-hover:from-primary-400 dark:group-hover:to-blue-400">{feature}</span>
                                        </div>
                                      </Popover.Button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>

                {/* Resources dropdown */}
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300',
                          'group inline-flex items-center text-sm font-medium hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary-600 hover:to-blue-600 dark:hover:from-primary-400 dark:hover:to-blue-400 px-3 py-2 rounded-md hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                        )}
                      >
                        <span>Resources</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? 'text-primary-600 dark:text-primary-400 rotate-180' : 'text-gray-500 dark:text-gray-400',
                            'ml-1 h-4 w-4 transition-transform duration-200 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                            <div className="relative bg-card/95 backdrop-blur-sm px-5 py-6">
                              <div className="flex items-center justify-center p-5 text-center border border-primary-200/30 dark:border-primary-800/30 rounded-xl bg-gradient-to-r from-primary-50/30 to-blue-50/30 dark:from-primary-900/30 dark:to-blue-900/30">
                                <div className="space-y-2">
                                  <SparklesIcon className="h-6 w-6 text-primary-500 mx-auto" />
                                  <h3 className="text-sm font-medium text-primary-600 dark:text-primary-400">Coming Soon</h3>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Currently we are working on it. Thanks for your patience!</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>

                {/* About Us link */}
                <Link
                  to="/about"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary-600 hover:to-blue-600 dark:hover:from-primary-400 dark:hover:to-blue-400 px-3 py-2 rounded-md hover:scale-105 transition-all duration-200"
                >
                  About Us
                </Link>

                {/* Theme toggle button - enhanced with moving circle */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  disabled={isTransitioning}
                  className={`relative rounded-full w-12 h-6 p-0.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    theme === 'dark' ? 'bg-primary-600' : 'bg-gray-200'
                  } ${isTransitioning ? 'opacity-70 cursor-not-allowed' : ''}`}
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  <span className="sr-only">
                    {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  </span>
                  <span 
                    className={`absolute top-0.5 transform transition-transform duration-300 ease-in-out bg-white rounded-full flex items-center justify-center w-5 h-5 shadow-sm ${
                      theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  >
                   {theme === 'dark' ? (
                      <MoonIcon className="h-3 w-3 text-primary-600" aria-hidden="true" />
                   ) : (
                      <SunIcon className="h-3 w-3 text-amber-500" aria-hidden="true" />
                    )}
                  </span>
                  {isTransitioning && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary-500 animate-pulse"></span>
                   )}
                </button>

                {/* Question mark button for Privacy Policy */}
                <Link
                  to="/privacy-policy"
                  className="relative rounded-full w-9 h-9 flex items-center justify-center bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 text-purple-600 dark:text-pink-400 hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-800/60 dark:hover:to-pink-800/60 shadow-sm hover:shadow transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label="Privacy Policy"
                >
                  <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                </Link>

                {user ? (
                  <Menu as="div" className="relative">
                    <div>
                      <Menu.Button className="flex rounded-full bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-110">
                        <span className="sr-only">Open user menu</span>
                        {user.avatar ? (
                          <img
                            className="h-9 w-9 rounded-full ring-2 ring-primary-500/30 object-cover"
                            src={user.avatar}
                            alt=""
                          />
                        ) : (
                          <div className="h-9 w-9 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center text-white ring-2 ring-primary-500/30">
                            <UserCircleIcon className="h-7 w-7" aria-hidden="true" />
                          </div>
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-xl bg-card py-1 shadow-xl ring-1 ring-black/5 dark:ring-white/10 focus:outline-none">
                        <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center">
                            {user.avatar ? (
                              <img
                                className="h-12 w-12 rounded-full ring-2 ring-primary-500/30 object-cover"
                                src={user.avatar}
                                alt=""
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center text-white ring-2 ring-primary-500/30">
                                <UserCircleIcon className="h-10 w-10" aria-hidden="true" />
                              </div>
                            )}
                            <div className="ml-3">
                              <p className="text-base font-semibold text-foreground">
                                {user.name || 'User'}
                              </p>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <EnvelopeIcon className="mr-1 h-3.5 w-3.5" />
                                {user.email || 'user@example.com'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            <div className="text-xs flex flex-col items-center justify-center rounded-md bg-gray-100 dark:bg-slate-800 p-2">
                              <span className="text-gray-500 dark:text-gray-400">Role</span>
                              <span className="font-medium text-foreground">{user.role || 'Member'}</span>
                            </div>
                            <div className="text-xs flex flex-col items-center justify-center rounded-md bg-gray-100 dark:bg-slate-800 p-2">
                              <span className="text-gray-500 dark:text-gray-400">Status</span>
                              <span className="font-medium text-green-600 dark:text-green-400">Active</span>
                            </div>
                          </div>
                        </div>
                        
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={user?.role === 'brand' ? '/brand/profile' : '/influencer/profile'}
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-slate-700 text-primary-600 dark:text-primary-400' : 'text-foreground',
                                'flex px-4 py-3 text-sm transition-colors duration-150 hover:scale-[1.02] transform'
                              )}
                            >
                              <UserIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                              <span>Your Profile</span>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={user?.role === 'brand' ? '/brand/settings' : '/influencer/settings'}
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-slate-700 text-primary-600 dark:text-primary-400' : 'text-foreground',
                                'flex px-4 py-3 text-sm transition-colors duration-150 hover:scale-[1.02] transform'
                              )}
                            >
                              <AdjustmentsHorizontalIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                              <span>Settings</span>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={classNames(
                                active ? 'bg-gray-100 dark:bg-slate-700 text-primary-600 dark:text-primary-400' : 'text-foreground',
                                'flex w-full px-4 py-3 text-sm text-left transition-colors duration-150 hover:scale-[1.02] transform'
                              )}
                            >
                              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                              <span>Sign out</span>
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="flex space-x-4">
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary-600 hover:to-blue-600 dark:hover:from-primary-400 dark:hover:to-blue-400 px-4 py-2 rounded-md border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:scale-105 transition-all duration-200"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      className="text-sm font-medium bg-gradient-to-r from-primary-600 to-blue-600 text-white hover:from-primary-500 hover:to-blue-500 px-5 py-2.5 rounded-md shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105 transform"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="flex md:hidden items-center space-x-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  disabled={isTransitioning}
                  className={`relative rounded-full w-10 h-5 p-0.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    theme === 'dark' ? 'bg-primary-600' : 'bg-gray-200'
                  } ${isTransitioning ? 'opacity-70 cursor-not-allowed' : ''}`}
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  <span className="sr-only">
                    {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  </span>
                  <span 
                    className={`absolute top-0.5 transform transition-transform duration-300 ease-in-out bg-white rounded-full flex items-center justify-center w-4 h-4 shadow-sm ${
                      theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  >
                   {theme === 'dark' ? (
                      <MoonIcon className="h-2.5 w-2.5 text-primary-600" aria-hidden="true" />
                   ) : (
                      <SunIcon className="h-2.5 w-2.5 text-amber-500" aria-hidden="true" />
                    )}
                  </span>
                  {isTransitioning && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary-500 animate-pulse"></span>
                   )}
                </button>
                
                {/* Mobile Question mark button */}
                <Link
                  to="/privacy-policy"
                  className="relative rounded-full w-9 h-9 flex items-center justify-center bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 text-purple-600 dark:text-pink-400 hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-800/60 dark:hover:to-pink-800/60 shadow-sm hover:shadow transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label="Privacy Policy"
                >
                  <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                </Link>
                
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            {/* Mobile search bar */}
            <div className="px-4 pt-4 pb-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-9 pr-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all duration-200"
                  placeholder="Search influencers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Mobile navigation links */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-3">
              <div className="px-2 space-y-1">
                <Disclosure.Button
                  as="div"
                  className="flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
                >
                  <span>Features</span>
                  <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                </Disclosure.Button>
                <div className="ml-4 px-3 py-2">
                  <div className="space-y-2 mb-2">
                    {/* Feature buttons for mobile */}
                    {['AI-Powered Matching', 'Direct DM Communication', 'Secure Escrow Payments', 'Real-time Analytics', 'Fraud Detection'].map((feature) => (
                      <div key={feature}>
                        {clickedFeature === feature ? (
                          <div className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-primary-200 dark:border-primary-800">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-100 to-blue-100 dark:from-primary-900 dark:to-blue-900 flex items-center justify-center">
                                <SparklesIcon className="h-3 w-3 text-primary-500" aria-hidden="true" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600 dark:from-primary-400 dark:to-blue-400">Coming Soon</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Currently we are working on it. Thanks for your patience!</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <button
                            key={feature}
                            onClick={() => setClickedFeature(feature)}
                            className="w-full text-left px-3 py-2 rounded-md bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 shadow-sm transition-all duration-200 border border-gray-100 dark:border-gray-700 hover:scale-[1.01] group"
                          >
                            <div className="flex items-center space-x-2">
                              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary-100 to-blue-100 dark:from-primary-900 dark:to-blue-900 flex items-center justify-center">
                                <SparklesIcon className="h-3 w-3 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                              </div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{feature}</span>
                            </div>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Disclosure.Button
                  as="div"
                  className="flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
                >
                  <span>Resources</span>
                  <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                </Disclosure.Button>
                <div className="ml-4 px-3 py-2">
                  <div className="p-3 text-center border border-primary-200/30 dark:border-primary-800/30 rounded-xl bg-gradient-to-r from-primary-50/30 to-blue-50/30 dark:from-primary-900/30 dark:to-blue-900/30">
                    <div className="space-y-1">
                      <SparklesIcon className="h-5 w-5 text-primary-500 mx-auto" />
                      <h3 className="text-sm font-medium text-primary-600 dark:text-primary-400">Coming Soon</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Currently we are working on it. Thanks for your patience!</p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
                >
                  About Us
                </Link>
              </div>
            </div>

            {/* Mobile user menu or login buttons */}
            {user ? (
              <div className="border-t border-gray-200 dark:border-slate-700 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    {user.avatar ? (
                      <img
                        className="h-10 w-10 rounded-full ring-2 ring-primary-500/30 object-cover"
                        src={user.avatar}
                        alt=""
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center text-white ring-2 ring-primary-500/30">
                        <UserCircleIcon className="h-8 w-8" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-foreground">
                      {user.name || 'User'}
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {user.email || 'user@example.com'}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to={user?.role === 'brand' ? '/brand/profile' : '/influencer/profile'}
                    className="flex items-center px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-800 dark:hover:text-white hover:scale-[1.02] transition-all duration-200"
                  >
                    <UserIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                    Your Profile
                  </Link>
                  <Link
                    to={user?.role === 'brand' ? '/brand/settings' : '/influencer/settings'}
                    className="flex items-center px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-800 dark:hover:text-white hover:scale-[1.02] transition-all duration-200"
                  >
                    <AdjustmentsHorizontalIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="flex w-full items-center px-4 py-2 text-left text-base font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-800 dark:hover:text-white hover:scale-[1.02] transition-all duration-200"
                  >
                    <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" aria-hidden="true" />
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 dark:border-slate-700 pb-3 pt-4">
                <div className="flex flex-col space-y-2 px-4">
                  <Link
                    to="/login"
                    className="w-full text-center px-4 py-2.5 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 border border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 rounded-md hover:scale-[1.02] transition-all duration-200"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="w-full text-center px-4 py-2.5 text-base font-medium text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 rounded-md shadow-sm hover:shadow hover:scale-[1.02] transition-all duration-200"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
} 
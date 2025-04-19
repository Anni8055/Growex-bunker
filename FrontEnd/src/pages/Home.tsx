import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  ChatBubbleLeftRightIcon, 
  ShieldCheckIcon, 
  ChartBarIcon, 
  ExclamationTriangleIcon,
  ArrowRightIcon,
  BoltIcon,
  UserGroupIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

import FloatingIcons from '../components/FloatingIcons';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import RotatingText from '../components/RotatingText';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { theme } = useTheme();
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [time, setTime] = useState(new Date());
  const { user } = useAuth();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('timeline-active');
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    timelineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Features list for the key features section
  const features = [
    {
      title: 'AI-Powered Matching',
      description: 'Our advanced AI algorithm connects brands with the perfect influencers based on audience demographics, engagement, and brand alignment.',
      icon: <SparklesIcon className="h-6 w-6" />,
    },
    {
      title: 'Direct DM Communication',
      description: 'Communicate seamlessly with brands and influencers through our secure, integrated messaging system.',
      icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />,
    },
    {
      title: 'Secure Escrow Payments',
      description: 'Our escrow payment system ensures funds are only released when both parties are satisfied with campaign deliverables.',
      icon: <ShieldCheckIcon className="h-6 w-6" />,
    },
    {
      title: 'Real-time Analytics',
      description: 'Track campaign performance metrics in real-time with comprehensive dashboards and customizable reports.',
      icon: <ChartBarIcon className="h-6 w-6" />,
    },
    {
      title: 'Fraud Detection',
      description: 'Advanced AI technology detects fake followers and engagement, ensuring authentic partnerships.',
      icon: <ExclamationTriangleIcon className="h-6 w-6" />,
    },
  ];

  // Steps for how it works section
  const steps = [
    {
      title: 'Create Your Profile',
      description: 'Sign up and build your brand or influencer profile with details about your audience, interests, and goals.',
      icon: <UserGroupIcon className="h-6 w-6" />,
    },
    {
      title: 'Connect with AI Matching',
      description: 'Our AI algorithm suggests perfect partnerships based on your specific requirements and audience alignment.',
      icon: <SparklesIcon className="h-6 w-6" />,
    },
    {
      title: 'Collaborate Directly',
      description: 'Use our secure messaging system to discuss campaigns, negotiate terms, and finalize agreements.',
      icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />,
    },
    {
      title: 'Secure Payment & Analytics',
      description: 'Execute campaigns with secure escrow payments and track real-time performance metrics.',
      icon: <LockClosedIcon className="h-6 w-6" />,
    },
  ];

  // Testimonials for the trust section
  const testimonials = [
    {
      quote: "adgorithm has transformed how we find influencers. The AI matching is scary accurate, and the direct messaging makes collaboration so much easier.",
      author: "Sarah Johnson",
      role: "Marketing Director at TechBrand",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
      quote: "As an influencer, I've tried many platforms, but nothing compares to the quality of brand matches and the security of the escrow payment system.",
      author: "Alex Rivera",
      role: "Lifestyle Influencer, 500K+ Followers",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The fraud detection feature alone is worth it. No more wasting budget on influencers with fake engagement. This platform is a game-changer.",
      author: "David Chen",
      role: "CMO at GreenLife Products",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section with enhanced light theme gradients */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-900 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-gray-100/50 dark:bg-grid-gray-800/20 bg-bottom [mask-image:linear-gradient(to_bottom,transparent,50%,white)]"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-b from-indigo-100 to-purple-100 opacity-30 blur-3xl dark:from-indigo-900/40 dark:to-purple-900/40"></div>
          <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-t from-blue-100 to-cyan-100 opacity-30 blur-3xl dark:from-blue-900/40 dark:to-cyan-900/40"></div>
        </div>
        
        <FloatingIcons className="z-0" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <RotatingText />
            
            <div className="mt-8 mb-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
              <Link 
                to="/register?role=brand" 
                className="rounded-lg bg-gradient-to-r from-primary-600 to-blue-600 px-7 py-3.5 text-base font-medium text-white shadow-lg hover:from-primary-700 hover:to-blue-700 hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Sign Up as a Brand
              </Link>
              <Link 
                to="/register?role=influencer" 
                className="rounded-lg bg-white dark:bg-slate-800 px-7 py-3.5 text-base font-medium text-gray-800 dark:text-white shadow-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Find Campaigns as an Influencer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section with enhanced gradients */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" id="features">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: '-100px' }}
              className="relative"
            >
              <p className="text-lg font-semibold leading-8 tracking-tight text-primary-600 dark:text-primary-400">Features</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Everything You Need In One Platform</h2>
              <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Our comprehensive suite of tools streamlines the entire influencer marketing process from discovery to analytics.
              </p>
            </motion.div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works section */}
      <section className="relative py-8 sm:py-12 bg-gradient-to-br from-gray-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" id="how-it-works">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 opacity-20 blur-3xl dark:from-pink-900/30 dark:to-rose-900/30"></div>
          <div className="absolute left-1/4 bottom-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 opacity-20 blur-3xl dark:from-violet-900/30 dark:to-indigo-900/30"></div>
        </div>

        <div className="relative w-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-2">
            <div className="mx-auto max-w-2xl text-center mb-2">
              <h2 className="text-xl font-bold uppercase tracking-wide text-blue-600 dark:text-blue-500">
                HOW IT WORKS
              </h2>
              <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                Simple, transparent process
              </p>
              <p className="mt-1 max-w-prose mx-auto text-sm text-gray-700 dark:text-gray-300 font-medium">
                Get started in minutes and connect with the perfect partners for your brand or audience.
              </p>
            </div>
          </div>

          {/* Scroll Snapping Steps Section - Reduced Height */}
          <div className="relative w-full h-[70vh] snap-y snap-mandatory overflow-y-auto">
            {steps.map((step, index) => (
              <div 
                key={step.title}
                ref={el => timelineRefs.current[index] = el}
                className="w-full h-[65vh] snap-start snap-always overflow-hidden flex items-center justify-center relative"
                style={{ 
                  background: `linear-gradient(135deg, ${
                    index % 2 === 0 
                      ? 'rgba(30, 58, 138, 0.8) 0%, rgba(37, 99, 235, 0.5) 100%' 
                      : 'rgba(67, 56, 202, 0.8) 0%, rgba(124, 58, 237, 0.5) 100%'
                  })` 
                }}
              >
                {/* Background blurred elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute left-[20%] top-[30%] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-3xl"></div>
                  <div className="absolute right-[10%] bottom-[20%] h-[200px] w-[200px] rounded-full bg-purple-500/10 blur-3xl"></div>
                </div>
                
                <div className="relative max-w-7xl w-full px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between">
                  {/* Left side content */}
                  <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-8">
                    {/* Step indicator with vertical timeline */}
                    <div className="flex items-start mb-3">
                      <div className="relative">
                        {/* Timeline line */}
                        {index < steps.length - 1 && (
                          <div className="timeline-line absolute top-10 left-[15px] w-[2px] h-[65vh]"></div>
                        )}
                        
                        {/* Step circle */}
                        <div className="timeline-circle relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center">
                            <span className="text-sm font-bold text-white">{index + 1}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="timeline-content ml-4">
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          {step.title}
                        </h3>
                        <p className="text-gray-300 text-sm mt-1 mb-4 max-w-xl">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Features for this step */}
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {index === 0 && (
                        <>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-900/50">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            </div>
                            <span className="text-xs text-gray-200">Customize your profile</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-900/50">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            </div>
                            <span className="text-xs text-gray-200">Upload portfolio</span>
                          </div>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-900/50">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            </div>
                            <span className="text-xs text-gray-200">AI-powered matching</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-900/50">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            </div>
                            <span className="text-xs text-gray-200">Find ideal partnerships</span>
                          </div>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-900/50">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            </div>
                            <span className="text-xs text-gray-200">Secure messaging</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-900/50">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            </div>
                            <span className="text-xs text-gray-200">Negotiate terms</span>
                          </div>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-900/50">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            </div>
                            <span className="text-xs text-gray-200">Escrow payments</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-900/50">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            </div>
                            <span className="text-xs text-gray-200">Performance tracking</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="mt-4 ml-12">
                      <Link to="/register" className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-sm text-white font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300">
                        Get Started 
                        <ArrowRightIcon className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Right side image */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative w-full max-w-md p-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden group">
                      <div className="aspect-[4/3] bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-lg overflow-hidden p-4 flex items-center justify-center">
                        {index === 0 && (
                          <div className="text-center">
                            <div className="bg-blue-600/20 p-4 rounded-full w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                              <UserGroupIcon className="h-12 w-12 text-blue-300" />
                            </div>
                            <div className="text-center text-blue-200 mt-2 text-sm font-medium">
                              Create a detailed profile with your audience demographics
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-4">
                              <div className="bg-blue-900/30 p-1.5 rounded-lg">
                                <div className="w-full h-6 bg-blue-800/40 rounded"></div>
                                <div className="w-3/4 h-1.5 bg-blue-700/40 rounded mt-1.5"></div>
                              </div>
                              <div className="bg-blue-900/30 p-1.5 rounded-lg">
                                <div className="w-full h-6 bg-blue-800/40 rounded"></div>
                                <div className="w-1/2 h-1.5 bg-blue-700/40 rounded mt-1.5"></div>
                              </div>
                              <div className="bg-blue-900/30 p-1.5 rounded-lg">
                                <div className="w-full h-6 bg-blue-800/40 rounded"></div>
                                <div className="w-2/3 h-1.5 bg-blue-700/40 rounded mt-1.5"></div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {index === 1 && (
                          <div className="text-center">
                            <div className="bg-blue-600/20 p-4 rounded-full w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                              <SparklesIcon className="h-12 w-12 text-blue-300" />
                            </div>
                            <div className="text-center text-blue-200 mt-2 text-sm font-medium">
                              Our AI analyzes your needs and finds perfect matches
                            </div>
                            <div className="flex justify-center space-x-3 mt-4">
                              <div className="animate-pulse bg-blue-600/30 w-12 h-12 rounded-full flex items-center justify-center">
                                <div className="w-9 h-9 bg-blue-500/30 rounded-full"></div>
                              </div>
                              <div className="animate-pulse bg-indigo-600/30 w-12 h-12 rounded-full flex items-center justify-center" style={{animationDelay: '300ms'}}>
                                <div className="w-9 h-9 bg-indigo-500/30 rounded-full"></div>
                              </div>
                              <div className="animate-pulse bg-purple-600/30 w-12 h-12 rounded-full flex items-center justify-center" style={{animationDelay: '600ms'}}>
                                <div className="w-9 h-9 bg-purple-500/30 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {index === 2 && (
                          <div className="text-center">
                            <div className="bg-blue-600/20 p-4 rounded-full w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                              <ChatBubbleLeftRightIcon className="h-12 w-12 text-blue-300" />
                            </div>
                            <div className="text-center text-blue-200 mt-2 text-sm font-medium">
                              Discuss campaign details through secure messaging
                            </div>
                            <div className="flex flex-col mt-4 space-y-1.5">
                              <div className="flex">
                                <div className="bg-blue-700/40 p-1.5 rounded-lg mr-auto">
                                  <div className="w-24 h-1.5 bg-blue-600/40 rounded"></div>
                                </div>
                              </div>
                              <div className="flex">
                                <div className="bg-indigo-700/40 p-1.5 rounded-lg ml-auto">
                                  <div className="w-20 h-1.5 bg-indigo-600/40 rounded"></div>
                                </div>
                              </div>
                              <div className="flex">
                                <div className="bg-blue-700/40 p-1.5 rounded-lg mr-auto">
                                  <div className="w-28 h-1.5 bg-blue-600/40 rounded"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {index === 3 && (
                          <div className="text-center">
                            <div className="bg-blue-600/20 p-4 rounded-full w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                              <LockClosedIcon className="h-12 w-12 text-blue-300" />
                            </div>
                            <div className="text-center text-blue-200 mt-2 text-sm font-medium">
                              Secure escrow payments and analytics dashboard
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                              <div className="bg-blue-900/30 p-1.5 rounded-lg">
                                <div className="w-full h-1.5 bg-green-500/40 rounded mb-1"></div>
                                <div className="w-full h-6 bg-blue-800/40 rounded"></div>
                              </div>
                              <div className="bg-blue-900/30 p-1.5 rounded-lg">
                                <div className="w-full h-1.5 bg-purple-500/40 rounded mb-1"></div>
                                <div className="w-full h-6 bg-blue-800/40 rounded"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Scroll indicator for all but last step */}
                {index < steps.length - 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
                
                {/* "Continue" text for last step */}
                {index === steps.length - 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <span className="text-white/70 text-xs">Continue scrolling</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 sm:py-12 bg-gradient-to-br from-white via-gray-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" id="testimonials">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <p className="text-lg font-semibold leading-8 tracking-tight text-primary-600 dark:text-primary-400">Testimonials</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Trusted by Brands and Influencers</h2>
            </motion.div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.author}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                avatar={testimonial.avatar}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 bg-gradient-to-br from-white via-gray-50 to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center justify-center">
              <ShieldCheckIcon className="h-10 w-10 text-primary-500 mb-2" />
              <h3 className="text-center text-sm font-semibold text-foreground">Secure Payments</h3>
            </div>
            <div className="flex flex-col items-center justify-center">
              <LockClosedIcon className="h-10 w-10 text-primary-500 mb-2" />
              <h3 className="text-center text-sm font-semibold text-foreground">Data Protection</h3>
            </div>
            <div className="flex flex-col items-center justify-center">
              <SparklesIcon className="h-10 w-10 text-primary-500 mb-2" />
              <h3 className="text-center text-sm font-semibold text-foreground">AI-Powered</h3>
            </div>
            <div className="flex flex-col items-center justify-center">
              <UserGroupIcon className="h-10 w-10 text-primary-500 mb-2" />
              <h3 className="text-center text-sm font-semibold text-foreground">Verified Users</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative">
        <div className="overflow-hidden rounded-2xl mx-6 sm:mx-10 lg:mx-20 my-16 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800">
          <div className="relative overflow-hidden bg-primary-700 dark:bg-primary-900 px-6 py-16 sm:px-10 sm:py-24 lg:py-32">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-[40rem] w-[40rem] animate-gradient-xy rounded-full bg-gradient-to-br from-primary-500/30 to-primary-800/30 opacity-30 blur-3xl"></div>
            </div>
            
            <div className="relative mx-auto max-w-2xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Join the Future of Influencer Marketing
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  Connect with the perfect partners, streamline your campaigns, and maximize your ROI with our AI-powered platform.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link to="/register" className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white">
                    Get Started For Free
                  </Link>
                  <Link to="/about" className="text-base font-semibold text-white flex items-center">
                    Learn more <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Footer Section */}
      <footer className="relative bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white overflow-hidden py-8">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[5%] top-[20%] h-[200px] w-[200px] rounded-full bg-blue-500/5 blur-3xl"></div>
          <div className="absolute right-[10%] bottom-[20%] h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-3xl"></div>
          <div className="absolute left-[40%] bottom-[10%] h-[250px] w-[250px] rounded-full bg-indigo-500/5 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer grid with logo, links and newsletter */}
          <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Logo and Social Links */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-indigo-300 transition-all duration-300">
                adgorithm
              </h3>
              <p className="text-sm text-gray-400">
                Connecting brands with the perfect influencers through AI-powered matching.
              </p>
              <div className="flex space-x-4">
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600 transition-colors transform hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors transform hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors transform hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-200 inline-block">Marketing</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-200 inline-block">Analytics</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-200 inline-block">Commerce</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-200 inline-block">Insights</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-200 inline-block">Documentation</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-200 inline-block">Guides</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-200 inline-block">API Status</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Stay Updated</h3>
              <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
              <form className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-300"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors text-sm font-medium hover:scale-105 transform transition-transform duration-200"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-400 mb-4 md:mb-0">
                © 2025 adgorithm. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-blue-400 transition-colors hover:underline">Privacy Policy</Link>
                <Link to="/terms-of-service" className="text-sm text-gray-400 hover:text-blue-400 transition-colors hover:underline">Terms of Service</Link>
                <Link to="/cookie-policy" className="text-sm text-gray-400 hover:text-blue-400 transition-colors hover:underline">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes digitalGlow {
          0% { text-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
          50% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
          100% { text-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
        }

        .animate-digitalGlow {
          animation: digitalGlow 2s infinite;
        }
      `}</style>
    </div>
  );
}

const TestButtons = () => {
  const { login, logout, isAuthenticated, userType } = useAuth();
  
  // Login functions that match the AuthContext login signature (email, password)
  const loginAsBrand = () => {
    // Properly formatted call with email, password parameters
    login("brand@example.com", "password123");
  };
  
  const loginAsInfluencer = () => {
    // Properly formatted call with email, password parameters
    login("influencer@example.com", "password123");
  };
  
  return (
    <div>
      <h3>Test Authentication</h3>
      <p>Status: {isAuthenticated ? `Logged in as ${userType}` : 'Not logged in'}</p>
      <button onClick={loginAsBrand}>Login as Brand</button>
      <button onClick={loginAsInfluencer}>Login as Influencer</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}; 
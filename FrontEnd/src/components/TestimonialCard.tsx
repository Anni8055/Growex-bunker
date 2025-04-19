import React from 'react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  delay?: number;
}

export default function TestimonialCard({ quote, author, role, avatar, delay = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      className="relative flex flex-col p-6 bg-card rounded-lg shadow-md border border-border/40"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="mb-4">
        {/* Quote symbol */}
        <svg
          className="h-8 w-8 text-primary-400 dark:text-primary-600/50 mb-2"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <p className="text-foreground font-medium">{quote}</p>
      </div>
      <div className="mt-auto flex items-center">
        <img 
          src={avatar} 
          alt={author} 
          className="h-10 w-10 rounded-full mr-3 object-cover" 
        />
        <div>
          <h4 className="text-sm font-semibold text-foreground">{author}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </motion.div>
  );
} 
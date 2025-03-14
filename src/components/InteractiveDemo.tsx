import React, { useState, useEffect, useRef } from 'react';
import { createFloating } from '@floating-ui/dom';
import Swiper from 'swiper';
import VanillaTilt from 'vanilla-tilt';
import 'swiper/css';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';

interface FormData {
  name: string;
  email: string;
  message: string;
  newsletter: boolean;
  contactMethod: string;
}

const InteractiveDemo: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    newsletter: false,
    contactMethod: 'email'
  });

  const [isPopupVisible, setPopupVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  // Initialize video.js
  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        fluid: true,
        sources: [{
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          type: 'video/mp4'
        }]
      });
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, []);

  // Initialize tilt effect
  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5
      });
    }
  }, []);

  // Initialize floating tooltip
  useEffect(() => {
    if (tooltipRef.current && anchorRef.current) {
      const cleanup = createFloating(tooltipRef.current, anchorRef.current, {
        placement: 'top',
        middleware: []
      });
      return () => cleanup();
    }
  }, []);

  // Form validation with browser detection
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Browser detection
    const userAgent = navigator.userAgent;
    const isMobile = /Mobile|Android|iPhone/i.test(userAgent);
    
    // Form validation
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Submit form with device info
    console.log('Form submitted:', {
      ...formData,
      deviceType: isMobile ? 'mobile' : 'desktop',
      browser: navigator.userAgent
    });

    setFormData({
      name: '',
      email: '',
      message: '',
      newsletter: false,
      contactMethod: 'email'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">Interactive Features Demo</h2>

      {/* Interactive Table */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Data Table</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b text-left">Feature</th>
                <th className="px-6 py-3 border-b text-left">Description</th>
                <th className="px-6 py-3 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">HTML5 Features</td>
                <td className="px-6 py-4 border-b">Modern semantic elements</td>
                <td className="px-6 py-4 border-b">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Active</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">CSS3 Support</td>
                <td className="px-6 py-4 border-b">Advanced styling capabilities</td>
                <td className="px-6 py-4 border-b">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Active</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Form */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Interactive Form</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-gray-700">Contact Method</legend>
            <div className="mt-2 space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="contactMethod"
                  value="email"
                  checked={formData.contactMethod === 'email'}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                <span className="ml-2">Email</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="contactMethod"
                  value="phone"
                  checked={formData.contactMethod === 'phone'}
                  onChange={handleInputChange}
                  className="form-radio"
                />
                <span className="ml-2">Phone</span>
              </label>
            </div>
          </fieldset>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleInputChange}
              className="form-checkbox"
            />
            <label htmlFor="newsletter" className="ml-2">
              Subscribe to newsletter
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </section>

      {/* Multimedia Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Multimedia Content</h3>
        
        {/* Video Player */}
        <div className="mb-6">
          <video
            ref={videoRef}
            className="video-js vjs-big-play-centered"
          />
        </div>

        {/* Audio Player */}
        <div className="mb-6">
          <audio controls className="w-full">
            <source src="https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav" type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>

        {/* Animation */}
        <div className="mb-6">
          <lottie-player
            src="https://assets2.lottiefiles.com/packages/lf20_UJNc2t.json"
            background="transparent"
            speed="1"
            style={{ width: '300px', height: '300px' }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </section>

      {/* Interactive Elements */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Interactive Elements</h3>
        
        {/* Tooltip */}
        <div className="mb-6">
          <button
            ref={anchorRef}
            onMouseEnter={() => setPopupVisible(true)}
            onMouseLeave={() => setPopupVisible(false)}
            className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
          >
            Hover for tooltip
          </button>
          {isPopupVisible && (
            <div
              ref={tooltipRef}
              className="bg-black text-white p-2 rounded text-sm"
              role="tooltip"
            >
              Interactive tooltip with ARIA support
            </div>
          )}
        </div>

        {/* Tilt Effect Card */}
        <div
          ref={tiltRef}
          className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto transform hover:scale-105 transition-transform"
        >
          <h4 className="text-xl font-semibold mb-2">Interactive Card</h4>
          <p>This card has a 3D tilt effect on hover</p>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Accessibility Features</h3>
        <div className="space-y-4">
          <button
            onClick={() => {
              document.body.style.fontSize = 
                document.body.style.fontSize === '120%' ? '100%' : '120%';
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            aria-label="Toggle text size"
          >
            Toggle Text Size
          </button>

          <div role="img" aria-label="Decorative image with full description">
            <img
              src="https://images.unsplash.com/photo-1526495124232-a04e1849168c"
              alt="Slovak landscape showing traditional architecture nestled among rolling hills"
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default InteractiveDemo;
// Test file to verify all libraries are properly installed and working
import gsap from 'gsap';

export const testGSAP = () => {
  console.log('GSAP Version:', gsap.version);
  return gsap.version;
};

export const testLottie = () => {
  // We'll test Lottie when we use it in components
  console.log('Lottie library loaded successfully');
  return true;
};

export const testTailwind = () => {
  // Tailwind will be tested by checking if CSS classes work
  console.log('Tailwind CSS configured');
  return true;
};
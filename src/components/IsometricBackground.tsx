import { motion } from 'motion/react';

const Shape = ({ color, size, top, left, delay, rotate = 45 }: { color: string, size: number, top: string, left: string, delay: number, rotate?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.1, 0.3, 0.1], 
      scale: 1,
      y: [0, -20, 0],
      rotate: [rotate, rotate + 5, rotate]
    }}
    transition={{ 
      duration: 5, 
      delay, 
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{ top, left, width: size, height: size }}
    className="absolute pointer-events-none z-0"
  >
    {/* Isometric Cube Simulation */}
    <div className="relative w-full h-full transform" style={{ transform: 'rotateX(60deg) rotateZ(45deg)' }}>
      {/* Top */}
      <div 
        className="absolute inset-0 border-2 border-black" 
        style={{ backgroundColor: color, transform: 'translateZ(20px)' }}
      />
      {/* Right */}
      <div 
        className="absolute inset-0 border-2 border-black origin-right" 
        style={{ backgroundColor: color, filter: 'brightness(0.7)', transform: 'rotateY(-90deg) translateZ(-20px)' }}
      />
      {/* Left */}
      <div 
        className="absolute inset-0 border-2 border-black origin-bottom" 
        style={{ backgroundColor: color, filter: 'brightness(0.5)', transform: 'rotateX(-90deg) translateZ(-20px)' }}
      />
    </div>
  </motion.div>
);

export default function IsometricBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <Shape color="#0055FF" size={60} top="15%" left="10%" delay={0} />
      <Shape color="#FF0055" size={40} top="45%" left="85%" delay={1} rotate={-15} />
      <Shape color="#E60000" size={80} top="75%" left="15%" delay={2} rotate={10} />
      <Shape color="#0055FF" size={30} top="30%" left="70%" delay={1.5} />
      <Shape color="#FF0055" size={100} top="85%" left="75%" delay={0.5} rotate={30} />
    </div>
  );
}

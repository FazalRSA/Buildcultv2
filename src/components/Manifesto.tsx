import { motion } from 'motion/react';

export default function Manifesto() {
  return (
    <section id="manifesto" className="py-20 sm:py-32 lg:py-40 bg-white text-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-12 mb-8 sm:mb-16 lg:mb-20 text-center">
            <span className="font-bold text-[10px] uppercase tracking-[0.5em] bg-black text-white px-4 py-2 mb-6 sm:mb-8 inline-block">
              HOW WE WORK
            </span>
            <h2 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[100px] uppercase leading-[0.88] tracking-[-0.05em]">
              CORE <br /> PRINCIPLES
            </h2>
          </div>
          
          <div className="lg:col-start-3 lg:col-span-8 flex flex-col gap-12 sm:gap-20 lg:gap-28">
            {[
              { 
                num: "01", 
                title: "PRODUCTION OVER HYPE", 
                text: "We don't sell slide decks or fragile demos. Every system we build is engineered to handle real data, real users, and real operational load from day one." 
              },
              { 
                num: "02", 
                title: "COMMERCIAL OUTCOMES FIRST", 
                text: "Technology is only valuable if it moves the needle. Whether we're automating back-office workflows or building customer-facing software, we measure success by time saved and revenue generated." 
              },
              { 
                num: "03", 
                title: "SENIOR HANDS-ON EXECUTION", 
                text: "You work directly with experienced engineers and architects who write code, solve complex bottlenecks, and leave your internal team stronger than they found it." 
              }
            ].map((item) => (
              <motion.div 
                key={item.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="group border-b border-black/10 pb-10 sm:pb-16 lg:pb-20 last:border-0"
              >
                <div className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tighter mb-4 sm:mb-6 flex items-baseline gap-4 sm:gap-6">
                  <span className="text-accent">{item.num}.</span>
                  <span>{item.title}</span>
                </div>
                <p className="text-base sm:text-xl lg:text-2xl leading-relaxed text-black/85 font-light max-w-2xl">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background text decoration */}
      <div className="absolute -bottom-10 sm:-bottom-20 -right-10 sm:-right-20 font-sans font-black text-[24vw] text-black/[0.03] leading-none pointer-events-none select-none tracking-tighter hidden sm:block">
        BUILD
      </div>
    </section>
  );
}

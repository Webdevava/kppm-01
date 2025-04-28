import React, { useState, useRef, useEffect } from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const faqRefs = useRef([]);

  // Initialize refs array
  useEffect(() => {
    faqRefs.current = faqRefs.current.slice(0, 6);
  }, []);

  const faqItems = [
    {
      question: "What services does KPPMca offer?",
      answer: "We offer a comprehensive range of digital services including web design and development, branding, digital marketing, UX/UI design, e-commerce solutions, and custom application development. Our goal is to provide end-to-end digital solutions that help your business grow online."
    },
    {
      question: "How long does it typically take to complete a project?",
      answer: "Project timelines vary depending on scope and complexity. A simple website may take 4-6 weeks, while more complex projects can take 3-6 months. During our initial consultation, we'll provide a detailed timeline based on your specific requirements and goals."
    },
    {
      question: "What is your pricing structure?",
      answer: "We provide customized pricing based on the specific needs of each project. Factors that influence cost include project complexity, design requirements, features needed, and the timeline. We offer packages starting from $5,000 for basic websites, with custom quotations for larger projects. Contact us for a free consultation and detailed quote."
    },
    {
      question: "Do you offer maintenance and support after project completion?",
      answer: "Yes, we offer various maintenance packages to ensure your digital products remain secure, up-to-date, and optimized. Our support plans include regular updates, security monitoring, performance optimization, and technical support. We believe in building long-term relationships with our clients."
    },
    {
      question: "How do you handle revisions during the design process?",
      answer: "Our process includes designated revision periods where you can provide feedback. Each project typically includes 2-3 rounds of revisions at key milestones. We value collaboration and ensure your vision is accurately translated into the final product through these feedback loops."
    },
    {
      question: "Can you work with our existing brand guidelines?",
      answer: "Absolutely! We can work with your existing brand guidelines to ensure consistency across all digital touchpoints. If you don't have formal guidelines, our team can help develop them or create designs that align with your current visual identity."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // Magnetic effect function
  const handleMouseMove = (e, index) => {
    if (!faqRefs.current[index]) return;
    
    const rect = faqRefs.current[index].getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    
    // Apply magnetic effect - move slightly toward cursor
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxDistance = 15;  // maximum movement in pixels
    
    const moveX = (x - centerX) / centerX * maxDistance;
    const moveY = (y - centerY) / centerY * maxDistance;
    
    faqRefs.current[index].style.transform = `translate(${moveX}px, ${moveY}px)`;
  };
  
  const handleMouseLeave = (index) => {
    if (!faqRefs.current[index]) return;
    
    // Reset position with a transition
    faqRefs.current[index].style.transition = 'transform 0.5s ease-out';
    faqRefs.current[index].style.transform = 'translate(0px, 0px)';
    
    // Remove transition after it completes to keep magnetic effect smooth
    setTimeout(() => {
      if (faqRefs.current[index]) {
        faqRefs.current[index].style.transition = '';
      }
    }, 500);
  };

  return (
    <section className="min-h-screen bg-[#F5F5F5] flex items-center justify-center lg:p-12">
      <div className="container mx-auto max-w-7xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl p-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <h2 className="text-5xl md:text-6xl font-medium mb-4 max-w-xl">Frequently Asked Questions</h2>
          <div>
            <p className="text-xl md:text-2xl max-w-md mb-2">
              Got questions? Here are answers to the ones we get asked most often.
            </p>
            <button className="bg-[#C7FB54] text-sm rounded-2xl px-8 py-3 font-bold hover:bg-[#C7FB78] transition-colors">
              Ask a Question
            </button>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="container mx-auto">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              ref={el => faqRefs.current[index] = el}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className={`border border-gray-200 bg-gray-50 transition-all duration-500 ease-out mb-4 rounded-2xl cursor-pointer hover:shadow-md`}
            >
              <button
                className="flex items-center gap-3 w-full py-6 px-2 text-left"
                onClick={() => toggleAccordion(index)}
              >
                <div className="mx-4 flex items-center justify-center">
                  <div className="bg-[#C7FB54] h-10 w-10 rounded-full flex items-center justify-center transition-all duration-500">
                    <Plus 
                      size={24} 
                      weight="bold" 
                      className={`text-black transition-transform duration-500 ${
                        openIndex === index ? 'rotate-45' : 'rotate-0'
                      }`}
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-medium">{item.question}</h3>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100 pb-6 px-20' 
                    : 'max-h-0 opacity-0'
                }`}
                style={{
                  transformOrigin: 'top',
                  transform: openIndex === index ? 'scaleY(1)' : 'scaleY(0)'
                }}
              >
                <p className="text-xl">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
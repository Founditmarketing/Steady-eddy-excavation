import React, { useState, useRef, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import { SectionHeader, PrimaryButton, OutlineButton, ScrollReveal } from './components/UIComponents';
import { Shovel, Truck, Ruler, ShieldCheck, MapPin, Clock, Quote, Phone, Mail, Facebook, Hammer, Trees, X, Loader2, CheckCircle2, ClipboardCheck, HardHat, ThumbsUp, ChevronDown, ChevronUp, ArrowRight, Instagram, Linkedin, Trophy, Users, Calendar, MoveHorizontal, ArrowUp } from 'lucide-react';
import { Service, Testimonial } from './types';

// Data Definitions
const services: Service[] = [
  {
    id: '1',
    title: 'Site Preparation',
    description: 'Complete site prep including clearing, leveling, and stabilizing soil for new construction projects.',
    details: [
      'Comprehensive land surveying and staking',
      'Vegetation and obstacle removal',
      'Soil stabilization and compaction testing',
      'Erosion control implementation'
    ],
    icon: <Ruler size={40} />
  },
  {
    id: '2',
    title: 'Excavation & Grading',
    description: 'Precision digging and grading to ensure proper drainage and a solid foundation for your property.',
    details: [
      'Foundation excavation for basements and footings',
      'Precision finish grading for landscaping',
      'Rough grading for driveways and pads',
      'Soil removal and relocation'
    ],
    icon: <Shovel size={40} />
  },
  {
    id: '3',
    title: 'Land Clearing',
    description: 'Removal of trees, stumps, brush, and debris to transform raw land into usable space.',
    details: [
      'Forestry mulching and brush cutting',
      'Stump grinding and root removal',
      'Rock and boulder clearing',
      'Debris hauling and eco-friendly disposal'
    ],
    icon: <Trees size={40} />
  },
  {
    id: '4',
    title: 'Demolition',
    description: 'Safe and efficient demolition of small structures, concrete removal, and debris hauling.',
    details: [
      'Residential structure demolition',
      'Concrete patio and driveway removal',
      'Swimming pool fill-ins',
      'Safety fencing and site securing'
    ],
    icon: <Hammer size={40} />
  },
  {
    id: '5',
    title: 'Drainage Solutions',
    description: 'Culvert installation, trenching, and french drains to manage water flow and prevent erosion.',
    details: [
      'French drain design and installation',
      'Culvert pipe placement for driveways',
      'Retention pond excavation',
      'Swale grading for water diversion'
    ],
    icon: <div className="font-bold text-3xl">~</div>
  },
  {
    id: '6',
    title: 'Driveway Installation',
    description: 'Building durable gravel or dirt driveways, from cutting the path to final compaction.',
    details: [
      'New driveway cut-ins',
      'Gravel spreading and compaction',
      'Driveway repair and resurfacing',
      'Culvert installation for access'
    ],
    icon: <Truck size={40} />
  }
];

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Mark Henderson',
    role: 'Homeowner',
    content: 'Steady Eddy did an incredible job clearing my lot. They were fast, professional, and left the site looking cleaner than I expected. Highly recommend!',
    rating: 5
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    role: 'Local Developer',
    content: 'Reliability is in the name for a reason. They showed up on time, the grading was laser-perfect, and the price was fair. My go-to excavation crew.',
    rating: 5
  },
  {
    id: '3',
    name: 'Mike O\'Connor',
    role: 'Rancher',
    content: 'Needed a new pond dug and some serious drainage work. These guys know dirt. Great communication throughout the whole project.',
    rating: 5
  }
];

const faqs = [
  {
    question: "Do you provide free estimates?",
    answer: "Yes! We offer 100% free, no-obligation estimates for all projects. We'll visit your site, assess the needs, and provide a transparent quote."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Absolutely. Steady Eddy Excavation LLC is fully licensed and carries comprehensive liability and workers' compensation insurance for your peace of mind."
  },
  {
    question: "What areas do you serve?",
    answer: "We primarily serve the greater county area and surrounding communities within a 50-mile radius. Contact us to see if we can come to your location."
  },
  {
    question: "How long does a typical project take?",
    answer: "Timeline varies by scope. A simple driveway might take 1-2 days, while complete site prep for a new home could take a week. We provide estimated timelines with every quote."
  }
];

const stats = [
  { label: "Projects Completed", value: "500+", icon: <CheckCircle2 size={32} /> },
  { label: "Years Experience", value: "15+", icon: <Calendar size={32} /> },
  { label: "Happy Clients", value: "100%", icon: <Users size={32} /> },
  { label: "Safety Record", value: "A+", icon: <Trophy size={32} /> },
];

const App: React.FC = () => {
  // Service Modal State
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Contact Form State
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Slider State
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to Top State
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phone: formData.get('phone'),
      service: formData.get('service'),
      details: formData.get('details'),
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus('success');
        // Reset after showing success for a bit
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        const errorData = await response.json();
        console.error('Email error:', errorData);
        alert(`Failed to send message: ${errorData.error?.message || errorData.error || 'Please try again later.'}`);
        setFormStatus('idle');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again later.');
      setFormStatus('idle');
    }
  };

  const handleSliderMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderContainerRef.current) return;

    const { left, width } = sliderContainerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((clientX - left) / width) * 100;

    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-eddy-orange selection:text-white">
        <Navbar />

        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/steadyeddyherosection.png"
              alt="Excavator at sunset"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-eddy-dark via-transparent to-black/60"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center sm:text-left pt-20">
            <ScrollReveal direction="scale">
              <div className="inline-block bg-eddy-orange text-white px-4 py-1 font-bold text-sm tracking-widest uppercase mb-4 rounded-full">
                Professional Excavation Services
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight drop-shadow-xl">
                BUILT ON <span className="text-eddy-orange block sm:inline">SOLID GROUND</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay="100">
              <p className="text-xl text-gray-200 mb-8 max-w-2xl font-light leading-relaxed mx-auto sm:mx-0 drop-shadow-md">
                Premier excavation, grading, and site preparation services. We move the earth so you can build your future.
              </p>
            </ScrollReveal>
            <ScrollReveal delay="200">
              <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                <PrimaryButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Get a Free Quote
                </PrimaryButton>
                <OutlineButton className="text-white border-white hover:bg-white hover:text-black hover:border-white" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                  Our Services
                </OutlineButton>
              </div>
            </ScrollReveal>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50 hidden md:block">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </section>

        {/* FEATURES / TRUST BAR */}
        <div className="bg-eddy-orange py-12 relative z-20 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 bg-black/10 rounded-full">
                <ShieldCheck size={32} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Licensed & Insured</h4>
                <p className="text-white/80 text-sm font-medium">100% Protected Services</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 bg-black/10 rounded-full">
                <MapPin size={32} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Locally Owned</h4>
                <p className="text-white/80 text-sm font-medium">Serving Our Community</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 bg-black/10 rounded-full">
                <Clock size={32} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">On-Time Completion</h4>
                <p className="text-white/80 text-sm font-medium">Reliable Scheduling</p>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionHeader
                title="Our Expertise"
                subtitle="From residential site prep to large-scale land clearing, we have the heavy machinery and experience to get the job done right."
              />
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ScrollReveal key={service.id} delay={index % 3 === 0 ? '0' : index % 3 === 1 ? '100' : '200'}>
                  <div
                    className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all cursor-pointer border-b-4 border-transparent hover:border-eddy-orange group h-full flex flex-col"
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="text-eddy-orange mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>
                    <div className="text-eddy-orange font-bold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                      Learn More <ArrowRight size={16} />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 bg-eddy-dark text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-eddy-orange opacity-5 skew-x-12 transform translate-x-20"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal direction="left">
                <div>
                  <h2 className="text-4xl font-black mb-6 uppercase">Why Choose <span className="text-eddy-orange">Steady Eddy?</span></h2>
                  <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                    <p>
                      Steady Eddy Excavation LLC was founded on a simple principle: <strong className="text-white">Do the job right, or don't do it at all.</strong> We understand that excavation is the foundation of any project. If the dirt isn't right, the build won't last.
                    </p>
                    <p>
                      We bring professional-grade equipment, experienced operators, and a commitment to safety to every job site. Whether you need a simple driveway repair or complex site grading for a new home, we treat your property with the same respect we'd treat our own.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                      {['Precision Grading', 'Modern Fleet', 'Safety First', 'Transparent Pricing'].map((item) => (
                        <li key={item} className="flex items-center gap-2 font-bold text-white">
                          <div className="w-2 h-2 bg-eddy-orange rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay="200" direction="right">
                <div className="relative">
                  <div className="absolute inset-0 border-4 border-eddy-orange transform translate-x-4 translate-y-4 rounded-lg"></div>
                  <img
                    src="/assets/whychooseus.jpg"
                    alt="Excavator operator"
                    className="w-full rounded-lg shadow-2xl relative z-10"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="bg-eddy-orange py-16 relative z-10 -mt-10 mx-4 max-w-6xl md:mx-auto rounded-xl shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index === 0 ? '0' : index === 1 ? '100' : index === 2 ? '200' : '300'} direction="scale">
                <div className="text-center text-white">
                  <div className="flex justify-center mb-3 opacity-80 text-eddy-dark">{stat.icon}</div>
                  <div className="text-3xl md:text-5xl font-black mb-1 text-eddy-dark">{stat.value}</div>
                  <div className="text-sm md:text-base font-bold uppercase tracking-wider opacity-80 text-eddy-dark">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* TRANSFORMATION SECTION (BEFORE/AFTER) */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionHeader
                title="The Transformation"
                subtitle="Drag the slider to see how we turn difficult terrain into usable land."
                centered={true}
              />
            </ScrollReveal>

            <ScrollReveal>
              <div
                className="relative w-full max-w-4xl mx-auto aspect-video rounded-xl shadow-2xl overflow-hidden cursor-ew-resize select-none"
                ref={sliderContainerRef}
                onMouseMove={handleSliderMove}
                onTouchMove={handleSliderMove}
              >
                {/* AFTER IMAGE (Bottom Layer) */}
                <img
                  src="/assets/newafter.jpeg"
                  alt="After Clearing"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* BEFORE IMAGE (Top Layer - Clipped) */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    src="/assets/newbefore.jpeg"
                    alt="Before Clearing"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Overlay Labels */}
                  <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded font-bold uppercase text-sm tracking-wider">Before</div>
                </div>

                {/* AFTER Label (Independent) */}
                <div className="absolute top-4 right-4 bg-eddy-orange text-white px-3 py-1 rounded font-bold uppercase text-sm tracking-wider">After</div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-eddy-orange">
                    <MoveHorizontal size={20} />
                  </div>
                </div>
              </div>
              <p className="text-center mt-4 text-gray-500 text-sm italic">
                Actual project results. Move cursor or swipe to compare.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* PARALLAX CTA SECTION */}
        <section className="relative py-32 bg-fixed bg-center bg-cover" style={{ backgroundImage: 'url("/assets/readytobreakgroundbackground.jpg")' }}>
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
            <ScrollReveal direction="scale">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">Ready to Break Ground?</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Don't let site issues hold up your project. Contact the team that gets it done right the first time.
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-eddy-orange text-white px-10 py-4 rounded-full font-bold text-xl hover:bg-white hover:text-eddy-orange hover:scale-105 transition-all shadow-xl"
              >
                Start Your Project
              </button>
            </ScrollReveal>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionHeader
                title="How We Work"
                subtitle="A transparent, step-by-step process ensures your project stays on track and on budget."
              />
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: <ClipboardCheck size={32} />, title: 'Consultation', desc: 'We visit your site to assess the terrain and discuss your goals.' },
                { icon: <Ruler size={32} />, title: 'Planning', desc: 'We provide a detailed quote and timeline for the project scope.' },
                { icon: <HardHat size={32} />, title: 'Execution', desc: 'Our skilled team gets to work with the right equipment for the job.' },
                { icon: <ThumbsUp size={32} />, title: 'Completion', desc: 'Final walkthrough to ensure everything meets your standards.' },
              ].map((step, idx) => (
                <ScrollReveal key={idx} delay={idx === 0 ? '0' : idx === 1 ? '100' : idx === 2 ? '200' : '300'}>
                  <div className="text-center relative">
                    <div className="w-20 h-20 bg-eddy-dark text-eddy-orange rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10">
                      {step.icon}
                    </div>
                    {/* Connecting Line */}
                    {idx !== 3 && (
                      <div className="hidden md:block absolute top-10 left-1/2 w-full h-1 bg-gray-200 -z-0"></div>
                    )}
                    <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <ScrollReveal>
              <SectionHeader
                title="Common Questions"
                subtitle="Everything you need to know about working with Steady Eddy Excavation."
                centered={true}
              />
            </ScrollReveal>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <ScrollReveal key={index} delay={index % 2 === 0 ? '0' : '100'}>
                  <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md">
                    <button
                      className="w-full flex justify-between items-center p-5 bg-white text-left hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    >
                      <span className="font-bold text-lg text-eddy-dark">{faq.question}</span>
                      {openFaqIndex === index ? <ChevronUp className="text-eddy-orange" /> : <ChevronDown className="text-gray-400" />}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-48' : 'max-h-0'}`}>
                      <div className="p-5 pt-0 text-gray-600 bg-white border-t border-gray-100 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <SectionHeader title="Client Stories" subtitle="Don't just take our word for it." />
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, index) => (
                <ScrollReveal key={t.id} delay={index % 3 === 0 ? '0' : '100'}>
                  <div className="bg-white p-8 rounded-xl shadow-lg relative border-t-4 border-eddy-orange">
                    <Quote className="absolute top-4 right-4 text-gray-200" size={48} />
                    <div className="flex text-eddy-orange mb-4">
                      {[...Array(t.rating)].map((_, i) => <span key={i}>★</span>)}
                    </div>
                    <p className="text-gray-600 mb-6 italic">"{t.content}"</p>
                    <div>
                      <h5 className="font-bold text-gray-900">{t.name}</h5>
                      <p className="text-sm text-gray-500 uppercase tracking-wider">{t.role}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">

                {/* Contact Info */}
                <div className="md:w-[40%] bg-eddy-orange p-8 md:p-12 text-white relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 opacity-10">
                    <Shovel size={200} />
                  </div>
                  <h3 className="text-3xl font-black mb-6 uppercase relative z-10">Get In Touch</h3>
                  <p className="mb-8 font-medium relative z-10">Ready to start digging? Contact us today for a free consultation and estimate.</p>

                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Phone size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs uppercase font-bold opacity-70">Phone</p>
                        <p className="font-bold text-lg">(575) 224-1886</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Mail size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs uppercase font-bold opacity-70">Email</p>
                        <p className="font-bold text-base md:text-lg break-all md:break-words">Steadyeddyexcavation@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <Facebook size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs uppercase font-bold opacity-70">Social</p>
                        <a href="https://www.facebook.com/p/Steady-Eddy-Excavation-LLC-61573785675034/" target="_blank" rel="noreferrer" className="font-bold text-lg hover:underline">Facebook Page</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="md:w-[60%] p-8 md:p-12 bg-white relative">
                  {formStatus === 'success' ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-8 animate-in fade-in duration-500 text-center">
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={48} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-600 max-w-md">Thanks for reaching out. A member of the Steady Eddy team will get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form className="space-y-6" onSubmit={handleContactSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                          <input required name="firstName" type="text" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-eddy-orange outline-none transition-all" placeholder="John" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                          <input required name="lastName" type="text" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-eddy-orange outline-none transition-all" placeholder="Doe" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                          <input required name="phone" type="tel" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-eddy-orange outline-none transition-all" placeholder="(555) 000-0000" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Service Needed</label>
                          <select name="service" className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-eddy-orange outline-none transition-all">
                            <option>General Excavation</option>
                            <option>Site Grading</option>
                            <option>Land Clearing</option>
                            <option>Drainage</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Project Details</label>
                        <textarea required name="details" rows={4} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-eddy-orange outline-none transition-all" placeholder="Tell us about your project..."></textarea>
                      </div>
                      <PrimaryButton className="w-full md:w-auto flex items-center justify-center gap-2" disabled={formStatus === 'submitting'}>
                        {formStatus === 'submitting' ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </PrimaryButton>
                    </form>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-black text-gray-400 py-16 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              {/* Brand */}
              <div>
                <h4 className="text-white font-black text-2xl uppercase tracking-tighter mb-4">Steady Eddy <span className="text-eddy-orange">Excavation</span></h4>
                <p className="text-sm leading-relaxed mb-6">
                  Professional excavation services committed to quality, safety, and reliability. We lay the groundwork for your success.
                </p>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/p/Steady-Eddy-Excavation-LLC-61573785675034/" target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-eddy-orange hover:text-white transition-colors"><Facebook size={20} /></a>
                  <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-eddy-orange hover:text-white transition-colors"><Instagram size={20} /></a>
                  <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-eddy-orange hover:text-white transition-colors"><Linkedin size={20} /></a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h5 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h5>
                <ul className="space-y-3">
                  {['Home', 'About Us', 'Services', 'Contact'].map(link => (
                    <li key={link}>
                      <a href="#" className="flex items-center gap-2 hover:text-eddy-orange transition-colors group">
                        <ArrowRight size={14} className="text-eddy-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h5 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Services</h5>
                <ul className="space-y-3">
                  {['Site Preparation', 'Land Clearing', 'Grading', 'Demolition', 'Drainage'].map(link => (
                    <li key={link}>
                      <a href="#services" className="hover:text-eddy-orange transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h5 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Contact Us</h5>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <MapPin className="text-eddy-orange flex-shrink-0" size={20} />
                    <span>Serving County Area &<br />Surrounding Communities</span>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="text-eddy-orange flex-shrink-0" size={20} />
                    <span>(575) 224-1886</span>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="text-eddy-orange flex-shrink-0" size={20} />
                    <span>Steadyeddyexcavation@gmail.com</span>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="text-eddy-orange flex-shrink-0" size={20} />
                    <span>Mon - Fri: 7am - 6pm</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p>© {new Date().getFullYear()} Steady Eddy Excavation LLC. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-eddy-orange transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-eddy-orange transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Back To Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-eddy-orange text-white shadow-xl transition-all duration-300 transform hover:scale-110 hover:bg-orange-600 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        >
          <ArrowUp size={24} />
        </button>

        {/* Service Details Modal */}
        {selectedService && (
          <div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedService(null)}
          >
            <div
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-eddy-orange p-6 flex justify-between items-start">
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-black/10 rounded-xl text-white">
                    {selectedService.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase">{selectedService.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="bg-black/10 hover:bg-black/20 p-2 rounded-full transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
              <div className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {selectedService.description}
                </p>
                {selectedService.details && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">What We Include</h4>
                    <ul className="space-y-3">
                      {selectedService.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-eddy-orange mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-8 flex justify-end">
                  <PrimaryButton onClick={() => {
                    setSelectedService(null);
                    document.getElementById('contact')?.scrollIntoView();
                  }}>
                    Request Quote
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Analytics />
    </HashRouter>
  );
};

export default App;

const sequelize = require('../config/db');

const Banner = require('./Banner');
const Project = require('./Project');
const MetaTag = require('./MetaTag');
const ProjectCategory = require('./Projectcategory');
const Service = require('./Service');
const Blog = require('./Blog');
const Admin = require('./Admin');
const Layout = require('./Layout');
const Elevation = require('./Elevation');
const Contact = require('./Contact');
const Faq = require('./Faq');
const Testimonial = require('./Testimonial');
const Stat = require('./Stat');

async function initDB() {
  try {
    await sequelize.authenticate();
    console.log('Database connection authenticated successfully.');
    await sequelize.sync(); // Creates missing tables on restart without altering existing ones
    console.log('Database models synchronized.');

    try {
      await sequelize.query('SET GLOBAL max_allowed_packet=1073741824;');
      console.log('Increased max_allowed_packet size.');
    } catch (e) {
      console.log('Could not set max_allowed_packet (might need root privileges), continuing...');
    }

    try {
      await sequelize.query('ALTER TABLE banners MODIFY COLUMN image LONGTEXT;');
      console.log('Altered banners table image column to LONGTEXT.');
    } catch (e) {}

    try {
      await sequelize.query("UPDATE metatags SET pageUrl = REPLACE(pageUrl, 'http://localhost:3000', 'https://empireesttates.freshmindz.in') WHERE pageUrl LIKE '%localhost%';");
      console.log('Updated metatags table pageUrl localhost references.');
    } catch (e) {}

    try {
      await sequelize.query("ALTER TABLE services ADD COLUMN location VARCHAR(255);");
      console.log('Altered services table to add location column.');
    } catch (e) {}

    // Seed admins
    const adminCount = await Admin.count();
    if (adminCount === 0) {
      await Admin.create({ email: 'admin@empireesttates.com', password: 'admin@2026' });
      console.log('Database seeded with default admin.');
    }

    // Seed default FAQs if empty
    const faqCount = await Faq.count();
    if (faqCount === 0) {
      const defaultFaqs = [
        {
          question: 'Are all your plot layouts CMDA & RERA approved?',
          answer: 'Yes, 100% of our residential layout developments are fully approved by CMDA / DTCP and registered under RERA, ensuring clear legal titles and hassle-free registration.',
          category: 'Legal & Approvals',
          order: 1,
          active: true,
        },
        {
          question: 'Do you provide bank loan assistance for plot purchase?',
          answer: 'Absolutely! We have tie-ups with leading nationalized and private banks (including SBI, HDFC, ICICI, and Axis Bank) to provide quick and easy home/plot loan approvals up to 80-90% of the property value.',
          category: 'Financing & Loans',
          order: 2,
          active: true,
        },
        {
          question: 'What amenities are included in your gated community layouts?',
          answer: 'Our developments feature blacktop avenue roads, LED street lighting, 24/7 security with CCTV monitoring, underground drainage, avenue trees, children park areas, and grand entrance archways.',
          category: 'Plots & Layouts',
          order: 3,
          active: true,
        },
        {
          question: 'Can I construct a villa immediately after purchasing a plot?',
          answer: 'Yes! All our plot layouts are ready-to-build with clear demarcations, electricity connections, and water supply infrastructure ready for immediate residential construction.',
          category: 'Plots & Layouts',
          order: 4,
          active: true,
        },
        {
          question: 'How do I schedule a site visit with Empire Estates?',
          answer: 'You can easily schedule a complimentary site visit by submitting our Enquire Now form, calling our dedicated support desk at +91 88254 71748, or sending us a message on WhatsApp.',
          category: 'General',
          order: 5,
          active: true,
        },
      ];
      await Faq.bulkCreate(defaultFaqs);
      console.log('Database seeded with default FAQs.');
    }

    // Seed default Testimonials if empty
    const testimonialCount = await Testimonial.count();
    if (testimonialCount === 0) {
      const defaultTestimonials = [
        {
          author: 'Eleanor Vance',
          designation: 'Concierge Client',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
          rating: 5,
          content: "The team at Empire Estates handled my family's heritage property with unprecedented grace and surgical precision. Their attention to legal detail and the personal touch they brought to the administration phase was truly world-class. I cannot recommend their concierge services enough.",
          tags: 'HERITAGE ESTATE, CONCIERGE CLIENT',
          title: 'Bespoke heritage property administration and concierge management',
          date: 'June 12, 2026',
          order: 1,
          active: true,
          slug: 'eleanor-vance',
          focusKeyphrase: 'heritage estate administration',
          seoTitle: 'Eleanor Vance Testimonial | Heritage Estate Administration',
          metaDescription: "Read Eleanor Vance's review on Empire Estates' concierge services, heritage estate management, and legal administration services.",
          metaKeywords: 'eleanor vance review, heritage estate management, concierge estate services',
          canonicalUrl: 'https://empire-estates.com/testimonials/eleanor-vance',
        },
        {
          author: 'Arthur Penhaligon',
          designation: 'Estate Investor',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
          rating: 5,
          content: "The automated reporting for the estate's portfolio has given us incredible peace of mind. Truly a bespoke digital experience.",
          tags: 'DIGITAL INTEGRATION',
          title: 'Automated estate portfolio reporting and Bespoke digital experiences',
          date: 'June 08, 2026',
          order: 2,
          active: true,
          slug: 'arthur-penhaligon',
          focusKeyphrase: 'automated estate reporting',
          seoTitle: 'Arthur Penhaligon Testimonial | Bespoke Portfolio Reporting',
          metaDescription: "Read Arthur Penhaligon's review of the automated estate portfolio reporting and bespoke digital integration provided by Empire Estates.",
          metaKeywords: 'arthur palhaligon review, estate reporting, bespoke digital integration',
          canonicalUrl: 'https://empire-estates.com/testimonials/arthur-penhaligon',
        },
        {
          author: "Catherine de' Medici",
          designation: 'Property Owner',
          avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&q=80',
          rating: 5,
          content: 'Precise, punctual, and highly confidential. Empire Estates understands the value of privacy in administration.',
          tags: 'SECURE MANAGEMENT',
          title: 'Highly secure, confidential, and punctual estate management',
          date: 'May 28, 2026',
          order: 3,
          active: true,
          slug: 'catherine-de-medici',
          focusKeyphrase: 'confidential estate administration',
          seoTitle: "Catherine de' Medici Testimonial | Secure Estate Management",
          metaDescription: "Read Catherine de' Medici's client review of Empire Estates' high confidentiality, secure management, and punctual estate administration.",
          metaKeywords: 'catherine de medici review, secure estate administration, confidential property management',
          canonicalUrl: 'https://empire-estates.com/testimonials/catherine-de-medici',
        },
        {
          author: 'Sanjay Kumar',
          designation: 'Plot Buyer',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
          rating: 5,
          content: 'Our experience buying a plot with Empire Estates was amazing. The legal verification was clear and team supported us at every step.',
          tags: 'CLEAR TITLE, LEGAL VERIFICATION',
          title: 'Legally transparent and secure investment. Highly satisfied with Empire Estates.',
          date: 'May 10, 2026',
          order: 4,
          active: true,
          slug: 'sanjay-kumar',
          focusKeyphrase: 'legally transparent investment',
          seoTitle: 'Sanjay Kumar Testimonial | Clear Title Legal Plot Verification',
          metaDescription: "Read Sanjay Kumar's review of his plot buying experience with Empire Estates, focusing on clear titles, legal verification, and end-to-end support.",
          metaKeywords: 'sanjay kumar review, clear title plot, legal land verification',
          canonicalUrl: 'https://empire-estates.com/testimonials/sanjay-kumar',
        },
        {
          author: 'Priya Dharshini',
          designation: 'Villa Plot Owner',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
          rating: 5,
          content: 'The Kannapalayam layout features high-quality wide blacktop roads, secure gated fencing, street lights, and beautiful green parks. It is perfect for immediate villa construction.',
          tags: 'PREMIUM LAYOUT, VILLA PLOTS',
          title: 'Beautiful layouts with ready-to-build premium villa plots.',
          date: 'June 08, 2026',
          order: 5,
          active: true,
          slug: 'priya-dharshini',
          focusKeyphrase: 'ready to build villa plots',
          seoTitle: 'Priya Dharshini Testimonial | Ready-to-Build Villa Plots',
          metaDescription: "Read Priya Dharshini's client review of Empire Estates' premium layouts, secure gated community, parks, and ready-to-build residential plots.",
          metaKeywords: 'priya dharshini review, villa plots layout, gated community land',
          canonicalUrl: 'https://empire-estates.com/testimonials/priya-dharshini',
        },
        {
          author: 'Amit Sharma',
          designation: 'Homeowner',
          avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
          rating: 5,
          content: 'Empire Estates provided end-to-end bank loan assistance, helping us secure approval in just a few days. Very cooperative staff who handle everything with high professionalism.',
          tags: 'BANK LOAN, REGISTRY ASSISTANCE',
          title: 'Exceptional support throughout the purchase and registration process.',
          date: 'May 28, 2026',
          order: 6,
          active: true,
          slug: 'amit-sharma',
          focusKeyphrase: 'bank loan assistance real estate',
          seoTitle: 'Amit Sharma Testimonial | Fast Bank Loan & Registration Support',
          metaDescription: "Read Amit Sharma's review of the end-to-end bank loan assistance, smooth property registration support, and professional staff at Empire Estates.",
          metaKeywords: 'amit sharma review, bank loan support, property registration assistant',
          canonicalUrl: 'https://empire-estates.com/testimonials/amit-sharma',
        },
        {
          author: 'Vignesh & Sneha',
          designation: 'Layout Investors',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          rating: 5,
          content: 'We purchased two plots in their Padiyanallur layout. The pricing was fair, title deeds clear, and the customer service excellent. A highly recommended developer in Tamil Nadu!',
          tags: 'PADIYANALLUR PLOTS, TRUSTED DEVELOPER',
          title: '100% transparent documentation and excellent location choices.',
          date: 'May 19, 2026',
          order: 7,
          active: true,
          slug: 'vignesh-sneha',
          focusKeyphrase: 'trusted developer tamil nadu',
          seoTitle: 'Vignesh & Sneha Testimonial | Transparent Documentation & Fair Pricing',
          metaDescription: "Read Vignesh & Sneha's client review of Empire Estates, highlighting transparent property documentation, clear title deeds, and fair land pricing.",
          metaKeywords: 'vignesh and sneha review, clear title deeds, trusted builder chennai',
          canonicalUrl: 'https://empire-estates.com/testimonials/vignesh-sneha',
        },
      ];
      await Testimonial.bulkCreate(defaultTestimonials);
      console.log('Database seeded with default Testimonials.');
    }

    // Seed default Stats if empty
    const statCount = await Stat.count();
    if (statCount === 0) {
      const defaultStats = [
        {
          count: 20,
          suffix: '+',
          title: 'Years of Excellence',
          icon: 'FaAward',
          order: 1,
          active: true,
        },
        {
          count: 13,
          suffix: '+',
          title: 'High-Growth Locations',
          icon: 'FaMapMarkedAlt',
          order: 2,
          active: true,
        },
        {
          count: 221,
          suffix: '+',
          title: 'Units Completed',
          icon: 'FaUserFriends',
          order: 3,
          active: true,
        },
        {
          count: 88,
          suffix: '%',
          title: 'Clear Legal Titles %',
          icon: 'FaShieldAlt',
          order: 4,
          active: true,
        },
      ];
      await Stat.bulkCreate(defaultStats);
      console.log('Database seeded with default Stats.');
    }

  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}

module.exports = { sequelize, Banner, Project, MetaTag, ProjectCategory, Service, Blog, Admin, Layout, Elevation, Contact, Faq, Testimonial, Stat, initDB };
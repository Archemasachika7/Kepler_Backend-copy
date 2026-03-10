export let grouplist = [
  // {
  //   name: 'Computer Science - Languages',
  //   exam: 'languages',
  //   courseDescription: 'Comprehensive programme for learning popular Object Oriented Languages like C++, Java and Python',
  //   features: ["Live Classes", "Mock Tests", "Doubt Sessions", "Study Material"],
  //   image: '/Images/JEE_Prep.webp',
  //   rating: 4.8,
  //   // students: "25,000+"
  //   visibility: 'none',
  //   description: 'This is the CAT group meant for preparation for the CAT Aspirants',
  //   course: true
  // },
  {
    name: 'Computer Science - Data Structures and Algorithms 1',
    exam: "dsa1",
    courseDescription: "Comprehensive DSA and industry oriented coding that will almost surely land you a job in your dream company",
    image: "/Images/DSA1Image.gif",
    features: ["Live Classes", "Live Coding", "Interactive Sessions", "Doubt Clearing"],
    rating: 4.9,
    // students: "15,000+",
    visibility: 'none',
    description: 'This is the CAT group meant for preparation for the CAT Aspirants',
    course: true
  },
  {
    name: 'Computer Science - Machine Learning 1',
    exam: "ml1",
    courseDescription: "Complete Machine Learning package with algorithms, Deep Learning, Neural Network and Large Language Models",
    image: "/Images/ML1Image.gif",
    features: ["AI", "ML", "LLMs", "DL"],
    rating: 4.6,
    // students: "30,000+",
    visibility: 'none',
    description: 'This is the CAT group meant for preparation for the CAT Aspirants',
    course: true
  },
  {
    name: 'Computer Science - Web Technologies 1',
    exam: "webdev1",
    courseDescription: "Comprehensive Web Development sessions complete with Frontend, Backend, Database and DevOps, and land a full stack job in the company of your choice",
    image: "/Images/WebDev1Image.gif", 
    features: ["Technical Subjects", "Live Classes", "Doubt Clearing", "Full Stack Projects"],
    rating: 4.7,
    // students: "20,000+",
    visibility: 'none',
    description: 'This is the CAT group meant for preparation for the CAT Aspirants',
    course: true
  },
  {
    name: 'Computer Science - Computer Fundamentals 1',
    exam: "fundamentals1",
    courseDescription: "Complete CS Fundamentals package comprising Computer Networks, Database Management, Operating Systems and Computer Organization and Architechture and gain the necessary expertise to thrive in the current job market",
    image: "/Images/CSFundamentals1Image.gif",
    features: ["DBMS", "OS", "COA", "CN"],
    rating: 4.6,
    // students: "30,000+",
    visibility: 'none',
    description: 'This is the CAT group meant for preparation for the CAT Aspirants',
    course: true
  },
  {
    name: 'Computer Science - Data Structures and Algorithms 2',
    exam: "dsa2",
    courseDescription: "Comprehensive DSA and industry oriented coding that will almost surely land you a job in your dream company",
    image: "/Images/DSA1Image.gif",
    features: ["Live Classes", "Live Coding", "Interactive Sessions", "Doubt Clearing"],
    rating: 4.9,
    // students: "15,000+",
    visibility: 'none',
    description: 'This is the CAT group meant for preparation for the CAT Aspirants',
    course: true
  },
  {
    name: 'Computer Science - Machine Learning 2',
    exam: "ml2",
    courseDescription: "Complete Machine Learning package with algorithms, Deep Learning, Neural Network and Large Language Models",
    image: "/Images/ML1Image.gif",
    features: ["AI", "ML", "LLMs", "DL"],
    rating: 4.6,
    // students: "30,000+",
    visibility: 'none',
    description: 'This is the CAT group meant for preparation for the CAT Aspirants',
    course: true
  },
  {
    name: 'Computer Science - Web Technologies 2',
    exam: "webdev2",
    courseDescription: "Comprehensive Web Development sessions complete with Frontend, Backend, Database and DevOps, and land a full stack job in the company of your choice",
    image: "/Images/WebDev1Image.gif", 
    features: ["Technical Subjects", "Live Classes", "Doubt Clearing", "Full Stack Projects"],
    rating: 4.7,
    // students: "20,000+",
    visibility: 'none',
    description: 'This is the CAT group meant for preparation for the CAT Aspirants',
    course: true
  },
  {
    name: 'Computer Science - Computer Fundamentals 2',
    exam: "fundamentals2",
    courseDescription: "Complete CS Fundamentals package comprising Computer Networks, Database Management, Operating Systems and Computer Organization and Architechture and gain the necessary expertise to thrive in the current job market",
    image: "/Images/CSFundamentals1Image.gif",
    features: ["DBMS", "OS", "COA", "CN"],
    rating: 4.6,
    // students: "30,000+",
    visibility: 'none',
    description: 'This is the CAT group meant for preparation for the CAT Aspirants',
    course: true
  },
  {
    name: 'Executive Group',
    visibility: 'none',
    description: 'This is the Executive group meant explicitly for the Executive Board Members of Kepler 22B',
    course: false
  },
  {
    name: 'All Teachers',
    visibility: 'none',
    description: 'This is the Teachers group meant explicitly for all the teachers of Kepler 22B',
    course: false
  },
  {
    name: 'Community Group',
    visibility: 'none',
    description: 'This group is a community group with open visibility to all members of Kepler22B, with or without course purchasing',
    course: true
  }
];

export let executive_emails: string[] = ["hossainfarshid@gmail.com", "supratim.mukherjee123@gmail.com", "vivek829h@gmail.com", "pkmisra.it.ug@jadavpuruniversity.in"]
export let executive_names: string[] = ['Farshid Hossain', 'Supratim Mukherjee']
export let core_emails: string[] = []
export let c_suit_emails: string[] = []
export let GM_emails: string[] = [];
export let teacher_emails: string[] = [];
export const adminSecretCodes = (() => {
  const envCodes = process.env.ADMIN_SECRET_CODES;
  if (envCodes) {
    try {
      return JSON.parse(envCodes) as { name: string; email: string; secretCode: string }[];
    } catch {
      return [];
    }
  }
  return [];
})()
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
        name: 'Computer Science - DSA for Placement and Contests',
        _id: "DSA1.1",
        exam: "dsa",
        courseDescription: "Comprehensive DSA and industry oriented coding that will almost surely land you a job in your dream company.",
        image: "/Images/DSA1Image.gif",
        features: ["Live Classes", "Live Coding", "Interactive Sessions", "Doubt Clearing"],
        rating: 4.9,
        price: 499,
        // students: "15,000+",
        visibility: 'none',
        description: 'This is the CAT group meant for preparation for the CAT Aspirants',
        course: true
    },
    {
        name: 'Computer Science - Artificial Intelligence: Explore the Future',
        _id: "ML1.1",
        exam: "ml",
        courseDescription: "Complete Machine Learning package with algorithms, Deep Learning, Neural Network and Large Language Models",
        image: "/Images/ML1Image.gif",
        features: ["AI", "ML", "LLMs", "DL"],
        rating: 4.6,
        price: 499,
        // students: "30,000+",
        visibility: 'none',
        description: 'This is the CAT group meant for preparation for the CAT Aspirants',
        course: true
    },
    {
        name: 'Computer Science - Development Crash Course: Projects Made Easier',
        _is: "Dev1.1",
        exam: "webdev",
        courseDescription: "Comprehensive Web Development sessions complete with Frontend, Backend, Database and DevOps, and land a full stack job in the company of your choice",
        image: "/Images/WebDev1Image.gif",
        features: ["Technical Subjects", "Live Classes", "Doubt Clearing", "Full Stack Projects"],
        rating: 4.7,
        price: 499,
        // students: "20,000+",
        visibility: 'none',
        description: 'This is the CAT group meant for preparation for the CAT Aspirants',
        course: true
    },
    {
        name: 'Computer Science - Fundamentals Course: Crack GATE With Ease',
        _id: "CSF1.1",
        exam: "fundamentals",
        courseDescription: "Complete CS Fundamentals package comprising Computer Networks, Database Management, Operating Systems and Computer Organization and Architechture and gain the necessary expertise to thrive in the current job market",
        image: "/Images/CSFundamentals1Image.gif",
        features: ["DBMS", "OS", "OOPs", "CN"],
        rating: 4.6,
        price: 499,
        // students: "30,000+",
        visibility: 'none',
        description: 'This is the CAT group meant for preparation for the CAT Aspirants',
        course: true
    },
    {
        name: 'Computer Science - Placements Made Easier',
        _id: "Plac1.1",
        exam: "placement",
        courseDescription: "Complete package combining DSA, Web Development and CS Fundamentals to help you crack placements and get a job in your dream company",
        image: "/Images/PlacementImage.gif",
        features: ["DSA", "Web Dev", "CS Fundamentals", "Placement Preparation"],
        rating: 4.8,
        price: 999,
        // students: "25,000+",
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
export let executive_emails = ["hossainfarshid@gmail.com", "supratim.mukherjee123@gmail.com", "vivek829h@gmail.com", "pkmisra.it.ug@jadavpuruniversity.in"];
export let executive_names = ['Farshid Hossain', 'Supratim Mukherjee'];
export let core_emails = [];
export let c_suit_emails = [];
export let GM_emails = [];
export let teacher_emails = [];
export const adminSecretCodes = [
    {
        name: "Md. Farshid Hossain",
        email: "hossainfarshid@gmail.com",
        secretCode: "Farshid@123"
    },
    {
        name: "Supratim Mukherjee",
        email: "supratim.mukherjee123@gmail.com",
        secretCode: "gublu@1331"
    }
];

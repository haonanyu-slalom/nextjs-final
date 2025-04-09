import { Url } from "next/dist/shared/lib/router/router";

export interface Profile {
    id: number;
    name: string;
    avatar:  string;
    email: string;
    description: string;
    techStacks: string[];
    experience: number;
    availability: boolean;
    project: Project | null;
    githubLink: Url;
}

interface Project {
    title: string;
    description: string;
}

const mockProfiles: Profile[] = [
    {
        id: 1,
        name: 'Alice Johnson',
        avatar: "/avatar1.png",
        email: 'alice.johnson@gmail.com',
        description: 'Frontend engineer specializing in React and TypeScript.',
        techStacks: ['React', 'TypeScript', 'JavaScript'],
        experience: 5,
        availability: true,
        project: null,
        githubLink: 'https://githubLink.com/alicejohnson'
    },
    {
        id: 2,
        name: 'Bob Smith',
        avatar: "/avatar1.png",
        email: 'bob.smith@gmail.com',
        description: 'Backend developer with expertise in Node.js and Python.',
        techStacks: ['Node.js', 'Python'],
        experience: 8,
        availability: false,
        project: { title: 'Project A', description: 'Insurance Portal for Company A'},
        githubLink: 'https://githubLink.com/bobsmith'
    },
    {
        id: 3,
        name: 'Charlie Brown',
        avatar: "/avatar1.png",
        email: 'charlie.brown@gmail.com',
        description: 'Full-stack engineer with a focus on MERN stack.',
        techStacks: ['MongoDB', 'Python', 'Java', 'React', 'Node.js'],
        experience: 6,
        availability: true,
        project: null,
        githubLink: 'https://githubLink.com/charliebrown'
    },
    {
        id: 4,
        name: 'Diana Prince',
        avatar: "/avatar1.png",
        email: 'diana.prince@gmail.com',
        description: 'Backend engineer specialized in C++ and Python architectures.',
        techStacks: ['C++', 'Python'],
        experience: 10,
        availability: false,
        project: { title: 'Project D', description: 'Public transport tracker for Company D'},
        githubLink: 'https://githubLink.com/dianaprince'
    },
    {
        id: 5,
        name: 'Eve Adams',
        avatar: "/avatar1.png",
        email: 'eve.adams@gmail.com',
        description: 'Software engineer with Python and AI technologies.',
        techStacks: ['Python', 'Langchain', 'Langgraph'],
        experience: 4,
        availability: true,
        project: null,
        githubLink: 'https://githubLink.com/eveadams'
    },
    {
        id: 6,
        name: 'Franklin Pierce',
        avatar: "/avatar1.png",
        email: 'franklin.pierce@gmail.com',
        description: 'Mobile app developer skilled in Swift and Flutter.',
        techStacks: ['Swift', 'Flutter'],
        experience: 7,
        availability: false,
        project: { title: 'Project D', description: 'iOS App to create an interactive smart predicter of hosehold energy usage'},
        githubLink: 'https://githubLink.com/franklinpierce'
    },
    {
        id: 7,
        name: 'Grace Hopper',
        avatar: "/avatar1.png",
        email: 'grace.hopper@gmail.com',
        description: 'Expert in Python and Langchain.',
        techStacks: ['Java', 'Python', 'Langchain'],
        experience: 15,
        availability: true,
        project: null,
        githubLink: 'https://githubLink.com/gracehopper'
    },
    {
        id: 8,
        name: 'Henry Ford',
        avatar: "/avatar1.png",
        email: 'henry.ford@gmail.com',
        description: 'Software engineer with a focus on Angular.',
        techStacks: ['Python', 'Angular', 'Javascript', 'Typescript'],
        experience: 12,
        availability: false,
        project: { title: 'Project D', description: 'Public transport tracker for Company D'},
        githubLink: 'https://githubLink.com/henryford'
    },
    {
        id: 9,
        name: 'Ivy Lee',
        avatar: "/avatar1.png",
        email: 'ivy.lee@gmail.com',
        description: 'Software engineer with a focus on UI/UX design.',
        techStacks: ['JavaScript', 'CSS', 'HTML'],
        experience: 3,
        availability: true,
        project: null,
        githubLink: 'https://githubLink.com/ivylee'
    },
    {
        id: 10,
        name: 'Jack Daniels',
        avatar: "/avatar1.png",
        email: 'jack.daniels@gmail.com',
        description: 'Specialist in Java.',
        techStacks: ['Java'],       
        experience: 9,
        availability: false,
        project: { title: 'Human Resources Management Project', description: 'HR Portal for Company Z'},
        githubLink: 'https://githubLink.com/jackdaniels'
    },
    {
        id: 11,
        name: 'Kevin Bacon',
        avatar: "/avatar1.png",
        email: 'kevin.bacon@gmail.com',
        description: 'Versatile software engineer with experience in React.',
        techStacks: ['JavaScript', 'React'],
        experience: 6,
        availability: true,
        project: null,
        githubLink: 'https://githubLink.com/kevinbacon'
    },
    {
        id: 12,
        name: 'Linda Hamilton',
        avatar: "/avatar1.png",
        email: 'linda.hamilton@gmail.com',
        description: 'Software engineer with expertise in testing.',
        techStacks: ['Unit Testing', 'Python'],
        experience: 11,
        availability: false,
        project: { title: 'Human Resources Management Project', description: 'Developing test cases for HR Portal Project for Company Z'},
        githubLink: 'https://githubLink.com/lindahamilton'
    },
    {
        id: 13,
        name: 'Mary Shelley',
        avatar: "/avatar1.png",
        email: 'mary.shelley@gmail.com',
        description: 'Software engineer with a focus on AI.',
        techStacks: ['Langchain', 'Python'],
        experience: 1,
        availability: true,
        project: null,
        githubLink: 'https://githubLink.com/maryshelley'
    },
    {
        id: 14,
        name: 'Nancy Drew',
        avatar: "/avatar1.png",
        email: 'nancy.drew@gmail.com',
        description: 'Software engineer with excellent problem-solving techStacks.',
        techStacks: ['JavaScript', 'TypeScript', 'Angular'],
        experience: 7,
        availability: false,
        project: { title: 'API Assist', description: 'Developing interactive chatbot that could handle tasks according to API specifications'},
        githubLink: 'https://githubLink.com/nancydrew'
    },
    {
        id: 15,
        name: 'Oliver Twist',
        avatar: "/avatar1.png",
        email: 'oliver.twist@gmail.com',
        description: 'App developer with strong analytical techStacks.',
        techStacks: ['Flutter','Swift'],
        experience: 5,
        availability: true,
        project: null,
        githubLink: 'https://githubLink.com/olivertwist'
    },
    {
        id: 16,
        name: 'Paul Bunyan',
        avatar: "/avatar1.png",
        email: 'paul.bunyan@gmail.com',
        description: 'Backend engineer with a focus on AI.',
        techStacks: ['Langgraph', 'Python'],
        experience: 8,
        availability: false,
        project: { title: 'API Assist', description: 'Developing interactive chatbot that could handle tasks according to API specifications'},
        githubLink: 'https://githubLink.com/paulbunyan'
    },
    {
        id: 17,
        name: 'Quincy Jones',
        avatar: "/avatar1.png",
        email: 'quincy.jones@gmail.com',
        description: 'Software with expertise in multiple programming languages.',
        techStacks: ['Java', 'Python', 'C'],
        experience: 10,
        availability: true,
        project: null,
        githubLink: 'https://githubLink.com/quincyjones'
    },
    {
        id: 18,
        name: 'Rita Hayworth',
        avatar: "/avatar1.png",
        email: 'rita.hayworth@gmail.com',
        description: 'Frontend developer with a strong portfolio in Vue.js.',
        techStacks: ['Vue.js', 'JavaScript', 'CSS'],
        experience: 6,
        availability: false,
        project: { title: 'Project A', description: 'Insurance Portal for Company A'},
        githubLink: 'https://githubLink.com/ritahayworth'
    },
    {
        id: 19,
        name: 'Steve Jobs',
        avatar: "/avatar1.png",
        email: 'steve.jobs@gmail.com',
        description: 'Frontend developer with experience in Angular.',
        techStacks: ['Javascript', 'Typescript', 'Angular'],
        experience: 20,
        availability: true,
        project: null,
        githubLink: 'https://githubLink.com/stevejobs'
    },
    {
        id: 20,
        name: 'Haonan Yu',
        avatar: "/avatar1.png",
        email: 'tom.payne@gmail.com',
        description: 'Software engineer with a focus on Node.js and React.',
        techStacks: ['Node.js', 'React', 'JavaScript'],
        experience: 7,
        availability: false,
        project: { title: 'Project A', description: 'Insurance Portal for Company A'},
        githubLink: 'https://github.com/haonanyu-slalom'
    }
];

export default mockProfiles;

export const techStacks: string[] = Array.from(
    new Set(mockProfiles.flatMap(profile => profile.techStacks))
);

export const experienceLevel: string[] = ['Junior', 'Mid', 'Senior'];

export const availability: string[] = ['Occupied', 'Available'];
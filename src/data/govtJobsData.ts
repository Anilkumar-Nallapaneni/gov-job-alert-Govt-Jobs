import { StateGovtJobs } from '../types/GovtJobTypes';

// Comprehensive sample dataset for all Indian states and common union territories.
// NOTE: The `id` values are ISO-like codes used by the SVG map (e.g. "IN-MH").
// If your SVG uses different ids, update these `id` keys to match the SVG path `id` attributes.
export const stateGovtJobsData: StateGovtJobs[] = [
    {
        id: 'IN-AN',
        stateName: 'Andaman and Nicobar Islands',
        jobs: [
            {
                title: 'Coastal Fisheries Officer',
                department: 'Fisheries Department',
                vacancies: 8,
                lastDate: '2025-12-20',
                qualifications: ['B.Sc. Marine Biology', "1 year field experience"],
                salary: '₹30,000 - ₹40,000',
            },
        ],
    },
    {
        id: 'IN-AP',
        stateName: 'Andhra Pradesh',
        jobs: [
            {
                title: 'Junior Civil Engineer',
                department: 'Public Works Department',
                vacancies: 150,
                lastDate: '2025-12-31',
                qualifications: ['B.Tech in Civil Engineering', '2 years experience'],
                salary: '₹35,000 - ₹45,000',
            },
            {
                title: 'Secondary School Teacher',
                department: 'Education Department',
                vacancies: 300,
                lastDate: '2025-12-15',
                qualifications: ['B.Ed', 'Subject specific degree'],
                salary: '₹30,000 - ₹40,000',
            },
        ],
    },
    {
        id: 'IN-AR',
        stateName: 'Arunachal Pradesh',
        jobs: [
            {
                title: 'Forest Officer',
                department: 'Forest Department',
                vacancies: 50,
                lastDate: '2025-12-20',
                qualifications: ["Bachelor's in Forestry", 'Physical fitness'],
                salary: '₹40,000 - ₹50,000',
            },
        ],
    },
    {
        id: 'IN-AS',
        stateName: 'Assam',
        jobs: [
            {
                title: 'Police Constable',
                department: 'Police Department',
                vacancies: 500,
                lastDate: '2025-11-30',
                qualifications: ['12th Pass', 'Physical fitness'],
                salary: '₹25,000 - ₹35,000',
            },
        ],
    },
    {
        id: 'IN-BR',
        stateName: 'Bihar',
        jobs: [
            {
                title: 'District Coordinator',
                department: 'Rural Development',
                vacancies: 75,
                lastDate: '2025-12-25',
                qualifications: ["Master's in Rural Development", '3 years experience'],
                salary: '₹45,000 - ₹55,000',
            },
        ],
    },
    {
        id: 'IN-CH',
        stateName: 'Chandigarh',
        jobs: [
            {
                title: 'Urban Planner',
                department: 'Municipal Corporation',
                vacancies: 10,
                lastDate: '2025-12-18',
                qualifications: ['M.Arch / M.Plan', '2 years experience'],
                salary: '₹50,000 - ₹60,000',
            },
        ],
    },
    {
        id: 'IN-CT',
        stateName: 'Chhattisgarh',
        jobs: [
            {
                title: 'Medical Officer',
                department: 'Health Department',
                vacancies: 200,
                lastDate: '2025-12-10',
                qualifications: ['MBBS', 'State Medical Council Registration'],
                salary: '₹65,000 - ₹80,000',
            },
        ],
    },
    {
        id: 'IN-DL',
        stateName: 'Delhi (NCT)',
        jobs: [
            {
                title: 'Junior Engineer (Civil)',
                department: 'Public Works Department',
                vacancies: 120,
                lastDate: '2025-12-05',
                qualifications: ['Diploma/Degree in Civil Engineering'],
                salary: '₹40,000 - ₹50,000',
            },
            {
                title: 'AI Researcher',
                department: 'AI Development Cell',
                vacancies: 10,
                lastDate: '2025-12-25',
                qualifications: ['Ph.D. in AI/ML', 'Experience in Deep Learning'],
                salary: '₹1,20,000 - ₹1,50,000',
            },
            {
                title: 'Policy Analyst',
                department: 'Policy Research Cell',
                vacancies: 20,
                lastDate: '2025-12-15',
                qualifications: ['Master’s in Public Policy'],
                salary: '₹80,000 - ₹1,00,000',
            },
            {
                title: 'Legal Advisor',
                department: 'Law Department',
                vacancies: 10,
                lastDate: '2025-12-20',
                qualifications: ['LLB', '5 years experience'],
                salary: '₹1,00,000 - ₹1,50,000',
            },
            {
                title: 'Urban Development Officer',
                department: 'Urban Planning',
                vacancies: 15,
                lastDate: '2025-12-25',
                qualifications: ['M.Plan', 'Urban Development Experience'],
                salary: '₹90,000 - ₹1,10,000',
            },
        ],
    },
    {
        id: 'IN-GA',
        stateName: 'Goa',
        jobs: [
            {
                title: 'Tourism Officer',
                department: 'Tourism Department',
                vacancies: 25,
                lastDate: '2025-12-05',
                qualifications: ['Degree in Tourism Management', '2 years experience'],
                salary: '₹35,000 - ₹45,000',
            },
        ],
    },
    {
        id: 'IN-GJ',
        stateName: 'Gujarat',
        jobs: [
            {
                title: 'Industrial Safety Officer',
                department: 'Industrial Safety & Health',
                vacancies: 100,
                lastDate: '2025-12-15',
                qualifications: ['B.E. in Industrial Safety', 'DISH certification'],
                salary: '₹45,000 - ₹55,000',
            },
            {
                title: 'Renewable Energy Consultant',
                department: 'Energy Department',
                vacancies: 15,
                lastDate: '2025-12-18',
                qualifications: ['M.Tech in Renewable Energy', '5 years experience'],
                salary: '₹90,000 - ₹1,10,000',
            },
            {
                title: 'Chemical Engineer',
                department: 'Industrial Development',
                vacancies: 60,
                lastDate: '2025-12-10',
                qualifications: ['B.Tech in Chemical Engineering'],
                salary: '₹50,000 - ₹70,000',
            },
            {
                title: 'Environmental Scientist',
                department: 'Pollution Control Board',
                vacancies: 25,
                lastDate: '2025-12-15',
                qualifications: ['M.Sc in Environmental Science'],
                salary: '₹60,000 - ₹80,000',
            },
            {
                title: 'Logistics Manager',
                department: 'Transport Department',
                vacancies: 30,
                lastDate: '2025-12-20',
                qualifications: ['MBA in Logistics'],
                salary: '₹70,000 - ₹90,000',
            },
        ],
    },
    {
        id: 'IN-HR',
        stateName: 'Haryana',
        jobs: [
            {
                title: 'Agriculture Extension Officer',
                department: 'Agriculture Department',
                vacancies: 150,
                lastDate: '2025-12-20',
                qualifications: ['B.Sc Agriculture', '2 years field experience'],
                salary: '₹40,000 - ₹50,000',
            },
        ],
    },
    {
        id: 'IN-HP',
        stateName: 'Himachal Pradesh',
        jobs: [
            {
                title: 'Junior Engineer (Electrical)',
                department: 'Electricity Board',
                vacancies: 80,
                lastDate: '2025-12-01',
                qualifications: ['Diploma/Degree in Electrical Engineering'],
                salary: '₹35,000 - ₹45,000',
            },
        ],
    },
    {
        id: 'IN-JH',
        stateName: 'Jharkhand',
        jobs: [
            {
                title: 'Mining Inspector',
                department: 'Mining Department',
                vacancies: 60,
                lastDate: '2025-12-10',
                qualifications: ['Mining Engineering Degree', 'Mine safety certification'],
                salary: '₹45,000 - ₹55,000',
            },
        ],
    },
    {
        id: 'IN-JK',
        stateName: 'Jammu and Kashmir',
        jobs: [
            {
                title: 'Assistant Wildlife Warden',
                department: 'Wildlife Department',
                vacancies: 30,
                lastDate: '2025-12-12',
                qualifications: ['B.Sc Biology', 'Field experience preferred'],
                salary: '₹40,000 - ₹50,000',
            },
        ],
    },
    {
        id: 'IN-KA',
        stateName: 'Karnataka',
        jobs: [
            {
                title: 'Data Analyst',
                department: 'E-Governance Cell',
                vacancies: 60,
                lastDate: '2025-12-22',
                qualifications: ['B.Tech/BA in Data Science', 'SQL/Python'],
                salary: '₹50,000 - ₹70,000',
            },
            {
                title: 'Cybersecurity Analyst',
                department: 'E-Governance Cell',
                vacancies: 30,
                lastDate: '2025-12-20',
                qualifications: ['B.Tech in Cybersecurity', 'Certifications like CEH'],
                salary: '₹70,000 - ₹90,000',
            },
            {
                title: 'Software Tester',
                department: 'E-Governance Cell',
                vacancies: 40,
                lastDate: '2025-12-22',
                qualifications: ['B.Tech in IT', 'Testing Tools Certification'],
                salary: '₹45,000 - ₹60,000',
            },
            {
                title: 'Network Administrator',
                department: 'IT Department',
                vacancies: 30,
                lastDate: '2025-12-28',
                qualifications: ['B.Tech in Networking', 'CCNA Certification'],
                salary: '₹55,000 - ₹75,000',
            },
            {
                title: 'HR Manager',
                department: 'Human Resources',
                vacancies: 20,
                lastDate: '2025-12-31',
                qualifications: ['MBA in HR'],
                salary: '₹60,000 - ₹80,000',
            },
        ],
    },
    {
        id: 'IN-KL',
        stateName: 'Kerala',
        jobs: [
            {
                title: 'Public Health Nurse',
                department: 'Health Department',
                vacancies: 200,
                lastDate: '2025-12-08',
                qualifications: ['GNM/B.Sc Nursing', 'State registration'],
                salary: '₹30,000 - ₹40,000',
            },
        ],
    },
    {
        id: 'IN-LD',
        stateName: 'Lakshadweep',
        jobs: [
            {
                title: 'Fisheries Inspector',
                department: 'Fisheries Department',
                vacancies: 5,
                lastDate: '2025-12-30',
                qualifications: ['Diploma in Fisheries'],
                salary: '₹28,000 - ₹35,000',
            },
        ],
    },
    {
        id: 'IN-MH',
        stateName: 'Maharashtra',
        jobs: [
            {
                title: 'Railway Engineer',
                department: 'State Railways',
                vacancies: 220,
                lastDate: '2025-12-14',
                qualifications: ['B.Tech in Mechanical/Civil'],
                salary: '₹55,000 - ₹75,000',
            },
            {
                title: 'Software Developer',
                department: 'IT Department',
                vacancies: 50,
                lastDate: '2025-12-31',
                qualifications: ['B.Tech in Computer Science', '2 years experience'],
                salary: '₹60,000 - ₹80,000',
            },
            {
                title: 'Civil Engineer',
                department: 'Public Works Department',
                vacancies: 100,
                lastDate: '2025-12-20',
                qualifications: ['B.Tech in Civil Engineering'],
                salary: '₹50,000 - ₹70,000',
            },
            {
                title: 'Medical Officer',
                department: 'Health Department',
                vacancies: 200,
                lastDate: '2025-12-25',
                qualifications: ['MBBS', 'State Medical Registration'],
                salary: '₹70,000 - ₹90,000',
            },
            {
                title: 'Accountant',
                department: 'Finance Department',
                vacancies: 50,
                lastDate: '2025-12-30',
                qualifications: ['B.Com', 'Tally Certification'],
                salary: '₹40,000 - ₹50,000',
            },
        ],
    },
    {
        id: 'IN-MP',
        stateName: 'Madhya Pradesh',
        jobs: [
            {
                title: 'Block Programme Officer',
                department: 'Rural Development',
                vacancies: 120,
                lastDate: '2025-12-21',
                qualifications: ['Graduate', 'Experience in field programs preferred'],
                salary: '₹35,000 - ₹45,000',
            },
        ],
    },
    {
        id: 'IN-ML',
        stateName: 'Meghalaya',
        jobs: [
            {
                title: 'Hydrology Technician',
                department: 'Water Resources',
                vacancies: 20,
                lastDate: '2025-12-11',
                qualifications: ['Diploma in Civil Engineering'],
                salary: '₹30,000 - ₹38,000',
            },
        ],
    },
    {
        id: 'IN-MN',
        stateName: 'Manipur',
        jobs: [
            {
                title: 'Forest Guard',
                department: 'Forest Department',
                vacancies: 80,
                lastDate: '2025-12-09',
                qualifications: ['10th/12th depending on post', 'Physical fitness'],
                salary: '₹25,000 - ₹35,000',
            },
        ],
    },
    {
        id: 'IN-MZ',
        stateName: 'Mizoram',
        jobs: [
            {
                title: 'Rural Health Worker',
                department: 'Health Department',
                vacancies: 40,
                lastDate: '2025-12-18',
                qualifications: ['Auxiliary Nurse Training'],
                salary: '₹28,000 - ₹36,000',
            },
        ],
    },
    {
        id: 'IN-NL',
        stateName: 'Nagaland',
        jobs: [
            {
                title: 'Community Development Officer',
                department: 'Rural Development',
                vacancies: 30,
                lastDate: '2025-12-16',
                qualifications: ['Graduate', 'Good communication skills'],
                salary: '₹32,000 - ₹42,000',
            },
        ],
    },
    {
        id: 'IN-OR',
        stateName: 'Odisha',
        jobs: [
            {
                title: 'Fisheries Extension Officer',
                department: 'Fisheries Department',
                vacancies: 90,
                lastDate: '2025-12-02',
                qualifications: ['B.F.Sc / B.Sc Zoology'],
                salary: '₹33,000 - ₹44,000',
            },
        ],
    },
    {
        id: 'IN-PB',
        stateName: 'Punjab',
        jobs: [
            {
                title: 'Assistant Professor',
                department: 'Higher Education',
                vacancies: 180,
                lastDate: '2025-12-27',
                qualifications: ['Ph.D or NET+', 'Relevant subject expertise'],
                salary: '₹60,000 - ₹80,000',
            },
        ],
    },
    {
        id: 'IN-PY',
        stateName: 'Puducherry',
        jobs: [
            {
                title: 'Town Planner',
                department: 'Urban Development',
                vacancies: 12,
                lastDate: '2025-12-06',
                qualifications: ['Degree in Town Planning'],
                salary: '₹45,000 - ₹55,000',
            },
        ],
    },
    {
        id: 'IN-RJ',
        stateName: 'Rajasthan',
        jobs: [
            {
                title: 'Junior Engineer (Irrigation)',
                department: 'Irrigation Department',
                vacancies: 140,
                lastDate: '2025-12-28',
                qualifications: ['Diploma/Degree in Civil Engineering'],
                salary: '₹36,000 - ₹46,000',
            },
        ],
    },
    {
        id: 'IN-SK',
        stateName: 'Sikkim',
        jobs: [
            {
                title: 'Eco-Tourism Guide',
                department: 'Tourism Department',
                vacancies: 18,
                lastDate: '2025-12-13',
                qualifications: ['Local language skills', 'Tourism training preferred'],
                salary: '₹25,000 - ₹32,000',
            },
        ],
    },
    {
        id: 'IN-TN',
        stateName: 'Tamil Nadu',
        jobs: [
            {
                title: 'Software Engineer',
                department: 'State IT Department',
                vacancies: 200,
                lastDate: '2025-12-23',
                qualifications: ['B.Tech in CS/IT', 'JavaScript/Node experience'],
                salary: '₹55,000 - ₹85,000',
            },
            {
                title: 'Data Scientist',
                department: 'State IT Department',
                vacancies: 25,
                lastDate: '2025-12-15',
                qualifications: ['M.Tech in Data Science', 'Python, R, SQL'],
                salary: '₹80,000 - ₹1,00,000',
            },
            {
                title: 'Web Developer',
                department: 'State IT Department',
                vacancies: 50,
                lastDate: '2025-12-18',
                qualifications: ['B.Tech in CS', 'React/Angular Experience'],
                salary: '₹50,000 - ₹70,000',
            },
            {
                title: 'Database Administrator',
                department: 'IT Department',
                vacancies: 25,
                lastDate: '2025-12-22',
                qualifications: ['MCA', 'Oracle Certification'],
                salary: '₹70,000 - ₹90,000',
            },
            {
                title: 'Project Manager',
                department: 'Infrastructure Development',
                vacancies: 15,
                lastDate: '2025-12-28',
                qualifications: ['MBA in Project Management'],
                salary: '₹90,000 - ₹1,20,000',
            },
        ],
    },
    {
        id: 'IN-TG',
        stateName: 'Telangana',
        jobs: [
            {
                title: 'Agriculture Officer',
                department: 'Agriculture Department',
                vacancies: 110,
                lastDate: '2025-12-19',
                qualifications: ['B.Sc Agriculture'],
                salary: '₹38,000 - ₹48,000',
            },
        ],
    },
    {
        id: 'IN-TR',
        stateName: 'Tripura',
        jobs: [
            {
                title: 'Forest Extension Worker',
                department: 'Forest Department',
                vacancies: 28,
                lastDate: '2025-12-17',
                qualifications: ['12th / Diploma'],
                salary: '₹24,000 - ₹32,000',
            },
        ],
    },
    {
        id: 'IN-UT',
        stateName: 'Uttarakhand',
        jobs: [
            {
                title: 'Mountain Rescue Assistant',
                department: 'Disaster Management',
                vacancies: 20,
                lastDate: '2025-12-29',
                qualifications: ['First aid certification', 'Physical fitness'],
                salary: '₹30,000 - ₹40,000',
            },
        ],
    },
    {
        id: 'IN-WB',
        stateName: 'West Bengal',
        jobs: [
            {
                title: 'School Headmaster',
                department: 'Education Department',
                vacancies: 160,
                lastDate: '2025-12-26',
                qualifications: ['B.Ed', 'Administrative experience'],
                salary: '₹45,000 - ₹60,000',
            },
        ],
    },
    {
        id: 'IN-DD',
        stateName: 'Daman and Diu',
        jobs: [
            {
                title: 'Harbour Master',
                department: 'Ports Department',
                vacancies: 6,
                lastDate: '2025-12-21',
                qualifications: ['Degree in Nautical Science'],
                salary: '₹50,000 - ₹65,000',
            },
        ],
    },
    {
        id: 'IN-DN',
        stateName: 'Dadra and Nagar Haveli',
        jobs: [
            {
                title: 'Block Health Officer',
                department: 'Health Department',
                vacancies: 12,
                lastDate: '2025-12-24',
                qualifications: ['B.Sc / Nursing'],
                salary: '₹30,000 - ₹40,000',
            },
        ],
    },
];

export default stateGovtJobsData;
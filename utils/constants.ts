export const SCHOOL_INFO = {
  name: 'Pivotal Institute Solutions',
  address: '4290 Bells Ferry Rd Ste 134 #3025, Kennesaw, GA 30144',
  phone: '(404) 374-9322',
  email: 'info@pivotalinstitute.com',
  description: 'Pivotal Institute Solutions is a leading provider of vocational training and professional development programs. We are committed to empowering individuals with the skills and knowledge needed to succeed in today\'s competitive job market.',
  mission: 'We offer comprehensive training programs designed to prepare students for successful careers in various industries.',
};

export const PROGRAMS = [
  {
    id: 'healthcare-assistant',
    name: 'Healthcare Assistant Certification',
    slug: 'healthcare-assistant',
    description: 'Comprehensive training program preparing students for careers in healthcare settings. Students will learn patient care, medical terminology, vital signs monitoring, and healthcare safety protocols.',
    hours: 240,
    weeks: 12,
    credential: 'Certificate of Completion - Healthcare Assistant',
    tuition: 4500,
    fees: 250,
    materials: 350,
    totalCost: 5100,
    admissionRequirements: [
      'High school diploma or GED',
      'Must be 18 years or older',
      'Criminal background check',
      'TB test and immunization records',
      'Attend orientation session'
    ],
  },
  {
    id: 'it-support-specialist',
    name: 'IT Support Specialist',
    slug: 'it-support-specialist',
    description: 'Learn essential IT support skills including computer hardware, software troubleshooting, network basics, and customer service. Prepares students for CompTIA A+ certification.',
    hours: 320,
    weeks: 16,
    credential: 'Diploma - IT Support Specialist (CompTIA A+ Prep)',
    tuition: 5800,
    fees: 300,
    materials: 450,
    totalCost: 6550,
    admissionRequirements: [
      'High school diploma or GED',
      'Basic computer literacy',
      'Must be 18 years or older',
      'Complete entrance assessment',
      'Personal interview'
    ],
  },
  {
    id: 'business-administration',
    name: 'Business Administration',
    slug: 'business-administration',
    description: 'Comprehensive business training covering office management, bookkeeping, business communications, customer service, and professional software applications.',
    hours: 280,
    weeks: 14,
    credential: 'Certificate - Business Administration',
    tuition: 4800,
    fees: 275,
    materials: 325,
    totalCost: 5400,
    admissionRequirements: [
      'High school diploma or GED',
      'Must be 18 years or older',
      'Basic computer skills',
      'Attend information session'
    ],
  },
  {
    id: 'welding-technology',
    name: 'Welding Technology',
    slug: 'welding-technology',
    description: 'Hands-on welding training covering various welding techniques including SMAW, GMAW, GTAW, and flux-cored welding. Safety, blueprint reading, and metallurgy included.',
    hours: 400,
    weeks: 20,
    credential: 'Certificate of Completion - Welding Technology (AWS Prep)',
    tuition: 6500,
    fees: 400,
    materials: 800,
    totalCost: 7700,
    admissionRequirements: [
      'High school diploma or GED',
      'Must be 18 years or older',
      'Physical ability to perform welding tasks',
      'Pass drug screening',
      'Safety orientation completion'
    ],
  },
];

export const POLICIES = {
  refund: {
    title: 'Refund Policy',
    content: `
      <h3>Refund Policy for Pivotal Institute Solutions</h3>
      
      <h4>1. Cancellation Before Program Start</h4>
      <p>Students who cancel enrollment before the first day of class will receive a full refund minus a $100 administrative fee.</p>
      
      <h4>2. Withdrawal During First Week (0-7 Days)</h4>
      <p>Students who withdraw during the first week of instruction will receive a refund of 90% of tuition paid, minus registration and material fees.</p>
      
      <h4>3. Withdrawal After First Week (8-14 Days)</h4>
      <p>Students who withdraw after the first week but within two weeks will receive a refund of 75% of tuition paid, minus all fees.</p>
      
      <h4>4. Withdrawal After Two Weeks (15+ Days)</h4>
      <p>Students who withdraw after two weeks will receive a pro-rated refund based on the percentage of the program completed, minus all fees. No refunds will be issued after 60% of the program is completed.</p>
      
      <h4>5. Refund Processing</h4>
      <p>All refund requests must be submitted in writing. Refunds will be processed within 30 business days of the withdrawal date.</p>
      
      <h4>6. Non-Refundable Items</h4>
      <ul>
        <li>Registration fees</li>
        <li>Material fees for items already provided to student</li>
        <li>Equipment already distributed</li>
        <li>Books and supplies issued to student</li>
      </ul>
      
      <h4>7. Special Circumstances</h4>
      <p>In cases of medical emergency or military deployment, special consideration may be given. Documentation is required.</p>
    `,
  },
  grievance: {
    title: 'Grievance and Complaint Policy',
    content: `
      <h3>Student Grievance and Complaint Procedure</h3>
      
      <h4>Purpose</h4>
      <p>Pivotal Institute Solutions is committed to providing a fair and transparent process for students to voice concerns and resolve disputes.</p>
      
      <h4>Step 1: Informal Resolution</h4>
      <p>Students are encouraged to first discuss concerns directly with the instructor or staff member involved. Many issues can be resolved through direct communication.</p>
      
      <h4>Step 2: Formal Written Complaint</h4>
      <p>If informal resolution is unsuccessful, students may submit a formal written complaint including:</p>
      <ul>
        <li>Student name and contact information</li>
        <li>Date and description of the issue</li>
        <li>Names of individuals involved</li>
        <li>Desired resolution</li>
        <li>Any supporting documentation</li>
      </ul>
      <p>Submit complaints to: Director of Student Services</p>
      
      <h4>Step 3: Investigation</h4>
      <p>The school will acknowledge receipt of the complaint within 5 business days and complete an investigation within 15 business days.</p>
      
      <h4>Step 4: Written Response</h4>
      <p>Students will receive a written response detailing the findings and resolution steps.</p>
      
      <h4>Step 5: Appeal</h4>
      <p>If unsatisfied with the resolution, students may appeal to the School Director within 10 business days of receiving the response.</p>
      
      <h4>External Complaints</h4>
      <p>Students also have the right to file complaints with:</p>
      <ul>
        <li>State Board of Education</li>
        <li>Accrediting agencies</li>
        <li>State licensing boards</li>
      </ul>
      
      <h4>Non-Retaliation</h4>
      <p>The school strictly prohibits retaliation against any student who files a complaint in good faith.</p>
    `,
  },
};

export const STATEMENTS = {
  openToPublic: 'All programs at Pivotal Institute Solutions are open to the public. We welcome all qualified applicants regardless of background.',
  
  nonDiscrimination: 'Pivotal Institute Solutions is an Equal Opportunity institution. We do not discriminate on the basis of race, color, national origin, sex, disability, age, religion, sexual orientation, gender identity, veteran status, or any other protected characteristic in our programs, activities, or employment practices.',
  
  ada: 'Pivotal Institute Solutions is committed to providing equal access to individuals with disabilities. We comply with the Americans with Disabilities Act (ADA) and provide reasonable accommodations to qualified students and employees. If you require accommodations, please contact our Student Services office at least two weeks before the program start date.',
};


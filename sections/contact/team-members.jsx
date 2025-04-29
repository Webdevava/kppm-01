import TeamCard from '@/components/team-card';
import React from 'react'

export const TeamMembers = () => {
      // Team members data
  const teamMembers = [
    {
      name: "John Doe",
      position: "Senior Chartered Accountant",
      description: "With over 20 years of experience in tax planning and compliance, John leads our team with strategic insights and precision.",
      image: "/placeholder.svg",
      linkedin: "https://linkedin.com/in/johndoe",
      email: "john.doe@example.com",
    },
    {
      name: "Jane Smith",
      position: "Audit & Assurance Specialist",
      description: "Jane ensures financial accuracy and stakeholder confidence through her meticulous audit and assurance expertise.",
      image: "/placeholder.svg",
      linkedin: "https://linkedin.com/in/janesmith",
      email: "jane.smith@example.com",
    },
    {
      name: "Michael Chen",
      position: "Business Advisory Consultant",
      description: "Michael provides tailored strategies to drive business growth and navigate complex financial landscapes.",
      image: "/placeholder.svg",
      linkedin: "https://linkedin.com/in/michaelchen",
      email: "michael.chen@example.com",
    },
    {
      name: "Sarah Patel",
      position: "Tax Consultant",
      description: "Sarah specializes in direct and indirect tax strategies, optimizing liabilities and ensuring compliance.",
      image: "/placeholder.svg",
      linkedin: "https://linkedin.com/in/sarahpatel",
      email: "sarah.patel@example.com",
    },
    {
      name: "Emily Brown",
      position: "Valuation Expert",
      description: "Emily delivers accurate business and asset valuations to support strategic decisions and financial reporting.",
      image: "/placeholder.svg",
      linkedin: "https://linkedin.com/in/emilybrown",
      email: "emily.brown@example.com",
    },
    {
      name: "David Lee",
      position: "Accounting Manager",
      description: "David oversees accounting operations, ensuring precise financial reporting and streamlined processes.",
      image: "/placeholder.svg",
      linkedin: "https://linkedin.com/in/davidlee",
      email: "david.lee@example.com",
    },
  ];
  return (
    <section
      className="min-h-screen  flex items-center justify-center lg:p-12"
    >
<div 
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-4xl "
  >
    {teamMembers.map((member, index) => (
      <div key={index} className="team-card flex justify-center">
        <TeamCard
          name={member.name}
          position={member.position}
          description={member.description}
          image={member.image}
          linkedin={member.linkedin}
          email={member.email}
        />
      </div>
    ))}
  </div>
</section>
  )
}

import React from "react";

const volunteers = [
  {
    name: "Darrell Steward",
    role: "Community Lead",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
  },
  {
    name: "Courtney Henry",
    role: "Fundraising Officer",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80",
  },
  {
    name: "Leslie Alexander",
    role: "Volunteer Manager",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80",
  },
  {
    name: "Jenny Wilson",
    role: "Outreach Coordinator",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
  },
  {
    name: "Robert Fox",
    role: "Program Director",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80",
  },
  {
    name: "Esther Howard",
    role: "Field Volunteer",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80",
  },
];

const OurVolunteers = () => {

  return (
    <div className="px-4 md:px-10 py-20" style={{ backgroundColor: "#F9F6F2" }}>
      <p
        className="text-sm tracking-wider mb-2"
        style={{ color: "#3D1A1A" }}
      >
        [ MEET OUR TEAM ]
      </p>
      <h1
        className="leading-none"
        style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#3D1A1A" }}
      >
        Our Volunteers
      </h1>

      <div className="border-t mt-6 mb-5" style={{ borderColor: "#E3D9CF" }} />

      <p className="text-base mb-10" style={{ color: "#5C4A3A" }}>
        Our dedicated team brings passion, purpose, and care to every cause we
        serve.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
        {volunteers.map((person, i) => (
          <div key={i}>
            <div
              className="rounded-2xl overflow-hidden bg-gray-200"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src={person.img}
                alt={person.name}
                className="w-full h-full object-cover block"
              />
            </div>
            <h3
              className="text-xl md:text-2xl mt-4 mb-1"
              style={{ color: "#3D1A1A" }}
            >
              {person.name}
            </h3>
            <p className="text-sm" style={{ color: "#5C4A3A" }}>
              {person.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurVolunteers;

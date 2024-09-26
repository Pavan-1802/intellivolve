export const restructuredQuestions = [
  {
    section: "Where Are We Going?",
    questions: [
      {
        id: 1,
        picture: "/roads.png",
        text: "Are we actively adjusting our goals to respond to changing customer demands or market trends?",
        options: [
          { value: "Yes", points: 3 },
          { value: "No", points: 1 },
          { value: "Unsure", points: 0 }
        ]
      },
      {
        id: 1,
        picture: "/roads.png",
        text: "Are we actively adjusting our goals to respond to changing customer demands or market trends?",
        options: [
          { value: "Yes", points: 3 },
          { value: "No", points: 1 },
          { value: "Unsure", points: 0 }
        ]
      },
      {
        id: 2,
        picture: "/roads.png",
        text: "Can everyone in the organization clearly explain our 3-year strategy?",
        options: [
          { value: "Yes, absolutely", points: 3 },
          { value: "Kind of, but needs work", points: 2 },
          { value: "Not really", points: 1 },
          { value: "Unsure", points: 0 }
        ]
      }
    ]
  },
  {
    section: "How Efficient Are We?",
    questions: [
      {
        id: 3,
        picture: "/efficiency.png",
        text: "Do we often find ourselves struggling with delays, inefficiencies, or rework in operations?",
        options: [
          { value: "Yes, a lot", points: 1 },
          { value: "Occasionally", points: 2 },
          { value: "No, things run smoothly", points: 3 },
          { value: "Unsure", points: 0 }
        ]
      },
      {
        id: 4,
        picture: "/efficiency.png",
        text: "Do our teams have access to the technology they need to do their jobs effectively?",
        options: [
          { value: "Yes", points: 3 },
          { value: "No, there are gaps", points: 1 },
          { value: "Unsure", points: 0 }
        ]
      }
    ]
  },
  {
    section: "Are We Embracing Technology?",
    questions: [
      {
        id: 5,
        picture: "/technology.png",
        text: "Are we using data insights to guide our decision-making processes?",
        options: [
          { value: "Yes, regularly", points: 3 },
          { value: "Sometimes", points: 2 },
          { value: "Not really", points: 1 },
          { value: "Unsure", points: 0 }
        ]
      },
      {
        id: 6,
        picture: "/technology.png",
        text: "Do we have a plan for integrating emerging technologies (e.g., AI, cloud) to stay competitive?",
        options: [
          { value: "Yes, it's in place", points: 3 },
          { value: "We're working on it", points: 2 },
          { value: "No, not yet", points: 1 },
          { value: "Unsure", points: 0 }
        ]
      }
    ]
  },
  {
    section: "How Well Do We Support Our People?",
    questions: [
      {
        id: 7,
        picture: "/people.png",
        text: "Do we have a culture that encourages feedback, innovation, and change?",
        options: [
          { value: "Yes, always", points: 3 },
          { value: "Sometimes", points: 2 },
          { value: "Rarely", points: 1 },
          { value: "Unsure", points: 0 }
        ]
      },
      {
        id: 8,
        picture: "/people.png",
        text: "Do our leaders and teams regularly communicate about how we can improve our ways of working?",
        options: [
          { value: "Yes, all the time", points: 3 },
          { value: "Sometimes", points: 2 },
          { value: "Not enough", points: 1 },
          { value: "Unsure", points: 0 }
        ]
      }
    ]
  }
];

export const scoreRanges = [
  {
    range: [21, 24],
    title: "Transformation Ready, but Opportunities Exist",
    feedback: "Your organization is generally in a good place, but there are opportunities for improvement in select areas. A targeted transformation in specific aspects could further enhance your efficiency, technological readiness, and culture.",
    recommendation: "Consider minor tweaks in areas where you scored lower and ensure you remain proactive about future market shifts."
  },
  {
    range: [15, 20],
    title: "Room for Improvement",
    feedback: "Your organization is functioning well in some areas, but there are visible gaps that could affect long-term performance. There may be misalignment in strategy, inefficiencies in operations, or an underutilization of technology.",
    recommendation: "A strategic transformation program focused on aligning operations, improving processes, and better leveraging technology could drive significant value. Evaluate the areas where you scored lower to prioritize change."
  },
  {
    range: [10, 14],
    title: "Transformation Required",
    feedback: "There are significant areas where your organization is struggling or underperforming. You may face inefficiencies, unclear strategy, or outdated processes, and your team may not have the tools or culture to drive improvements.",
    recommendation: "A comprehensive transformation is necessary to address these foundational issues. Begin with a deep assessment of your strategic, operational, and technological gaps."
  },
  {
    range: [0, 9],
    title: "Urgent Transformation Needed",
    feedback: "Your organization is likely facing substantial challenges across multiple areas. There are critical inefficiencies, strategic misalignment, or a lack of technological and cultural support.",
    recommendation: "Immediate intervention is needed. Prioritize an extensive transformation process to stabilize your business and re-align it for future growth."
  }
];
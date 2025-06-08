import { User, Article, Comment } from "@/types";

// Mock users
export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@news.com",
    name: "John Admin",
    role: "admin",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "employee@news.com",
    name: "Jane Writer",
    role: "employee",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612d6e3?w=100&h=100&fit=crop&crop=face",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    email: "reader@news.com",
    name: "Bob Reader",
    role: "reader",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "4",
    email: "sarah@news.com",
    name: "Sarah Editor",
    role: "employee",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    createdAt: new Date("2024-01-20"),
  },
];

// Mock articles
export const mockArticles: Article[] = [
  {
    id: "1",
    title: "The Future of Technology in 2024",
    content: `Technology continues to evolve at an unprecedented pace. In 2024, we're seeing remarkable advances in artificial intelligence, quantum computing, and renewable energy solutions.

Artificial intelligence has become more integrated into our daily lives, from smart home assistants to advanced medical diagnostics. The development of more efficient algorithms and the increasing availability of computational power have made AI more accessible to businesses of all sizes.

Quantum computing, once a theoretical concept, is now showing practical applications in cryptography, drug discovery, and financial modeling. Major tech companies are investing billions in quantum research, promising revolutionary changes in how we process information.

The renewable energy sector has also seen significant breakthroughs. Solar panel efficiency has improved dramatically, while battery technology has become more cost-effective, making clean energy a viable alternative to traditional fossil fuels.

As we look ahead, the convergence of these technologies promises to reshape industries and create new opportunities for innovation and growth.`,
    summary:
      "Exploring the latest technological advances in AI, quantum computing, and renewable energy.",
    authorId: "2",
    author: mockUsers[1],
    status: "approved",
    category: "Technology",
    tags: ["AI", "Quantum Computing", "Renewable Energy"],
    publishedAt: new Date("2024-12-01"),
    createdAt: new Date("2024-11-28"),
    updatedAt: new Date("2024-11-30"),
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
    likesCount: 42,
    commentsCount: 8,
  },
  {
    id: "2",
    title: "Climate Change: Global Response and Local Action",
    content: `The world is at a critical juncture in addressing climate change. While global leaders debate policy at international summits, local communities are taking decisive action to reduce their carbon footprint and adapt to changing environmental conditions.

Cities around the world are implementing innovative solutions to combat urban pollution and reduce energy consumption. From vertical gardens on skyscrapers to comprehensive public transportation systems, urban planners are reimagining how we live and work in dense population centers.

Agricultural communities are adopting sustainable farming practices that not only reduce environmental impact but also improve crop yields and soil health. These practices include precision agriculture, crop rotation, and the use of beneficial insects for pest control.

Individual actions, while seemingly small, collectively make a significant impact. Simple changes like reducing energy consumption, choosing sustainable transportation options, and supporting environmentally responsible businesses contribute to a larger movement toward sustainability.

The key to success lies in the collaboration between governments, businesses, and individuals working together toward common environmental goals.`,
    summary:
      "How global and local efforts are addressing climate change challenges.",
    authorId: "4",
    author: mockUsers[3],
    status: "approved",
    category: "Environment",
    tags: ["Climate Change", "Sustainability", "Environment"],
    publishedAt: new Date("2024-11-28"),
    createdAt: new Date("2024-11-25"),
    updatedAt: new Date("2024-11-27"),
    imageUrl:
      "https://images.unsplash.com/photo-1569163139394-de44cb3c0fa9?w=800&h=400&fit=crop",
    likesCount: 35,
    commentsCount: 12,
  },
  {
    id: "3",
    title: "The Art of Remote Work: Building Effective Teams",
    content: `Remote work has transformed from a rare privilege to a standard practice for millions of workers worldwide. This shift has revealed both opportunities and challenges in building effective, cohesive teams across geographical boundaries.

Successful remote teams share common characteristics: clear communication protocols, regular check-ins, and a strong emphasis on results rather than hours worked. Technology plays a crucial role, but it's the human element that determines success.

Effective remote managers focus on outcomes and provide their team members with the autonomy to achieve those outcomes in their own way. This approach requires trust, clear expectations, and regular feedback to ensure alignment with organizational goals.

Team building in a remote environment requires creativity and intentionality. Virtual coffee breaks, online game sessions, and collaborative project work help maintain the social connections that are essential for team cohesion.

The future of work is likely to be hybrid, combining the flexibility of remote work with the collaboration benefits of in-person interaction. Organizations that master this balance will have a significant advantage in attracting and retaining top talent.`,
    summary:
      "Best practices for managing and thriving in remote work environments.",
    authorId: "2",
    author: mockUsers[1],
    status: "approved",
    category: "Business",
    tags: ["Remote Work", "Team Management", "Productivity"],
    publishedAt: new Date("2024-11-25"),
    createdAt: new Date("2024-11-22"),
    updatedAt: new Date("2024-11-24"),
    imageUrl:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop",
    likesCount: 28,
    commentsCount: 6,
  },
  {
    id: "4",
    title: "Healthcare Innovation: Telemedicine Revolution",
    content: `The healthcare industry has undergone a digital transformation that has fundamentally changed how patients access medical care. Telemedicine, once a niche service, has become a mainstream healthcare delivery method.

This shift has been particularly beneficial for patients in rural areas who previously had limited access to specialized medical care. Now, a patient can consult with a specialist hundreds of miles away without leaving their hometown.

The technology behind telemedicine has advanced significantly, enabling real-time vital sign monitoring, remote diagnostic capabilities, and secure communication platforms that protect patient privacy while facilitating effective care.

Healthcare providers have had to adapt their practices to this new model, developing new skills in virtual patient interaction and remote diagnosis. Medical schools are now incorporating telemedicine training into their curricula.

While telemedicine offers many advantages, it also presents challenges. The lack of physical examination capabilities, technology barriers for some patients, and regulatory complexities across different jurisdictions require careful navigation.

Looking forward, the integration of artificial intelligence with telemedicine promises even more sophisticated remote healthcare capabilities.`,
    summary:
      "How telemedicine is revolutionizing healthcare access and delivery.",
    authorId: "4",
    author: mockUsers[3],
    status: "pending",
    category: "Healthcare",
    tags: ["Telemedicine", "Healthcare Innovation", "Digital Health"],
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-01"),
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
    likesCount: 0,
    commentsCount: 0,
  },
  {
    id: "5",
    title: "Education in the Digital Age",
    content: `The education sector has experienced unprecedented changes in recent years, accelerated by global events that necessitated rapid adoption of digital learning technologies.

Online learning platforms have evolved from simple video conferencing tools to sophisticated educational ecosystems that support interactive learning, real-time collaboration, and comprehensive assessment methods.

Students now have access to a global classroom, where they can learn from experts around the world and collaborate with peers from different cultures and backgrounds. This exposure enriches the learning experience and prepares students for an increasingly interconnected world.

Teachers have had to develop new skills to engage students in virtual environments. This has led to innovative teaching methods that combine traditional pedagogical approaches with cutting-edge technology.

The challenge now lies in ensuring equitable access to these digital learning opportunities. The digital divide remains a significant barrier for many students, highlighting the need for comprehensive infrastructure development and support programs.

As we move forward, the most effective educational approaches will likely blend online and in-person learning, creating flexible, personalized learning experiences that cater to individual student needs.`,
    summary:
      "Exploring the transformation of education through digital technologies.",
    authorId: "2",
    author: mockUsers[1],
    status: "draft",
    category: "Education",
    tags: ["Digital Learning", "Education Technology", "Online Learning"],
    createdAt: new Date("2024-12-02"),
    updatedAt: new Date("2024-12-02"),
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    likesCount: 0,
    commentsCount: 0,
  },
];

// Mock comments
export const mockComments: Comment[] = [
  {
    id: "1",
    content:
      "Great insights on AI development! I particularly found the section on practical applications very informative.",
    authorId: "3",
    author: mockUsers[2],
    articleId: "1",
    createdAt: new Date("2024-12-01T10:30:00"),
    updatedAt: new Date("2024-12-01T10:30:00"),
  },
  {
    id: "2",
    content:
      "The renewable energy section was eye-opening. Do you have any thoughts on nuclear energy as a transitional solution?",
    authorId: "1",
    author: mockUsers[0],
    articleId: "1",
    createdAt: new Date("2024-12-01T14:15:00"),
    updatedAt: new Date("2024-12-01T14:15:00"),
  },
  {
    id: "3",
    content:
      "This aligns with what we're seeing in our local community. Small actions really do add up to make a difference.",
    authorId: "3",
    author: mockUsers[2],
    articleId: "2",
    createdAt: new Date("2024-11-28T16:45:00"),
    updatedAt: new Date("2024-11-28T16:45:00"),
  },
  {
    id: "4",
    content:
      "As someone who has been working remotely for three years, I can confirm that the points about communication are spot on.",
    authorId: "1",
    author: mockUsers[0],
    articleId: "3",
    createdAt: new Date("2024-11-25T09:20:00"),
    updatedAt: new Date("2024-11-25T09:20:00"),
  },
];

export const categories = [
  "Technology",
  "Environment",
  "Business",
  "Healthcare",
  "Education",
  "Science",
  "Sports",
  "Entertainment",
  "Politics",
  "Finance",
];

export const commonTags = [
  "AI",
  "Machine Learning",
  "Climate Change",
  "Sustainability",
  "Remote Work",
  "Healthcare",
  "Education",
  "Innovation",
  "Digital Transformation",
  "Productivity",
  "Leadership",
  "Technology",
  "Research",
  "Policy",
  "Investment",
];

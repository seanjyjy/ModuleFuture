export const specialisations = [
  { key: 1, name: "Algorithms & Theory" },
  { key: 2, name: "Artificial Intelligence" },
  { key: 3, name: "Computer Graphics and Games" },
  { key: 4, name: "Computer Security" },
  { key: 5, name: "Database Systems" },
  { key: 6, name: "Multimedia Information Retrieval" },
  { key: 7, name: "Networking and Distributed Systems" },
  { key: 8, name: "Parallel Computing" },
  { key: 9, name: "Programming Languages" },
  { key: 10, name: "Software Engineering" },
];

export const CSspecialisations = {
  "Algorithms & Theory": {
    Primaries: [
      "CS3230 Design and Analysis of Algorithms",
      "CS3236 Introduction to Information Theory",
      "CS4231 Parallel and Distributed Algorithms",
      "CS4232 Theory of Computation",
      "CS4234 Optimisation Algorithms",
    ],
    Electives: [
      "CS3233 Competitive Programming",
      "CS4257 Algorithmic Foundations of Privacy",
      "CS4261 Algorithmic Mechanism Design",
      "CS4268 Quantum Computing",
      "CS4269 Fundamentals of Logic in Computer Science",
      "CS4330 Combinatorial Methods in Bioinformatics",
      "CS5230 Computational Complexity",
      "CS5234 Algorithms at Scale",
      "CS5236 Advanced Automata Theory",
      "CS5237 Computational Geometry and Applications",
      "CS5238 Advanced Combinatorial Methods in Bioinformatics",
      "CS5330 Randomized Algorithms",
    ],
  },
  "Artificial Intelligence": {
    Primaries: [
      "CS3243 Introduction to Artificial Intelligence",
      "CS3244 Machine Learning",
      "CS4243 Computer Vision and Pattern Recognition",
      "CS4244 Knowledge Representation and Reasoning",
      "CS4246 AI Planning and Decision Making",
      "CS4248 Natural Language Processing",
    ],
    Electives: [
      "CS4220 Knowledge Discovery Methods in Bioinformatics",
      "CS4261 Algorithmic Mechanism Design",
      "CS4269 Fundamentals of Logic in Computer Science",
      "CS4277 3D Computer Vision",
      "CS4278 Intelligent Robots: Algorithms and Systms",
      "CS5215 Constraint Processing",
      "CS5228 Knowledge Discovery and Data Mining",
      "CS5242 Neural Networks and Deep Learning",
      "CS5260 Neural Networks and Deep Learning II",
      "CS5340 Uncertainty Modelling in AI",
      "CS5339 Theory and Algorithms for Machine Learning",
    ],
  },

  "Computer Graphics and Games": {
    Primaries: [
      "CS3241 Computer Graphics",
      "CS3242 3D Modelling and Animation",
      "CS3247 Game Development",
      "CS4247 Graphics Rendering Techniques",
      "CS4350 Game Development Project",
    ],
    Electives: [
      "CS3218 Multimodal Processing in Mobile Platforms",
      "CS3240 Interaction Design",
      "CS3249 User Interface Development",
      "CS4240 Interaction Design for Virtual and Augmented Reality",
      "CS4243 Computer Vision and Pattern Recognition",
      "CS4249 Phenomena and Theories of HCI",
      "CS4351 Real-time Graphics",
      "CS5237 Computational Geometry and Applications",
      "CS5240 Theoretical Foundation of Multimedia",
      "CS5343 Advanced Computer Animation",
      "CS5346 Information Visualisation",
    ],
  },

  "Computer Security": {
    Primaries: [
      "CS2107 Introduction to Information Security",
      "CS3235 Computer Security",
      "CS4236 Cryptography Theory and Practice",
      "CS4238 Computer Security Practice",
      "CS4239 Software Security",
    ],
    Electives: [
      "CS3221 Operating Systems Design and Pragmatics",
      "CS4257 Algorithmic Foundations of Privacy",
      "CS4276 IoT Security",
      "CS5231 Systems Security",
      "CS5250 Advanced Operating Systems",
      "CS5321 Network Security",
      "CS5322 Database Security",
      "CS5331 Web Security",
      "CS5332 Biometric Authentication",
      "IFS4101 Legal Aspects of Information Security",
      "IFS4102 Digital Forensics",
      "IFS4103 Penetration Testing Practice",
    ],
  },

  "Database Systems": {
    Primaries: [
      "CS2102 Database Systems",
      "CS3223 Database Systems Implementation",
      "CS4221 Database Applications Design and Tuning",
      "CS4224 Distributed Databases",
      "CS4225 Big Data Systems",
    ],
    Electives: [
      "CS4220 Knowledge Discovery Methods in Bioinformatics",
      "CS5226 Database Tuning",
      "CS5228 Knowledge Discovery and Data Mining",
      "CS5322 Database Security",
    ],
  },
  "Multimedia Information Retrieval": {
    Primaries: [
      "CS2108 Introduction to Media Computing",
      "CS3245 Information Retrieval",
      "CS4242 Social Media Computing",
      "CS4248 Natural Language Processing",
      "CS4347 Sound and Music Computing",
    ],
    Electives: ["CS5246 Text Mining", "CS5241 Speech Processing"],
  },

  "Networking and Distributed Systems": {
    Primaries: [
      "CS2105 Introduction to Computer Networks",
      "CS3103 Computer Networks Practice",
      "CS4222 Wireless Networking",
      "CS4226 Internet Architecture",
      "CS4231 Parallel and Distributed Algorithms",
    ],
    Electives: [
      "CS3237 Introduction to Internet of Things",
      "CS4344 Networked and Mobile Gaming",
      "CS5223 Distributed Systems",
      "CS5224 CloudComputing",
      "CS5229 Advanced Computer Networks",
      "CS5248 Systems Support for Continuous Media",
      "CS5321 Network Security",
    ],
  },

  "Parallel Computing": {
    Primaries: [
      "CS3210 Parallel Computing",
      "CS3211 Parallel and Concurrent Programming",
      "CS4231 Parallel and Distributed Algorithms",
      "CS4223 Multi-core Architecture",
    ],
    Electives: [
      "CS5222 Advanced Computer Architectures",
      "CS5223 Distributed Systems",
      "CS5224 CloudComputing",
      "CS5239 Computer System Performance Analysis",
      "CS5250 Advanced Operating Systems",
    ],
  },

  "Programming Languages": {
    Primaries: [
      "CS2104 Programming Language Concepts",
      "CS3211 Parallel and Concurrent Programming",
      "CS4212 Compiler Design",
      "CS4215 Programming Language Implementation",
    ],
    Electives: [
      "CS3234 Logic for Proofs and Programs",
      "CS4216 Constraint Logic Programming",
      "CS5232 Formal Specification Design Techniques",
      "CS5214 Design of Optimising Compilers",
      "CS5215 Constraint Processing",
      "CS5218 Principles and Practice of Program Analysis",
    ],
  },

  "Software Engineering": {
    Primaries: [
      "CS2103T Software Engineering", // TODO: Either CS2103 or CS2103T is possible
      "CS3219 Software Engineering Principles and Patterns",
      "CS4211 Formal Methods for Software Engineering ",
      "CS4218 Software Testing",
      "CS4239 Software Security",
    ],
    Electives: [
      "CS3216 Software Development on Evolving Platforms",
      "CS3217 Software Engineering on Modern Application Platforms",
      "CS3226 Web Programming and Applications",
      "CS3234 Logic for Proofs and Programs",
      "CS5219 Automatic Software Validation",
      "CS5232 Formal Specification Design Techniques",
      "CS5272 Embedded Software Design",
    ],
  },
};

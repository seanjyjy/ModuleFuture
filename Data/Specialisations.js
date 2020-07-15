export const specialisations = {
  "Computer Science 2019": {
    cat: [
      {
        name: "Algorithms & Theory",
        key: 1,
        Prereq: {
          modules: [
            {
              code: "CS1231S",
              name: "CS1231S Discrete Structures",
            },
            {
              name: "CS2040S Data Structures and Algorithms",
              code: "CS2040S",
            },
            {
              name: "ST2334 Probability and Statistics",
              code: "ST2334",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              code: "CS3230",
              name: "CS3230 Design and Analysis of Algorithms",
            },
            {
              code: "CS3236",
              name: "CS3236 Introduction to Information Theory",
            },
            {
              code: "CS4231",
              name: "CS4231 Parallel and Distributed Algorithms",
            },
            { code: "CS4232", name: "CS4232 Theory of Computation" },
            { code: "CS4234", name: "CS4234 Optimisation Algorithms" },
          ],
        },
        Electives: {
          modules: [
            { code: "CS3233", name: "CS3233 Competitive Programming" },
            {
              code: "CS4257",
              name: "CS4257 Algorithmic Foundations of Privacy",
            },
            {
              code: "CS4261",
              name: "CS4261 Algorithmic Mechanism Design",
            },
            { code: "CS4268", name: "CS4268 Quantum Computing" },
            {
              code: "CS4269",
              name: "CS4269 Fundamentals of Logic in Computer Science",
            },
            {
              code: "CS4330",
              name: "CS4330 Combinatorial Methods in Bioinformatics",
            },
            { code: "CS5230", name: "CS5230 Computational Complexity" },
            { code: "CS5234", name: "CS5234 Algorithms at Scale" },
            { code: "CS5236", name: "CS5236 Advanced Automata Theory" },
            {
              code: "CS5237",
              name: "CS5237 Computational Geometry and Applications",
            },
            {
              code: "CS5238",
              name: "CS5238 Advanced Combinatorial Methods in Bioinformatics",
            },
            { code: "CS5330", name: "CS5330 Randomized Algorithms" },
          ],
        },
      },
      {
        name: "Artificial Intellgence",
        key: 2,
        Prereq: {
          modules: [
            {
              code: "CS1231S",
              name: "CS1231S Discrete Structures",
            },
            {
              name: "CS2040S Data Structures and Algorithms",
              code: "CS2040S",
            },
            {
              name: "MA1101R Linear Algebra I",
              code: "MA1101R",
            },
            {
              name: "MA1521 Calculus for Computing",
              code: "MA1521",
            },
            {
              name: "ST2334 Probability and Statistics",
              code: "ST2334",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            {
              code: "CS3243",
              name: "CS3243 Introduction to Artificial Intelligence",
            },
            { code: "CS3244", name: "CS3244 Machine Learning" },
            {
              code: "CS4243",
              name: "CS4243 Computer Vision and Pattern Recognition",
            },
            {
              code: "CS4244",
              name: "CS4244 Knowledge Representation and Reasoning",
            },
            {
              code: "CS4246",
              name: "CS4246 AI Planning and Decision Making",
            },
            { code: "CS4248", name: "CS4248 Natural Language Processing" },
          ],
        },
        Electives: {
          modules: [
            {
              code: "CS4220",
              name: "CS4220 Knowledge Discovery Methods in Bioinformatics",
            },
            {
              code: "CS4261",
              name: "CS4261 Algorithmic Mechanism Design",
            },
            {
              code: "CS4269",
              name: "CS4269 Fundamentals of Logic in Computer Science",
            },
            { code: "CS4277", name: "CS4277 3D Computer Vision" },
            {
              code: "CS4278",
              name: "CS4278 Intelligent Robots: Algorithms and Systms",
            },
            { code: "CS5215", name: "CS5215 Constraint Processing" },
            {
              code: "CS5228",
              name: "CS5228 Knowledge Discovery and Data Mining",
            },
            {
              code: "CS5242",
              name: "CS5242 Neural Networks and Deep Learning",
            },
            {
              code: "CS5260",
              name: "CS5260 Neural Networks and Deep Learning II",
            },
            { code: "CS5340", name: "CS5340 Uncertainty Modelling in AI" },
            {
              code: "CS5339",
              name: "CS5339 Theory and Algorithms for Machine Learning",
            },
          ],
        },
      },

      {
        name: "Computer Graphics and Games",
        shortName: "Computer Graphics",
        key: 3,
        Prereq: {
          modules: [
            {
              name: "CS2030 Programming Methodology II",
              code: "CS2030",
            },
            {
              name: "CS2040S Data Structures and Algorithms",
              code: "CS2040S",
            },
            {
              name: "MA1101R Linear Algebra I",
              code: "MA1101R",
            },
            {
              name: "MA1521 Calculus for Computing",
              code: "MA1521",
            },
            {
              name: "PC1221 Fundamental of Physics I",
              code: "PC1221",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            { code: "CS3241", name: "CS3241 Computer Graphics" },
            { code: "CS3242", name: "CS3242 3D Modelling and Animation" },
            { code: "CS3247", name: "CS3247 Game Development" },
            {
              code: "CS4247",
              name: "CS4247 Graphics Rendering Techniques",
            },
            { code: "CS4350", name: "CS4350 Game Development Project" },
          ],
        },
        Electives: {
          modules: [
            {
              code: "CS3218",
              name: "CS3218 Multimodal Processing in Mobile Platforms",
            },
            { code: "CS3240", name: "CS3240 Interaction Design" },
            { code: "CS3249", name: "CS3249 User Interface Development" },
            {
              code: "CS4240",
              name:
                "CS4240 Interaction Design for Virtual and Augmented Reality",
            },
            {
              code: "CS4243",
              name: "CS4243 Computer Vision and Pattern Recognition",
            },
            {
              code: "CS4249",
              name: "CS4249 Phenomena and Theories of HCI",
            },
            { code: "CS4351", name: "CS4351 Real-time Graphics" },
            {
              code: "CS5237",
              name: "CS5237 Computational Geometry and Applications",
            },
            {
              code: "CS5240",
              name: "CS5240 Theoretical Foundation of Multimedia",
            },
            { code: "CS5343", name: "CS5343 Advanced Computer Animation" },
            { code: "CS5346", name: "CS5346 Information Visualisation" },
          ],
        },
      },
      {
        name: "Computer Security",
        key: 4,
        Prereq: {
          modules: [
            {
              name: "CS1101S Programming Methodology",
              code: "CS1101S",
            },
            {
              name: "CS1231S Discrete Structures",
              code: "CS1231S",
            },
            {
              name: "CS2040S Data Structures and Algorithms",
              code: "CS2040S",
            },
            {
              name: "CS2103T Software Engineering",
              code: "CS2103T",
            },
            {
              name: "CS2105 Introduction to Computer Networks",
              code: "CS2105",
            },
            {
              name: "ST2334 Probability and Statistics",
              code: "ST2334",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            {
              code: "CS2107",
              name: "CS2107 Introduction to Information Security",
            },
            { code: "CS3235", name: "CS3235 Computer Security" },
            {
              code: "CS4236",
              name: "CS4236 Cryptography Theory and Practice",
            },
            { code: "CS4238", name: "CS4238 Computer Security Practice" },
            { code: "CS4239", name: "CS4239 Software Security" },
          ],
        },
        Electives: {
          modules: [
            {
              code: "CS3221",
              name: "CS3221 Operating Systems Design and Pragmatics",
            },
            {
              code: "CS4257",
              name: "CS4257 Algorithmic Foundations of Privacy",
            },
            { code: "CS4276", name: "CS4276 IoT Security" },
            { code: "CS5231", name: "CS5231 Systems Security" },
            { code: "CS5250", name: "CS5250 Advanced Operating Systems" },
            { code: "CS5321", name: "CS5321 Network Security" },
            { code: "CS5322", name: "CS5322 Database Security" },
            { code: "CS5331", name: "CS5331 Web Security" },
            { code: "CS5332", name: "CS5332 Biometric Authentication" },
            {
              code: "IFS4101",
              name: "IFS4101 Legal Aspects of Information Security",
            },
            { code: "IFS4102", name: "IFS4102 Digital Forensics" },
            {
              code: "IFS4103",
              name: "IFS4103 Penetration Testing Practice",
            },
          ],
        },
      },

      {
        name: "Database Systems",
        key: 5,
        Prereq: {
          modules: [
            {
              name: "CS1231S Discrete Structures",
              code: "CS1231S",
            },
            {
              name: "CS2030 Programming Methodology II",
              code: "CS2030",
            },
            {
              name: "CS2040S Data Structures and Algorithms",
              code: "CS2040S",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            { code: "CS2102", name: "CS2102 Database Systems" },
            {
              code: "CS3223",
              name: "CS3223 Database Systems Implementation",
            },
            {
              code: "CS4221",
              name: "CS4221 Database Applications Design and Tuning",
            },
            { code: "CS4224", name: "CS4224 Distributed Databases" },
            { code: "CS4225", name: "CS4225 Big Data Systems" },
          ],
        },
        Electives: {
          modules: [
            {
              code: "CS4220",
              name: "CS4220 Knowledge Discovery Methods in Bioinformatics",
            },
            { code: "CS5226", name: "CS5226 Database Tuning" },
            {
              code: "CS5228",
              name: "CS5228 Knowledge Discovery and Data Mining",
            },
            { code: "CS5322", name: "CS5322 Database Security" },
          ],
        },
      },
      {
        name: "Multimedia Information Retrieval",
        shortName: "Multimedia",
        key: 6,
        Prereq: {
          modules: [
            {
              name: "CS2030 Programming Methodology II",
              code: "CS2030",
            },
            {
              name: "CS2040S Data Structures and Algorithms",
              code: "CS2040S",
            },
            {
              name: "ST2334 Probability and Statistics",
              code: "ST2334",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            {
              code: "CS2108",
              name: "CS2108 Introduction to Media Computing",
            },
            { code: "CS3245", name: "CS3245 Information Retrieval" },
            { code: "CS4242", name: "CS4242 Social Media Computing" },
            { code: "CS4248", name: "CS4248 Natural Language Processing" },
            { code: "CS4347", name: "CS4347 Sound and Music Computing" },
          ],
        },
        Electives: {
          modules: [
            { code: "CS5246", name: "CS5246 Text Mining" },
            { code: "CS5241", name: "CS5241 Speech Processing" },
          ],
        },
      },

      {
        name: "Networking and Distributed Systems",
        shortName: "Networking",
        key: 7,
        Prereq: {
          modules: [
            {
              name: "CS2040S Data Structures and Algorithms",
              code: "CS2040S",
            },
            {
              name: "CS3230 Design and Analysis of Algorithms",
              code: "CS3230",
            },
            {
              name: "ST2334 Probability and Statistics",
              code: "ST2334",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            {
              code: "CS2105",
              name: "CS2105 Introduction to Computer Networks",
            },
            { code: "CS3103", name: "CS3103 Computer Networks Practice" },
            { code: "CS4222", name: "CS4222 Wireless Networking" },
            { code: "CS4226", name: "CS4226 Internet Architecture" },
            {
              code: "CS4231",
              name: "CS4231 Parallel and Distributed Algorithms",
            },
          ],
        },
        Electives: {
          modules: [
            {
              code: "CS3237",
              name: "CS3237 Introduction to Internet of Things",
            },
            { code: "CS4344", name: "CS4344 Networked and Mobile Gaming" },
            { code: "CS5223", name: "CS5223 Distributed Systems" },
            { code: "CS5224", name: "CS5224 CloudComputing" },
            { code: "CS5229", name: "CS5229 Advanced Computer Networks" },
            {
              code: "CS5248",
              name: "CS5248 Systems Support for Continuous Media",
            },
            { code: "CS5321", name: "CS5321 Network Security" },
          ],
        },
      },

      {
        name: "Parallel Computing",
        key: 8,
        Prereq: {
          modules: [
            {
              name: "CS2100 Computer Organisation",
              code: "CS2100",
            },
            {
              name: "CS2106 Operating Systems",
              code: "CS2106",
            },
            {
              name: "CS3230 Design and Analysis of Algorithms",
              code: "CS3230",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            { code: "CS3210", name: "CS3210 Parallel Computing" },
            {
              code: "CS3211",
              name: "CS3211 Parallel and Concurrent Programming",
            },
            {
              code: "CS4231",
              name: "CS4231 Parallel and Distributed Algorithms",
            },
            { code: "CS4223", name: "CS4223 Multi-core Architecture" },
          ],
        },
        Electives: {
          modules: [
            {
              code: "CS5222",
              name: "CS5222 Advanced Computer Architectures",
            },
            { code: "CS5223", name: "CS5223 Distributed Systems" },
            { code: "CS5224", name: "CS5224 CloudComputing" },
            {
              code: "CS5239",
              name: "CS5239 Computer System Performance Analysis",
            },
            { code: "CS5250", name: "CS5250 Advanced Operating Systems" },
          ],
        },
      },

      {
        name: "Programming Languages",
        key: 9,
        Prereq: {
          modules: [
            {
              name: "CS2030 Programming Methodology II",
              code: "CS2030",
            },
            {
              name: "CS2040S Data Structures and Algorithms",
              code: "CS2040S",
            },
            {
              name: "CS2106 Operating Systems",
              code: "CS2106",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            { code: "CS2104", name: "CS2104 Programming Language Concepts" },
            {
              code: "CS3211",
              name: "CS3211 Parallel and Concurrent Programming",
            },
            { code: "CS4212", name: "CS4212 Compiler Design" },
            {
              code: "CS4215",
              name: "CS4215 Programming Language Implementation",
            },
          ],
        },
        Electives: {
          modules: [
            { code: "CS3234", name: "CS3234 Logic for Proofs and Programs" },
            { code: "CS4216", name: "CS4216 Constraint Logic Programming" },
            {
              code: "CS5232",
              name: "CS5232 Formal Specification Design Techniques",
            },
            {
              code: "CS5214",
              name: "CS5214 Design of Optimising Compilers",
            },
            { code: "CS5215", name: "CS5215 Constraint Processing" },
            {
              code: "CS5218",
              name: "CS5218 Principles and Practice of Program Analysis",
            },
          ],
        },
      },

      {
        name: "Software Engineering",
        key: 10,
        Prereq: {
          modules: [
            {
              code: "CS2030",
              name: "CS2030 Programming Methodology II",
            },
            {
              name: "CS2040S Data Structures and Algorithms",
              code: "CS2040S",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            { code: "CS2103T", name: "CS2103T Software Engineering" },
            {
              code: "CS3219",
              name: "CS3219 Software Engineering Principles and Patterns",
            },
            {
              code: "CS4211",
              name: "CS4211 Formal Methods for Software Engineering ",
            },
            { code: "CS4218", name: "CS4218 Software Testing" },
            { code: "CS4239", name: "CS4239 Software Security" },
          ],
        },
        Electives: {
          modules: [
            {
              code: "CS3216",
              name: "CS3216 Software Development on Evolving Platforms",
            },
            {
              code: "CS3217",
              name:
                "CS3217 Software Engineering on Modern Application Platforms",
            },
            {
              code: "CS3226",
              name: "CS3226 Web Programming and Applications",
            },
            {
              code: "CS3234",
              name: "CS3234 Logic for Proofs and Programs",
            },
            {
              code: "CS5219",
              name: "CS5219 Automatic Software Validation",
            },
            {
              code: "CS5232",
              name: "CS5232 Formal Specification Design Techniques",
            },
            { code: "CS5272", name: "CS5272 Embedded Software Design" },
          ],
        },
      },
    ],
  },
};

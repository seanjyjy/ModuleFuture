export const specialisations = {
  "Computer Science 2020": {
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
              name: "CS2030S Programming Methodology II",
              code: "CS2030S",
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
              name: "CS2030S Programming Methodology II",
              code: "CS2030S",
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
              name: "CS2030S Programming Methodology II",
              code: "CS2030S",
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
              name: "CS2030S Programming Methodology II",
              code: "CS2030S",
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
              code: "CS2030S",
              name: "CS2030S Programming Methodology II",
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
  "Computer Science 2018": {
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
  "Computer Science 2017": {
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
  "Business Analytics 2020": {
    cat: [
      {
        name: "Financial Analytics",
        key: 1,
        Prereq: {
          modules: [
            {
              name: "BT2101 Decision Making Methods and Tools",
              code: "BT2101",
            },
            {
              name: "BT2102 Data Management and Visualisation",
              code: "BT2102",
            },
            {
              code: "BT3102",
              name: "BT3102 Computational Methods for Business Analytics",
            },
            {
              name: "IS3103 Information Systems Leadership and Communication",
              code: "IS3103",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              code: "BT4013",
              name:
                "BT4013 Analytics for Capital Market Trading and Investment",
            },
            {
              code: "BT4016",
              name: "BT4016 Risk Analytics for Financial Services",
            },
            {
              code: "IS4228",
              name: "IS4228 Information Technologies in Financial Services",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            { code: "BT4012", name: "BT4012 Fraud Analytics" },
            {
              code: "BT4221",
              name: "BT4221 Big Data Techniques and Technologies",
            },
            {
              code: "BT4222",
              name: "BT4222 Mining Web Data for Business Insights",
            },
            {
              code: "IS4234",
              name: "IS4234 Compliance and Regulation Technology",
            },
            {
              code: "IS4302",
              name: "IS4302 Blockchain and Distributed Ledger Technologies",
            },
          ],
        },
      },
      {
        name: "Marketing Analytics",
        key: 2,
        Prereq: {
          modules: [
            {
              name: "MKT1705X Principles of Marketing",
              code: "MKT1705X",
            },
            {
              name: "BT2101 Decision Making Methods and Tools",
              code: "BT2101",
            },
            {
              name: "BT2102 Data Management and Visualisation",
              code: "BT2102",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            { code: "BT4211", name: "BT4211 Data-Driven Marketing" },
            {
              code: "BT4212",
              name: "BT4212 Search Engine Optimization and Analytics",
            },
            {
              code: "BT4222",
              name: "BT4222 Mining Web Data for Business Insights",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "BT4014",
              name: "BT4014 Analytics Driven Design of Adaptive Systems",
            },
            {
              code: "BT4015",
              name: "BT4015 Geospatial Analytics",
            },
            {
              code: "BT4221",
              name: "BT4221 Big Data Techniques and Technologies",
            },
            {
              code: "IS3240",
              name: "IS3240 Digtial Platform Strategy and Architecture",
            },
            {
              code: "IS4241",
              name: "IS4241 Social Media Network Analysis",
            },
          ],
        },
      },
    ],
  },
  "Business Analytics 2019": {
    cat: [
      {
        name: "Financial Analytics",
        key: 1,
        Prereq: {
          modules: [
            {
              name: "BT2101 Decision Making Methods and Tools",
              code: "BT2101",
            },
            {
              name: "BT2102 Data Management and Visualisation",
              code: "BT2102",
            },
            {
              code: "BT3102",
              name: "BT3102 Computational Methods for Business Analytics",
            },
            {
              name: "IS3103 Information Systems Leadership and Communication",
              code: "IS3103",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              code: "BT4013",
              name:
                "BT4013 Analytics for Capital Market Trading and Investment",
            },
            {
              code: "BT4016",
              name: "BT4016 Risk Analytics for Financial Services",
            },
            {
              code: "IS4228",
              name: "IS4228 Information Technologies in Financial Services",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            { code: "BT4012", name: "BT4012 Fraud Analytics" },
            {
              code: "BT4221",
              name: "BT4221 Big Data Techniques and Technologies",
            },
            {
              code: "BT4222",
              name: "BT4222 Mining Web Data for Business Insights",
            },
            {
              code: "IS4234",
              name: "IS4234 Compliance and Regulation Technology",
            },
            {
              code: "IS4302",
              name: "IS4302 Blockchain and Distributed Ledger Technologies",
            },
          ],
        },
      },
      {
        name: "Marketing Analytics",
        key: 2,
        Prereq: {
          modules: [
            {
              name: "MKT1705X Principles of Marketing",
              code: "MKT1705X",
            },
            {
              name: "BT2101 Decision Making Methods and Tools",
              code: "BT2101",
            },
            {
              name: "BT2102 Data Management and Visualisation",
              code: "BT2102",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            { code: "BT4211", name: "BT4211 Data-Driven Marketing" },
            {
              code: "BT4212",
              name: "BT4212 Search Engine Optimization and Analytics",
            },
            {
              code: "BT4222",
              name: "BT4222 Mining Web Data for Business Insights",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "BT4014",
              name: "BT4014 Analytics Driven Design of Adaptive Systems",
            },
            {
              code: "BT4015",
              name: "BT4015 Geospatial Analytics",
            },
            {
              code: "BT4221",
              name: "BT4221 Big Data Techniques and Technologies",
            },
            {
              code: "IS3240",
              name: "IS3240 Digtial Platform Strategy and Architecture",
            },
            {
              code: "IS4241",
              name: "IS4241 Social Media Network Analysis",
            },
          ],
        },
      },
    ],
  },
  "Business Analytics 2018": {
    cat: [
      {
        name: "Financial Analytics",
        key: 1,
        Prereq: {
          modules: [
            {
              name: "BT2101 Decision Making Methods and Tools",
              code: "BT2101",
            },
            {
              name: "BT2102 Data Management and Visualisation",
              code: "BT2102",
            },
            {
              code: "BT3102",
              name: "BT3102 Computational Methods for Business Analytics",
            },
            {
              name: "IS3103 Information Systems Leadership and Communication",
              code: "IS3103",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              code: "BT4013",
              name:
                "BT4013 Analytics for Capital Market Trading and Investment",
            },
            {
              code: "BT4016",
              name: "BT4016 Risk Analytics for Financial Services",
            },
            {
              code: "IS4228",
              name: "IS4228 Information Technologies in Financial Services",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            { code: "BT4012", name: "BT4012 Fraud Analytics" },
            {
              code: "BT4221",
              name: "BT4221 Big Data Techniques and Technologies",
            },
            {
              code: "BT4222",
              name: "BT4222 Mining Web Data for Business Insights",
            },
            {
              code: "IS4234",
              name: "IS4234 Compliance and Regulation Technology",
            },
            {
              code: "IS4302",
              name: "IS4302 Blockchain and Distributed Ledger Technologies",
            },
          ],
        },
      },
      {
        name: "Marketing Analytics",
        key: 2,
        Prereq: {
          modules: [
            {
              name: "MKT1705X Principles of Marketing",
              code: "MKT1705X",
            },
            {
              name: "BT2101 Decision Making Methods and Tools",
              code: "BT2101",
            },
            {
              name: "BT2102 Data Management and Visualisation",
              code: "BT2102",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            { code: "BT4211", name: "BT4211 Data-Driven Marketing" },
            {
              code: "BT4212",
              name: "BT4212 Search Engine Optimization and Analytics",
            },
            {
              code: "BT4222",
              name: "BT4222 Mining Web Data for Business Insights",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "BT4014",
              name: "BT4014 Analytics Driven Design of Adaptive Systems",
            },
            {
              code: "BT4015",
              name: "BT4015 Geospatial Analytics",
            },
            {
              code: "BT4221",
              name: "BT4221 Big Data Techniques and Technologies",
            },
            {
              code: "IS3240",
              name: "IS3240 Digtial Platform Strategy and Architecture",
            },
            {
              code: "IS4241",
              name: "IS4241 Social Media Network Analysis",
            },
          ],
        },
      },
    ],
  },
  "Business Analytics 2017": {
    cat: [
      {
        name: "Financial Analytics",
        key: 1,
        Prereq: {
          modules: [
            {
              name: "BT2101 Decision Making Methods and Tools",
              code: "BT2101",
            },
            {
              name: "BT2102 Data Management and Visualisation",
              code: "BT2102",
            },
            {
              code: "BT3102",
              name: "BT3102 Computational Methods for Business Analytics",
            },
            {
              name: "IS3103 Information Systems Leadership and Communication",
              code: "IS3103",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              code: "BT4013",
              name:
                "BT4013 Analytics for Capital Market Trading and Investment",
            },
            {
              code: "BT4016",
              name: "BT4016 Risk Analytics for Financial Services",
            },
            {
              code: "IS4228",
              name: "IS4228 Information Technologies in Financial Services",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            { code: "BT4012", name: "BT4012 Fraud Analytics" },
            {
              code: "BT4221",
              name: "BT4221 Big Data Techniques and Technologies",
            },
            {
              code: "BT4222",
              name: "BT4222 Mining Web Data for Business Insights",
            },
            {
              code: "IS4234",
              name: "IS4234 Compliance and Regulation Technology",
            },
            {
              code: "IS4302",
              name: "IS4302 Blockchain and Distributed Ledger Technologies",
            },
          ],
        },
      },
      {
        name: "Marketing Analytics",
        key: 2,
        Prereq: {
          modules: [
            {
              name: "MKT1705X Principles of Marketing",
              code: "MKT1705X",
            },
            {
              name: "BT2101 Decision Making Methods and Tools",
              code: "BT2101",
            },
            {
              name: "BT2102 Data Management and Visualisation",
              code: "BT2102",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            { code: "BT4211", name: "BT4211 Data-Driven Marketing" },
            {
              code: "BT4212",
              name: "BT4212 Search Engine Optimization and Analytics",
            },
            {
              code: "BT4222",
              name: "BT4222 Mining Web Data for Business Insights",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "BT4014",
              name: "BT4014 Analytics Driven Design of Adaptive Systems",
            },
            {
              code: "BT4015",
              name: "BT4015 Geospatial Analytics",
            },
            {
              code: "BT4221",
              name: "BT4221 Big Data Techniques and Technologies",
            },
            {
              code: "IS3240",
              name: "IS3240 Digtial Platform Strategy and Architecture",
            },
            {
              code: "IS4241",
              name: "IS4241 Social Media Network Analysis",
            },
          ],
        },
      },
    ],
  },
  "Information Systems 2020": {
    cat: [
      {
        name: "Digital Innovation",
        key: 1,
        Prereq: {
          modules: [
            {
              code: "IS1103",
              name: "IS1103 Ethics in Computing",
            },
            {
              code: "IS2102",
              name: "IS2102 Enterprise Systems Architecture and Design",
            },
            {
              code: "IS3103",
              name: "IS3103 Information Systems Leadership and Communication",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              name: "IS3240 Digital Platform Strategy and Architecture",
              code: "IS3240",
            },
            {
              name: "IS3251 Principles of Technology Entrepreneurship",
              code: "IS3251",
            },
            {
              code: "IS4261",
              name: "IS4261 Designing IT-Enabled Business Innovations",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "IS3150",
              name: "IS3150 Digital Media Marketing",
            },
            {
              code: "IS3261",
              name: "IS3261 Mobile Apps Development for Enterprise",
            },
            {
              code: "IS4152",
              name: "IS4152 Affective Computing",
            },
            {
              code: "IS4204",
              name: "IS4204 IT Governance",
            },
            {
              code: "IS4233",
              name: "IS4233 Legal Aspects of Information Technology",
            },
            {
              code: "IS4242",
              name: "IS4242 Intelligent Systems and Techniques",
            },
            {
              code: "IS4243",
              name: "IS4243 Information Systems Consulting",
            },
            {
              code: "IS5002",
              name: "IS5002 Digital Transformation",
            },
            {
              code: "IS5128",
              name: "IS5128 Digital Innovation",
            },
          ],
        },
      },
      {
        name: "Electronic Commerce",
        key: 2,
        Prereq: {
          modules: [
            {
              code: "IS2101",
              name: "IS2101 Business and Technical Communication",
            },
            {
              code: "IS2103",
              name:
                "IS2103 Enterprise Systems Server-side Design and Development",
            },
            {
              code: "IS3103",
              name: "IS3103 Information Systems Leadership and Communication",
            },
            {
              code: "IS3106",
              name:
                "IS3106 Enterprise Systems Interface Design and Development",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            {
              code: "IS3150",
              name: "IS3150 Digital Media Marketing",
            },
            {
              code: "IS4151",
              name: "IS4151 Pervasive Technology Solutions and Development",
            },
            {
              code: "IS4261",
              name: "IS4261 Designing IT-enabled Business Innovations",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "IS3240",
              name: "IS3240 Digital Platform Strategy and Architecture",
            },
            {
              code: "IS3261",
              name: "IS3261 Mobile Apps Development for Enterprise",
            },
            {
              code: "IS4228",
              name: "IS4228 Information Technologies in Financial Services",
            },
            {
              code: "IS4231",
              name: "IS4231 Information Security Management",
            },
            {
              code: "IS4242",
              name: "IS4242 Intelligent Systems and Techniques",
            },
            {
              code: "IS4243",
              name: "IS4243 Information Systems Consulting",
            },
          ],
        },
      },
      {
        name: "Financial Technology",
        key: 3,
        Prereq: {
          modules: [
            {
              code: "CS2102",
              name: "CS2102 Database Systems",
            },
            {
              code: "CS2030",
              name: "CS2030 Programming Methodology II",
            },
            {
              code: "IS2102",
              name: "IS2102 Enterprise Systems Architecture and Design",
            },
            {
              code: "IS3103",
              name: "IS3103 Information Systems Leadership and Communication",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              code: "IS4228",
              name: "IS4228 Information Technologies in Financial Services",
            },
            {
              code: "IS4302",
              name: "IS4302 Blockchain and Distributed Ledger Technologies",
            },
            {
              code: "IS4303",
              name: "IS4303 IT-Mediated Financial Solutions and Platforms",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "IS3221",
              name: "IS3221 Enterprise Resource Planning Systems",
            },
            {
              code: "IS4231",
              name: "IS4231 Information Security Management",
            },
            {
              code: "IS4233",
              name: "IS4233 Legal Aspects of Information Technology ",
            },
            {
              code: "IS4234",
              name: "IS4234 Compliance and Regulation Technology",
            },
            {
              code: "IS4242",
              name: "IS4242 Intelligent Systems and Techniques",
            },
            {
              code: "IS4301",
              name: "IS4301 Agile IT with DevOps",
            },
            {
              code: "IS5002",
              name: "IS5002 Digital Transformation",
            },
          ],
        },
      },
    ],
  },
  "Information Systems 2019": {
    cat: [
      {
        name: "Digital Innovation",
        key: 1,
        Prereq: {
          modules: [
            {
              code: "IS1103",
              name: "IS1103 Ethics in Computing",
            },
            {
              code: "IS2102",
              name: "IS2102 Enterprise Systems Architecture and Design",
            },
            {
              code: "IS3103",
              name: "IS3103 Information Systems Leadership and Communication",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              name: "IS3240 Digital Platform Strategy and Architecture",
              code: "IS3240",
            },
            {
              name: "IS3251 Principles of Technology Entrepreneurship",
              code: "IS3251",
            },
            {
              code: "IS4261",
              name: "IS4261 Designing IT-Enabled Business Innovations",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "IS3150",
              name: "IS3150 Digital Media Marketing",
            },
            {
              code: "IS3261",
              name: "IS3261 Mobile Apps Development for Enterprise",
            },
            {
              code: "IS4152",
              name: "IS4152 Affective Computing",
            },
            {
              code: "IS4204",
              name: "IS4204 IT Governance",
            },
            {
              code: "IS4233",
              name: "IS4233 Legal Aspects of Information Technology",
            },
            {
              code: "IS4242",
              name: "IS4242 Intelligent Systems and Techniques",
            },
            {
              code: "IS4243",
              name: "IS4243 Information Systems Consulting",
            },
            {
              code: "IS5002",
              name: "IS5002 Digital Transformation",
            },
            {
              code: "IS5128",
              name: "IS5128 Digital Innovation",
            },
          ],
        },
      },
      {
        name: "Electronic Commerce",
        key: 2,
        Prereq: {
          modules: [
            {
              code: "IS2101",
              name: "IS2101 Business and Technical Communication",
            },
            {
              code: "IS2103",
              name:
                "IS2103 Enterprise Systems Server-side Design and Development",
            },
            {
              code: "IS3103",
              name: "IS3103 Information Systems Leadership and Communication",
            },
            {
              code: "IS3106",
              name:
                "IS3106 Enterprise Systems Interface Design and Development",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            {
              code: "IS3150",
              name: "IS3150 Digital Media Marketing",
            },
            {
              code: "IS4151",
              name: "IS4151 Pervasive Technology Solutions and Development",
            },
            {
              code: "IS4261",
              name: "IS4261 Designing IT-enabled Business Innovations",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "IS3240",
              name: "IS3240 Digital Platform Strategy and Architecture",
            },
            {
              code: "IS3261",
              name: "IS3261 Mobile Apps Development for Enterprise",
            },
            {
              code: "IS4228",
              name: "IS4228 Information Technologies in Financial Services",
            },
            {
              code: "IS4231",
              name: "IS4231 Information Security Management",
            },
            {
              code: "IS4242",
              name: "IS4242 Intelligent Systems and Techniques",
            },
            {
              code: "IS4243",
              name: "IS4243 Information Systems Consulting",
            },
          ],
        },
      },
      {
        name: "Financial Technology",
        key: 3,
        Prereq: {
          modules: [
            {
              code: "CS2102",
              name: "CS2102 Database Systems",
            },
            {
              code: "CS2030",
              name: "CS2030 Programming Methodology II",
            },
            {
              code: "IS2102",
              name: "IS2102 Enterprise Systems Architecture and Design",
            },
            {
              code: "IS3103",
              name: "IS3103 Information Systems Leadership and Communication",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              code: "IS4228",
              name: "IS4228 Information Technologies in Financial Services",
            },
            {
              code: "IS4302",
              name: "IS4302 Blockchain and Distributed Ledger Technologies",
            },
            {
              code: "IS4303",
              name: "IS4303 IT-Mediated Financial Solutions and Platforms",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "IS3221",
              name: "IS3221 Enterprise Resource Planning Systems",
            },
            {
              code: "IS4231",
              name: "IS4231 Information Security Management",
            },
            {
              code: "IS4233",
              name: "IS4233 Legal Aspects of Information Technology ",
            },
            {
              code: "IS4234",
              name: "IS4234 Compliance and Regulation Technology",
            },
            {
              code: "IS4242",
              name: "IS4242 Intelligent Systems and Techniques",
            },
            {
              code: "IS4301",
              name: "IS4301 Agile IT with DevOps",
            },
            {
              code: "IS5002",
              name: "IS5002 Digital Transformation",
            },
          ],
        },
      },
    ],
  },
  "Information Systems 2018": {
    cat: [
      {
        name: "Digital Innovation",
        key: 1,
        Prereq: {
          modules: [
            {
              code: "IS1103",
              name: "IS1103 Ethics in Computing",
            },
            {
              code: "IS2102",
              name: "IS2102 Enterprise Systems Architecture and Design",
            },
            {
              code: "IS3103",
              name: "IS3103 Information Systems Leadership and Communication",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              name: "IS3240 Digital Platform Strategy and Architecture",
              code: "IS3240",
            },
            {
              name: "IS3251 Principles of Technology Entrepreneurship",
              code: "IS3251",
            },
            {
              code: "IS4261",
              name: "IS4261 Designing IT-Enabled Business Innovations",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "IS3150",
              name: "IS3150 Digital Media Marketing",
            },
            {
              code: "IS3261",
              name: "IS3261 Mobile Apps Development for Enterprise",
            },
            {
              code: "IS4152",
              name: "IS4152 Affective Computing",
            },
            {
              code: "IS4204",
              name: "IS4204 IT Governance",
            },
            {
              code: "IS4233",
              name: "IS4233 Legal Aspects of Information Technology",
            },
            {
              code: "IS4242",
              name: "IS4242 Intelligent Systems and Techniques",
            },
            {
              code: "IS4243",
              name: "IS4243 Information Systems Consulting",
            },
            {
              code: "IS5002",
              name: "IS5002 Digital Transformation",
            },
            {
              code: "IS5128",
              name: "IS5128 Digital Innovation",
            },
          ],
        },
      },
      {
        name: "Electronic Commerce",
        key: 2,
        Prereq: {
          modules: [
            {
              code: "IS2101",
              name: "IS2101 Business and Technical Communication",
            },
            {
              code: "IS2103",
              name:
                "IS2103 Enterprise Systems Server-side Design and Development",
            },
            {
              code: "IS3103",
              name: "IS3103 Information Systems Leadership and Communication",
            },
            {
              code: "IS3106",
              name:
                "IS3106 Enterprise Systems Interface Design and Development",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            {
              code: "IS3150",
              name: "IS3150 Digital Media Marketing",
            },
            {
              code: "IS4151",
              name: "IS4151 Pervasive Technology Solutions and Development",
            },
            {
              code: "IS4261",
              name: "IS4261 Designing IT-enabled Business Innovations",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "IS3240",
              name: "IS3240 Digital Platform Strategy and Architecture",
            },
            {
              code: "IS3261",
              name: "IS3261 Mobile Apps Development for Enterprise",
            },
            {
              code: "IS4228",
              name: "IS4228 Information Technologies in Financial Services",
            },
            {
              code: "IS4231",
              name: "IS4231 Information Security Management",
            },
            {
              code: "IS4242",
              name: "IS4242 Intelligent Systems and Techniques",
            },
            {
              code: "IS4243",
              name: "IS4243 Information Systems Consulting",
            },
          ],
        },
      },
      {
        name: "Financial Technology",
        key: 3,
        Prereq: {
          modules: [
            {
              code: "CS2102",
              name: "CS2102 Database Systems",
            },
            {
              code: "CS2030",
              name: "CS2030 Programming Methodology II",
            },
            {
              code: "IS2102",
              name: "IS2102 Enterprise Systems Architecture and Design",
            },
            {
              code: "IS3103",
              name: "IS3103 Information Systems Leadership and Communication",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              code: "IS4228",
              name: "IS4228 Information Technologies in Financial Services",
            },
            {
              code: "IS4302",
              name: "IS4302 Blockchain and Distributed Ledger Technologies",
            },
            {
              code: "IS4303",
              name: "IS4303 IT-Mediated Financial Solutions and Platforms",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "IS3221",
              name: "IS3221 Enterprise Resource Planning Systems",
            },
            {
              code: "IS4231",
              name: "IS4231 Information Security Management",
            },
            {
              code: "IS4233",
              name: "IS4233 Legal Aspects of Information Technology ",
            },
            {
              code: "IS4234",
              name: "IS4234 Compliance and Regulation Technology",
            },
            {
              code: "IS4242",
              name: "IS4242 Intelligent Systems and Techniques",
            },
            {
              code: "IS4301",
              name: "IS4301 Agile IT with DevOps",
            },
            {
              code: "IS5002",
              name: "IS5002 Digital Transformation",
            },
          ],
        },
      },
    ],
  },
  "Information Systems 2017": {
    cat: [
      {
        name: "Digital Innovation",
        key: 1,
        Prereq: {
          modules: [
            {
              code: "IS1103",
              name: "IS1103 Ethics in Computing",
            },
            {
              code: "IS2102",
              name: "IS2102 Enterprise Systems Architecture and Design",
            },
            {
              code: "IS3103",
              name: "IS3103 Information Systems Leadership and Communication",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              name: "IS3240 Digital Platform Strategy and Architecture",
              code: "IS3240",
            },
            {
              name: "IS3251 Principles of Technology Entrepreneurship",
              code: "IS3251",
            },
            {
              code: "IS4261",
              name: "IS4261 Designing IT-Enabled Business Innovations",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "IS3150",
              name: "IS3150 Digital Media Marketing",
            },
            {
              code: "IS3261",
              name: "IS3261 Mobile Apps Development for Enterprise",
            },
            {
              code: "IS4152",
              name: "IS4152 Affective Computing",
            },
            {
              code: "IS4204",
              name: "IS4204 IT Governance",
            },
            {
              code: "IS4233",
              name: "IS4233 Legal Aspects of Information Technology",
            },
            {
              code: "IS4242",
              name: "IS4242 Intelligent Systems and Techniques",
            },
            {
              code: "IS4243",
              name: "IS4243 Information Systems Consulting",
            },
            {
              code: "IS5002",
              name: "IS5002 Digital Transformation",
            },
            {
              code: "IS5128",
              name: "IS5128 Digital Innovation",
            },
          ],
        },
      },
      {
        name: "Electronic Commerce",
        key: 2,
        Prereq: {
          modules: [
            {
              code: "IS2101",
              name: "IS2101 Business and Technical Communication",
            },
            {
              code: "IS2103",
              name:
                "IS2103 Enterprise Systems Server-side Design and Development",
            },
            {
              code: "IS3103",
              name: "IS3103 Information Systems Leadership and Communication",
            },
            {
              code: "IS3106",
              name:
                "IS3106 Enterprise Systems Interface Design and Development",
            },
          ],
        },
        Primaries: {
          numRequired: 3,

          modules: [
            {
              code: "IS3150",
              name: "IS3150 Digital Media Marketing",
            },
            {
              code: "IS4151",
              name: "IS4151 Pervasive Technology Solutions and Development",
            },
            {
              code: "IS4261",
              name: "IS4261 Designing IT-enabled Business Innovations",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "IS3240",
              name: "IS3240 Digital Platform Strategy and Architecture",
            },
            {
              code: "IS3261",
              name: "IS3261 Mobile Apps Development for Enterprise",
            },
            {
              code: "IS4228",
              name: "IS4228 Information Technologies in Financial Services",
            },
            {
              code: "IS4231",
              name: "IS4231 Information Security Management",
            },
            {
              code: "IS4242",
              name: "IS4242 Intelligent Systems and Techniques",
            },
            {
              code: "IS4243",
              name: "IS4243 Information Systems Consulting",
            },
          ],
        },
      },
      {
        name: "Financial Technology",
        key: 3,
        Prereq: {
          modules: [
            {
              code: "CS2102",
              name: "CS2102 Database Systems",
            },
            {
              code: "CS2030",
              name: "CS2030 Programming Methodology II",
            },
            {
              code: "IS2102",
              name: "IS2102 Enterprise Systems Architecture and Design",
            },
            {
              code: "IS3103",
              name: "IS3103 Information Systems Leadership and Communication",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              code: "IS4228",
              name: "IS4228 Information Technologies in Financial Services",
            },
            {
              code: "IS4302",
              name: "IS4302 Blockchain and Distributed Ledger Technologies",
            },
            {
              code: "IS4303",
              name: "IS4303 IT-Mediated Financial Solutions and Platforms",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "IS3221",
              name: "IS3221 Enterprise Resource Planning Systems",
            },
            {
              code: "IS4231",
              name: "IS4231 Information Security Management",
            },
            {
              code: "IS4233",
              name: "IS4233 Legal Aspects of Information Technology ",
            },
            {
              code: "IS4234",
              name: "IS4234 Compliance and Regulation Technology",
            },
            {
              code: "IS4242",
              name: "IS4242 Intelligent Systems and Techniques",
            },
            {
              code: "IS4301",
              name: "IS4301 Agile IT with DevOps",
            },
            {
              code: "IS5002",
              name: "IS5002 Digital Transformation",
            },
          ],
        },
      },
    ],
  },
  "Computer Engineering 2020": {
    cat: [
      {
        name: "Internet of Things",
        key: 1,
        Prereq: {
          modules: [
            {
              code: "CS1010",
              name: "CS1010 Programming Methodology",
            },
            {
              code: "CG2027",
              name: "CG2027 Transistor-level Digital Circuits",
            },
            {
              code: "CG2028",
              name: "CG2028 Computer Organization",
            },
            {
              code: "ST2334",
              name: "ST2334 Probability & Statistics",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              name: "CS3237 Introduction to Internet of Things",
              code: "CS3237",
            },
            {
              code: "EE4211",
              name: "EE4211 Data Science for the Internet of Things",
            },
            {
              code: "EE4409",
              name: "EE4409 Modern Microelectronic Devices & Sensors",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "CS4222",
              name: "CS4222 Wireless Networking",
            },
            {
              code: "EE5132",
              name: "EE5132 Wireless & Sensor Networks",
            },
            {
              code: "EE4218",
              name: "EE4218 Embedded Hardware System Design",
            },
            {
              code: "CS3244",
              name: "CS3244 Machine Learning",
            },
            {
              code: "CS4276",
              name: "CS4276 IoT Security",
            },
            {
              code: "CS5272",
              name: "CS5272 Embedded Software Design",
            },
            {
              code: "EE4002D",
              name: "EE4002D Design Capstone",
            },
            {
              code: "EE4002R",
              name: "EE4002R Research Capstone",
            },
            {
              code: "CP4106",
              name: "CP4106 Computing Project",
            },
          ],
        },
      },
      {
        name: "Robotics",
        key: 2,
        Prereq: {
          modules: [],
        },
        Primaries: {
          numRequired: 1,
          modules: [
            {
              code: "ME3243",
              name: "ME3243 Robotic System Design",
            },
          ],
        },
        Electives: {
          numRequired: 4,
          modules: [
            {
              code: "BN4203",
              name: "BN4203	Robotics in Rehabilitation",
            },
            {
              code: "BN4601",
              name: "BN4601	Intelligent Medical Robotics",
            },
            {
              code: "EE4305",
              name: "EE4305	Fuzzy/Neural Systems for Intelligent Robotics",
            },
            {
              code: "EE4308",
              name: "EE4308	Autonomous Robot Systems",
            },
            {
              code: "EE4309",
              name: "EE4309	Robot Perception",
            },
            {
              code: "EE4705",
              name: "EE4705	Human-Robot Interaction",
            },
            {
              code: "ME3241",
              name: "ME3241	Microprocessor Applications",
            },
            {
              code: "ME4242",
              name: "ME4242	Soft Robotics",
            },
            {
              code: "ME4245",
              name: "ME4245	Robot Mechanics and Control",
            },
          ],
        },
      },
      {
        name: "Data Engineering",
        key: 3,
        Prereq: {
          modules: [
            {
              code: "CS1010",
              name: "CS1010 Programming Methodology",
            },
            {
              code: "ST2334",
              name: "ST2334 Probability & Statistics",
            },
          ],
        },
        Primaries: {
          numRequired: 4,
          modules: [
            {
              code: "EE3801",
              name: "EE3801 Data Engineering Principles",
            },
            {
              code: "IT2002",
              name: "IT2002 Database Technology and Management",
            },
            {
              code: "EE4802",
              name: "EE4802 Learning from Data",
            },
            {
              code: "CS4225",
              name: "CS4225 Big Data Systems for Data Science",
            },
          ],
        },
        Electives: {
          numRequired: 2,
          modules: [
            {
              code: "BT4015",
              name: "BT4015 Geospatial Analytics",
            },
            {
              code: "EE4704",
              name:
                "EE4704 Introduction to Computer Vision and Image Processing",
            },
            {
              code: "EE4704",
              name:
                "EE4704 Introduction to Computer Vision and Image Processing",
            },
            {
              code: "EE5907",
              name: "EE5907 Pattern Recognition",
            },
            {
              code: "IE4210",
              name: "IE4210 Operations Research II",
            },
            {
              code: "IE4211",
              name: "IE4211 Modelling and Analytics",
            },
            {
              code: "IE4243",
              name: "IE4243 Decision Modeling and Risk Analysis",
            },
          ],
        },
      },
    ],
  },
  "Computer Engineering 2019": {
    cat: [
      {
        name: "Internet of Things",
        key: 1,
        Prereq: {
          modules: [
            {
              code: "CS1010",
              name: "CS1010 Programming Methodology",
            },
            {
              code: "CG2027",
              name: "CG2027 Transistor-level Digital Circuits",
            },
            {
              code: "CG2028",
              name: "CG2028 Computer Organization",
            },
            {
              code: "ST2334",
              name: "ST2334 Probability & Statistics",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              name: "CS3237 Introduction to Internet of Things",
              code: "CS3237",
            },
            {
              code: "EE4211",
              name: "EE4211 Data Science for the Internet of Things",
            },
            {
              code: "EE4409",
              name: "EE4409 Modern Microelectronic Devices & Sensors",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "CS4222",
              name: "CS4222 Wireless Networking",
            },
            {
              code: "EE5132",
              name: "EE5132 Wireless & Sensor Networks",
            },
            {
              code: "EE4218",
              name: "EE4218 Embedded Hardware System Design",
            },
            {
              code: "CS3244",
              name: "CS3244 Machine Learning",
            },
            {
              code: "CS4276",
              name: "CS4276 IoT Security",
            },
            {
              code: "CS5272",
              name: "CS5272 Embedded Software Design",
            },
            {
              code: "EE4002D",
              name: "EE4002D Design Capstone",
            },
            {
              code: "EE4002R",
              name: "EE4002R Research Capstone",
            },
            {
              code: "CP4106",
              name: "CP4106 Computing Project",
            },
          ],
        },
      },
      {
        name: "Robotics",
        key: 2,
        Prereq: {
          modules: [],
        },
        Primaries: {
          numRequired: 1,
          modules: [
            {
              code: "ME3243",
              name: "ME3243 Robotic System Design",
            },
          ],
        },
        Electives: {
          numRequired: 4,
          modules: [
            {
              code: "BN4203",
              name: "BN4203	Robotics in Rehabilitation",
            },
            {
              code: "BN4601",
              name: "BN4601	Intelligent Medical Robotics",
            },
            {
              code: "EE4305",
              name: "EE4305	Fuzzy/Neural Systems for Intelligent Robotics",
            },
            {
              code: "EE4308",
              name: "EE4308	Autonomous Robot Systems",
            },
            {
              code: "EE4309",
              name: "EE4309	Robot Perception",
            },
            {
              code: "EE4705",
              name: "EE4705	Human-Robot Interaction",
            },
            {
              code: "ME3241",
              name: "ME3241	Microprocessor Applications",
            },
            {
              code: "ME4242",
              name: "ME4242	Soft Robotics",
            },
            {
              code: "ME4245",
              name: "ME4245	Robot Mechanics and Control",
            },
          ],
        },
      },
      {
        name: "Data Engineering",
        key: 3,
        Prereq: {
          modules: [
            {
              code: "CS1010",
              name: "CS1010 Programming Methodology",
            },
            {
              code: "ST2334",
              name: "ST2334 Probability & Statistics",
            },
          ],
        },
        Primaries: {
          numRequired: 4,
          modules: [
            {
              code: "EE3801",
              name: "EE3801 Data Engineering Principles",
            },
            {
              code: "IT2002",
              name: "IT2002 Database Technology and Management",
            },
            {
              code: "EE4802",
              name: "EE4802 Learning from Data",
            },
            {
              code: "CS4225",
              name: "CS4225 Big Data Systems for Data Science",
            },
          ],
        },
        Electives: {
          numRequired: 2,
          modules: [
            {
              code: "BT4015",
              name: "BT4015 Geospatial Analytics",
            },
            {
              code: "EE4704",
              name:
                "EE4704 Introduction to Computer Vision and Image Processing",
            },
            {
              code: "EE4704",
              name:
                "EE4704 Introduction to Computer Vision and Image Processing",
            },
            {
              code: "EE5907",
              name: "EE5907 Pattern Recognition",
            },
            {
              code: "IE4210",
              name: "IE4210 Operations Research II",
            },
            {
              code: "IE4211",
              name: "IE4211 Modelling and Analytics",
            },
            {
              code: "IE4243",
              name: "IE4243 Decision Modeling and Risk Analysis",
            },
          ],
        },
      },
    ],
  },
  "Computer Engineering 2018": {
    cat: [
      {
        name: "Internet of Things",
        key: 1,
        Prereq: {
          modules: [
            {
              code: "CS1010",
              name: "CS1010 Programming Methodology",
            },
            {
              code: "CG2027",
              name: "CG2027 Transistor-level Digital Circuits",
            },
            {
              code: "CG2028",
              name: "CG2028 Computer Organization",
            },
            {
              code: "ST2334",
              name: "ST2334 Probability & Statistics",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              name: "CS3237 Introduction to Internet of Things",
              code: "CS3237",
            },
            {
              code: "EE4211",
              name: "EE4211 Data Science for the Internet of Things",
            },
            {
              code: "EE4409",
              name: "EE4409 Modern Microelectronic Devices & Sensors",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "CS4222",
              name: "CS4222 Wireless Networking",
            },
            {
              code: "EE5132",
              name: "EE5132 Wireless & Sensor Networks",
            },
            {
              code: "EE4218",
              name: "EE4218 Embedded Hardware System Design",
            },
            {
              code: "CS3244",
              name: "CS3244 Machine Learning",
            },
            {
              code: "CS4276",
              name: "CS4276 IoT Security",
            },
            {
              code: "CS5272",
              name: "CS5272 Embedded Software Design",
            },
            {
              code: "EE4002D",
              name: "EE4002D Design Capstone",
            },
            {
              code: "EE4002R",
              name: "EE4002R Research Capstone",
            },
            {
              code: "CP4106",
              name: "CP4106 Computing Project",
            },
          ],
        },
      },
      {
        name: "Robotics",
        key: 2,
        Prereq: {
          modules: [],
        },
        Primaries: {
          numRequired: 1,
          modules: [
            {
              code: "ME3243",
              name: "ME3243 Robotic System Design",
            },
          ],
        },
        Electives: {
          numRequired: 4,
          modules: [
            {
              code: "BN4203",
              name: "BN4203	Robotics in Rehabilitation",
            },
            {
              code: "BN4601",
              name: "BN4601	Intelligent Medical Robotics",
            },
            {
              code: "EE4305",
              name: "EE4305	Fuzzy/Neural Systems for Intelligent Robotics",
            },
            {
              code: "EE4308",
              name: "EE4308	Autonomous Robot Systems",
            },
            {
              code: "EE4309",
              name: "EE4309	Robot Perception",
            },
            {
              code: "EE4705",
              name: "EE4705	Human-Robot Interaction",
            },
            {
              code: "ME3241",
              name: "ME3241	Microprocessor Applications",
            },
            {
              code: "ME4242",
              name: "ME4242	Soft Robotics",
            },
            {
              code: "ME4245",
              name: "ME4245	Robot Mechanics and Control",
            },
          ],
        },
      },
      {
        name: "Data Engineering",
        key: 3,
        Prereq: {
          modules: [
            {
              code: "CS1010",
              name: "CS1010 Programming Methodology",
            },
            {
              code: "ST2334",
              name: "ST2334 Probability & Statistics",
            },
          ],
        },
        Primaries: {
          numRequired: 4,
          modules: [
            {
              code: "EE3801",
              name: "EE3801 Data Engineering Principles",
            },
            {
              code: "IT2002",
              name: "IT2002 Database Technology and Management",
            },
            {
              code: "EE4802",
              name: "EE4802 Learning from Data",
            },
            {
              code: "CS4225",
              name: "CS4225 Big Data Systems for Data Science",
            },
          ],
        },
        Electives: {
          numRequired: 2,
          modules: [
            {
              code: "BT4015",
              name: "BT4015 Geospatial Analytics",
            },
            {
              code: "EE4704",
              name:
                "EE4704 Introduction to Computer Vision and Image Processing",
            },
            {
              code: "EE4704",
              name:
                "EE4704 Introduction to Computer Vision and Image Processing",
            },
            {
              code: "EE5907",
              name: "EE5907 Pattern Recognition",
            },
            {
              code: "IE4210",
              name: "IE4210 Operations Research II",
            },
            {
              code: "IE4211",
              name: "IE4211 Modelling and Analytics",
            },
            {
              code: "IE4243",
              name: "IE4243 Decision Modeling and Risk Analysis",
            },
          ],
        },
      },
    ],
  },
  "Computer Engineering 2017": {
    cat: [
      {
        name: "Internet of Things",
        key: 1,
        Prereq: {
          modules: [
            {
              code: "CS1010",
              name: "CS1010 Programming Methodology",
            },
            {
              code: "CG2027",
              name: "CG2027 Transistor-level Digital Circuits",
            },
            {
              code: "CG2028",
              name: "CG2028 Computer Organization",
            },
            {
              code: "ST2334",
              name: "ST2334 Probability & Statistics",
            },
          ],
        },
        Primaries: {
          numRequired: 3,
          modules: [
            {
              name: "CS3237 Introduction to Internet of Things",
              code: "CS3237",
            },
            {
              code: "EE4211",
              name: "EE4211 Data Science for the Internet of Things",
            },
            {
              code: "EE4409",
              name: "EE4409 Modern Microelectronic Devices & Sensors",
            },
          ],
        },
        Electives: {
          numRequired: 3,
          modules: [
            {
              code: "CS4222",
              name: "CS4222 Wireless Networking",
            },
            {
              code: "EE5132",
              name: "EE5132 Wireless & Sensor Networks",
            },
            {
              code: "EE4218",
              name: "EE4218 Embedded Hardware System Design",
            },
            {
              code: "CS3244",
              name: "CS3244 Machine Learning",
            },
            {
              code: "CS4276",
              name: "CS4276 IoT Security",
            },
            {
              code: "CS5272",
              name: "CS5272 Embedded Software Design",
            },
            {
              code: "EE4002D",
              name: "EE4002D Design Capstone",
            },
            {
              code: "EE4002R",
              name: "EE4002R Research Capstone",
            },
            {
              code: "CP4106",
              name: "CP4106 Computing Project",
            },
          ],
        },
      },
      {
        name: "Robotics",
        key: 2,
        Prereq: {
          modules: [],
        },
        Primaries: {
          numRequired: 1,
          modules: [
            {
              code: "ME3243",
              name: "ME3243 Robotic System Design",
            },
          ],
        },
        Electives: {
          numRequired: 4,
          modules: [
            {
              code: "BN4203",
              name: "BN4203	Robotics in Rehabilitation",
            },
            {
              code: "BN4601",
              name: "BN4601	Intelligent Medical Robotics",
            },
            {
              code: "EE4305",
              name: "EE4305	Fuzzy/Neural Systems for Intelligent Robotics",
            },
            {
              code: "EE4308",
              name: "EE4308	Autonomous Robot Systems",
            },
            {
              code: "EE4309",
              name: "EE4309	Robot Perception",
            },
            {
              code: "EE4705",
              name: "EE4705	Human-Robot Interaction",
            },
            {
              code: "ME3241",
              name: "ME3241	Microprocessor Applications",
            },
            {
              code: "ME4242",
              name: "ME4242	Soft Robotics",
            },
            {
              code: "ME4245",
              name: "ME4245	Robot Mechanics and Control",
            },
          ],
        },
      },
      {
        name: "Data Engineering",
        key: 3,
        Prereq: {
          modules: [
            {
              code: "CS1010",
              name: "CS1010 Programming Methodology",
            },
            {
              code: "ST2334",
              name: "ST2334 Probability & Statistics",
            },
          ],
        },
        Primaries: {
          numRequired: 4,
          modules: [
            {
              code: "EE3801",
              name: "EE3801 Data Engineering Principles",
            },
            {
              code: "IT2002",
              name: "IT2002 Database Technology and Management",
            },
            {
              code: "EE4802",
              name: "EE4802 Learning from Data",
            },
            {
              code: "CS4225",
              name: "CS4225 Big Data Systems for Data Science",
            },
          ],
        },
        Electives: {
          numRequired: 2,
          modules: [
            {
              code: "BT4015",
              name: "BT4015 Geospatial Analytics",
            },
            {
              code: "EE4704",
              name:
                "EE4704 Introduction to Computer Vision and Image Processing",
            },
            {
              code: "EE4704",
              name:
                "EE4704 Introduction to Computer Vision and Image Processing",
            },
            {
              code: "EE5907",
              name: "EE5907 Pattern Recognition",
            },
            {
              code: "IE4210",
              name: "IE4210 Operations Research II",
            },
            {
              code: "IE4211",
              name: "IE4211 Modelling and Analytics",
            },
            {
              code: "IE4243",
              name: "IE4243 Decision Modeling and Risk Analysis",
            },
          ],
        },
      },
    ],
  },
  Others: {
    cat: [],
  },
};

const temp = {
  modules: [
    {
      code: "",
      name: "",
    },
  ],
};

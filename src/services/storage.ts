import {
  Course,
  CourseModule,
  EventItem,
  EventRegistration,
  ApplicationRequest,
  ChatLead,
  ContactMessage,
  ClassSchedule,
  PaymentTransaction,
  StudentPaymentRecord,
  StudentProfile,
  Enrollment,
  Assignment,
  Announcement,
  NotificationItem,
  AdminAccount,
} from '../types';
import { assetPath } from '../utils/assetPath';

// STORAGE KEYS
const STORAGE_PREFIX = 'ds_vlsi_';
const KEYS = {
  COURSES: `${STORAGE_PREFIX}courses`,
  MODULES: `${STORAGE_PREFIX}modules`,
  EVENTS: `${STORAGE_PREFIX}events`,
  EVENT_REGS: `${STORAGE_PREFIX}event_regs`,
  APPLICATIONS: `${STORAGE_PREFIX}applications`,
  CHAT_LEADS: `${STORAGE_PREFIX}chat_leads`,
  CONTACT_MSGS: `${STORAGE_PREFIX}contact_msgs`,
  SCHEDULES: `${STORAGE_PREFIX}schedules`,
  PAYMENTS: `${STORAGE_PREFIX}payments`,
  PAYMENT_RECORDS: `${STORAGE_PREFIX}payment_records`,
  STUDENTS: `${STORAGE_PREFIX}students`,
  ENROLLMENTS: `${STORAGE_PREFIX}enrollments`,
  ASSIGNMENTS: `${STORAGE_PREFIX}assignments`,
  ANNOUNCEMENTS: `${STORAGE_PREFIX}announcements`,
  NOTIFICATIONS: `${STORAGE_PREFIX}notifications`,
  ADMINS: `${STORAGE_PREFIX}admins`,
  INITIALIZED: `${STORAGE_PREFIX}initialized_v4`,
};

// INITIAL SEED DATA
const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'RTL Design with Verilog HDL: From Concept to Synthesizable RTL',
    slug: 'rtl-design-with-verilog-hdl',
    shortDescription: 'Learn RTL Design with real industry examples: Verilog fundamentals, combinational & sequential logic, FSM design, coding guidelines, and APB/FIFO/Arbiter implementation.',
    fullDescription: 'Comprehensive, industry-grounded program designed to transform engineers into job-ready RTL Design Engineers. Master synthesizable subsets, 3-block FSM design with registered outputs, parameterized & reusable RTL modules, and synthesis-friendly coding styles without inferred latches.',
    thumbnail: assetPath('/images/courses/course-rtl-verilog.jpg'),
    previewVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'RTL Design',
    level: 'Comprehensive',
    duration: '16 Weeks (Weekend / Weekday)',
    mode: 'Hybrid',
    fee: 45000,
    trainer: 'Bhavani Bhaskar',
    batch: 'Batch #28 (Starting Next Monday)',
    startDate: '2026-11-02',
    applyEnabled: true,
    featuredOnHome: true,
    popupEnabled: true,
    popupPriority: 1,
    popupActiveFrom: '2026-10-01',
    popupActiveUntil: '2026-11-30',
    published: true,
    modulesCount: 6,
    lessonsCount: 38,
    skills: ['Verilog RTL Fundamentals', 'Combinational & Sequential Logic', 'FSM Design (Moore/Mealy)', 'Coding Guidelines (Industry Style)', 'Parameterized & Reusable RTL', 'Design Examples (APB, FIFO, Arbiter)'],
    toolsUsed: ['QuestaSim', 'Synopsys Design Compiler (Basics)', 'Verilator', 'GTKWave', 'SpyGlass Lint'],
    syllabusOverview: [
      'Verilog RTL Fundamentals & Language Constructs',
      'Combinational & Sequential Hardware Modeling',
      'FSM Design: Safe States, Glitch-Free Registered Outputs',
      'Industry RTL Coding Guidelines & Synthesizability Rules',
      'Parameterized & Reusable Hardware Architectures',
      'Complete Projects: APB Slave, Synchronous FIFO, Round-Robin Arbiter'
    ]
  },
  {
    id: 'course-2',
    title: 'Design Verification with SystemVerilog: Testbench to Full SoC Verification',
    slug: 'design-verification-systemverilog-uvm',
    shortDescription: 'Learn industry grade verification methodologies: Testbench development, Constrained Random Verification, Functional Coverage, Assertions (SVA), and UVM architecture.',
    fullDescription: 'A thorough verification program preparing you for Design Verification (DV) roles in top semiconductor product firms. Learn OOP principles, interfaces, virtual interfaces, randomized test generation, assertions (SVA), and construct complete UVM testbenches with UVM agents, scoreboards, sequencers, and virtual sequences.',
    thumbnail: assetPath('/images/courses/course-verification-sv-uvm.jpg'),
    previewVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Verification',
    level: 'Advanced',
    duration: '14 Weeks',
    mode: 'Online',
    fee: 48000,
    trainer: 'Komali',
    batch: 'Batch #19 (Admissions Open)',
    startDate: '2026-11-10',
    applyEnabled: true,
    featuredOnHome: true,
    popupEnabled: false,
    popupPriority: 2,
    published: true,
    modulesCount: 5,
    lessonsCount: 32,
    skills: ['SystemVerilog Language Basics', 'Testbench Development', 'Constrained Random Verification', 'Functional Coverage', 'Assertions (SVA)', 'UVM Methodology (Scoreboard, Monitor, Driver)'],
    toolsUsed: ['Cadence Xcelium / QuestaSim', 'Verdi / DVT Eclipse', 'Verissimo Linter'],
    syllabusOverview: [
      'SystemVerilog Language Basics & Testbench Architecture',
      'Constrained Random Verification & Random Distributions',
      'SystemVerilog Assertions (Immediate & Concurrent SVA)',
      'Functional Coverage: Covergroups, Coverpoints & Cross Coverage',
      'UVM (Universal Verification Methodology) Architecture',
      'Scoreboard, Monitor, Driver, Sequencer & Verdi Waveform Debug'
    ]
  },
  {
    id: 'course-3',
    title: 'SystemVerilog Course: Complete Guide from Basics to Advanced',
    slug: 'systemverilog-complete-guide-basics-advanced',
    shortDescription: 'Master SystemVerilog for design and verification: Data types, Arrays, Structures, Enums, Procedural blocks, Interfaces, Packages, OOP, Constraints, and Mailboxes.',
    fullDescription: 'Master SystemVerilog for both RTL design and advanced testbench construction. Learn new 2-state and 4-state data types, dynamic arrays, associative arrays, queues, structs, enums, interfaces, packages, object-oriented programming (OOP), virtual interfaces, mailboxes, and semaphore synchronization.',
    thumbnail: assetPath('/images/courses/course-systemverilog.jpg'),
    category: 'Verification',
    level: 'Intermediate',
    duration: '10 Weeks',
    mode: 'Online',
    fee: 38000,
    trainer: 'Komali',
    batch: 'Batch #20 (Evening Special)',
    startDate: '2026-11-12',
    applyEnabled: true,
    featuredOnHome: true,
    popupEnabled: false,
    published: true,
    modulesCount: 5,
    lessonsCount: 30,
    skills: ['SystemVerilog vs Verilog', 'Data types, Arrays, Structs, Enums', 'Procedural Blocks & Interfaces', 'Classes and OOP Concepts', 'Constraints & Randomization', 'Virtual Interfaces & Mailboxes'],
    toolsUsed: ['QuestaSim', 'Synopsys VCS', 'GTKWave'],
    syllabusOverview: [
      'SystemVerilog vs Classic Verilog Evolution',
      'Data types: logic, bit, byte, structs, enums, queues & dynamic arrays',
      'Procedural Blocks (always_comb, always_ff, always_latch), Packages & Interfaces',
      'Object Oriented Programming: Classes, Inheritance, Polymorphism',
      'Randomization, Constraints (inside, dist, solve-before) & Pre/Post Randomize',
      'Inter-process Synchronization: Mailboxes, Semaphores & Events'
    ]
  },
  {
    id: 'course-4',
    title: 'Lint, CDC & RDC Quality Checks: Ensure Clean and Reliable RTL',
    slug: 'lint-cdc-rdc-quality-checks-spyglass',
    shortDescription: 'Industry standard static verification flow: Coding style quality, Clock Domain Crossing checks, Reset Domain Crossing checks, waiver strategy, and SpyGlass sign-off.',
    fullDescription: 'Static timing and structural verification signoff is essential for zero-defect silicon. Learn SpyGlass linting rules, detect and eliminate multi-clock domain metastability with CDC synchronizers, verify asynchronous reset deassertion with RDC checks, write constraints, and establish waiver strategies.',
    thumbnail: assetPath('/images/courses/course-lint-cdc-rdc.jpg'),
    category: 'RTL Design',
    level: 'Advanced',
    duration: '8 Weeks',
    mode: 'Hybrid',
    fee: 35000,
    trainer: 'Bhavani Bhaskar',
    batch: 'Batch #15 (Weekend Intensive)',
    startDate: '2026-11-18',
    applyEnabled: true,
    featuredOnHome: true,
    popupEnabled: false,
    published: true,
    modulesCount: 4,
    lessonsCount: 24,
    skills: ['Lint (SpyGlass Coding Style)', 'CDC (Clock Domain Crossing Checks)', 'RDC (Reset Domain Crossing Checks)', 'Common Violations & Fixes', 'Waiver Strategy & Pragmas', 'SpyGlass CDC/RDC Sign-off Flow'],
    toolsUsed: ['SpyGlass Lint / CDC / RDC', 'Questa CDC', 'Verilator'],
    syllabusOverview: [
      'RTL Linting: Coding Style, Synthesizability & Silicon Quality',
      'Clock Domain Crossing (CDC): Metastability, MTBF, 2-FF Synchronizers',
      'Reset Domain Crossing (RDC): Glitches, Reset Trees & Deassertion Sync',
      'Common CDC/RDC Violations, Data-Path Convergence & Fixes',
      'Constraints, Pragmas, and Intentional Waiver Strategy',
      'Real Project Case Studies and Industrial Sign-off Flow'
    ]
  },
  {
    id: 'course-5',
    title: 'I2C, SPI & User Protocol Course: Design, Verify & Integrate Serial Protocols',
    slug: 'i2c-spi-user-protocol-course',
    shortDescription: 'From standard serial buses to custom user protocols: Master & Slave RTL design, SystemVerilog verification, protocol checkers, waveform analysis, and protocol FSMs.',
    fullDescription: 'Master serial protocol design and verification from the ground up. Implement I2C Master and Slave controllers with open-drain SDA/SCL lines and ACK/NACK signaling. Design high-speed 4-wire SPI controllers with configurable CPOL/CPHA modes. Architect your own custom user-defined handshake protocol with REQ/ACK signaling.',
    thumbnail: assetPath('/images/courses/course-protocols-i2c-spi.jpg'),
    category: 'Protocols',
    level: 'Intermediate',
    duration: '8 Weeks',
    mode: 'Online',
    fee: 28000,
    trainer: 'Afroz Khan',
    batch: 'Batch #12 (Weekend Special)',
    startDate: '2026-11-22',
    applyEnabled: true,
    featuredOnHome: true,
    popupEnabled: false,
    published: true,
    modulesCount: 4,
    lessonsCount: 22,
    skills: ['I2C Protocol (Signals & Timing)', 'SPI Protocol (CPOL/CPHA Modes)', 'Master & Slave RTL Design', 'SystemVerilog Protocol Checkers', 'I2C/SPI Waveform Debug', 'Custom REQ/ACK Protocol Design'],
    toolsUsed: ['QuestaSim', 'GTKWave', 'Protocol Sniffers'],
    syllabusOverview: [
      'I2C Protocol Overview: Start/Stop Conditions, Addressing, ACK/NACK',
      'SPI Protocol: 4-Wire Interface, Clock Polarity (CPOL) & Phase (CPHA)',
      'Designing I2C & SPI Master and Slave Controller RTL in Verilog',
      'Writing SystemVerilog Protocol Checkers and Self-Checking Testbenches',
      'I2C / SPI Waveform Analysis and Debugging Protocol Glitches',
      'User-Defined Protocol Architecture: Handshake FSM, REQ/ACK & Integration'
    ]
  },
  {
    id: 'course-6',
    title: 'Digital Electronics Course for Beginners: Build Strong Fundamentals for VLSI',
    slug: 'digital-electronics-course-beginners',
    shortDescription: 'Build strong fundamentals for VLSI: Number systems, logic gates, Boolean algebra, combinational & sequential circuits, flip-flops, FSMs, and clock concepts.',
    fullDescription: 'The bedrock of hardware engineering. Start from basic transistor switches and logic gates, derive truth tables, simplify circuits using Boolean algebra and Karnaugh maps, master flip-flops and registers, calculate propagation delay and setup/hold timing margins, and design glitch-free Finite State Machines (FSM).',
    thumbnail: assetPath('/images/courses/course-digital-electronics.jpg'),
    category: 'RTL Design',
    level: 'Beginner',
    duration: '8 Weeks',
    mode: 'Hybrid',
    fee: 22000,
    trainer: 'Bhavani Bhaskar',
    batch: 'Foundation Batch #06',
    startDate: '2026-11-25',
    applyEnabled: true,
    featuredOnHome: true,
    popupEnabled: false,
    published: true,
    modulesCount: 4,
    lessonsCount: 20,
    skills: ['Number Systems & Binary Math', 'Logic Gates & Boolean Algebra', 'Combinational Circuits (Mux, Adders)', 'Sequential Circuits (FFs, Latches)', 'Finite State Machines (FSM)', 'Timing & Clock Concepts'],
    toolsUsed: ['Logisim', 'EDA Playground', 'QuestaSim (Basics)'],
    syllabusOverview: [
      'Number Systems: Binary, Hexadecimal, Two’s Complement & Overflow',
      'Logic Gates, CMOS Inverters, and Boolean Algebra Theorems',
      'Combinational Circuits: Adders, Decoders, Multiplexers & De-Mux',
      'Sequential Logic: Latches vs Flip-Flops, Setup/Hold Times & Propagation Delay',
      'Registers, Synchronous Counters & Shift Registers',
      'Finite State Machine (FSM) Design from State Diagrams to Silicon Gates'
    ]
  }
];

// SAMPLE MODULES & LESSONS (for Course 1)
const INITIAL_MODULES: CourseModule[] = [
  {
    id: 'mod-1',
    courseId: 'course-1',
    title: 'Module 1: Digital Design Foundations & Timing Fundamentals',
    description: 'Setup, hold, propagation delay, and clock frequency limits in silicon.',
    sortOrder: 1,
    lessons: [
      {
        id: 'les-101',
        moduleId: 'mod-1',
        title: 'Introduction: From Silicon Physics to Digital Abstraction',
        type: 'video',
        durationMinutes: 25,
        isPublicPreview: true,
        contentUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        textContent: 'In this session, we uncover how CMOS transistors form logic gates and how propagation delays create the foundation of digital hardware modeling.',
        sortOrder: 1
      },
      {
        id: 'les-102',
        moduleId: 'mod-1',
        title: 'Setup & Hold Time Slack: Mathematical Derivations',
        type: 'text',
        durationMinutes: 30,
        isPublicPreview: true,
        textContent: `### Setup Time & Hold Time Equation Signoff

In digital synchronous hardware design, flip-flops require data to remain stable around the active clock edge.

**Setup Constraint:**
T_clk >= T_cq(max) + T_comb(max) + T_setup - T_skew

**Hold Constraint:**
T_cq(min) + T_comb(min) >= T_hold + T_skew

Notice that hold time does NOT depend on clock frequency! Even if you reduce clock speed to 1 Hz, hold time violations will still brick your chip.`,
        codeSnippet: `// Synchronous Register with Active-Low Reset
module dff_sync_rst (
    input  wire clk,
    input  wire rst_n,
    input  wire d,
    output reg  q
);

always @(posedge clk) begin
    if (!rst_n)
        q <= 1'b0;
    else
        q <= d;
end

endmodule`,
        sortOrder: 2
      },
      {
        id: 'les-103',
        moduleId: 'mod-1',
        title: 'Verilog Synthesizability Guidelines & Blocking vs Non-Blocking',
        type: 'code',
        durationMinutes: 35,
        isPublicPreview: false,
        textContent: 'Golden rule of synthesizable Verilog: Use non-blocking (<=) for sequential logic, and blocking (=) for combinational logic.',
        codeSnippet: `// Synthesis Golden Example: Pipelined Accumulator
module pipelined_acc #(
    parameter DATA_W = 16
)(
    input  wire               clk,
    input  wire               rst_n,
    input  wire               valid_in,
    input  wire [DATA_W-1:0]  data_in,
    output reg  [DATA_W-1:0]  acc_out,
    output reg                valid_out
);

    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            acc_out   <= '0;
            valid_out <= 1'b0;
        end else if (valid_in) begin
            acc_out   <= acc_out + data_in;
            valid_out <= 1'b1;
        end else begin
            valid_out <= 1'b0;
        end
    end

endmodule`,
        sortOrder: 3
      }
    ]
  },
  {
    id: 'mod-2',
    courseId: 'course-1',
    title: 'Module 2: Advanced Finite State Machines (FSM)',
    description: 'Moore, Mealy, Safe state recovery, and One-Hot encoding for high performance.',
    sortOrder: 2,
    lessons: [
      {
        id: 'les-201',
        moduleId: 'mod-2',
        title: '3-Always-Block FSM Architecture Best Practices',
        type: 'video',
        durationMinutes: 40,
        isPublicPreview: false,
        contentUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        textContent: 'Learn why industry RTL designers enforce 3-always blocks: State Register, Next-State Logic, and Registered Output Logic to avoid glitches.',
        sortOrder: 1
      },
      {
        id: 'les-202',
        moduleId: 'mod-2',
        title: 'Lab: AXI Handshake Controller FSM Design',
        type: 'code',
        durationMinutes: 45,
        isPublicPreview: false,
        textContent: 'Implement a synthesizable AXI4 burst tracker FSM with registered outputs to prevent combinatorial backpressure loops.',
        codeSnippet: `// 3-Always Block AXI4 Valid-Ready Controller
typedef enum logic [1:0] {
    STATE_IDLE   = 2'b00,
    STATE_BURST  = 2'b01,
    STATE_RESP   = 2'b10
} state_t;

state_t current_state, next_state;

// Block 1: State Register
always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n) current_state <= STATE_IDLE;
    else        current_state <= next_state;
end`,
        sortOrder: 2
      }
    ]
  },
  {
    id: 'mod-3',
    courseId: 'course-1',
    title: 'Module 3: Synchronous & Asynchronous FIFO Architecture',
    description: 'Gray codes, 2-FF synchronizers, pointer math, and full/empty condition signoff.',
    sortOrder: 3,
    lessons: [
      {
        id: 'les-301',
        moduleId: 'mod-3',
        title: 'Dual-Clock Asynchronous FIFO Microarchitecture Deep-Dive',
        type: 'video',
        durationMinutes: 50,
        isPublicPreview: false,
        contentUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        textContent: 'Step-by-step breakdown of Clifford Cummings classic dual-clock FIFO architecture.',
        sortOrder: 1
      },
      {
        id: 'les-302',
        moduleId: 'mod-3',
        title: 'Specification Sheet: Dual-Clock FIFO Project Specs',
        type: 'pdf',
        durationMinutes: 20,
        isPublicPreview: false,
        textContent: 'Complete industrial spec sheet defining write domain clk_w (250 MHz) and read domain clk_r (100 MHz) with parameterized depth.',
        sortOrder: 2
      }
    ]
  }
];

// INITIAL EVENTS
const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'event-1',
    title: 'Hands-on Masterclass: Clock Domain Crossing (CDC) Structural Analysis',
    slug: 'cdc-structural-analysis-masterclass',
    description: 'Learn how to detect and eliminate multi-clock domain metastability bugs using 2-FF synchronizers and SpyGlass CDC methodology.',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    speaker: 'Bhavani Bhaskar',
    speakerRole: 'Principal RTL Architect & Founder',
    date: '2026-10-25',
    time: '10:00 AM - 1:00 PM IST',
    mode: 'Online',
    locationOrUrl: 'Google Meet / Live Interactive Stream',
    registrationDeadline: '2026-10-24',
    applyEnabled: true,
    popupEnabled: true,
    popupPriority: 1,
    published: true,
    maxAttendees: 200,
    registeredCount: 142,
    tags: ['CDC', 'Metastability', 'RTL Signoff', 'Live Demo']
  },
  {
    id: 'event-2',
    title: 'Webinar: Cracking Top Semiconductor RTL & DV Product Interviews',
    slug: 'cracking-rtl-dv-interviews-webinar',
    description: 'Insider blueprint on how tier-1 semiconductor companies evaluate RTL coding, FSM architecture, SystemVerilog OOP, and setup/hold timing problems.',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    speaker: 'Komali & Afroz Khan',
    speakerRole: 'Senior Verification Specialist & STA Lead',
    date: '2026-11-05',
    time: '6:30 PM - 8:30 PM IST',
    mode: 'Online',
    locationOrUrl: 'Live Zoom Session',
    registrationDeadline: '2026-11-04',
    applyEnabled: true,
    popupEnabled: false,
    published: true,
    maxAttendees: 300,
    registeredCount: 218,
    tags: ['Interview Prep', 'Career', 'Semiconductor Hiring']
  },
  {
    id: 'event-3',
    title: 'Offline Workshop: AXI4 Protocol Packet Decoding & Waveform Debug',
    slug: 'offline-axi4-protocol-workshop',
    description: 'An intensive 1-day offline boot-camp in Hyderabad. Bring your laptops, simulate AXI4 read/write channels, and debug outstanding transactions.',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    speaker: 'Afroz Khan',
    speakerRole: 'SoC Interconnect Expert',
    date: '2026-11-14',
    time: '9:30 AM - 5:00 PM IST',
    mode: 'Offline',
    locationOrUrl: 'Design Silicon VLSI Center, HITEC City, Hyderabad',
    registrationDeadline: '2026-11-12',
    applyEnabled: true,
    popupEnabled: false,
    published: true,
    maxAttendees: 50,
    registeredCount: 38,
    tags: ['Offline Lab', 'AXI4', 'Hyderabad', 'Hands-on']
  }
];

// INITIAL EVENT REGISTRATIONS
const INITIAL_EVENT_REGS: EventRegistration[] = [
  {
    id: 'ev-reg-1',
    eventId: 'event-1',
    eventTitle: 'Hands-on Masterclass: Clock Domain Crossing (CDC) Structural Analysis',
    name: 'Suresh Reddy',
    email: 'suresh.reddy@gmail.com',
    phone: '+91 98765 43210',
    collegeOrCompany: 'JNTU Hyderabad (2025)',
    yearOfPassout: '2025',
    registeredAt: '2026-10-10 14:20'
  },
  {
    id: 'ev-reg-2',
    eventId: 'event-1',
    eventTitle: 'Hands-on Masterclass: Clock Domain Crossing (CDC) Structural Analysis',
    name: 'Pooja Iyer',
    email: 'pooja.iyer@techcorp.in',
    phone: '+91 91234 56789',
    collegeOrCompany: 'Semiconductor Solutions Ltd',
    yearOfPassout: '2023',
    registeredAt: '2026-10-11 09:15'
  }
];

// INITIAL REGISTRATION REQUESTS (Applications)
const INITIAL_APPLICATIONS: ApplicationRequest[] = [
  {
    id: 'req-1',
    fullName: 'Rahul Verma',
    email: 'rahul.verma@student.com',
    phone: '+91 98765 11223',
    courseId: 'course-1',
    courseTitle: 'Advanced RTL Design & Microarchitecture with Verilog',
    yearOfPassout: '2025',
    education: 'B.Tech ECE',
    experienceLevel: 'Fresher',
    preferredMode: 'Hybrid',
    preferredBatch: 'Batch #28 (Weekend)',
    message: 'Looking for in-depth RTL microarchitecture training to break into VLSI design.',
    createdAt: '2026-10-12 11:30',
    status: 'Approved',
    assignedStaff: 'Bhavani Bhaskar',
    internalNotes: 'Candidate has strong basics in Boolean algebra. Approved for enrollment.'
  },
  {
    id: 'req-2',
    fullName: 'Ananya Sharma',
    email: 'ananya.s@gmail.com',
    phone: '+91 98220 33445',
    courseId: 'course-2',
    courseTitle: 'SystemVerilog & UVM Verification Mastery',
    yearOfPassout: '2024',
    education: 'M.Tech VLSI Design',
    experienceLevel: '1-2 Years',
    preferredMode: 'Online',
    preferredBatch: 'Batch #19 (Admissions Open)',
    message: 'Currently working in embedded systems, eager to transition into UVM verification.',
    createdAt: '2026-10-12 16:45',
    status: 'New',
    assignedStaff: 'Admissions Desk',
    internalNotes: 'Needs callback tomorrow morning regarding syllabus and lab access.'
  },
  {
    id: 'req-3',
    fullName: 'Karthik Raja',
    email: 'karthik.raja@yahoo.com',
    phone: '+91 99440 88776',
    courseId: 'course-3',
    courseTitle: 'SoC Interconnects & Protocols: AXI4, APB4, AHB5 & PCIe Basics',
    yearOfPassout: '2023',
    education: 'B.E. Electronics & Communication',
    experienceLevel: '1-2 Years',
    preferredMode: 'Online',
    preferredBatch: 'Weekend Special Batch #12',
    message: 'Want to focus entirely on AMBA protocols and bus verification.',
    createdAt: '2026-10-12 18:10',
    status: 'New',
    assignedStaff: 'Admissions Desk'
  }
];

// INITIAL CHAT LEADS
const INITIAL_CHAT_LEADS: ChatLead[] = [
  {
    id: 'lead-1',
    name: 'Venkatesh Rao',
    yearOfPassout: '2025',
    experienceLevel: 'Fresher',
    courseInterest: 'Advanced RTL Design & Microarchitecture with Verilog',
    phone: '+91 98480 12345',
    message: 'Can I attend online while attending college final year?',
    createdAt: '2026-10-12 17:35',
    status: 'New',
    unread: true,
    notes: 'Inquired about weekend class timings and recorded lecture support.',
    conversation: [
      { sender: 'bot', text: 'Hello! Welcome to Design Silicon VLSI. What is your full name?', time: '17:33' },
      { sender: 'user', text: 'Venkatesh Rao', time: '17:33' },
      { sender: 'bot', text: 'Thanks Venkatesh! What is your graduation / passout year?', time: '17:34' },
      { sender: 'user', text: '2025', time: '17:34' },
      { sender: 'bot', text: 'Are you a fresher or do you have industry experience?', time: '17:34' },
      { sender: 'user', text: 'Fresher', time: '17:34' },
      { sender: 'bot', text: 'Which VLSI domain are you most interested in?', time: '17:34' },
      { sender: 'user', text: 'Advanced RTL Design & Microarchitecture with Verilog', time: '17:35' },
      { sender: 'bot', text: 'Please share your Phone or WhatsApp number so our technical mentor can share the syllabus & batch timings.', time: '17:35' },
      { sender: 'user', text: '+91 98480 12345', time: '17:35' },
      { sender: 'bot', text: 'Do you have any specific query or message for our team?', time: '17:35' },
      { sender: 'user', text: 'Can I attend online while attending college final year?', time: '17:35' },
      { sender: 'bot', text: 'Thank you! Our Design Silicon VLSI team will contact you shortly.', time: '17:35' }
    ]
  },
  {
    id: 'lead-2',
    name: 'Meghana K',
    yearOfPassout: '2024',
    experienceLevel: 'Fresher',
    courseInterest: 'SystemVerilog & UVM Verification Mastery',
    phone: '+91 97000 67890',
    message: 'Do you provide EDA tool licenses for home practice?',
    createdAt: '2026-10-12 15:20',
    status: 'Contacted',
    unread: false,
    notes: 'Explained VPN cloud lab access for QuestaSim and testbench simulations.',
    conversation: [
      { sender: 'bot', text: 'Hello! Welcome to Design Silicon VLSI. What is your full name?', time: '15:18' },
      { sender: 'user', text: 'Meghana K', time: '15:18' },
      { sender: 'bot', text: 'Thanks Meghana K! What is your graduation / passout year?', time: '15:19' },
      { sender: 'user', text: '2024', time: '15:19' },
      { sender: 'bot', text: 'Are you a fresher or do you have industry experience?', time: '15:19' },
      { sender: 'user', text: 'Fresher', time: '15:19' },
      { sender: 'bot', text: 'Which VLSI domain are you most interested in?', time: '15:19' },
      { sender: 'user', text: 'SystemVerilog & UVM Verification Mastery', time: '15:20' },
      { sender: 'bot', text: 'Please share your Phone or WhatsApp number.', time: '15:20' },
      { sender: 'user', text: '+91 97000 67890', time: '15:20' },
      { sender: 'bot', text: 'Do you have any specific query or message for our team?', time: '15:20' },
      { sender: 'user', text: 'Do you provide EDA tool licenses for home practice?', time: '15:20' }
    ]
  }
];

// INITIAL CONTACT MESSAGES
const INITIAL_CONTACT_MSGS: ContactMessage[] = [
  {
    id: 'msg-1',
    fullName: 'Pravin Kumar',
    email: 'pravin.k@ece.edu',
    phone: '+91 94444 11222',
    subject: 'Corporate Training Inquiry for VLSI Team',
    message: 'We have a team of 8 design engineers in Bengaluru looking for advanced AXI4 and CDC signoff upskilling.',
    createdAt: '2026-10-12 10:15',
    status: 'New',
    unread: true,
    internalNotes: 'Corporate lead. Schedule intro call with Founder Hari Krishna.'
  }
];

// INITIAL SCHEDULES
const INITIAL_SCHEDULES: ClassSchedule[] = [
  {
    id: 'sch-1',
    courseId: 'course-1',
    courseTitle: 'Advanced RTL Design & Microarchitecture with Verilog',
    batch: 'Batch #28 (Weekend)',
    topic: 'Dual-Clock Asynchronous FIFO Design & Gray Code Math',
    trainer: 'Bhavani Bhaskar',
    date: '2026-10-17',
    startTime: '10:00 AM',
    endTime: '01:00 PM',
    meetingLink: 'https://meet.google.com/dsv-rtl-live',
    status: 'Scheduled',
    notes: 'Keep QuestaSim installed and simulator terminal ready.'
  },
  {
    id: 'sch-2',
    courseId: 'course-1',
    courseTitle: 'Advanced RTL Design & Microarchitecture with Verilog',
    batch: 'Batch #28 (Weekend)',
    topic: 'Live Lab: Resolving CDC Violations with SpyGlass',
    trainer: 'Bhavani Bhaskar',
    date: '2026-10-18',
    startTime: '10:00 AM',
    endTime: '01:00 PM',
    meetingLink: 'https://meet.google.com/dsv-rtl-live',
    status: 'Scheduled'
  },
  {
    id: 'sch-3',
    courseId: 'course-2',
    courseTitle: 'SystemVerilog & UVM Verification Mastery',
    batch: 'Batch #19',
    topic: 'Building UVM Scoreboards & TLM Analysis Ports',
    trainer: 'Komali',
    date: '2026-10-17',
    startTime: '02:30 PM',
    endTime: '05:30 PM',
    meetingLink: 'https://meet.google.com/dsv-uvm-live',
    status: 'Scheduled'
  }
];

// INITIAL STUDENTS
const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'std-1',
    userId: 'user-student-1',
    name: 'Rahul Verma',
    email: 'rahul.verma@student.com',
    phone: '+91 98765 11223',
    education: 'B.Tech ECE (2025)',
    yearOfPassout: '2025',
    experienceLevel: 'Fresher',
    city: 'Hyderabad',
    batchId: 'Batch #28',
    enrolledCourseIds: ['course-1'],
    joinedDate: '2026-10-01',
    status: 'Active'
  }
];

// INITIAL ENROLLMENTS
const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: 'enr-1',
    studentId: 'std-1',
    courseId: 'course-1',
    enrolledAt: '2026-10-01',
    progressPercent: 42,
    completedLessonIds: ['les-101', 'les-102'],
    status: 'Active',
    certificateIssued: false
  }
];

// INITIAL PAYMENTS
const INITIAL_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'pay-tx-1',
    studentId: 'std-1',
    studentName: 'Rahul Verma',
    courseId: 'course-1',
    courseTitle: 'Advanced RTL Design & Microarchitecture with Verilog',
    amount: 25000,
    paymentDate: '2026-10-01',
    paymentMethod: 'UPI',
    referenceId: 'UPI-DSV-8839201',
    installmentNo: 1,
    totalInstallments: 2,
    receiptNumber: 'RCP-2026-1042',
    notes: 'First installment paid on admission.'
  }
];

const INITIAL_PAYMENT_RECORDS: StudentPaymentRecord[] = [
  {
    studentId: 'std-1',
    courseId: 'course-1',
    totalFee: 45000,
    totalPaid: 25000,
    pendingAmount: 20000,
    status: 'Partially Paid',
    nextDueDate: '2026-11-05',
    transactions: INITIAL_PAYMENTS
  }
];

// INITIAL ASSIGNMENTS
const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    courseId: 'course-1',
    courseTitle: 'Advanced RTL Design & Microarchitecture with Verilog',
    title: 'Design a Parameterized Synchronous FIFO in Verilog',
    description: 'Implement a depth-16, width-32 FIFO with almost_full and almost_empty flags. Write a clean self-checking testbench.',
    deadline: '2026-10-22',
    resourcesUrl: 'https://designsiliconvlsi.com/specs/fifo_spec_v1.pdf',
    maxMarks: 100,
    submissions: [
      {
        studentId: 'std-1',
        studentName: 'Rahul Verma',
        submittedAt: '2026-10-10 20:15',
        fileUrl: '#',
        fileName: 'rahul_sync_fifo_rtl.v',
        marksObtained: 94,
        feedback: 'Excellent synthesis results. Handshake flags are well registered.',
        status: 'Graded'
      }
    ]
  },
  {
    id: 'asg-2',
    courseId: 'course-1',
    courseTitle: 'Advanced RTL Design & Microarchitecture with Verilog',
    title: 'Dual-Port SRAM Controller with Round-Robin Arbiter',
    description: 'Create a 4-requester round-robin arbiter with grant outputs registered to avoid combinational timing paths.',
    deadline: '2026-10-28',
    maxMarks: 100,
    submissions: []
  }
];

// INITIAL ANNOUNCEMENTS
const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'New EDA Cloud Lab Infrastructure Activated',
    content: 'All enrolled students can now launch simulator sessions via our high-speed remote cloud workstation with Synopsys and Questa tools pre-configured.',
    targetAudience: 'Students',
    publishedDate: '2026-10-10',
    priority: 'High',
    active: true
  },
  {
    id: 'ann-2',
    title: 'Admissions Open for Winter RTL & UVM Cohorts',
    content: 'Special early-bird orientation slots open for November batches. Contact the admissions desk for curriculum walkthrough.',
    targetAudience: 'All',
    publishedDate: '2026-10-08',
    priority: 'Normal',
    active: true
  }
];

// INITIAL NOTIFICATIONS
const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    recipientRole: 'admin',
    title: 'New Application Request Received',
    message: 'Ananya Sharma applied for SystemVerilog & UVM Verification Mastery',
    type: 'request',
    linkTarget: 'requests',
    createdAt: '2026-10-12 16:45',
    read: false
  },
  {
    id: 'notif-2',
    recipientRole: 'admin',
    title: 'New Lead Captured in Chat',
    message: 'Venkatesh Rao inquired about RTL weekend timings',
    type: 'lead',
    linkTarget: 'chat-leads',
    createdAt: '2026-10-12 17:35',
    read: false
  },
  {
    id: 'notif-3',
    userId: 'user-student-1',
    recipientRole: 'student',
    title: 'Assignment #1 Graded',
    message: 'Your Synchronous FIFO RTL scored 94/100 with praise from Trainer Bhavani Bhaskar.',
    type: 'general',
    linkTarget: 'assignments',
    createdAt: '2026-10-11 11:00',
    read: false
  }
];

// INITIAL AUTHORIZED ADMIN ACCOUNTS
const INITIAL_ADMINS: AdminAccount[] = [
  {
    id: 'admin-super',
    name: 'Super Admin',
    email: 'admin_design_silicon@dsv.com',
    password: 'C@harikrishna123',
    isSuperAdmin: true,
    createdAt: '2026-10-13 00:00'
  },
  {
    id: 'admin-2',
    name: 'Hari Krishna',
    email: 'harikrishna@dsv.com',
    password: 'C@harikrishna123',
    isSuperAdmin: false,
    createdAt: '2026-10-13 00:00'
  },
  {
    id: 'admin-3',
    name: 'Kranthi Kadinti',
    email: 'kranthikadinti@gmail.com',
    password: 'C@harikrishna123',
    isSuperAdmin: false,
    createdAt: '2026-10-13 00:00'
  },
  {
    id: 'admin-4',
    name: 'Design Silicon Admin',
    email: 'designsiliconvlsi@gmail.com',
    password: 'C@harikrishna123',
    isSuperAdmin: false,
    createdAt: '2026-10-13 00:00'
  }
];

// REACTION SUBSCRIBER SYSTEM
type Listener = () => void;
const listeners: Set<Listener> = new Set();

function notifyListeners() {
  listeners.forEach(fn => {
    try { fn(); } catch (err) { console.error('Storage listener error:', err); }
  });
}

export function subscribeToDataChanges(callback: Listener): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

// STORAGE REPOSITORY CLASS
class StorageService {
  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;
    const initialized = localStorage.getItem(KEYS.INITIALIZED);
    if (!initialized) {
      localStorage.setItem(KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
      localStorage.setItem(KEYS.MODULES, JSON.stringify(INITIAL_MODULES));
      localStorage.setItem(KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
      localStorage.setItem(KEYS.EVENT_REGS, JSON.stringify(INITIAL_EVENT_REGS));
      localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
      localStorage.setItem(KEYS.CHAT_LEADS, JSON.stringify(INITIAL_CHAT_LEADS));
      localStorage.setItem(KEYS.CONTACT_MSGS, JSON.stringify(INITIAL_CONTACT_MSGS));
      localStorage.setItem(KEYS.SCHEDULES, JSON.stringify(INITIAL_SCHEDULES));
      localStorage.setItem(KEYS.PAYMENTS, JSON.stringify(INITIAL_PAYMENTS));
      localStorage.setItem(KEYS.PAYMENT_RECORDS, JSON.stringify(INITIAL_PAYMENT_RECORDS));
      localStorage.setItem(KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
      localStorage.setItem(KEYS.ENROLLMENTS, JSON.stringify(INITIAL_ENROLLMENTS));
      localStorage.setItem(KEYS.ASSIGNMENTS, JSON.stringify(INITIAL_ASSIGNMENTS));
      localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(INITIAL_ANNOUNCEMENTS));
      localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
      localStorage.setItem(KEYS.ADMINS, JSON.stringify(INITIAL_ADMINS));
      localStorage.setItem(KEYS.INITIALIZED, 'true');
    } else {
      // Ensure admins are seeded if missing in existing storage
      if (!localStorage.getItem(KEYS.ADMINS)) {
        localStorage.setItem(KEYS.ADMINS, JSON.stringify(INITIAL_ADMINS));
      }
    }
  }

  private getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      notifyListeners();
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }

  // --- COURSES ---
  getCourses(): Course[] {
    return this.getItem<Course[]>(KEYS.COURSES, INITIAL_COURSES);
  }

  getCourseById(id: string): Course | undefined {
    return this.getCourses().find(c => c.id === id);
  }

  saveCourse(course: Course): void {
    const list = this.getCourses();
    const index = list.findIndex(c => c.id === course.id);
    if (index >= 0) {
      list[index] = course;
    } else {
      list.unshift(course);
    }
    this.setItem(KEYS.COURSES, list);
  }

  deleteCourse(id: string): void {
    const list = this.getCourses().filter(c => c.id !== id);
    this.setItem(KEYS.COURSES, list);
  }

  // --- MODULES & LESSONS ---
  getModules(): CourseModule[] {
    return this.getItem<CourseModule[]>(KEYS.MODULES, INITIAL_MODULES);
  }

  getModulesForCourse(courseId: string): CourseModule[] {
    return this.getModules()
      .filter(m => m.courseId === courseId)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  saveModule(module: CourseModule): void {
    const list = this.getModules();
    const idx = list.findIndex(m => m.id === module.id);
    if (idx >= 0) {
      list[idx] = module;
    } else {
      list.push(module);
    }
    this.setItem(KEYS.MODULES, list);
  }

  deleteModule(id: string): void {
    const list = this.getModules().filter(m => m.id !== id);
    this.setItem(KEYS.MODULES, list);
  }

  // --- EVENTS ---
  getEvents(): EventItem[] {
    return this.getItem<EventItem[]>(KEYS.EVENTS, INITIAL_EVENTS);
  }

  getEventById(id: string): EventItem | undefined {
    return this.getEvents().find(e => e.id === id);
  }

  saveEvent(event: EventItem): void {
    const list = this.getEvents();
    const idx = list.findIndex(e => e.id === event.id);
    if (idx >= 0) {
      list[idx] = event;
    } else {
      list.unshift(event);
    }
    this.setItem(KEYS.EVENTS, list);
  }

  deleteEvent(id: string): void {
    const list = this.getEvents().filter(e => e.id !== id);
    this.setItem(KEYS.EVENTS, list);
  }

  // --- EVENT REGISTRATIONS ---
  getEventRegistrations(): EventRegistration[] {
    return this.getItem<EventRegistration[]>(KEYS.EVENT_REGS, INITIAL_EVENT_REGS);
  }

  registerForEvent(reg: Omit<EventRegistration, 'id' | 'registeredAt'>): EventRegistration {
    const newReg: EventRegistration = {
      ...reg,
      id: `ev-reg-${Date.now()}`,
      registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    const list = this.getEventRegistrations();
    list.unshift(newReg);
    this.setItem(KEYS.EVENT_REGS, list);

    // Update event counter
    const events = this.getEvents();
    const ev = events.find(e => e.id === reg.eventId);
    if (ev) {
      ev.registeredCount = (ev.registeredCount || 0) + 1;
      this.saveEvent(ev);
    }

    // Add notification for admin
    this.addNotification({
      recipientRole: 'admin',
      title: 'New Event Registration',
      message: `${reg.name} registered for "${reg.eventTitle}"`,
      type: 'event',
      linkTarget: 'events'
    });

    return newReg;
  }

  // --- APPLICATION REQUESTS ---
  getApplications(): ApplicationRequest[] {
    return this.getItem<ApplicationRequest[]>(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  }

  submitApplication(data: Omit<ApplicationRequest, 'id' | 'createdAt' | 'status'>): ApplicationRequest {
    const newReq: ApplicationRequest = {
      ...data,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New'
    };
    const list = this.getApplications();
    list.unshift(newReq);
    this.setItem(KEYS.APPLICATIONS, list);

    // Notify admin
    this.addNotification({
      recipientRole: 'admin',
      title: 'New Course Application',
      message: `${data.fullName} applied for ${data.courseTitle}`,
      type: 'request',
      linkTarget: 'requests'
    });

    return newReq;
  }

  updateApplicationStatus(id: string, status: ApplicationRequest['status'], notes?: string): void {
    const list = this.getApplications();
    const req = list.find(r => r.id === id);
    if (req) {
      req.status = status;
      if (notes !== undefined) req.internalNotes = notes;
      this.setItem(KEYS.APPLICATIONS, list);
    }
  }

  // Convert Application to enrolled student
  convertApplicationToStudent(reqId: string): StudentProfile | null {
    const list = this.getApplications();
    const req = list.find(r => r.id === reqId);
    if (!req) return null;

    req.status = 'Converted';
    this.setItem(KEYS.APPLICATIONS, list);

    // Create student
    const newStudent: StudentProfile = {
      id: `std-${Date.now()}`,
      userId: `user-student-${Date.now()}`,
      name: req.fullName,
      email: req.email,
      phone: req.phone,
      education: req.education,
      yearOfPassout: req.yearOfPassout,
      experienceLevel: (req.experienceLevel as any) || 'Fresher',
      city: 'Online / Remote',
      batchId: req.preferredBatch || 'Batch #28',
      enrolledCourseIds: [req.courseId],
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    const students = this.getStudents();
    students.unshift(newStudent);
    this.setItem(KEYS.STUDENTS, students);

    // Create enrollment
    const newEnrollment: Enrollment = {
      id: `enr-${Date.now()}`,
      studentId: newStudent.id,
      courseId: req.courseId,
      enrolledAt: new Date().toISOString().split('T')[0],
      progressPercent: 0,
      completedLessonIds: [],
      status: 'Active',
      certificateIssued: false
    };
    const enrollments = this.getEnrollments();
    enrollments.unshift(newEnrollment);
    this.setItem(KEYS.ENROLLMENTS, enrollments);

    // Create Payment Record
    const course = this.getCourseById(req.courseId);
    const fee = course?.fee || 45000;
    const paymentRecord: StudentPaymentRecord = {
      studentId: newStudent.id,
      courseId: req.courseId,
      totalFee: fee,
      totalPaid: 0,
      pendingAmount: fee,
      status: 'Pending',
      nextDueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      transactions: []
    };
    const records = this.getPaymentRecords();
    records.unshift(paymentRecord);
    this.setItem(KEYS.PAYMENT_RECORDS, records);

    return newStudent;
  }

  // --- CHAT LEADS ---
  getChatLeads(): ChatLead[] {
    return this.getItem<ChatLead[]>(KEYS.CHAT_LEADS, INITIAL_CHAT_LEADS);
  }

  submitChatLead(leadData: Omit<ChatLead, 'id' | 'createdAt' | 'status' | 'unread'>): ChatLead {
    const newLead: ChatLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New',
      unread: true
    };
    const list = this.getChatLeads();
    list.unshift(newLead);
    this.setItem(KEYS.CHAT_LEADS, list);

    // Notify admin
    this.addNotification({
      recipientRole: 'admin',
      title: 'New Chat Lead Received',
      message: `${leadData.name} (${leadData.courseInterest}) left contact info`,
      type: 'lead',
      linkTarget: 'chat-leads'
    });

    return newLead;
  }

  markChatLeadRead(id: string): void {
    const list = this.getChatLeads();
    const item = list.find(l => l.id === id);
    if (item && item.unread) {
      item.unread = false;
      this.setItem(KEYS.CHAT_LEADS, list);
    }
  }

  updateChatLead(id: string, status: ChatLead['status'], notes?: string): void {
    const list = this.getChatLeads();
    const item = list.find(l => l.id === id);
    if (item) {
      item.status = status;
      if (notes !== undefined) item.notes = notes;
      this.setItem(KEYS.CHAT_LEADS, list);
    }
  }

  // --- CONTACT MESSAGES ---
  getContactMessages(): ContactMessage[] {
    return this.getItem<ContactMessage[]>(KEYS.CONTACT_MSGS, INITIAL_CONTACT_MSGS);
  }

  submitContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status' | 'unread'>): ContactMessage {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New',
      unread: true
    };
    const list = this.getContactMessages();
    list.unshift(newMsg);
    this.setItem(KEYS.CONTACT_MSGS, list);

    this.addNotification({
      recipientRole: 'admin',
      title: 'New Contact Form Submission',
      message: `Message from ${msg.fullName}: ${msg.subject}`,
      type: 'general',
      linkTarget: 'contact-messages'
    });

    return newMsg;
  }

  markContactMessageRead(id: string): void {
    const list = this.getContactMessages();
    const item = list.find(m => m.id === id);
    if (item && item.unread) {
      item.unread = false;
      this.setItem(KEYS.CONTACT_MSGS, list);
    }
  }

  // --- SCHEDULES ---
  getSchedules(): ClassSchedule[] {
    return this.getItem<ClassSchedule[]>(KEYS.SCHEDULES, INITIAL_SCHEDULES);
  }

  saveSchedule(sch: ClassSchedule): void {
    const list = this.getSchedules();
    const idx = list.findIndex(s => s.id === sch.id);
    if (idx >= 0) {
      list[idx] = sch;
    } else {
      list.push(sch);
    }
    this.setItem(KEYS.SCHEDULES, list);

    // Notify students
    this.addNotification({
      recipientRole: 'student',
      title: 'Class Schedule Updated',
      message: `Topic: "${sch.topic}" on ${sch.date} at ${sch.startTime}`,
      type: 'schedule',
      linkTarget: 'schedule'
    });
  }

  deleteSchedule(id: string): void {
    const list = this.getSchedules().filter(s => s.id !== id);
    this.setItem(KEYS.SCHEDULES, list);
  }

  // --- STUDENTS & ENROLLMENTS ---
  getStudents(): StudentProfile[] {
    return this.getItem<StudentProfile[]>(KEYS.STUDENTS, INITIAL_STUDENTS);
  }

  getStudentById(id: string): StudentProfile | undefined {
    return this.getStudents().find(s => s.id === id || s.userId === id);
  }

  saveStudent(student: StudentProfile): void {
    const list = this.getStudents();
    const idx = list.findIndex(s => s.id === student.id);
    if (idx >= 0) {
      list[idx] = student;
    } else {
      list.unshift(student);
    }
    this.setItem(KEYS.STUDENTS, list);
  }

  blockStudent(studentId: string): boolean {
    const list = this.getStudents();
    const std = list.find(s => s.id === studentId || s.userId === studentId);
    if (std) {
      std.status = 'Blocked';
      this.setItem(KEYS.STUDENTS, list);
      return true;
    }
    return false;
  }

  unblockStudent(studentId: string): boolean {
    const list = this.getStudents();
    const std = list.find(s => s.id === studentId || s.userId === studentId);
    if (std) {
      std.status = 'Active';
      this.setItem(KEYS.STUDENTS, list);
      return true;
    }
    return false;
  }

  removeStudentAndCleanData(studentId: string): boolean {
    const list = this.getStudents();
    const std = list.find(s => s.id === studentId || s.userId === studentId);
    if (!std) return false;

    const email = std.email.trim().toLowerCase();

    // 1. Remove from students list
    const updatedStudents = list.filter(s => s.id !== studentId && s.userId !== studentId);
    this.setItem(KEYS.STUDENTS, updatedStudents);

    // 2. Remove all course enrollments
    const enrollments = this.getEnrollments().filter(e => e.studentId !== std.id && e.studentId !== std.userId);
    this.setItem(KEYS.ENROLLMENTS, enrollments);

    // 3. Remove payment records
    const payRecords = this.getPaymentRecords().filter(p => p.studentId !== std.id && p.studentId !== std.userId);
    this.setItem(KEYS.PAYMENT_RECORDS, payRecords);

    // 4. Remove payment transactions
    const transactions = this.getPayments().filter(p => p.studentId !== std.id && p.studentId !== std.userId);
    this.setItem(KEYS.PAYMENTS, transactions);

    // 5. Clean up stored credentials map
    try {
      const passMapRaw = localStorage.getItem('ds_vlsi_student_passes');
      if (passMapRaw) {
        const passMap = JSON.parse(passMapRaw);
        delete passMap[email];
        localStorage.setItem('ds_vlsi_student_passes', JSON.stringify(passMap));
      }
    } catch {
      // ignore
    }

    // 6. If currently logged in as this student in current session, clear user session
    try {
      const current = localStorage.getItem('ds_vlsi_current_user_v5');
      if (current) {
        const parsed = JSON.parse(current);
        if (parsed.email && parsed.email.toLowerCase() === email) {
          localStorage.removeItem('ds_vlsi_current_user_v5');
        }
      }
    } catch {
      // ignore
    }

    return true;
  }

  getEnrollments(): Enrollment[] {
    return this.getItem<Enrollment[]>(KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
  }

  getStudentEnrollments(studentId: string): Enrollment[] {
    return this.getEnrollments().filter(e => e.studentId === studentId);
  }

  markLessonComplete(studentId: string, courseId: string, lessonId: string): void {
    const list = this.getEnrollments();
    const enr = list.find(e => e.studentId === studentId && e.courseId === courseId);
    if (enr) {
      if (!enr.completedLessonIds.includes(lessonId)) {
        enr.completedLessonIds.push(lessonId);
      }
      // Calculate new percentage based on total course lessons
      const course = this.getCourseById(courseId);
      const totalLessons = course?.lessonsCount || 20;
      enr.progressPercent = Math.min(100, Math.round((enr.completedLessonIds.length / totalLessons) * 100));
      this.setItem(KEYS.ENROLLMENTS, list);
    }
  }

  // --- PAYMENTS ---
  getPayments(): PaymentTransaction[] {
    return this.getItem<PaymentTransaction[]>(KEYS.PAYMENTS, INITIAL_PAYMENTS);
  }

  getPaymentRecords(): StudentPaymentRecord[] {
    return this.getItem<StudentPaymentRecord[]>(KEYS.PAYMENT_RECORDS, INITIAL_PAYMENT_RECORDS);
  }

  recordPayment(entry: {
    studentId: string;
    studentName: string;
    courseId: string;
    courseTitle: string;
    amount: number;
    paymentMethod: PaymentTransaction['paymentMethod'];
    referenceId: string;
    installmentNo: number;
    nextDueDate?: string;
    notes?: string;
  }): PaymentTransaction {
    const tx: PaymentTransaction = {
      id: `pay-tx-${Date.now()}`,
      studentId: entry.studentId,
      studentName: entry.studentName,
      courseId: entry.courseId,
      courseTitle: entry.courseTitle,
      amount: entry.amount,
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: entry.paymentMethod,
      referenceId: entry.referenceId,
      installmentNo: entry.installmentNo,
      totalInstallments: 2,
      receiptNumber: `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      notes: entry.notes
    };

    const transactions = this.getPayments();
    transactions.unshift(tx);
    this.setItem(KEYS.PAYMENTS, transactions);

    // Update Student Payment Record
    const records = this.getPaymentRecords();
    let record = records.find(r => r.studentId === entry.studentId && r.courseId === entry.courseId);
    if (!record) {
      const course = this.getCourseById(entry.courseId);
      record = {
        studentId: entry.studentId,
        courseId: entry.courseId,
        totalFee: course?.fee || entry.amount,
        totalPaid: 0,
        pendingAmount: course?.fee || entry.amount,
        status: 'Pending',
        transactions: []
      };
      records.push(record);
    }

    record.totalPaid += entry.amount;
    record.pendingAmount = Math.max(0, record.totalFee - record.totalPaid);
    if (record.pendingAmount === 0) {
      record.status = 'Paid';
    } else {
      record.status = 'Partially Paid';
    }
    if (entry.nextDueDate) {
      record.nextDueDate = entry.nextDueDate;
    }
    record.transactions.unshift(tx);
    this.setItem(KEYS.PAYMENT_RECORDS, records);

    // Notify student
    this.addNotification({
      recipientRole: 'student',
      title: 'Payment Received Confirmation',
      message: `₹${entry.amount.toLocaleString('en-IN')} received. Receipt #${tx.receiptNumber}`,
      type: 'payment',
      linkTarget: 'payments'
    });

    return tx;
  }

  // --- ASSIGNMENTS ---
  getAssignments(): Assignment[] {
    return this.getItem<Assignment[]>(KEYS.ASSIGNMENTS, INITIAL_ASSIGNMENTS);
  }

  submitAssignment(assignmentId: string, studentId: string, studentName: string, fileName: string): void {
    const list = this.getAssignments();
    const asg = list.find(a => a.id === assignmentId);
    if (asg) {
      const existing = asg.submissions.find(s => s.studentId === studentId);
      if (existing) {
        existing.fileName = fileName;
        existing.submittedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
        existing.status = 'Submitted';
      } else {
        asg.submissions.push({
          studentId,
          studentName,
          submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          fileUrl: '#',
          fileName,
          status: 'Submitted'
        });
      }
      this.setItem(KEYS.ASSIGNMENTS, list);

      this.addNotification({
        recipientRole: 'admin',
        title: 'New Assignment Submission',
        message: `${studentName} submitted "${asg.title}"`,
        type: 'general',
        linkTarget: 'assignments'
      });
    }
  }

  // --- ANNOUNCEMENTS ---
  getAnnouncements(): Announcement[] {
    return this.getItem<Announcement[]>(KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  }

  saveAnnouncement(ann: Announcement): void {
    const list = this.getAnnouncements();
    const idx = list.findIndex(a => a.id === ann.id);
    if (idx >= 0) {
      list[idx] = ann;
    } else {
      list.unshift(ann);
    }
    this.setItem(KEYS.ANNOUNCEMENTS, list);
  }

  deleteAnnouncement(id: string): void {
    const list = this.getAnnouncements().filter(a => a.id !== id);
    this.setItem(KEYS.ANNOUNCEMENTS, list);
  }

  // --- NOTIFICATIONS ---
  getNotifications(): NotificationItem[] {
    return this.getItem<NotificationItem[]>(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }

  addNotification(notif: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>): NotificationItem {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false
    };
    const list = this.getNotifications();
    list.unshift(newNotif);
    this.setItem(KEYS.NOTIFICATIONS, list);
    return newNotif;
  }

  markNotificationRead(id: string): void {
    const list = this.getNotifications();
    const item = list.find(n => n.id === id);
    if (item) {
      item.read = true;
      this.setItem(KEYS.NOTIFICATIONS, list);
    }
  }

  markAllNotificationsRead(role: 'admin' | 'student'): void {
    const list = this.getNotifications();
    list.forEach(n => {
      if (n.recipientRole === role || n.recipientRole === 'all') {
        n.read = true;
      }
    });
    this.setItem(KEYS.NOTIFICATIONS, list);
  }

  // --- COUNTERS FOR BADGES ---
  getUnreadBadges() {
    const apps = this.getApplications().filter(a => a.status === 'New').length;
    const leads = this.getChatLeads().filter(l => l.unread || l.status === 'New').length;
    const msgs = this.getContactMessages().filter(m => m.unread || m.status === 'New').length;
    const notifs = this.getNotifications().filter(n => !n.read && (n.recipientRole === 'admin' || n.recipientRole === 'all')).length;
    return {
      newApplications: apps,
      newChatLeads: leads,
      newContactMsgs: msgs,
      unreadNotifications: notifs,
      totalAdminAlerts: apps + leads + msgs
    };
  }

  // --- ADMIN ACCOUNTS & AUTHENTICATION ---
  getAdminAccounts(): AdminAccount[] {
    return this.getItem<AdminAccount[]>(KEYS.ADMINS, INITIAL_ADMINS);
  }

  saveAdminAccount(account: AdminAccount): boolean {
    const list = this.getAdminAccounts();
    const idx = list.findIndex(a => a.id === account.id || a.email.toLowerCase() === account.email.toLowerCase());
    if (idx >= 0) {
      list[idx] = account;
    } else {
      list.push(account);
    }
    this.setItem(KEYS.ADMINS, list);
    return true;
  }

  deleteAdminAccount(id: string): boolean {
    const list = this.getAdminAccounts();
    const target = list.find(a => a.id === id);
    if (target?.isSuperAdmin || target?.email === 'admin_design_silicon@dsv.com') {
      return false; // Cannot delete super admin
    }
    const filtered = list.filter(a => a.id !== id);
    this.setItem(KEYS.ADMINS, filtered);
    return true;
  }

  authenticateAdmin(email: string, password: string): AdminAccount | null {
    const list = this.getAdminAccounts();
    const cleanEmail = email.trim().toLowerCase();
    const admin = list.find(
      a => a.email.trim().toLowerCase() === cleanEmail && a.password === password
    );
    return admin || null;
  }

  // Reset to factory defaults if desired
  resetAll(): void {
    localStorage.clear();
    this.init();
    notifyListeners();
  }
}

export const storageService = new StorageService();

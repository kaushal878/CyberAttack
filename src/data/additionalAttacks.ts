import { 
  Wifi, Cloud, Smartphone, Factory, Cpu, Bitcoin, Usb, Camera,
  Headphones, CreditCard, ArrowDown, Code
} from "lucide-react";
import type { Attack, AttackCategory, AttackDifficulty, AttackImpact, AttackTactic } from "../types";

// Placeholder animation components
const PlaceholderAnimation = () => null;
const PlaceholderPreview = () => null;

// Wireless & IoT Attacks
export const wirelessAttacks: Attack[] = [
  {
    id: "wifi-cracking",
    name: "Wi-Fi Cracking",
    tagline: "Break wireless encryption",
    category: "wireless-iot" as AttackCategory,
    accent: "blue",
    icon: Wifi,
    shortDescription: "Compromise Wi-Fi networks to gain unauthorized access and intercept traffic.",
    howItWorks: "Attackers exploit weak encryption (WEP, WPA), capture handshakes for offline cracking, or use rogue access points to trick users into connecting to malicious networks.",
    impact: [
      "Network access and traffic interception",
      "Man-in-the-middle attacks",
      "Lateral movement into internal networks",
      "Data theft from unencrypted communications"
    ],
    prevention: [
      "Use WPA3 encryption with strong passwords",
      "Implement wireless intrusion detection",
      "Network segmentation for guest networks",
      "Regular firmware updates for access points"
    ],
    steps: [
      { title: "Network discovery", description: "Attacker scans for available networks", technique: "Discovery" },
      { title: "Encryption analysis", description: "Security protocols and encryption assessed", technique: "Discovery" },
      { title: "Attack execution", description: "Cracking or spoofing methods deployed", technique: "Execution" },
      { title: "Network compromise", description: "Unauthorized access to Wi-Fi network", technique: "Initial Access" }
    ],
    Animation: PlaceholderAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "Which Wi-Fi security standard is most secure?",
        options: ["WEP", "WPA", "WPA2", "WPA3"],
        answer: 3,
        explanation: "WPA3 provides the strongest encryption and protection against common attacks."
      }
    ],
    difficulty: "intermediate" as AttackDifficulty,
    impactLevel: "high" as AttackImpact,
    tactic: "initial-access" as AttackTactic,
    osiLayer: 2,
    targets: ["Wi-Fi networks", "Access points", "Wireless clients"],
    detectionDifficulty: "intermediate" as AttackDifficulty,
    realWorldExamples: ["Aircrack-ng", "WiFi Pineapple", "Evil Twin attacks"]
  },
  {
    id: "bluetooth-attack",
    name: "Bluetooth Attack",
    tagline: "Exploit wireless personal networks",
    category: "wireless-iot" as AttackCategory,
    accent: "cyan",
    icon: Headphones,
    shortDescription: "Compromise Bluetooth connections to access devices, steal data, or eavesdrop on communications.",
    howItWorks: "Attackers exploit vulnerabilities in Bluetooth protocols, perform bluejacking (unsolicited messages), bluesnarfing (unauthorized data access), or create malicious connections to compromise devices.",
    impact: [
      "Device compromise and data theft",
      "Unauthorized access to sensitive information",
      "Eavesdropping on communications",
      "Malware delivery to connected devices"
    ],
    prevention: [
      "Keep Bluetooth disabled when not in use",
      "Use device pairing with authentication",
      "Regular firmware updates",
      "Avoid public Bluetooth pairing requests"
    ],
    steps: [
      { title: "Device discovery", description: "Attacker scans for discoverable Bluetooth devices", technique: "Discovery" },
      { title: "Vulnerability assessment", description: "Device security weaknesses identified", technique: "Discovery" },
      { title: "Connection establishment", description: "Malicious connection initiated", technique: "Execution" },
      { title: "Data access", description: "Unauthorized access to device data", technique: "Collection" }
    ],
    Animation: PlaceholderAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What is bluesnarfing?",
        options: ["Sending unwanted messages", "Stealing data from Bluetooth devices", "Cracking Bluetooth encryption", "Creating rogue networks"],
        answer: 1,
        explanation: "Bluesnarfing is the unauthorized access and theft of data from Bluetooth-enabled devices."
      }
    ],
    difficulty: "advanced" as AttackDifficulty,
    impactLevel: "medium" as AttackImpact,
    tactic: "collection" as AttackTactic,
    osiLayer: 2,
    targets: ["Bluetooth devices", "Mobile phones", "IoT devices"],
    detectionDifficulty: "advanced" as AttackDifficulty,
    realWorldExamples: ["Bluebugging", "BlueBorne vulnerability", "Bluetooth pairing attacks"]
  }
];

// Cloud Attacks
export const cloudAttacks: Attack[] = [
  {
    id: "cloud-misconfiguration",
    name: "Cloud Misconfiguration",
    tagline: "Exploit improperly configured cloud services",
    category: "cloud" as AttackCategory,
    accent: "orange",
    icon: Cloud,
    shortDescription: "Exploit misconfigured cloud services, storage buckets, or permissions to gain unauthorized access.",
    howItWorks: "Attackers scan for publicly accessible cloud resources, default credentials, or overly permissive IAM roles. These misconfigurations can expose sensitive data or provide entry points into cloud environments.",
    impact: [
      "Massive data breaches",
      "Unauthorized cloud resource access",
      "Financial loss from unauthorized usage",
      "Compliance violations"
    ],
    prevention: [
      "Regular cloud security audits",
      "Least privilege IAM policies",
      "Cloud security posture management",
      "Automated misconfiguration detection"
    ],
    steps: [
      { title: "Cloud enumeration", description: "Attacker discovers cloud resources", technique: "Discovery" },
      { title: "Misconfiguration identification", description: "Security weaknesses found", technique: "Discovery" },
      { title: "Unauthorized access", description: "Exploitation of misconfigurations", technique: "Initial Access" },
      { title: "Data exfiltration", description: "Sensitive data extracted from cloud", technique: "Collection" }
    ],
    Animation: PlaceholderAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What's the most common cloud misconfiguration?",
        options: ["Strong passwords", "Public S3 buckets", "Encryption", "Multi-factor authentication"],
        answer: 1,
        explanation: "Publicly accessible S3 buckets are one of the most common and damaging cloud misconfigurations."
      }
    ],
    difficulty: "intermediate" as AttackDifficulty,
    impactLevel: "critical" as AttackImpact,
    tactic: "initial-access" as AttackTactic,
    osiLayer: 7,
    targets: ["Cloud storage", "IAM roles", "Cloud services"],
    detectionDifficulty: "intermediate" as AttackDifficulty,
    realWorldExamples: ["Capital One breach", "Open S3 buckets", "Exposed databases"]
  },
  {
    id: "container-escape",
    name: "Container Escape",
    tagline: "Break out of container isolation",
    category: "cloud" as AttackCategory,
    accent: "red",
    icon: Cpu,
    shortDescription: "Escape container boundaries to gain access to the host system and other containers.",
    howItWorks: "Attackers exploit vulnerabilities in container runtimes, misconfigurations, or kernel bugs to break out of container isolation and access the host system.",
    impact: [
      "Host system compromise",
      "Cross-container attacks",
      "Cloud environment takeover",
      "Supply chain attacks"
    ],
    prevention: [
      "Use minimal container images",
      "Regular security updates",
      "Container runtime security",
      "Proper seccomp and AppArmor profiles"
    ],
    steps: [
      { title: "Container access", description: "Attacker gains access to a container", technique: "Initial Access" },
      { title: "Vulnerability discovery", description: "Container escape vulnerabilities identified", technique: "Discovery" },
      { title: "Escape execution", description: "Container boundaries breached", technique: "Execution" },
      { title: "Host compromise", description: "Access to host system achieved", technique: "Privilege Escalation" }
    ],
    Animation: PlaceholderAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What helps prevent container escapes?",
        options: ["Large container images", "Root access in containers", "Minimal containers + runtime security", "Shared kernel namespaces"],
        answer: 2,
        explanation: "Using minimal containers with proper runtime security configurations reduces escape risks."
      }
    ],
    difficulty: "advanced" as AttackDifficulty,
    impactLevel: "critical" as AttackImpact,
    tactic: "privilege-escalation" as AttackTactic,
    osiLayer: 7,
    targets: ["Container runtimes", "Host systems", "Kubernetes clusters"],
    detectionDifficulty: "advanced" as AttackDifficulty,
    realWorldExamples: ["CVE-2019-5736", "Docker escape vulnerabilities", "Kubernetes CVEs"]
  }
];

// Mobile Attacks
export const mobileAttacks: Attack[] = [
  {
    id: "mobile-malware",
    name: "Mobile Malware",
    tagline: "Malicious apps on smartphones",
    category: "mobile" as AttackCategory,
    accent: "purple",
    icon: Smartphone,
    shortDescription: "Malicious applications that compromise mobile devices to steal data, spy on users, or perform fraud.",
    howItWorks: "Attackers create malicious apps that appear legitimate but contain hidden functionality. These can be distributed through official app stores, third-party stores, or sideloading.",
    impact: [
      "Personal data theft",
      "Financial fraud",
      "Surveillance and espionage",
      "Device control and botnet recruitment"
    ],
    prevention: [
      "Only install apps from official stores",
      "Review app permissions carefully",
      "Keep mobile OS updated",
      "Use mobile security solutions"
    ],
    steps: [
      { title: "App creation", description: "Malicious app developed with hidden functionality", technique: "Resource Development" },
      { title: "Distribution", description: "App distributed through stores or sideloading", technique: "Initial Access" },
      { title: "Installation", description: "User installs malicious app", technique: "User Execution" },
      { title: "Malicious activity", description: "App performs unauthorized actions", technique: "Impact" }
    ],
    Animation: PlaceholderAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What's the safest way to install mobile apps?",
        options: ["Third-party stores", "Official app stores only", "Direct download", "Email attachments"],
        answer: 1,
        explanation: "Official app stores have security review processes that help prevent malicious apps."
      }
    ],
    difficulty: "intermediate" as AttackDifficulty,
    impactLevel: "high" as AttackImpact,
    tactic: "initial-access" as AttackTactic,
    osiLayer: 7,
    targets: ["Mobile devices", "App stores", "User data"],
    detectionDifficulty: "intermediate" as AttackDifficulty,
    realWorldExamples: ["Joker malware", "FluBot", "Pegasus", "Triada"]
  },
  {
    id: "sim-swapping",
    name: "SIM Swapping",
    tagline: "Take over phone numbers",
    category: "mobile" as AttackCategory,
    accent: "red",
    icon: CreditCard,
    shortDescription: "Trick mobile carriers into transferring a victim's phone number to the attacker's SIM card.",
    howItWorks: "Attackers use social engineering or insider threats to convince mobile carriers to port a victim's phone number to their SIM card. This allows them to intercept calls, messages, and bypass SMS-based 2FA.",
    impact: [
      "Account takeover via SMS 2FA bypass",
      "Financial theft",
      "Identity theft",
      "Privacy invasion"
    ],
    prevention: [
      "Use authenticator apps instead of SMS 2FA",
      "SIM protection with carriers",
      "Account PINs with mobile providers",
      "Hardware security keys"
    ],
    steps: [
      { title: "Target selection", description: "Victim with valuable accounts identified", technique: "Discovery" },
      { title: "Carrier deception", description: "Mobile carrier tricked into porting number", technique: "Social Engineering" },
      { title: "SIM takeover", description: "Number transferred to attacker's SIM", technique: "Initial Access" },
      { title: "Account compromise", description: "2FA bypass and accounts accessed", technique: "Credential Access" }
    ],
    Animation: PlaceholderAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What 2FA method is vulnerable to SIM swapping?",
        options: ["Authenticator apps", "Hardware keys", "SMS codes", "Email codes"],
        answer: 2,
        explanation: "SMS-based 2FA can be bypassed through SIM swapping attacks."
      }
    ],
    difficulty: "advanced" as AttackDifficulty,
    impactLevel: "critical" as AttackImpact,
    tactic: "credential-access" as AttackTactic,
    osiLayer: 7,
    targets: ["Mobile carriers", "Phone numbers", "SMS 2FA"],
    detectionDifficulty: "advanced" as AttackDifficulty,
    realWorldExamples: ["Crypto account thefts", "Celebrity account hacks", "Financial fraud cases"]
  }
];

// Industrial & Infrastructure Attacks
export const industrialAttacks: Attack[] = [
  {
    id: "scada-attack",
    name: "SCADA Attack",
    tagline: "Compromise industrial control systems",
    category: "industrial" as AttackCategory,
    accent: "red",
    icon: Factory,
    shortDescription: "Attack industrial control systems to disrupt physical infrastructure and critical services.",
    howItWorks: "Attackers exploit vulnerabilities in SCADA systems, often through remote access, weak authentication, or legacy protocols. This can allow them to control physical processes and equipment.",
    impact: [
      "Physical infrastructure disruption",
      "Public safety risks",
      "Economic damage",
      "Environmental damage"
    ],
    prevention: [
      "Network segmentation from IT networks",
      "Strong authentication and access controls",
      "Regular security assessments",
      "Legacy system replacement"
    ],
    steps: [
      { title: "System reconnaissance", description: "SCADA systems identified and mapped", technique: "Discovery" },
      { title: "Vulnerability exploitation", description: "Security weaknesses exploited", technique: "Execution" },
      { title: "System access", description: "Control over industrial systems gained", technique: "Initial Access" },
      { title: "Process disruption", description: "Physical processes manipulated", technique: "Impact" }
    ],
    Animation: PlaceholderAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What's critical for SCADA security?",
        options: ["Internet connectivity", "Air gap isolation", "Shared networks", "Default passwords"],
        answer: 1,
        explanation: "Air gap isolation (physical separation) is a key security measure for critical SCADA systems."
      }
    ],
    difficulty: "expert" as AttackDifficulty,
    impactLevel: "critical" as AttackImpact,
    tactic: "impact" as AttackTactic,
    osiLayer: 7,
    targets: ["Industrial controllers", "Physical infrastructure", "Critical services"],
    detectionDifficulty: "expert" as AttackDifficulty,
    realWorldExamples: ["Stuxnet", "Ukraine power grid attacks", "Colonial Pipeline", "Maroochy Water breach"]
  }
];

// AI & Modern Attacks
export const aiAttacks: Attack[] = [
  {
    id: "ai-phishing",
    name: "AI-Generated Phishing",
    tagline: "Hyper-realistic automated deception",
    category: "ai-modern" as AttackCategory,
    accent: "purple",
    icon: Cpu,
    shortDescription: "Use artificial intelligence to create highly convincing and personalized phishing attacks at scale.",
    howItWorks: "AI systems analyze victim data, social media, and communication patterns to generate personalized phishing messages that are difficult to distinguish from legitimate communications.",
    impact: [
      "Massively scalable targeted attacks",
      "Higher success rates than traditional phishing",
      "Harder to detect and block",
      "Erosion of trust in digital communications"
    ],
    prevention: [
      "AI-powered email filtering",
      "Advanced user training",
      "Zero-trust verification practices",
      "Behavioral analysis systems"
    ],
    steps: [
      { title: "Data collection", description: "AI gathers victim data from multiple sources", technique: "Collection" },
      { title: "Message generation", description: "Personalized phishing content created", technique: "Resource Development" },
      { title: "Automated delivery", description: "AI sends targeted messages at scale", technique: "Initial Access" },
      { title: "Adaptive refinement", description: "AI learns and improves from responses", technique: "Persistence" }
    ],
    Animation: PlaceholderAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What makes AI phishing particularly dangerous?",
        options: ["Poor grammar", "Personalization at scale", "Only targets one person", "Easy to detect"],
        answer: 1,
        explanation: "AI can create highly personalized messages for thousands of targets simultaneously."
      }
    ],
    difficulty: "advanced" as AttackDifficulty,
    impactLevel: "critical" as AttackImpact,
    tactic: "initial-access" as AttackTactic,
    osiLayer: 7,
    targets: ["Email systems", "Social media", "Communication platforms"],
    detectionDifficulty: "advanced" as AttackDifficulty,
    realWorldExamples: ["GPT-based phishing", "Deepfake voice scams", "AI-powered BEC"]
  },
  {
    id: "deepfake-attack",
    name: "Deepfake Attack",
    tagline: "Synthetic media for deception",
    category: "ai-modern" as AttackCategory,
    accent: "pink",
    icon: Camera,
    shortDescription: "Use AI-generated synthetic media (video, audio, images) to impersonate individuals for fraud or manipulation.",
    howItWorks: "Deep learning models create realistic but fake video, audio, or images of real people. These can be used to impersonate executives, create fake evidence, or manipulate public opinion.",
    impact: [
      "Financial fraud through executive impersonation",
      "Reputational damage",
      "Misinformation and propaganda",
      "Erosion of trust in digital media"
    ],
    prevention: [
      "Deepfake detection tools",
      "Verification protocols for sensitive requests",
      "Digital watermarking",
      "Media literacy training"
    ],
    steps: [
      { title: "Target selection", description: "Victim to impersonate is chosen", technique: "Discovery" },
      { title: "Model training", description: "AI trained on target's media", technique: "Resource Development" },
      { title: "Deepfake creation", description: "Synthetic media generated", technique: "Execution" },
      { title: "Deception deployment", description: "Deepfake used for attack", technique: "Impact" }
    ],
    Animation: PlaceholderAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What's the best defense against deepfake scams?",
        options: ["Trust all video calls", "Verify through separate channels", "Only use text communication", "Ignore all requests"],
        answer: 1,
        explanation: "Verifying sensitive requests through separate, trusted channels can prevent deepfake deception."
      }
    ],
    difficulty: "expert" as AttackDifficulty,
    impactLevel: "critical" as AttackImpact,
    tactic: "execution" as AttackTactic,
    osiLayer: 7,
    targets: ["Video calls", "Audio communications", "Digital media"],
    detectionDifficulty: "expert" as AttackDifficulty,
    realWorldExamples: ["CEO deepfake scams", "Political deepfakes", "Insurance fraud cases"]
  }
];

// Cryptocurrency Attacks
export const cryptoAttacks: Attack[] = [
  {
    id: "crypto-phishing",
    name: "Cryptocurrency Phishing",
    tagline: "Steal digital assets through deception",
    category: "cryptocurrency" as AttackCategory,
    accent: "orange",
    icon: Bitcoin,
    shortDescription: "Target cryptocurrency users with specialized phishing attacks to steal private keys and digital assets.",
    howItWorks: "Attackers create fake crypto exchanges, wallet interfaces, or airdrop pages to trick users into revealing private keys, seed phrases, or sending cryptocurrency to attacker-controlled addresses.",
    impact: [
      "Direct financial theft",
      "Irreversible loss of assets",
      "Wallet compromise",
      "Exchange account takeover"
    ],
    prevention: [
      "Hardware wallet usage",
      "Bookmark legitimate sites",
      "Verify transaction details carefully",
      "Use hardware security keys"
    ],
    steps: [
      { title: "Target identification", description: "Crypto holders identified through blockchain analysis", technique: "Discovery" },
      { title: "Fake platform creation", description: "Malicious crypto site or service developed", technique: "Resource Development" },
      { title: "Phishing delivery", description: "Victims directed to fake platforms", technique: "Initial Access" },
      { title: "Asset theft", description: "Cryptocurrency transferred to attacker", technique: "Impact" }
    ],
    Animation: PlaceholderAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What's the most secure way to store cryptocurrency?",
        options: ["Online exchanges", "Hardware wallets", "Mobile apps", "Paper wallets taped to monitor"],
        answer: 1,
        explanation: "Hardware wallets provide the best security by keeping private keys offline."
      }
    ],
    difficulty: "intermediate" as AttackDifficulty,
    impactLevel: "critical" as AttackImpact,
    tactic: "credential-access" as AttackTactic,
    osiLayer: 7,
    targets: ["Crypto wallets", "Exchanges", "Blockchain transactions"],
    detectionDifficulty: "intermediate" as AttackDifficulty,
    realWorldExamples: ["Fake exchange sites", "Twitter crypto scams", "Fake airdrop pages"]
  },
  {
    id: "smart-contract-exploit",
    name: "Smart Contract Exploit",
    tagline: "Code vulnerabilities in blockchain",
    category: "cryptocurrency" as AttackCategory,
    accent: "red",
    icon: Code,
    shortDescription: "Exploit vulnerabilities in smart contract code to steal cryptocurrency or manipulate blockchain operations.",
    howItWorks: "Attackers analyze smart contract code for bugs like reentrancy, integer overflow/underflow, or logic flaws. They then craft transactions to exploit these vulnerabilities.",
    impact: [
      "Massive cryptocurrency theft",
      "Protocol manipulation",
      "Market disruption",
      "Loss of user funds"
    ],
    prevention: [
      "Professional smart contract audits",
      "Formal verification methods",
      "Bug bounty programs",
      "Time-locked upgrades"
    ],
    steps: [
      { title: "Code analysis", description: "Smart contract code analyzed for vulnerabilities", technique: "Discovery" },
      { title: "Exploit development", description: "Attack transaction crafted", technique: "Execution" },
      { title: "Exploitation", description: "Vulnerability triggered via blockchain transaction", technique: "Execution" },
      { title: "Asset extraction", description: "Cryptocurrency stolen or manipulated", technique: "Impact" }
    ],
    Animation: PlaceholderAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What's the most famous smart contract hack?",
        options: ["Password reuse", "The DAO hack", "Phishing email", "SQL injection"],
        answer: 1,
        explanation: "The DAO hack in 2016 exploited a reentrancy vulnerability, leading to a $50M theft."
      }
    ],
    difficulty: "expert" as AttackDifficulty,
    impactLevel: "critical" as AttackImpact,
    tactic: "execution" as AttackTactic,
    osiLayer: 7,
    targets: ["Smart contracts", "DeFi protocols", "Blockchain platforms"],
    detectionDifficulty: "expert" as AttackDifficulty,
    realWorldExamples: ["The DAO hack", "PolyNetwork hack", "Ronin bridge hack", "Parity wallet freeze"]
  }
];

// Physical Cyber Attacks
export const physicalAttacks: Attack[] = [
  {
    id: "usb-drop",
    name: "USB Drop Attack",
    tagline: "Malicious USB devices left for victims",
    category: "physical" as AttackCategory,
    accent: "red",
    icon: Usb,
    shortDescription: "Leave malicious USB devices in public places for curious victims to plug into their computers.",
    howItWorks: "Attackers leave USB drives or devices in areas where target employees might find them. When plugged in, these devices can install malware, capture keystrokes, or create backdoors.",
    impact: [
      "Malware installation",
      "Network compromise",
      "Data theft",
      "Backdoor establishment"
    ],
    prevention: [
      "Disable USB ports or use device control",
      "Employee security awareness training",
      "Automated scanning of USB devices",
      "Physical security policies"
    ],
    steps: [
      { title: "Device preparation", description: "Malicious USB device created", technique: "Resource Development" },
      { title: "Strategic placement", description: "Device left in target location", technique: "Initial Access" },
      { title: "Victim curiosity", description: "Employee finds and plugs in device", technique: "User Execution" },
      { title: "System compromise", description: "Malware executes and compromises system", technique: "Execution" }
    ],
    Animation: PlaceholderAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What's the best defense against USB drop attacks?",
        options: ["Antivirus only", "Disable unused USB ports", "Strong passwords", "Firewall"],
        answer: 1,
        explanation: "Disabling or controlling USB ports prevents malicious devices from being connected."
      }
    ],
    difficulty: "beginner" as AttackDifficulty,
    impactLevel: "high" as AttackImpact,
    tactic: "initial-access" as AttackTactic,
    osiLayer: 1,
    targets: ["USB ports", "Employee curiosity", "Physical security"],
    detectionDifficulty: "intermediate" as AttackDifficulty,
    realWorldExamples: ["Rubber Ducky", "USB drop tests", "BadUSB attacks"]
  }
];

// Export all additional attacks
export const additionalAttacks = [
  ...wirelessAttacks,
  ...cloudAttacks,
  ...mobileAttacks,
  ...industrialAttacks,
  ...aiAttacks,
  ...cryptoAttacks,
  ...physicalAttacks
];

// Additional category metadata
export const categoryMetadata = {
  "wireless-iot": {
    name: "Wireless & IoT",
    description: "Attacks on wireless protocols and Internet of Things devices",
    icon: Wifi,
    color: "blue"
  },
  "cloud": {
    name: "Cloud Attacks",
    description: "Exploits targeting cloud infrastructure and services",
    icon: Cloud,
    color: "orange"
  },
  "mobile": {
    name: "Mobile Attacks",
    description: "Threats targeting smartphones and mobile devices",
    icon: Smartphone,
    color: "purple"
  },
  "industrial": {
    name: "Industrial & Infrastructure",
    description: "Attacks on critical infrastructure and industrial systems",
    icon: Factory,
    color: "red"
  },
  "ai-modern": {
    name: "AI & Modern Attacks",
    description: "Emerging threats using artificial intelligence and modern techniques",
    icon: Cpu,
    color: "purple"
  },
  "cryptocurrency": {
    name: "Cryptocurrency & Blockchain",
    description: "Attacks targeting digital assets and blockchain systems",
    icon: Bitcoin,
    color: "orange"
  },
  "physical": {
    name: "Physical Cyber Attacks",
    description: "Hardware-based and physical security attacks",
    icon: Usb,
    color: "red"
  }
};

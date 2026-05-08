import { 
  Bug, Database, Mail, Lock, User, Network, Router, Globe, 
  Package, Code, Key, ArrowRight, ShieldX
} from "lucide-react";
import type { Attack, AttackCategory, AttackDifficulty, AttackImpact, AttackTactic } from "../types";

import { 
  PacketSniffingAnimation, ARPSpoofingAnimation, VirusAnimation, 
  RansomwareAnimation, SQLInjectionAnimation, XSSAnimation,
  BruteForceAnimation, PhishingAnimation, WiFiCrackingAnimation,
  MobileMalwareAnimation, CloudMisconfigAnimation,
  AIPhishingAnimation, CryptoPhishingAnimation,
  USBDropAnimation, DefaultAttackAnimation
} from "../animations/ComprehensiveAnimations";

// Placeholder preview components
const PlaceholderPreview = () => null;

// Network Attacks
export const networkAttacks: Attack[] = [
  {
    id: "packet-sniffing",
    name: "Packet Sniffing",
    tagline: "Eavesdrop on network traffic",
    category: "network" as AttackCategory,
    accent: "blue",
    icon: Network,
    shortDescription: "Intercept and analyze data packets flowing across a network to capture sensitive information.",
    howItWorks: "Attackers use packet sniffing tools to capture raw network traffic. On unencrypted networks (like public Wi-Fi), this can reveal passwords, session cookies, and other sensitive data. Even on encrypted networks, metadata and patterns can still be valuable.",
    impact: [
      "Theft of credentials and session tokens",
      "Exposure of sensitive corporate data",
      "Reconnaissance for further attacks",
      "Privacy violations and data breaches"
    ],
    prevention: [
      "Use HTTPS/TLS encryption everywhere",
      "Implement network segmentation",
      "Use VPNs on untrusted networks",
      "Monitor for unauthorized packet capture tools"
    ],
    steps: [
      { title: "Network access", description: "Attacker gains access to network segment", technique: "Initial Access" },
      { title: "Sniffer deployed", description: "Packet capture tool activated on interface", technique: "Collection" },
      { title: "Traffic captured", description: "Raw packets collected and stored for analysis", technique: "Collection" },
      { title: "Data extracted", description: "Sensitive information parsed from captured packets", technique: "Data from Local System" }
    ],
    Animation: PacketSniffingAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "Which encryption protocol best prevents packet sniffing?",
        options: ["HTTP", "FTP", "HTTPS/TLS", "Telnet"],
        answer: 2,
        explanation: "HTTPS/TLS encrypts the entire communication channel, making packet contents unreadable to sniffers."
      }
    ],
    difficulty: "intermediate" as AttackDifficulty,
    impactLevel: "high" as AttackImpact,
    tactic: "collection" as AttackTactic,
    osiLayer: 3,
    targets: ["Network infrastructure", "Unencrypted communications"],
    detectionDifficulty: "intermediate" as AttackDifficulty,
    realWorldExamples: ["Cain & Abel", "Wireshark", "tcpdump", "Dsniff"]
  },
  {
    id: "arp-spoofing",
    name: "ARP Spoofing",
    tagline: "Fake MAC addresses on the network",
    category: "network" as AttackCategory,
    accent: "purple",
    icon: Router,
    shortDescription: "Manipulate ARP tables to redirect network traffic through the attacker's machine.",
    howItWorks: "Attackers send forged ARP messages to associate their MAC address with the IP address of another host (like the default gateway). This causes traffic intended for the target to be sent to the attacker instead.",
    impact: [
      "Man-in-the-middle attacks",
      "Session hijacking",
      "Data interception",
      "Denial of service"
    ],
    prevention: [
      "Dynamic ARP inspection",
      "Static ARP entries for critical systems",
      "Network segmentation",
      "ARP monitoring tools"
    ],
    steps: [
      { title: "Network discovery", description: "Attacker identifies target hosts and gateway", technique: "Discovery" },
      { title: "ARP poisoning", description: "Fake ARP messages sent to redirect traffic", technique: "Execution" },
      { title: "Traffic redirection", description: "Victim's traffic flows through attacker", technique: "Lateral Movement" },
      { title: "Data capture", description: "Attacker intercepts and potentially modifies traffic", technique: "Collection" }
    ],
    Animation: ARPSpoofingAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What protocol does ARP spoofing attack?",
        options: ["IP", "TCP", "ARP", "HTTP"],
        answer: 2,
        explanation: "ARP (Address Resolution Protocol) maps IP addresses to MAC addresses and is vulnerable to spoofing."
      }
    ],
    difficulty: "intermediate" as AttackDifficulty,
    impactLevel: "high" as AttackImpact,
    tactic: "execution" as AttackTactic,
    osiLayer: 2,
    targets: ["Local networks", "Switches", "Routers"],
    detectionDifficulty: "intermediate" as AttackDifficulty,
    realWorldExamples: ["ARPspoof", "Ettercap", "BetterCAP"]
  },
  {
    id: "dns-spoofing",
    name: "DNS Spoofing",
    tagline: "Redirect domains to malicious servers",
    category: "network" as AttackCategory,
    accent: "green",
    icon: Globe,
    shortDescription: "Corrupt DNS cache to redirect users from legitimate websites to malicious ones.",
    howItWorks: "Attackers inject false DNS records into DNS resolvers or local caches. When users try to visit legitimate domains, they're redirected to attacker-controlled servers that may host malware or phishing pages.",
    impact: [
      "Phishing attacks",
      "Malware distribution",
      "Session hijacking",
      "Data theft"
    ],
    prevention: [
      "DNSSEC implementation",
      "Use reputable DNS servers",
      "DNS monitoring and validation",
      "Certificate pinning"
    ],
    steps: [
      { title: "DNS compromise", description: "Attacker gains access to DNS resolver", technique: "Initial Access" },
      { title: "Cache poisoning", description: "Malicious DNS records injected", technique: "Execution" },
      { title: "User query", description: "Victim requests legitimate domain", technique: "User Execution" },
      { title: "Malicious redirect", description: "User sent to attacker-controlled server", technique: "Impact" }
    ],
    Animation: DefaultAttackAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "Which security protocol helps prevent DNS spoofing?",
        options: ["HTTPS", "DNSSEC", "SSH", "SMTP"],
        answer: 1,
        explanation: "DNSSEC adds cryptographic signatures to DNS records, preventing tampering and spoofing."
      }
    ],
    difficulty: "advanced" as AttackDifficulty,
    impactLevel: "critical" as AttackImpact,
    tactic: "initial-access" as AttackTactic,
    osiLayer: 7,
    targets: ["DNS servers", "Local DNS caches", "Domain names"],
    detectionDifficulty: "advanced" as AttackDifficulty,
    realWorldExamples: ["DNS cache poisoning attacks", "DNS changer malware"]
  }
];

// Malware Attacks
export const malwareAttacks: Attack[] = [
  {
    id: "virus",
    name: "Virus",
    tagline: "Self-replicating malicious code",
    category: "malware" as AttackCategory,
    accent: "red",
    icon: Bug,
    shortDescription: "Malicious code that attaches itself to legitimate programs and spreads when those programs are executed.",
    howItWorks: "Viruses embed themselves in executable files. When the infected program runs, the virus code executes first, often infecting other files and performing malicious actions like data theft or system damage.",
    impact: [
      "Data corruption or destruction",
      "System performance degradation",
      "Spread to other systems",
      "Backdoor installation"
    ],
    prevention: [
      "Antivirus/antimalware software",
      "Regular system updates",
      "Application whitelisting",
      "User education on safe downloads"
    ],
    steps: [
      { title: "Infection", description: "Virus attaches to legitimate executable", technique: "Initial Access" },
      { title: "Activation", description: "User runs infected program", technique: "User Execution" },
      { title: "Replication", description: "Virus spreads to other files", technique: "Persistence" },
      { title: "Payload execution", description: "Malicious actions performed", technique: "Impact" }
    ],
    Animation: VirusAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "How do viruses typically spread?",
        options: ["Network packets", "Infected executable files", "Email only", "Websites"],
        answer: 1,
        explanation: "Viruses spread primarily through infected executable files that users run on their systems."
      }
    ],
    difficulty: "intermediate" as AttackDifficulty,
    impactLevel: "medium" as AttackImpact,
    tactic: "persistence" as AttackTactic,
    osiLayer: 7,
    targets: ["Executable files", "System files", "Documents"],
    detectionDifficulty: "beginner" as AttackDifficulty,
    realWorldExamples: ["ILOVEYOU virus", "Melissa", "CIH", "Storm Worm"]
  },
  {
    id: "ransomware",
    name: "Ransomware",
    tagline: "Encrypt files and demand payment",
    category: "malware" as AttackCategory,
    accent: "red",
    icon: Lock,
    shortDescription: "A malicious payload runs on the victim's machine, spreads laterally, encrypts every file it can reach, and leaves a ransom note.",
    howItWorks: "Most ransomware lands via phishing or exploited public services. The payload escalates privileges, disables backups and AV, then walks the filesystem encrypting files with a fast symmetric cipher whose key is itself encrypted with the attacker's public key. Modern crews also exfiltrate sensitive data first ('double extortion') so paying for decryption isn't enough — they also threaten to leak.",
    impact: [
      "Days-to-weeks of operational downtime (hospitals, factories, schools)",
      "Average ransom now in the millions of dollars",
      "Data leak even after paying — 'double extortion' is the norm",
      "Catastrophic loss when backups aren't immutable / off-network"
    ],
    prevention: [
      "Immutable, off-network backups tested with real restore drills",
      "EDR with behaviour-based detection, not just signatures",
      "Application allow-listing on critical endpoints",
      "Aggressive patching of internet-facing services and VPN gateways"
    ],
    steps: [
      { title: "Delivery", description: "Ransomware delivered via phishing or exploit", technique: "Initial Access" },
      { title: "Execution & persistence", description: "Payload runs, escalates privileges, disables backups and AV, installs persistence", technique: "Execution" },
      { title: "Mass encryption", description: "Files across local drives and reachable network shares are encrypted with attacker-controlled keys", technique: "Data Encrypted for Impact" },
      { title: "Ransom note", description: "Victim sees a ransom note with payment instructions and a leak-site countdown", technique: "Inhibit Recovery" }
    ],
    Animation: RansomwareAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What is the most effective defense against ransomware?",
        options: ["Strong passwords", "Regular offline backups", "Firewall", "Antivirus"],
        answer: 1,
        explanation: "Regular, tested offline backups ensure you can restore data without paying the ransom."
      }
    ],
    difficulty: "advanced" as AttackDifficulty,
    impactLevel: "critical" as AttackImpact,
    tactic: "impact" as AttackTactic,
    osiLayer: 7,
    targets: ["Files", "Databases", "Network shares"],
    detectionDifficulty: "intermediate" as AttackDifficulty,
    realWorldExamples: ["WannaCry", "NotPetya", "Colonial Pipeline", "Maze"]
  },
  {
    id: "trojan",
    name: "Trojan Horse",
    tagline: "Disguised malware in legitimate software",
    category: "malware" as AttackCategory,
    accent: "orange",
    icon: Package,
    shortDescription: "Malicious program disguised as legitimate software that tricks users into installing it.",
    howItWorks: "Trojans appear as useful or desirable software but contain hidden malicious functionality. Once installed, they can steal data, install backdoors, or download additional malware.",
    impact: [
      "Data theft",
      "System compromise",
      "Backdoor installation",
      "Additional malware delivery"
    ],
    prevention: [
      "Software verification and digital signatures",
      "Application whitelisting",
      "Security awareness training",
      "Sandbox testing of new software"
    ],
    steps: [
      { title: "Distribution", description: "Trojan distributed via download or email", technique: "Initial Access" },
      { title: "Installation", description: "User installs what appears to be legitimate software", technique: "User Execution" },
      { title: "Activation", description: "Hidden malicious code executes", technique: "Execution" },
      { title: "Compromise", description: "System compromised and data exfiltrated", technique: "Collection" }
    ],
    Animation: DefaultAttackAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What makes Trojan horses effective?",
        options: ["Self-replication", "Social engineering", "Network spreading", "Encryption"],
        answer: 1,
        explanation: "Trojans rely on social engineering to trick users into voluntarily installing malicious software."
      }
    ],
    difficulty: "intermediate" as AttackDifficulty,
    impactLevel: "high" as AttackImpact,
    tactic: "initial-access" as AttackTactic,
    osiLayer: 7,
    targets: ["User trust", "Software installation"],
    detectionDifficulty: "intermediate" as AttackDifficulty,
    realWorldExamples: ["Emotet", "Zeus", "DarkSide", "TrickBot"]
  }
];

// Web Application Attacks
export const webAppAttacks: Attack[] = [
  {
    id: "sql-injection",
    name: "SQL Injection",
    tagline: "Database query manipulation",
    category: "web-application" as AttackCategory,
    accent: "lime",
    icon: Database,
    shortDescription: "Inject malicious SQL code into input fields to manipulate database queries.",
    howItWorks: "Attackers input SQL commands into web form fields or URL parameters. If the application doesn't properly sanitize input, these commands get executed by the database, allowing data theft, modification, or system compromise.",
    impact: [
      "Complete database compromise",
      "Data theft and modification",
      "Authentication bypass",
      "Remote code execution"
    ],
    prevention: [
      "Parameterized queries",
      "Input validation and sanitization",
      "Least privilege database access",
      "Web application firewalls"
    ],
    steps: [
      { title: "Discovery", description: "Attacker probes for SQL injection vulnerabilities", technique: "Active Scanning" },
      { title: "Payload crafting", description: "Malicious SQL code constructed", technique: "Execution" },
      { title: "Injection", description: "Payload submitted to vulnerable parameter", technique: "Exploitation" },
      { title: "Database access", description: "Attacker gains database access or control", technique: "Collection" }
    ],
    Animation: DefaultAttackAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What's the primary defense against SQL injection?",
        options: ["Strong passwords", "Parameterized queries", "HTTPS", "Firewalls"],
        answer: 1,
        explanation: "Parameterized queries separate SQL code from data, preventing injection attacks."
      }
    ],
    difficulty: "intermediate" as AttackDifficulty,
    impactLevel: "critical" as AttackImpact,
    tactic: "initial-access" as AttackTactic,
    osiLayer: 7,
    targets: ["Web applications", "Databases", "Input fields"],
    detectionDifficulty: "intermediate" as AttackDifficulty,
    realWorldExamples: ["SQLMap", "HAVIJ", "Bobby Tables", "OWASP Top 10"]
  },
  {
    id: "xss",
    name: "Cross-Site Scripting (XSS)",
    tagline: "Inject malicious scripts into web pages",
    category: "web-application" as AttackCategory,
    accent: "amber",
    icon: Code,
    shortDescription: "Inject malicious scripts into trusted websites to execute in victims' browsers.",
    howItWorks: "Attackers inject JavaScript or other script code into web pages that other users will view. When victims load the compromised page, the malicious script executes in their browser with the site's permissions.",
    impact: [
      "Session hijacking",
      "Credential theft",
      "Defacement",
      "Malware distribution"
    ],
    prevention: [
      "Input validation and output encoding",
      "Content Security Policy (CSP)",
      "HTTP-only cookies",
      "XSS filters and WAFs"
    ],
    steps: [
      { title: "Vulnerability identification", description: "Attacker finds XSS-prone input points", technique: "Discovery" },
      { title: "Payload creation", description: "Malicious script crafted", technique: "Execution" },
      { title: "Injection", description: "Script injected into web application", technique: "Exploitation" },
      { title: "Victim execution", description: "Script runs in victim's browser", technique: "Impact" }
    ],
    Animation: DefaultAttackAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What type of XSS executes immediately when a page loads?",
        options: ["Stored XSS", "Reflected XSS", "DOM-based XSS", "All of the above"],
        answer: 1,
        explanation: "Stored XSS is permanently stored on the server and executes when any user loads the compromised page."
      }
    ],
    difficulty: "intermediate" as AttackDifficulty,
    impactLevel: "high" as AttackImpact,
    tactic: "execution" as AttackTactic,
    osiLayer: 7,
    targets: ["Web browsers", "Web applications", "User sessions"],
    detectionDifficulty: "intermediate" as AttackDifficulty,
    realWorldExamples: ["Samy worm", "MySpace XSS", "TweetDeck XSS"]
  },
  {
    id: "csrf",
    name: "Cross-Site Request Forgery (CSRF)",
    tagline: "Trick users into unwanted actions",
    category: "web-application" as AttackCategory,
    accent: "pink",
    icon: ArrowRight,
    shortDescription: "Force authenticated users to perform unwanted actions on web applications where they're currently authenticated.",
    howItWorks: "Attackers create malicious web pages that automatically submit forms or make requests to target sites. Since the browser includes valid session cookies, the target site processes these as legitimate user actions.",
    impact: [
      "Unauthorized transactions",
      "Account modification",
      "Data theft",
      "Privilege escalation"
    ],
    prevention: [
      "CSRF tokens",
      "SameSite cookie attributes",
      "Reauthentication for sensitive actions",
      "Origin/Referer validation"
    ],
    steps: [
      { title: "Victim authentication", description: "User logs into target website", technique: "Initial Access" },
      { title: "Malicious page visit", description: "User visits attacker's malicious page", technique: "User Execution" },
      { title: "Forged request", description: "Malicious page auto-submits request to target", technique: "Execution" },
      { title: "Unauthorized action", description: "Target site processes malicious request", technique: "Impact" }
    ],
    Animation: DefaultAttackAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What's the primary defense against CSRF?",
        options: ["HTTPS", "CSRF tokens", "Strong passwords", "Firewalls"],
        answer: 1,
        explanation: "CSRF tokens ensure requests originate from the legitimate application, not malicious third parties."
      }
    ],
    difficulty: "intermediate" as AttackDifficulty,
    impactLevel: "medium" as AttackImpact,
    tactic: "execution" as AttackTactic,
    osiLayer: 7,
    targets: ["Authenticated sessions", "Web forms", "API endpoints"],
    detectionDifficulty: "advanced" as AttackDifficulty,
    realWorldExamples: ["Netflix CSRF", "Gmail CSRF", "Banking CSRF attacks"]
  }
];

// Authentication Attacks
export const authAttacks: Attack[] = [
  {
    id: "brute-force",
    name: "Brute Force Attack",
    tagline: "Try every possible combination",
    category: "authentication" as AttackCategory,
    accent: "red",
    icon: ShieldX,
    shortDescription: "Systematically try all possible passwords or encryption keys until the correct one is found.",
    howItWorks: "Attackers use automated tools to try password combinations against login interfaces. Modern attacks use wordlists, common password patterns, and can be distributed across multiple machines.",
    impact: [
      "Account compromise",
      "Unauthorized access",
      "Data breach",
      "System takeover"
    ],
    prevention: [
      "Strong password policies",
      "Account lockout policies",
      "Multi-factor authentication",
      "Rate limiting"
    ],
    steps: [
      { title: "Target identification", description: "Attacker identifies login interface", technique: "Discovery" },
      { title: "Dictionary/wordlist preparation", description: "Password candidates compiled", technique: "Resource Development" },
      { title: "Automated testing", description: "Passwords tried systematically", technique: "Credential Access" },
      { title: "Successful compromise", description: "Valid credentials found", technique: "Initial Access" }
    ],
    Animation: DefaultAttackAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What's most effective against brute force attacks?",
        options: ["Complex passwords", "Account lockout", "Encryption", "Firewalls"],
        answer: 1,
        explanation: "Account lockout after failed attempts stops brute force attacks by preventing unlimited tries."
      }
    ],
    difficulty: "beginner" as AttackDifficulty,
    impactLevel: "medium" as AttackImpact,
    tactic: "credential-access" as AttackTactic,
    osiLayer: 7,
    targets: ["Login interfaces", "Password files", "Encryption keys"],
    detectionDifficulty: "beginner" as AttackDifficulty,
    realWorldExamples: ["THC Hydra", "Medusa", "John the Ripper", "Hashcat"]
  },
  {
    id: "credential-stuffing",
    name: "Credential Stuffing",
    tagline: "Reuse stolen credentials across sites",
    category: "authentication" as AttackCategory,
    accent: "orange",
    icon: Key,
    shortDescription: "Use stolen username/password pairs to gain unauthorized access to user accounts.",
    howItWorks: "Attackers take credential dumps from breached sites and automatically try them on other websites. Since users often reuse passwords, many of these attempts succeed.",
    impact: [
      "Mass account compromise",
      "Financial fraud",
      "Identity theft",
      "Reputational damage"
    ],
    prevention: [
      "Unique passwords per site",
      "Password breach detection services",
      "Multi-factor authentication",
      "Anomaly detection"
    ],
    steps: [
      { title: "Credential acquisition", description: "Stolen credentials obtained from breaches", technique: "Resource Development" },
      { title: "Target selection", description: "High-value websites identified", technique: "Discovery" },
      { title: "Automated testing", description: "Credentials tried across multiple sites", technique: "Credential Access" },
      { title: "Account takeover", description: "Successful compromises exploited", technique: "Impact" }
    ],
    Animation: DefaultAttackAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What makes credential stuffing effective?",
        options: ["Weak passwords", "Password reuse across sites", "No encryption", "Old software"],
        answer: 1,
        explanation: "Credential stuffing works because users often reuse the same passwords across multiple websites."
      }
    ],
    difficulty: "intermediate" as AttackDifficulty,
    impactLevel: "high" as AttackImpact,
    tactic: "credential-access" as AttackTactic,
    osiLayer: 7,
    targets: ["User accounts", "Login systems", "Web applications"],
    detectionDifficulty: "intermediate" as AttackDifficulty,
    realWorldExamples: ["Have I Been Pwned", "Credential stuffing bots", "Account takeover fraud"]
  }
];

// Social Engineering Attacks
export const socialEngineeringAttacks: Attack[] = [
  {
    id: "phishing",
    name: "Phishing",
    tagline: "Trick humans into revealing secrets",
    category: "social-engineering" as AttackCategory,
    accent: "amber",
    icon: Mail,
    shortDescription: "Fraudulent attempts to obtain sensitive information by disguising as trustworthy entities.",
    howItWorks: "Attackers send emails or messages that appear legitimate, directing victims to fake websites or requesting information. These messages create urgency or fear to bypass rational thinking.",
    impact: [
      "Credential theft",
      "Financial loss",
      "Malware installation",
      "Reputational damage"
    ],
    prevention: [
      "Security awareness training",
      "Email filtering and authentication",
      "URL verification practices",
      "Multi-factor authentication"
    ],
    steps: [
      { title: "Target selection", description: "Victims identified and researched", technique: "Resource Development" },
      { title: "Lure creation", description: "Convincing phishing message crafted", technique: "Execution" },
      { title: "Delivery", description: "Phishing message sent to targets", technique: "Initial Access" },
      { title: "Information capture", description: "Victims reveal sensitive information", technique: "Collection" }
    ],
    Animation: DefaultAttackAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What's the most effective anti-phishing measure?",
        options: ["Spam filters", "User training", "Antivirus", "Firewalls"],
        answer: 1,
        explanation: "Well-trained users are the last line of defense against sophisticated phishing attacks."
      }
    ],
    difficulty: "beginner" as AttackDifficulty,
    impactLevel: "high" as AttackImpact,
    tactic: "initial-access" as AttackTactic,
    osiLayer: 7,
    targets: ["Humans", "Email systems", "Trust relationships"],
    detectionDifficulty: "intermediate" as AttackDifficulty,
    realWorldExamples: ["Business Email Compromise", "Spear phishing", "Clone phishing"]
  },
  {
    id: "pretexting",
    name: "Pretexting",
    tagline: "Create believable scenarios",
    category: "social-engineering" as AttackCategory,
    accent: "purple",
    icon: User,
    shortDescription: "Create fabricated scenarios to manipulate victims into divulging information or performing actions.",
    howItWorks: "Attackers research targets and create detailed, believable pretexts or scenarios. They might impersonate IT support, law enforcement, or other authority figures to gain trust and compliance.",
    impact: [
      "Information disclosure",
      "Unauthorized access",
      "Policy bypass",
      "Physical access"
    ],
    prevention: [
      "Verification procedures",
      "Information classification",
      "Access control policies",
      "Security awareness"
    ],
    steps: [
      { title: "Target research", description: "Victim information gathered", technique: "Discovery" },
      { title: "Scenario creation", description: "Believable pretext developed", technique: "Resource Development" },
      { title: "Approach", description: "Attacker engages target with pretext", technique: "Initial Access" },
      { title: "Information gathering", description: "Target complies and reveals information", technique: "Collection" }
    ],
    Animation: DefaultAttackAnimation,
    Preview: PlaceholderPreview,
    quiz: [
      {
        question: "What makes pretexting effective?",
        options: ["Technical skills", "Research and preparation", "Malware", "Network access"],
        answer: 1,
        explanation: "Pretexting relies on thorough research and creating believable scenarios to manipulate human psychology."
      }
    ],
    difficulty: "advanced" as AttackDifficulty,
    impactLevel: "medium" as AttackImpact,
    tactic: "initial-access" as AttackTactic,
    osiLayer: 7,
    targets: ["Human psychology", "Trust relationships", "Information"],
    detectionDifficulty: "advanced" as AttackDifficulty,
    realWorldExamples: ["IT support scams", "IRS impersonation", "CEO fraud"]
  }
];

// Export all attacks
export const allAttacks = [
  ...networkAttacks,
  ...malwareAttacks,
  ...webAppAttacks,
  ...authAttacks,
  ...socialEngineeringAttacks
];

// Category metadata for UI organization
export const categoryMetadata = {
  "network": {
    name: "Network Attacks",
    description: "Attacks targeting network infrastructure and protocols",
    icon: Network,
    color: "blue"
  },
  "malware": {
    name: "Malware Attacks",
    description: "Malicious software that compromises systems",
    icon: Bug,
    color: "red"
  },
  "web-application": {
    name: "Web Application Attacks",
    description: "Exploits targeting web applications and services",
    icon: Globe,
    color: "lime"
  },
  "authentication": {
    name: "Authentication Attacks",
    description: "Attacks on identity and access controls",
    icon: Lock,
    color: "orange"
  },
  "social-engineering": {
    name: "Social Engineering",
    description: "Manipulating humans to bypass security controls",
    icon: User,
    color: "amber"
  }
};

import { Bug, Database, EyeOff, Mail, Server } from "lucide-react";
import type { Attack } from "../types";
import PhishingAnimation from "../animations/PhishingAnimation";
import DDoSAnimation from "../animations/DDoSAnimation";
import SQLiAnimation from "../animations/SQLiAnimation";
import MITMAnimation from "../animations/MITMAnimation";
import RansomwareAnimation from "../animations/RansomwareAnimation";
import {
  PhishingPreview,
  DDoSPreview,
  SQLiPreview,
  MITMPreview,
  RansomwarePreview,
} from "../animations/Previews";

/**
 * Curated set of attacks. To add a new attack:
 *   1. Build an `Animation` component (full-size) and a `Preview` component.
 *   2. Append a new entry to this array — UI updates automatically.
 */
export const attacks: Attack[] = [
  {
    id: "phishing",
    name: "Phishing",
    tagline: "Trick a human into handing over the keys",
    category: "Social engineering",
    accent: "amber",
    icon: Mail,
    shortDescription:
      "Attackers impersonate a trusted brand to lure a victim into clicking a malicious link and entering credentials on a fake login page.",
    howItWorks:
      "The attacker crafts a message — usually email, but increasingly SMS or chat — that mimics a service the victim trusts. The link points to a lookalike domain that proxies or mirrors the real login page. When the victim submits credentials (and any 2FA code), the attacker captures them in real time and uses them to take over the account.",
    impact: [
      "Full account takeover and lateral movement into corporate systems",
      "Business Email Compromise scams averaging $130k+ per incident",
      "Initial access for ransomware crews — phishing is the #1 entry vector",
      "Reputational and regulatory damage from leaked customer data",
    ],
    prevention: [
      "Phishing-resistant MFA (FIDO2 / passkeys) instead of SMS or TOTP",
      "Strict DMARC, SPF, and DKIM on every domain you own",
      "Browser isolation and link-rewriting at the email gateway",
      "Recurring user training with real-looking simulated lures",
    ],
    steps: [
      {
        title: "Lure crafted",
        description:
          "Attacker spoofs a brand the victim trusts and registers a lookalike domain.",
        technique: "Initial Resource Development",
      },
      {
        title: "Email delivered",
        description: "Lure lands in the inbox — often bypassing weak SPF/DKIM.",
        technique: "Phishing — T1566",
      },
      {
        title: "Victim clicks",
        description:
          "Victim opens the link and submits credentials on the fake page.",
        technique: "User Execution — T1204",
      },
      {
        title: "Credentials exfiltrated",
        description:
          "Attacker logs into the real service and pivots from there.",
        technique: "Valid Accounts — T1078",
      },
    ],
    Animation: PhishingAnimation,
    Preview: PhishingPreview,
    quiz: [
      {
        question: "Which 2FA method is considered phishing-resistant?",
        options: ["SMS one-time codes", "TOTP authenticator apps", "FIDO2 / passkeys", "Email codes"],
        answer: 2,
        explanation:
          "FIDO2 / passkeys bind the credential to the real origin, so a lookalike domain cannot replay it.",
      },
      {
        question: "What email protocol helps detect spoofed sender domains?",
        options: ["SMTP", "IMAP", "DMARC", "POP3"],
        answer: 2,
        explanation:
          "DMARC builds on SPF and DKIM and tells receivers what to do when a message fails authentication.",
      },
    ],
  },
  {
    id: "ddos",
    name: "DDoS",
    tagline: "Drown the service in junk traffic",
    category: "Availability",
    accent: "magenta",
    icon: Server,
    shortDescription:
      "A botnet of compromised devices floods a target with so many requests that legitimate users can't get through.",
    howItWorks:
      "An attacker controls thousands of compromised devices (IoT cameras, routers, infected PCs) through a command-and-control channel. On a signal, every bot fires traffic at the target — TCP/UDP floods, HTTP floods, or amplified reflection attacks via DNS/NTP. The target's connection table, CPU, or upstream bandwidth saturates and legitimate users see timeouts.",
    impact: [
      "Outages costing e-commerce sites tens of thousands of dollars per minute",
      "Often used as a smokescreen while attackers exfiltrate data elsewhere",
      "Extortion campaigns demanding ransom to stop the flood",
      "Cascading failure into shared infrastructure (DNS, CDN, payment gateways)",
    ],
    prevention: [
      "Front everything with a scrubbing CDN (Cloudflare, Fastly, AWS Shield)",
      "Aggressive rate limiting and IP reputation scoring at the edge",
      "Anycast DNS so no single PoP is a bottleneck",
      "Auto-scaling + circuit breakers to fail fast under load",
    ],
    steps: [
      {
        title: "Botnet assembled",
        description:
          "Attacker has already compromised thousands of devices via worms, default credentials, or supply-chain backdoors.",
        technique: "Resource Development — T1583.005",
      },
      {
        title: "C2 issues attack order",
        description:
          "Bots receive a target IP/URL and an attack profile (e.g. 1M HTTP/s).",
        technique: "Command and Control — TA0011",
      },
      {
        title: "Traffic flood begins",
        description:
          "Edge connections saturate, legitimate users see latency spikes.",
        technique: "Network Denial of Service — T1498",
      },
      {
        title: "Service goes offline",
        description: "Target tips over and starts dropping all requests.",
        technique: "Endpoint Denial of Service — T1499",
      },
    ],
    Animation: DDoSAnimation,
    Preview: DDoSPreview,
    quiz: [
      {
        question: "Which control most directly reduces DDoS impact?",
        options: [
          "Stronger user passwords",
          "Anycast scrubbing CDN at the edge",
          "Encrypting backups",
          "Rotating database credentials",
        ],
        answer: 1,
        explanation:
          "DDoS is an availability attack — moving the front door to a globally distributed scrubbing layer absorbs the flood.",
      },
      {
        question: "What is a 'reflection' attack?",
        options: [
          "Phishing using mirrored domains",
          "Using public servers (DNS, NTP) to amplify and bounce traffic at a victim",
          "Replaying old session cookies",
          "Encrypting then decrypting traffic to hide it",
        ],
        answer: 1,
        explanation:
          "The attacker sends spoofed-source requests to public servers; their large responses get reflected onto the victim.",
      },
    ],
  },
  {
    id: "sqli",
    name: "SQL Injection",
    tagline: "Make the database run the attacker's query",
    category: "Web application",
    accent: "lime",
    icon: Database,
    shortDescription:
      "Untrusted input is concatenated into a SQL query, letting attackers read, modify, or destroy data — or even run system commands.",
    howItWorks:
      "When an application builds SQL by string-concatenating user input, an attacker can break out of the intended literal and append their own clauses. Classic payloads like `' OR 1=1 --` turn a login query into one that returns every row. More advanced payloads use UNION SELECTs to dump arbitrary tables or stacked queries to write files and execute OS commands.",
    impact: [
      "Mass credential and PII dumps (still the #1 source of leaked-password lists)",
      "Authentication bypass — attacker logs in as anyone, including admins",
      "Data destruction via DROP TABLE or UPDATE statements",
      "Pivot from DB to OS via xp_cmdshell, COPY ... PROGRAM, etc.",
    ],
    prevention: [
      "Parameterised queries / prepared statements — never concatenate input",
      "ORM with bound parameters (Drizzle, Prisma, SQLAlchemy)",
      "Least-privilege DB users (read-only where possible)",
      "Web Application Firewall as defence in depth, not the only layer",
    ],
    steps: [
      {
        title: "Attacker probes input",
        description:
          "Submits a single quote and watches the response for a SQL error or truth-table change.",
        technique: "Active Scanning — T1595",
      },
      {
        title: "Payload injected",
        description:
          "Crafts an input that breaks out of the literal and adds attacker-controlled SQL.",
        technique: "Exploit Public-Facing App — T1190",
      },
      {
        title: "Tampered query runs",
        description:
          "Database executes the malicious query — often bypassing auth.",
        technique: "Server Software Component",
      },
      {
        title: "Data exfiltrated",
        description:
          "Attacker dumps tables row by row, sometimes via blind/time-based techniques.",
        technique: "Data from Local System — T1005",
      },
    ],
    Animation: SQLiAnimation,
    Preview: SQLiPreview,
    quiz: [
      {
        question: "What is the single best defence against SQL injection?",
        options: [
          "Hashing the input client-side",
          "Parameterised queries / prepared statements",
          "Disabling the SELECT command",
          "Renaming all tables",
        ],
        answer: 1,
        explanation:
          "Parameterised queries send code and data over separate channels so user input can never be interpreted as SQL.",
      },
      {
        question: "What does the payload `' OR 1=1 --` typically achieve?",
        options: [
          "Encrypts the database",
          "Crashes the server",
          "Always evaluates to true so the WHERE clause matches every row",
          "Logs the user out",
        ],
        answer: 2,
        explanation:
          "It closes the original quoted literal, adds a tautology, and comments out the rest of the query.",
      },
    ],
  },
  {
    id: "mitm",
    name: "Man-in-the-Middle",
    tagline: "Sit between two parties and read everything",
    category: "Network",
    accent: "violet",
    icon: EyeOff,
    shortDescription:
      "An attacker silently positions themselves between the client and server — sniffing, recording, and even rewriting traffic in flight.",
    howItWorks:
      "On the same Wi-Fi, the attacker poisons ARP/DHCP so the victim's traffic flows through them. They terminate TLS using a forged certificate (helped by stripped HTTPS, weak roots, or willing-to-click users), inspect plaintext, optionally tamper with it, and forward the result to the real server. The attacker is now in the trusted path.",
    impact: [
      "Session-cookie theft and account takeover without ever needing the password",
      "Silent injection of malware payloads into legitimate downloads",
      "Mass surveillance of unencrypted traffic on public networks",
      "Real-time tampering of bank transfers (changing account numbers mid-flight)",
    ],
    prevention: [
      "HTTPS everywhere with HSTS preload — refuses any plaintext fallback",
      "Certificate pinning in mobile/native clients",
      "VPN on untrusted networks (or just always)",
      "Mutual TLS for service-to-service traffic",
    ],
    steps: [
      {
        title: "Direct channel",
        description: "Client and server talking directly over what looks like a secure link.",
        technique: "Baseline",
      },
      {
        title: "Attacker on path",
        description:
          "Rogue Wi-Fi AP or ARP poisoning routes the victim's packets through the attacker.",
        technique: "Adversary-in-the-Middle — T1557",
      },
      {
        title: "Silent observation",
        description:
          "TLS terminated with a forged cert; attacker reads plaintext.",
        technique: "Network Sniffing — T1040",
      },
      {
        title: "Active tampering",
        description:
          "Attacker rewrites requests/responses (e.g. swaps wire-transfer account numbers).",
        technique: "Transmitted Data Manipulation — T1565.002",
      },
    ],
    Animation: MITMAnimation,
    Preview: MITMPreview,
    quiz: [
      {
        question: "Which control prevents most opportunistic MITM on the web?",
        options: [
          "HTTP basic auth",
          "HSTS-preloaded HTTPS",
          "Disabling cookies",
          "Captcha on every page",
        ],
        answer: 1,
        explanation:
          "HSTS forces browsers to refuse any plaintext fallback, eliminating SSL-strip and rogue-AP downgrades.",
      },
      {
        question: "What does certificate pinning protect against?",
        options: [
          "DDoS",
          "A trusted CA being tricked into issuing a fraudulent cert for your domain",
          "SQL injection",
          "Ransomware",
        ],
        answer: 1,
        explanation:
          "Pinning compares the server cert against a known fingerprint, so a rogue cert from any CA is rejected.",
      },
    ],
  },
  {
    id: "ransomware",
    name: "Malware / Ransomware",
    tagline: "Encrypt everything, demand payment",
    category: "Endpoint",
    accent: "cyan",
    icon: Bug,
    shortDescription:
      "A malicious payload runs on the victim's machine, spreads laterally, encrypts every file it can reach, and leaves a ransom note.",
    howItWorks:
      "Most ransomware lands via phishing or exploited public services. The payload escalates privileges, disables backups and AV, then walks the filesystem encrypting files with a fast symmetric cipher whose key is itself encrypted with the attacker's public key. Modern crews also exfiltrate sensitive data first ('double extortion') so paying for decryption isn't enough — they also threaten to leak.",
    impact: [
      "Days-to-weeks of operational downtime (hospitals, factories, schools)",
      "Average ransom now in the millions of dollars",
      "Data leak even after paying — 'double extortion' is the norm",
      "Catastrophic loss when backups aren't immutable / off-network",
    ],
    prevention: [
      "Immutable, off-network backups tested with real restore drills",
      "EDR with behaviour-based detection, not just signatures",
      "Application allow-listing on critical endpoints",
      "Aggressive patching of internet-facing services and VPN gateways",
    ],
    steps: [
      {
        title: "Payload delivered",
        description:
          "Phishing attachment, drive-by download, or an exploited public-facing service.",
        technique: "Initial Access — TA0001",
      },
      {
        title: "Execution & persistence",
        description:
          "Payload runs, escalates privileges, disables backups and AV, installs persistence.",
        technique: "Execution — TA0002",
      },
      {
        title: "Mass encryption",
        description:
          "Files across local drives and reachable network shares are encrypted with attacker-controlled keys.",
        technique: "Data Encrypted for Impact — T1486",
      },
      {
        title: "Ransom note",
        description:
          "Victim sees a ransom note with payment instructions and a leak-site countdown.",
        technique: "Inhibit Recovery — T1490",
      },
    ],
    Animation: RansomwareAnimation,
    Preview: RansomwarePreview,
    quiz: [
      {
        question: "Which backup strategy actually defeats ransomware?",
        options: [
          "Daily backups stored on the same file server",
          "Replicating to a USB drive that stays plugged in",
          "Immutable, off-network backups with periodic restore drills",
          "Backups encrypted with the same domain admin account",
        ],
        answer: 2,
        explanation:
          "If backups are reachable from the compromised network and writable by domain creds, ransomware will encrypt them too.",
      },
      {
        question: "What does 'double extortion' mean?",
        options: [
          "Two separate gangs attacking at once",
          "Encrypting files AND threatening to leak stolen data",
          "Demanding ransom in two cryptocurrencies",
          "Charging for the decryptor twice",
        ],
        answer: 1,
        explanation:
          "Modern crews exfiltrate first, then encrypt — paying for decryption alone doesn't stop the leak.",
      },
    ],
  },
];

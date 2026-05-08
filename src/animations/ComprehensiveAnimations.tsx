import { motion } from "framer-motion";
import { 
  Network, Router, Globe, Wifi, Cloud, 
  Cpu, Bitcoin, Usb, ShieldX, 
  Lock, Bug, Mail, AlertTriangle, Download, Terminal
} from "lucide-react";
import type { AnimationProps } from "../types";

// Generic placeholder animation that shows attack name and basic visualization
const PlaceholderAnimation = ({ step, isPlaying, speed }: AnimationProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/50 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-8 grid-rows-6 w-full h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="border border-cyan-500/20"
              style={{
                animation: isPlaying ? `pulse ${2 / speed}s ease-in-out infinite` : 'none',
                animationDelay: `${(i * 0.1) / speed}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Central attack visualization */}
      <motion.div
        className="relative z-10 text-center"
        animate={{
          scale: isPlaying ? [1, 1.1, 1] : 1,
          rotate: isPlaying ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          duration: 2 / speed,
          repeat: isPlaying ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl border border-cyan-500/40 flex items-center justify-center">
          <ShieldX className="w-16 h-16 text-cyan-400" />
        </div>
        <div className="text-cyan-400 font-mono text-sm">
          Step {step + 1}
        </div>
      </motion.div>

      {/* Animated data flow indicators */}
      {isPlaying && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                opacity: 0
              }}
              animate={{
                x: [null, Math.random() * 100 + '%'],
                y: [null, Math.random() * 100 + '%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 / speed,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Network-specific animations
export const PacketSniffingAnimation = ({ step, isPlaying, speed }: AnimationProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/50 relative">
      <div className="relative w-full max-w-2xl">
        {/* Network representation */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-lg border border-blue-500/40 flex items-center justify-center mb-2">
              <Network className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-xs text-blue-400">Source</div>
          </div>
          
          <div className="flex-1 mx-4">
            <div className="h-1 bg-blue-500/20 relative">
              {isPlaying && (
                <motion.div
                  className="absolute top-1/2 w-2 h-2 bg-blue-400 rounded-full -translate-y-1/2"
                  animate={{ x: ["0%", "100%"] }}
                  transition={{ duration: 2 / speed, repeat: Infinity, ease: "linear" }}
                />
              )}
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-lg border border-red-500/40 flex items-center justify-center mb-2">
              <ShieldX className="w-8 h-8 text-red-400" />
            </div>
            <div className="text-xs text-red-400">Attacker</div>
          </div>
        </div>

        {/* Data packets */}
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="h-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded border border-cyan-500/30 flex items-center justify-center"
              animate={{
                opacity: isPlaying ? [0.3, 1, 0.3] : 0.3,
                scale: isPlaying ? [1, 1.05, 1] : 1
              }}
              transition={{
                duration: 1.5 / speed,
                repeat: isPlaying ? Infinity : 0,
                delay: i * 0.2
              }}
            >
              <div className="text-xs text-cyan-400 font-mono">0x{i.toString(16).padStart(2, '0')}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ARPSpoofingAnimation = ({ step, isPlaying, speed }: AnimationProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/50 relative">
      <div className="relative w-full max-w-2xl">
        {/* Network nodes */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-lg border border-blue-500/40 flex items-center justify-center mb-2">
              <Globe className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-xs text-blue-400">Victim</div>
          </div>
          
          <div className="flex-1 mx-4">
            <div className="h-1 bg-purple-500/20 relative">
              {isPlaying && step >= 1 && (
                <motion.div
                  className="absolute top-1/2 w-2 h-2 bg-purple-400 rounded-full -translate-y-1/2"
                  animate={{ x: ["0%", "100%"] }}
                  transition={{ duration: 2 / speed, repeat: Infinity, ease: "linear" }}
                />
              )}
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-lg border border-purple-500/40 flex items-center justify-center mb-2">
              <Router className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-xs text-purple-400">Router</div>
          </div>
        </div>

        {/* ARP table corruption visualization */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4"
          >
            <div className="text-xs text-purple-400 font-mono mb-2">ARP TABLE CORRUPTED</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-black/50 p-2 rounded">
                <div className="text-purple-300">IP: 192.168.1.100</div>
                <div className="text-red-400">MAC: AA:BB:CC:DD:EE:FF</div>
              </div>
              <div className="bg-black/50 p-2 rounded">
                <div className="text-purple-300">IP: 192.168.1.1</div>
                <div className="text-red-400">MAC: AA:BB:CC:DD:EE:FF</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Malware animations
export const VirusAnimation = ({ step, isPlaying, speed }: AnimationProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/50 relative">
      <div className="relative">
        {/* Host system */}
        <div className="w-32 h-32 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl border border-green-500/40 flex items-center justify-center">
          <Terminal className="w-16 h-16 text-green-400" />
        </div>
        
        {/* Virus spreading */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 10 / speed, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-red-500/60 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 45}deg) translateY(-60px)`
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2 / speed,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        )}
        
        {/* Infection indicator */}
        {step >= 2 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
          >
            <Bug className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export const RansomwareAnimation = ({ step, isPlaying, speed }: AnimationProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/50 relative">
      <div className="text-center space-y-4">
        {/* Files being encrypted */}
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="w-16 h-20 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded border border-blue-500/40 flex items-center justify-center"
              animate={{
                backgroundColor: step >= 2 ? 
                  ["rgb(59, 130, 246, 0.2)", "rgb(239, 68, 68, 0.2)", "rgb(239, 68, 68, 0.2)"] :
                  ["rgb(59, 130, 246, 0.2)", "rgb(34, 197, 94, 0.2)", "rgb(59, 130, 246, 0.2)"]
              }}
              transition={{ duration: 1 / speed, delay: i * 0.2 }}
            >
              {step >= 2 ? (
                <Lock className="w-6 h-6 text-red-400" />
              ) : (
                <Download className="w-6 h-6 text-blue-400" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Ransom note */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/10 border border-red-500/40 rounded-lg p-6 max-w-md"
          >
            <div className="text-red-400 font-bold text-lg mb-2">FILES ENCRYPTED</div>
            <div className="text-red-300 text-sm mb-4">Your files have been encrypted!</div>
            <div className="text-yellow-400 text-xs font-mono">Send 1 BTC to: 1A2b3C...</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Web Application animations
export const SQLInjectionAnimation = ({ step, isPlaying, speed }: AnimationProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/50 relative">
      <div className="text-center space-y-4 max-w-lg">
        {/* Web form */}
        <div className="bg-white/10 border border-white/20 rounded-lg p-4">
          <div className="text-left space-y-2">
            <div className="text-xs text-white/60">Username:</div>
            <div className="bg-black/50 rounded px-2 py-1 text-left text-sm text-green-400 font-mono">
              admin
            </div>
            <div className="text-xs text-white/60">Password:</div>
            <div className="bg-black/50 rounded px-2 py-1 text-left text-sm font-mono">
              {step >= 1 ? (
                <span className="text-red-400">' OR 1=1 --</span>
              ) : (
                <span className="text-gray-400">•••••••••</span>
              )}
            </div>
          </div>
        </div>

        {/* Database query visualization */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-500/10 border border-yellow-500/40 rounded-lg p-4"
          >
            <div className="text-xs text-yellow-400 font-mono mb-2">MODIFIED QUERY:</div>
            <div className="text-sm text-yellow-300 font-mono bg-black/50 p-2 rounded">
              SELECT * FROM users WHERE username='admin' AND password='' OR 1=1 --'
            </div>
          </motion.div>
        )}

        {/* Data breach indicator */}
        {step >= 3 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-full px-4 py-2"
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm font-mono">DATA EXFILTRATED</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export const XSSAnimation = ({ step, isPlaying, speed }: AnimationProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/50 relative">
      <div className="text-center space-y-4 max-w-lg">
        {/* Browser window */}
        <div className="bg-white/10 border border-white/20 rounded-lg overflow-hidden">
          <div className="bg-white/5 px-3 py-2 border-b border-white/10">
            <div className="text-xs text-white/60">https://example.com</div>
          </div>
          <div className="p-4 text-left">
            <div className="text-white text-sm mb-2">Welcome to our website!</div>
            {step >= 1 && (
              <div className="bg-red-500/20 border border-red-500/40 rounded p-2">
                <div className="text-xs text-red-400 font-mono">&gt; malware_installed.exe</div>
              </div>
            )}
          </div>
        </div>

        {/* Script execution */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/10 border border-red-500/40 rounded-lg p-4"
          >
            <div className="text-red-400 font-bold mb-2">SCRIPT EXECUTED!</div>
            <div className="text-red-300 text-sm">Malicious JavaScript is now running</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Authentication animations
export const BruteForceAnimation = ({ step, isPlaying, speed }: AnimationProps) => {
  const attempts = ['123456', 'password', 'admin123', 'letmein', 'qwerty', 'SUCCESS!'];
  
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/50 relative">
      <div className="text-center space-y-4">
        {/* Login form */}
        <div className="bg-white/10 border border-white/20 rounded-lg p-6">
          <div className="text-white text-lg mb-4">Login Attempt #{step + 1}</div>
          <div className="space-y-3">
            <div className="bg-black/50 rounded px-4 py-2 text-left">
              <div className="text-xs text-gray-400">Username:</div>
              <div className="text-sm text-white">admin</div>
            </div>
            <div className="bg-black/50 rounded px-4 py-2 text-left">
              <div className="text-xs text-gray-400">Password:</div>
              <div className="text-sm font-mono">
                {step < attempts.length ? (
                  <span className={step < attempts.length - 1 ? "text-red-400" : "text-green-400"}>
                    {attempts[step]}
                  </span>
                ) : (
                  <span className="text-green-400">ACCESS_GRANTED</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Failed attempts counter */}
        <div className="flex items-center justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < step ? "bg-red-500" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Social Engineering animations
export const PhishingAnimation = ({ step, isPlaying, speed }: AnimationProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/50 relative">
      <div className="text-center space-y-4 max-w-lg">
        {/* Email */}
        <motion.div
          animate={{
            y: isPlaying ? [0, -5, 0] : 0
          }}
          transition={{ duration: 2 / speed, repeat: isPlaying ? Infinity : 0 }}
          className="bg-white/10 border border-white/20 rounded-lg p-4 text-left"
        >
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
            <Mail className="w-4 h-4 text-blue-400" />
            <div className="text-xs text-white/60">From: security@yourbank.com</div>
          </div>
          <div className="text-white text-sm mb-2">URGENT: Account Security Alert</div>
          <div className="text-gray-300 text-xs mb-3">
            We detected suspicious activity on your account. Please click below to verify your identity immediately.
          </div>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-blue-500/20 border border-blue-500/40 rounded p-2 text-center"
            >
              <div className="text-blue-400 text-xs">Click Here to Verify →</div>
            </motion.div>
          )}
        </motion.div>

        {/* Fake site */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/10 border border-red-500/40 rounded-lg p-4"
          >
            <div className="text-red-400 font-bold mb-2">FAKE LOGIN SITE</div>
            <div className="text-red-300 text-xs">Credentials captured!</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Wireless & IoT animations
export const WiFiCrackingAnimation = ({ step, isPlaying, speed }: AnimationProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/50 relative">
      <div className="text-center space-y-4">
        {/* WiFi network */}
        <div className="relative">
          <Wifi className="w-24 h-24 text-blue-400" />
          {isPlaying && (
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 4 / speed, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-32 h-32 border-2 border-blue-400/30 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Cracking progress */}
        <div className="bg-black/50 border border-blue-500/40 rounded-lg p-4 max-w-xs">
          <div className="text-xs text-blue-400 mb-2">Cracking Progress</div>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <motion.div
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: step >= 2 ? "100%" : `${(step + 1) * 25}%` }}
              transition={{ duration: 1 / speed }}
            />
          </div>
          {step >= 3 && (
            <div className="text-green-400 text-xs font-mono">PASSWORD FOUND!</div>
          )}
        </div>
      </div>
    </div>
  );
};

// Mobile animations
export const MobileMalwareAnimation = ({ step, isPlaying, speed }: AnimationProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/50 relative">
      <div className="text-center space-y-4">
        {/* Phone */}
        <div className="relative">
          <div className="w-20 h-40 bg-black border-2 border-gray-600 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-b-lg" />
            
            {/* Screen */}
            <div className="absolute inset-2 bg-white/10">
              {step >= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex items-center justify-center"
                >
                  <Bug className="w-8 h-8 text-red-400" />
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Malware spreading */}
          {step >= 2 && isPlaying && (
            <motion.div
              className="absolute -top-4 -right-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1 / speed, repeat: Infinity }}
            >
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Data theft indicator */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500/40 rounded-lg p-4"
          >
            <div className="text-red-400 text-sm font-mono">DATA EXFILTRATED</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Cloud animations
export const CloudMisconfigAnimation = ({ step, isPlaying, speed }: AnimationProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/50 relative">
      <div className="text-center space-y-4">
        {/* Cloud icon */}
        <Cloud className="w-24 h-24 text-blue-400 mx-auto" />
        
        {/* Storage buckets */}
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-16 h-16 rounded-lg border flex items-center justify-center ${
                i < 3 ? "bg-green-500/20 border-green-500/40" : "bg-red-500/20 border-red-500/40"
              }`}
              animate={{
                scale: isPlaying ? [1, 1.05, 1] : 1
              }}
              transition={{
                duration: 2 / speed,
                repeat: isPlaying ? Infinity : 0,
                delay: i * 0.1
              }}
            >
              <Download className={`w-6 h-6 ${i < 3 ? "text-green-400" : "text-red-400"}`} />
            </motion.div>
          ))}
        </div>

        {/* Misconfiguration warning */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-500/10 border border-yellow-500/40 rounded-lg p-4"
          >
            <div className="text-yellow-400 text-sm font-bold mb-2">PUBLIC ACCESS ENABLED</div>
            <div className="text-yellow-300 text-xs">3 buckets exposed to public!</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// AI & Modern animations
export const AIPhishingAnimation = ({ step, isPlaying, speed }: AnimationProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/50 relative">
      <div className="text-center space-y-4 max-w-lg">
        {/* AI brain */}
        <div className="relative">
          <Cpu className="w-20 h-20 text-purple-400 mx-auto" />
          {isPlaying && (
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 3 / speed, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-8 bg-purple-400/60"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 45}deg) translateY(-20px)`
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Personalized attacks */}
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="bg-purple-500/10 border border-purple-500/40 rounded-lg p-3"
            >
              <Mail className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <div className="text-xs text-purple-300">Personalized Attack #{i + 1}</div>
            </motion.div>
          ))}
        </div>

        {/* AI processing indicator */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-purple-500/10 border border-purple-500/40 rounded-lg p-4"
          >
            <div className="text-purple-400 text-sm font-mono">AI TARGETING: {step + 1} USERS</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Cryptocurrency animations
export const CryptoPhishingAnimation = ({ step, isPlaying, speed }: AnimationProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/50 relative">
      <div className="text-center space-y-4">
        {/* Bitcoin logo */}
        <Bitcoin className="w-20 h-20 text-yellow-400 mx-auto" />
        
        {/* Fake exchange */}
        <div className="bg-yellow-500/10 border border-yellow-500/40 rounded-lg p-6 max-w-sm">
          <div className="text-yellow-400 font-bold mb-4">CryptoExchange.pro</div>
          <div className="space-y-2 text-left">
            <div className="bg-black/50 rounded p-2">
              <div className="text-xs text-gray-400">Send to:</div>
              <div className="text-sm font-mono text-red-400">1A2b3C...Attacker</div>
            </div>
            <div className="bg-black/50 rounded p-2">
              <div className="text-xs text-gray-400">Amount:</div>
              <div className="text-sm text-yellow-400">5.000 BTC</div>
            </div>
          </div>
        </div>

        {/* Theft indicator */}
        {step >= 3 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-red-500/20 border border-red-500/40 rounded-lg p-4"
          >
            <div className="text-red-400 font-bold">CRYPTO STOLEN!</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Physical attacks
export const USBDropAnimation = ({ step, isPlaying, speed }: AnimationProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/50 relative">
      <div className="text-center space-y-4">
        {/* USB drive */}
        <motion.div
          animate={{
            y: isPlaying ? [0, 10, 0] : 0,
            rotate: isPlaying ? [0, 5, -5, 0] : 0
          }}
          transition={{ duration: 2 / speed, repeat: isPlaying ? Infinity : 0 }}
          className="relative"
        >
          <Usb className="w-16 h-16 text-gray-400" />
          {step >= 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
            >
              <Bug className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </motion.div>

        {/* Computer */}
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
          <Terminal className="w-12 h-12 text-green-400" />
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-xs text-red-400 font-mono"
            >
              &gt; malware_installed.exe
            </motion.div>
          )}
        </div>

        {/* Compromise indicator */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500/40 rounded-lg p-4"
          >
            <div className="text-red-400 font-bold">SYSTEM COMPROMISED</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Default placeholder for any attack without specific animation
export const DefaultAttackAnimation = PlaceholderAnimation;

// Export all animations
export const comprehensiveAnimations = {
  // Network
  'packet-sniffing': PacketSniffingAnimation,
  'arp-spoofing': ARPSpoofingAnimation,
  
  // Malware
  'virus': VirusAnimation,
  'ransomware': RansomwareAnimation,
  
  // Web Application
  'sql-injection': SQLInjectionAnimation,
  'xss': XSSAnimation,
  
  // Authentication
  'brute-force': BruteForceAnimation,
  
  // Social Engineering
  'phishing': PhishingAnimation,
  
  // Wireless & IoT
  'wifi-cracking': WiFiCrackingAnimation,
  
  // Mobile
  'mobile-malware': MobileMalwareAnimation,
  
  // Cloud
  'cloud-misconfiguration': CloudMisconfigAnimation,
  
  // AI & Modern
  'ai-phishing': AIPhishingAnimation,
  
  // Cryptocurrency
  'crypto-phishing': CryptoPhishingAnimation,
  
  // Physical
  'usb-drop': USBDropAnimation,
};

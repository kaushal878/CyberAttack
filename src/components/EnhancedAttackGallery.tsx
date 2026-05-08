import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, AlertTriangle } from "lucide-react";
import type { AttackCategory, AttackDifficulty, AttackImpact } from "../types";
import { allAttacks, categoryMetadata } from "../data/comprehensiveAttacks";
import { additionalAttacks, categoryMetadata as additionalCategoryMetadata } from "../data/additionalAttacks";

// Combine all attacks and metadata
const comprehensiveAttacks = [...allAttacks, ...additionalAttacks];
const allCategoryMetadata = { ...categoryMetadata, ...additionalCategoryMetadata };

// Difficulty and impact color mappings
const difficultyColors = {
  beginner: "bg-green-500",
  intermediate: "bg-yellow-500", 
  advanced: "bg-orange-500",
  expert: "bg-red-500"
};

const impactColors = {
  low: "bg-blue-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500", 
  critical: "bg-red-500"
};

// Difficulty and impact labels
const difficultyLabels = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced", 
  expert: "Expert"
};

const impactLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical"
};

interface EnhancedAttackGalleryProps {
  onSelect: (id: string) => void;
}

export default function EnhancedAttackGallery({ onSelect }: EnhancedAttackGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<AttackCategory | "all">("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<AttackDifficulty | "all">("all");
  const [selectedImpact, setSelectedImpact] = useState<AttackImpact | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  // Filter attacks based on search and filters
  const filteredAttacks = useMemo(() => {
    return comprehensiveAttacks.filter(attack => {
      const matchesSearch = attack.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           attack.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           attack.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || attack.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "all" || attack.difficulty === selectedDifficulty;
      const matchesImpact = selectedImpact === "all" || attack.impactLevel === selectedImpact;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesImpact;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedImpact]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(comprehensiveAttacks.map(attack => attack.category)));
    return cats.sort();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          CyberAttack Visualizer
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Explore comprehensive cyberattack simulations with animated visualizations and interactive learning
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search attacks by name, description, or tagline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full">
            {filteredAttacks.length} attacks
          </span>
        </button>

        {/* Filter Options */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-800/30 border border-slate-700 rounded-lg"
            >
              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as AttackCategory | "all")}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {allCategoryMetadata[category]?.name || category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as AttackDifficulty | "all")}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="all">All Difficulties</option>
                  {Object.entries(difficultyLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Impact Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Impact Level</label>
                <select
                  value={selectedImpact}
                  onChange={(e) => setSelectedImpact(e.target.value as AttackImpact | "all")}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="all">All Impact Levels</option>
                  {Object.entries(impactLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Attack Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="wait">
          {filteredAttacks.map((attack, index) => (
            <motion.div
              key={attack.id}
              variants={cardVariants}
              layout
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(attack.id)}
              className="relative group cursor-pointer"
            >
              <div className="relative h-full p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-xl hover:border-cyan-500/50 transition-all duration-300">
                {/* Attack Icon */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${attack.accent}-500 to-${attack.accent}-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <attack.icon className="w-6 h-6 text-white" />
                </div>

                {/* Attack Name and Tagline */}
                <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                  {attack.name}
                </h3>
                <p className="text-sm text-slate-400 italic mb-3">
                  {attack.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-slate-300 line-clamp-3 mb-4">
                  {attack.shortDescription}
                </p>

                {/* Indicators */}
                <div className="flex items-center justify-between mb-4">
                  {/* Difficulty */}
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${difficultyColors[attack.difficulty]}`} />
                    <span className="text-xs text-slate-500">
                      {difficultyLabels[attack.difficulty]}
                    </span>
                  </div>

                  {/* Impact */}
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${impactColors[attack.impactLevel]}`} />
                    <span className="text-xs text-slate-500">
                      {impactLabels[attack.impactLevel]}
                    </span>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-slate-700/50 text-slate-400 px-2 py-1 rounded-full">
                    {allCategoryMetadata[attack.category]?.name || attack.category}
                  </span>
                  
                  {/* OSI Layer */}
                  {attack.osiLayer && (
                    <span className="text-xs bg-slate-700/50 text-slate-400 px-2 py-1 rounded-full">
                      L{attack.osiLayer}
                    </span>
                  )}
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results */}
      {filteredAttacks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <AlertTriangle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-400 mb-2">
            No attacks found
          </h3>
          <p className="text-slate-500">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </motion.div>
      )}

      {/* Stats Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-800/30 border border-slate-700 rounded-lg"
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-400">
            {comprehensiveAttacks.length}
          </div>
          <div className="text-xs text-slate-500">Total Attacks</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">
            {categories.length}
          </div>
          <div className="text-xs text-slate-500">Categories</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {comprehensiveAttacks.filter(a => a.difficulty === 'beginner').length}
          </div>
          <div className="text-xs text-slate-500">Beginner Friendly</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-400">
            {comprehensiveAttacks.filter(a => a.impactLevel === 'critical').length}
          </div>
          <div className="text-xs text-slate-500">Critical Impact</div>
        </div>
      </motion.div>
    </div>
  );
}

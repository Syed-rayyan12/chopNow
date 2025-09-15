"use client";

import React, { useState, ReactNode, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ExpandableDockProps {
  headerContent: ReactNode;
  className?: string;
}

const ExpandableDock = ({ headerContent, className }: ExpandableDockProps) => {
  const [animationStage, setAnimationStage] = useState<
    | "collapsed"
    | "widthExpanding"
    | "heightExpanding"
    | "fullyExpanded"
    | "contentFadingOut"
    | "heightCollapsing"
    | "widthCollapsing"
  >("collapsed");

  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching:", searchQuery);
    } else {
      console.log("Show all restaurants");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleExpand = () => {
    setAnimationStage("widthExpanding");
    setTimeout(() => setAnimationStage("heightExpanding"), 400);
    setTimeout(() => setAnimationStage("fullyExpanded"), 850);
  };

  const handleCollapse = () => {
    setAnimationStage("contentFadingOut");
    setTimeout(() => setAnimationStage("heightCollapsing"), 250);
    setTimeout(() => setAnimationStage("widthCollapsing"), 650);
    setTimeout(() => setAnimationStage("collapsed"), 1050);
  };

  const isCollapsed = animationStage === "collapsed";
  const isExpanded = animationStage === "fullyExpanded";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        isExpanded
      ) {
        handleCollapse();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full px-4 sm:px-0">
      <motion.div
        ref={containerRef}
        initial={{
          width: "min(90vw, 360px)",
          height: 68,
          borderRadius: 999,
        }}
        animate={{
          width:
            animationStage === "collapsed" || animationStage === "widthCollapsing"
              ? "min(90vw, 360px)"
              : "min(90vw, 720px)",
          height:
            animationStage === "collapsed" ||
            animationStage === "widthExpanding" ||
            animationStage === "widthCollapsing"
              ? 68
              : "min(80vh, 300px)",
          borderRadius: isCollapsed ? 999 : 20,
        }}
        transition={{
          width: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
          height: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
          borderRadius: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        }}
        className={cn(
          "bg-white dark:bg-black backdrop-blur-md shadow-2xl overflow-hidden flex flex-col-reverse mx-auto",
          className
        )}
      >
        {/* Dock Header */}
        <div
          onClick={isCollapsed ? handleExpand : handleCollapse}
          className="flex items-center gap-4 px-4 sm:px-6 py-4 text-foreground w-full h-[68px] whitespace-nowrap cursor-pointer border-t border-gray-800 flex-shrink-0"
        >
          {headerContent}
        </div>

        {/* Dock Content */}
        <motion.div
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="p-4 sm:p-6 flex-1 flex flex-col overflow-hidden"
        >
          <div className="overflow-y-hidden overflow-x-auto scrollbar-none">
            {/* 🔍 Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-background rounded-lg shadow-lg text-primary">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for restaurants or dishes"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 bg-transparent border-none"
                />
              </div>
              <div className="flex items-center max-sm:justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap bg-transparent hover:border-none hover:bg-secondary/80"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Current Location
                </Button>
                <Button
                  size="sm"
                  className="whitespace-nowrap bg-secondary hover:bg-secondary/80 text-white cursor-pointer"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ExpandableDock;

import React, { forwardRef } from "react";
import { cn } from "./ClassMerger";
import { motion } from "framer-motion";
export const Button = forwardRef(function Button(
  { className, variant = "default", ...props },
  ref
) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm p-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:cursor-pointer";

  const variantStyles = {
    default: "bg-gradient-to-r from-purple-500 to-cyan-500 text-white ",
    secondary: "bg-gray-800 text-white hover:bg-gray-700",
    outline: "border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white",
    green: "bg-green-500 text-white hover:bg-green-600",
    red: "bg-red-500 text-white hover:bg-red-600",
    destructive: "bg-red-500 text-destructive-foreground hover:bg-red-600",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary",
    edit: "bg-blue-500 text-white hover:bg-blue-600",

  };

  return (
    <motion.button className={cn(baseStyles, variantStyles[variant], className)} ref={ref} {...props} />
  );
});

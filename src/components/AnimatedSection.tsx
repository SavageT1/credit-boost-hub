import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-in" | "scale-in" | "slide-in-right";
}

const AnimatedSection = ({
  children,
  className,
  delay = 0,
  animation = "fade-in",
}: AnimatedSectionProps) => {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const animationClass = {
    "fade-in": "animate-fade-in",
    "scale-in": "animate-scale-in",
    "slide-in-right": "animate-slide-in-right",
  }[animation];

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0",
        isInView && animationClass,
        isInView && "opacity-100",
        className
      )}
      style={{
        animationDelay: isInView ? `${delay}ms` : "0ms",
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;

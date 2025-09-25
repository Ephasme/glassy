import { type CSSProperties, useLayoutEffect, useRef, useState } from "react";
import { mergeRefs } from "react-merge-refs";
import { getDisplacementFilter } from "./getDisplacementFilter";

interface LiquidGlassProps {
  depth?: number;
  depthBlur?: number;
  chromaticAberration?: number;
  scale?: number;
  blur?: number;
  debug?: boolean;
  style: Omit<CSSProperties, "height" | "width">;
  height: CSSProperties["height"];
  width: CSSProperties["width"];
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export function LiquidGlass({
  children,
  chromaticAberration = 5,
  depth = 3.5,
  depthBlur = 25,
  scale = 90,
  blur = 2,
  style,
  height,
  width,
  ref,
}: LiquidGlassProps) {
  const [computedHeight, setComputedHeight] = useState(0);
  const [computedWidth, setComputedWidth] = useState(0);
  const internalRef = useRef<HTMLDivElement | null>(null);
  const mergedRef = mergeRefs([ref, internalRef]);

  const displacementFilter = getDisplacementFilter({
    height: computedHeight,
    width: computedWidth,
    scale,
    chromaticAberration,
    depth,
    depthBlur,
  });

  const innerStyle: CSSProperties = {
    backdropFilter: `blur(${
      blur / 2
    }px) url('${displacementFilter}') blur(${blur}px)`,
    boxShadow: "inset 0 0 4px 0px white",
    ...style,
    height,
    width,
  };

  useLayoutEffect(() => {
    const element = internalRef.current;
    if (!element) return;
    const updateDimensions = () => {
      const rect = element.getBoundingClientRect();
      setComputedHeight(rect.height);
      setComputedWidth(rect.width);
    };
    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(element);
    return () => {
      resizeObserver.disconnect();
    };
  });

  return (
    <div ref={mergedRef} style={innerStyle}>
      {children}
    </div>
  );
}

LiquidGlass.displayName = "LiquidGlass";

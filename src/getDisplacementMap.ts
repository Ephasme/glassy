/**
 * Creating the displacement map that is used by feDisplacementMap filter.
 * Gradients take into account the radius of the element.
 * This is why they start and end in the middle of the angle curve.
 */
export const getDisplacementMap = ({
  height,
  width,
  depth,
  depthBlur,
}: {
  height: number;
  width: number;
  depth: number;
  depthBlur: number;
}) => {
  const yOffset = 10;
  const xOffset = 6;

  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`<svg 
      style="height: ${height}px; width: ${width}px" 
      viewBox="0 0 ${width} ${height}" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none">
      <style>.mix { mix-blend-mode: screen; }</style>
      <defs>
        <linearGradient 
          id="Y" 
          x1="0" 
          x2="0" 
          y1="${yOffset}%" 
          y2="${100 - yOffset}%">
          <stop offset="0%" stop-color="#0F0" />
          <stop offset="100%" stop-color="#000" />
        </linearGradient>
        <linearGradient 
          id="X" 
          x1="${xOffset}%" 
          x2="${100 - xOffset}%" 
          y1="0" 
          y2="0">
          <stop offset="0%" stop-color="#F00" />
          <stop offset="100%" stop-color="#000" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" height="100%" width="100%" fill="#808080" />
      <g filter="blur(4px)">
        <rect x="0" y="0" height="100%" width="100%" fill="#000080" />
        <rect
          x="0"
          y="0"
          height="100%"
          width="100%"
          fill="url(#Y)"
          class="mix"
        />
        <rect
          x="0"
          y="0"
          height="100%"
          width="100%"
          fill="url(#X)"
          class="mix"
        />
        <rect
          x="${depth}%"
          y="${depth}%"
          height="${100 - depth * 2}%"
          width="${100 - depth * 2}%"
          fill="#808080"
          rx="45"
          ry="45"
          filter="blur(${depthBlur}px)"
        />
      </g>
    </svg>`)
  );
};

import { getDisplacementMap } from "./getDisplacementMap";

/**
 * Creating the displacement filter.
 * The complexity is due to the experimental "chromatic aberration" effect;
 * filters from first `feColorMatrix` to last `feBlend` can be removed if the effect is not needed.
 */
export const getDisplacementFilter = ({
  height,
  width,
  scale,
  chromaticAberration,
  depth,
  depthBlur,
}: {
  height: number;
  width: number;
  scale: number;
  chromaticAberration: number;
  depth: number;
  depthBlur: number;
}) => {
  // Generate displacement map URL
  const displacementMapUrl = getDisplacementMap({
    height,
    width,
    depth,
    depthBlur,
  });

  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`<svg 
      style="height: ${height}px; width: ${width}px" 
      viewBox="0 0 ${width} ${height}" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none">
      <defs>
        <filter id="displace" colorInterpolationFilters="sRGB">
          <feImage
            x="0"
            y="0"
            height="100%"
            width="100%"
            href="${displacementMapUrl}"
            result="displacementMap"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="displacementMap"
            scale="${scale + chromaticAberration}"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            result="displacedR"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="displacementMap"
            scale="${scale}"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            result="displacedG"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="displacementMap"
            scale="${scale - chromaticAberration}"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            result="displacedB"
          />
          <feBlend in="displacedR" in2="displacedG" mode="screen" />
          <feBlend in2="displacedB" mode="screen" />
        </filter>
      </defs>
    </svg>`) +
    "#displace"
  );
};

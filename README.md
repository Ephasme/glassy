# @ephasme/glassy

A React component that recreates Apple's stunning Liquid Glass effect, bringing realistic glass refraction and chromatic aberration to your web applications.

![npm version](https://img.shields.io/npm/v/@ephasme/glassy.svg)
![license](https://img.shields.io/npm/l/@ephasme/glassy.svg)

## ✨ Features

- 🔮 **Realistic refraction** - Mimics actual glass optical properties
- 🌈 **Chromatic aberration** - Subtle color separation for authentic glass look
- ⚡ **Performance optimized** - Uses SVG filters with backdrop-filter for smooth rendering
- 🎛️ **Highly customizable** - Fine-tune depth, blur, scale, and aberration effects
- 📱 **Responsive** - Automatically adapts to element dimensions
- 🎯 **TypeScript ready** - Full type definitions included

## 🚀 Installation

```bash
npm install @ephasme/glassy
```

```bash
yarn add @ephasme/glassy
```

```bash
pnpm add @ephasme/glassy
```

## 📖 Usage

```tsx
import { LiquidGlass } from "@ephasme/glassy";

function App() {
  return (
    <div style={{ position: "relative", backgroundColor: "#f0f0f0" }}>
      {/* Background content */}
      <img src="/background-image.jpg" alt="Background" />

      {/* Liquid Glass overlay */}
      <LiquidGlass
        width={300}
        height={200}
        style={{
          position: "absolute",
          top: 50,
          left: 50,
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <div style={{ padding: "20px", color: "white" }}>
          <h2>Liquid Glass Effect</h2>
          <p>Content appears over the glass</p>
        </div>
      </LiquidGlass>
    </div>
  );
}
```

## 🎛️ API Reference

### Props

| Prop                  | Type                      | Default      | Description                           |
| --------------------- | ------------------------- | ------------ | ------------------------------------- |
| `width`               | `CSSProperties['width']`  | **Required** | Width of the glass element            |
| `height`              | `CSSProperties['height']` | **Required** | Height of the glass element           |
| `style`               | `CSSProperties`           | **Required** | CSS styles (excluding width/height)   |
| `depth`               | `number`                  | `3.5`        | Depth of the refraction effect (0-10) |
| `depthBlur`           | `number`                  | `25`         | Blur intensity for the depth mask     |
| `chromaticAberration` | `number`                  | `5`          | Chromatic aberration intensity (0-20) |
| `scale`               | `number`                  | `90`         | Scale of the displacement effect      |
| `blur`                | `number`                  | `2`          | General blur applied to backdrop      |
| `children`            | `ReactNode`               | -            | Content to render inside the glass    |
| `ref`                 | `Ref<HTMLDivElement>`     | -            | Ref to the glass container element    |

### Example with Custom Settings

```tsx
<LiquidGlass
  width={400}
  height={300}
  depth={5} // More pronounced refraction
  depthBlur={30} // Softer depth transition
  chromaticAberration={8} // Stronger color separation
  scale={120} // Larger displacement scale
  blur={3} // More background blur
  style={{
    borderRadius: "25px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "brightness(1.1)",
  }}
>
  <div>Your content here</div>
</LiquidGlass>
```

## 🌐 Browser Support

The Liquid Glass effect relies on modern web technologies:

- **Full support**: Chromium-based browsers (Chrome, Edge, Opera)
- **Partial support**: Firefox (basic functionality)
- **No support**: Safari (backdrop-filter with SVG filters not supported)

## ⚠️ Important Considerations

1. **Performance**: SVG filters can be computationally intensive. Use sparingly for best performance.
2. **Responsive design**: Consider how the effect scales on different screen sizes.

## 🙏 Credits

This library was inspired by and built upon the excellent work of:

- **[Adrien Gautier](https://medium.com/ekino-france/liquid-glass-in-css-and-svg-839985fcb88d)** - His comprehensive Medium article provided the foundational understanding of SVG displacement filters and their application to liquid glass effects.

- **[rdev](https://github.com/rdev/liquid-glass-react)** - The liquid-glass-react repository offered valuable insights into React implementation patterns and effect variations.

While neither approach perfectly aligned with my specific requirements, both resources were instrumental in understanding the underlying techniques. This library represents a custom implementation that combines and extends their concepts. Many thanks to both contributors for sharing their knowledge!

## 📄 License

MIT © [Loup Peluso](https://github.com/ephasme)

## 🐛 Issues & Contributing

Found a bug or want to contribute? Please visit our [GitHub repository](https://github.com/ephasme/liquid-glass) to report issues or submit pull requests.

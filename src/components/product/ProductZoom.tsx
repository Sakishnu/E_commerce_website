import React, { useState } from "react"

interface ProductZoomProps {
  imgUrl: string
  alt?: string
}

export const ProductZoom: React.FC<ProductZoomProps> = ({ imgUrl, alt }) => {
  const [backgroundPosition, setBackgroundPosition] = useState("50% 50%")
  const [showZoom, setShowZoom] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    // Find percentage offset of hover point
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setBackgroundPosition(`${x}% ${y}%`)
  }

  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted border cursor-zoom-in group"
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Standard Image View */}
      <img
        src={imgUrl}
        alt={alt}
        className={`h-full w-full object-cover transition-opacity duration-200 ${
          showZoom ? "opacity-0" : "opacity-100"
        }`}
        loading="lazy"
      />

      {/* Zoom Magnifier Lens overlay */}
      {showZoom && (
        <div
          className="absolute inset-0 bg-no-repeat transition-opacity duration-200 pointer-events-none"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition,
            backgroundSize: "220%",
          }}
        />
      )}
    </div>
  )
}

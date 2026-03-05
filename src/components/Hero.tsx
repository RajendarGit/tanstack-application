export default function Hero({ height = "md:h-120" }: { height?: string }) {
  return (
    <div className="mt-20">
      <picture>
        <source
          media="(max-width: 600px)"
          srcSet="https://res.cloudinary.com/dwzvjjgrg/image/upload/v1772452952/hero-xs_salowk.webp"
          type="image/webp"
        />
        <img
          src="https://res.cloudinary.com/dwzvjjgrg/image/upload/v1772447696/hero1_pz9fvj.webp"
          alt="Netflix clone banner"
          loading="lazy"
          fetchPriority="high"
          className={`w-full h-dvh ${height} object-cover`}
        />
      </picture>
    </div>
  );
}

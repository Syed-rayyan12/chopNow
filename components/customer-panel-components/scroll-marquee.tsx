"use client";
import { useEffect, useRef } from "react";

export default function ScrollMarquee() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // refs for the animation loop
  const lastScrollRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const posRef = useRef<number>(0);
  const contentWidthRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // tweak these values for sensitivity / smoothness
  const SENSITIVITY = 1.9; // how strongly scroll affects the marquee
  const FRICTION = 0.22; // 0.9-0.98; higher = longer glide

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // measure width of single repeated block (we duplicate below)
    const measure = () => {
      // track.scrollWidth is for both copies; divide by 2 to get single copy width
      contentWidthRef.current = track.scrollWidth / 2 || 0;
    };

    measure();

    lastScrollRef.current = window.scrollY;

    // update velocity based on scroll delta
    const onScroll = () => {
      const now = window.scrollY;
      const delta = now - lastScrollRef.current;
      lastScrollRef.current = now;
      // scrolling down -> positive delta -> move left (increase position)
      velocityRef.current += delta * SENSITIVITY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    // animation loop: apply velocity, friction, update transform, and wrap position
    const loop = () => {
      // apply friction (damps the motion when user stops scrolling)
      velocityRef.current *= FRICTION;

      // update position with current velocity
      posRef.current += velocityRef.current;

      const w = contentWidthRef.current || 0;
      if (w > 0) {
        // keep pos within [0, w) for smooth infinite loop
        posRef.current = ((posRef.current % w) + w) % w;
      }

      if (track) {
        track.style.transform = `translateX(${-posRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Example content: duplicate the same block twice for seamless loop
  const content = (
    <>
      <span className="mx-6 text-9xl font-bold text-secondary">🚀 Welcome to Our Store — Great Deals Everyday! 🚀</span>
      <span className="mx-6 text-9xl font-bold text-secondary">Shop Now — Free Shipping on Orders Over $50 — Limited Time!</span>
      <span className="mx-6 text-9xl font-bold text-secondary">New Arrivals — Check Them Out!</span>
    </>
  );

  return (
    <div ref={containerRef} className="overflow-hidden w-full bg-white py-4">
      {/* track contains two copies of the content so it looks infinite when we wrap */}
      <div
        ref={trackRef}
        className="inline-flex items-center whitespace-nowrap will-change-transform"
        style={{ transform: "translateX(0)" }}
      >
        <div className="flex items-center">{content}</div>
        <div className="flex items-center">{content}</div>
      </div>
    </div>
  );
}

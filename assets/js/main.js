// Small touches only: reveal on scroll, a live Gurugram clock, and a
// hairline under the top bar once the page scrolls.
(() => {
  // Reveal elements as they enter the viewport.
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); });
  } else {
    items.forEach((el) => el.classList.add("in"));
  }

  // Local time in Gurugram (IST), whatever the visitor's timezone.
  const clock = document.getElementById("clock");
  const tick = () => {
    if (clock) clock.textContent = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata",
    }).format(new Date());
  };
  tick();
  setInterval(tick, 15000);

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Hairline under the bar after scrolling.
  const bar = document.querySelector(".bar");
  const onScroll = () => bar?.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });
})();

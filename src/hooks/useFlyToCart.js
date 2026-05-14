export const useFlyToCart = () => {
  const animateToCart = (imageElement) => {
    const cart =
      document.getElementById("cart-icon");

    if (!imageElement || !cart) return;

    const imageRect =
      imageElement.getBoundingClientRect();

    const cartRect =
      cart.getBoundingClientRect();

    const flyingImage =
      imageElement.cloneNode(true);

    // INITIAL STYLES
    flyingImage.style.position = "fixed";

    flyingImage.style.left = `${imageRect.left}px`;

    flyingImage.style.top = `${imageRect.top}px`;

    flyingImage.style.width = `${imageRect.width}px`;

    flyingImage.style.height = `${imageRect.height}px`;

    flyingImage.style.objectFit = "cover";

    flyingImage.style.borderRadius = "24px";

    flyingImage.style.zIndex = "9999";

    flyingImage.style.pointerEvents = "none";

    flyingImage.style.transition = `
      all 1.6s cubic-bezier(0.22, 1, 0.36, 1)
    `;

    flyingImage.style.boxShadow =
      "0 20px 40px rgba(0,0,0,0.45)";

    document.body.appendChild(flyingImage);

    // START SMALL FLOAT EFFECT
    requestAnimationFrame(() => {
      flyingImage.style.transform =
        "scale(0.85) rotate(8deg)";

      flyingImage.style.opacity = "0.95";
    });

    // MAIN ANIMATION
    setTimeout(() => {
      flyingImage.style.left = `${cartRect.left}px`;

      flyingImage.style.top = `${cartRect.top}px`;

      flyingImage.style.width = "40px";

      flyingImage.style.height = "40px";

      flyingImage.style.opacity = "0.2";

      flyingImage.style.transform =
        "scale(0.15) rotate(25deg)";
    }, 120);

    // CART BOUNCE
    setTimeout(() => {
      cart.classList.add(
        "animate-bounce"
      );
    }, 1000);

    // CLEANUP
    setTimeout(() => {
      cart.classList.remove(
        "animate-bounce"
      );

      flyingImage.remove();
    }, 1800);
  };

  return { animateToCart };
};
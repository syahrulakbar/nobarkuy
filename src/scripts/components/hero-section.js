import heroImage from "../../image/netflix.png";
class HeroSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<section class="banner">
    <div class="relative">
      <img src="${heroImage}" alt="" class="min-h-screen object-cover w-full bg-cover bg-center" />
      <div class="bg-gradient-to-t opacity-70 from-black absolute inset-0"></div>
      <div class="bg-gradient-to-b opacity-70 from-black absolute inset-0"></div>
    </div>
    <div class="banner-contents absolute inset-0 text-white grid text-center items-center justify-center">
      <div class="max-w-4xl">
        <h1 class="banner-title text-4xl lg:text-7xl font-semibold pb-2">Katalog Film, Acara TV Terbaru dan Terlengkap</h1>
      </div>
    </div>
  </section>`;
  }
}
customElements.define("hero-section", HeroSection);

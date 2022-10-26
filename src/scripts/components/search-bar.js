class SearchBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = ` <header class="bg-transparent absolute top-0 left-0 w-full flex items-center z-20">
    <div class="container mx-auto">
      <div class="flex items-center justify-between relative">
        <div class="px-4">
          <a href="#" class="font-bold text-3xl block py-6 text-slate-50">Nobar<span class="text-red-600">Kuy</span></a>
        </div>
        <div class="flex items-center lg:mx-4 mx-2 justify-center ">
          <form id="form">
            <input type="text" name="search" id="search" class="max-[400px]:w-[90%] px-4 py-2 lg:px-5 rounded-full placeholder:text-slate-200 focus:outline-none focus:text-slate-100 border-slate-200 border-2 bg-transparent" placeholder="Search Movie" />
          </form>
        </div>
      </div>
    </div>
  </header>`;
  }
}
customElements.define("search-bar", SearchBar);

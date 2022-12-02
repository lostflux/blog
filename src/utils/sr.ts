import ScrollReveal from 'scrollreveal';

// async function mounted() {

//   console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
//   if (process.browser) {
//     const ScrollReveal = await import('scrollreveal');
//   }
// };

// mounted();



class SR {
  isSSR: boolean = true;
  _sr: scrollReveal.ScrollRevealObject;
  constructor() {
    console.log(`\n\nWindow: ${typeof window}`);
    console.log(`Document: ${typeof document}\n\n`);

    if (typeof window !== "undefined") {
      this.isSSR = false;
    }

    if (this.isSupported()) {
      this._sr = ScrollReveal();
    }
    // this._sr = this.isSSR ? null : ScrollReveal();
  }

  // implement boolean interface check for SSR
  public isSupported(): boolean {
    return !this.isSSR;
  }

  public boolean(): boolean {
    return this.isSupported();
  }

  public clean = (selector: string | HTMLElement | NodeListOf<Element>) => {
    if (this) this._sr.clean(selector);
  }
  
  public destroy = () => {
    if (this) this._sr.destroy();
  }

  public: scrollReveal.ScrollRevealObject
  reveal( selector: string | HTMLElement | NodeListOf<Element>,
      options?: scrollReveal.ScrollRevealObjectOptions,
      interval?: number) {
    if (!this) return null;
    if (options && interval) return this._sr.reveal(selector, options, interval);
    else if (options) return this._sr.reveal(selector, options);
    else if (interval) return this._sr.reveal(selector, interval);
    else return this._sr.reveal(selector);
  }
}

const sr = new SR();



export { sr as default };


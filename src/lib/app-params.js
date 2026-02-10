// App parameters - simplified for Cloudflare Pages deployment
export const appParams = {
  appId: 'caring-hands-connect',
  token: null,
  fromUrl: typeof window !== 'undefined' ? window.location.href : '',
  functionsVersion: '1.0.0',
  appBaseUrl: typeof window !== 'undefined' ? window.location.origin : '',
};

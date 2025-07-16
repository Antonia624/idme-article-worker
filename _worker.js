export default {
  async fetch(request, env, ctx) {
    return new Response("Worker is running — dynamic routes must go through Cloudflare Pages' functions routing.", {
      status: 404
    });
  }
};

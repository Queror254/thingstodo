export default defineContentScript({
  matches: ['*://*.google.com/*', 'http://localhost/*'],
  main() {
    console.log('Hello content.');
  },
});

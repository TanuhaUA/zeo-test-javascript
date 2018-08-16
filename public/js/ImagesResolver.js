window.ImagesResolver = (function () {
  class ImagesResolver {
    constructor() {

    }

    search(query) {
      return {
        query: 'example',
        images: [
          {
            id: 1,
            url: '/img/mammal-3162194_640.jpg',
            tags: 'panda'
          },
          {
            id: 2,
            url: '/img/panda-659186_640.png',
            tags: 'panda'
          }
        ]
      };
    }
  }

  return ImagesResolver;
})();
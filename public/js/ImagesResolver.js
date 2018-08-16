window.ImagesResolver = (function () {
    class ImagesResolver {
        constructor() {
            this.query = {
                'local': {},
                'pixabay': {}
            };
        }

        reformatDb(db) {
            return db.map((item) => {
                    return {
                        id: item.id,
                        url: item.previewURL,
                        tags: item.tags
                    }
                });
        }

        localSearch(query) {
            const localDb = window.localDB.filter((item) => {
                return item.tags.split(/, /g).includes(query);
            });

            const result =  {
                query: query,
                images: this.reformatDb(localDb)
            };

            return Promise.resolve(result);
        }

        pixabaySearch(query) {
            return fetch('https://pixabay.com/api/?key=8522875-59a2673910903be627161f155&q=' + query + '&image_type=all&per_page=100')
                .then((response) => {
                    return response.json();
                })
                .then((res) => {
                    return {
                        query: query,
                        images: this.reformatDb(res.hits)
                    }
                });
        }

        search(query, searchModuleId = 'local') {
            if (this.query[searchModuleId][query]) {
                return Promise.resolve(this.query[searchModuleId][query]);
            }

            return this[searchModuleId + 'Search'](query)
                .then((res) => {
                    this.query[searchModuleId][query] = res;
                    return this.query[searchModuleId][query];
                });
        }
    }

    return ImagesResolver;
})();
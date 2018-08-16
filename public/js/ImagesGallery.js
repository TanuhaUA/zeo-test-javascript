window.ImageGallery = (function () {
    const availableDB = ['local', 'pixabay'];

    class ImageGallery {
        /**
         * @constructor
         * @param {ImagesResolver} imagesResolver
         */
        constructor(imagesResolver) {
            this.imagesResolver = imagesResolver;
            this._initView();
            this._initViewFunctionality();
            this.query = null;
        }

        /**
         * @param {String} query
         */
        search(query, searchModuleId) {
            if (!availableDB.includes(searchModuleId)) {
                throw new Error('There is no db');
            }

            this.query = query;

            this.imagesResolver.search(query, searchModuleId)
                .then((searchResult) => {
                    if (this.query === query) {
                        this._onReceiveSearchResult(searchResult);
                    }
                });
        }

        addToElement(element) {
            element.appendChild(this.container);
        }

        _onUserSearch(ev) {
            ev.preventDefault();
            this.search(this.seachInput.value, this.selectDb.value);
        }

        _onReceiveSearchResult(result) {
            this.searchResults.innerHTML = "";
            const imagesInfo = result.images;

            imagesInfo.forEach((image) => {
                const imgNode = document.createElement('img');
                imgNode.setAttribute('src', image.url);
                this.searchResults.appendChild(imgNode);
            });
        }

        _initView() {
            this.container = document.createElement("div");
            this.container.className = "gallery";

            this.form = document.createElement("form");
            this.form.className = "gallery__form form-inline";
            this.container.appendChild(this.form);

            this.formGroup = document.createElement("div");
            this.formGroup.className = "form-group";
            this.form.appendChild(this.formGroup);

            this.seachInput = document.createElement("input");
            this.seachInput.className = "gallery__search form-control";
            this.seachInput.placeholder = "search by tag";
            this.formGroup.appendChild(this.seachInput);

            this.optionLocal = document.createElement('option');

            this.optionLocal.text = 'local';
            this.optionPixabay = document.createElement('option');
            this.optionPixabay.text = 'pixabay';

            this.selectDb = document.createElement('select');
            this.selectDb.className = "gallery__select";
            this.selectDb.add(this.optionLocal);
            this.selectDb.add(this.optionPixabay);
            this.form.appendChild(this.selectDb);

            this.searchButton = document.createElement("button");
            this.searchButton.className = "gallery__button btn btn-primary";
            this.searchButton.innerText = "search";
            this.form.appendChild(this.searchButton);

            this.searchResults = document.createElement("div");
            this.searchResults.className = "gallery__result";
            this.container.appendChild(this.searchResults);
        }

        _initViewFunctionality() {
            this.form.addEventListener("submit", this._onUserSearch.bind(this));
            this.seachInput.addEventListener('keyup', this._onUserSearch.bind(this));
        }
    }

    return ImageGallery;
})();
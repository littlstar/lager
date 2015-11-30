BIN := node_modules/.bin
BROWSERIFY := $(BIN)/browserify
UGLIFY := $(BIN)/uglifyjs

all: build

build: build/lager.js build/lager.min.js

build/lager.min.js: node_modules build/lager.js
	$(UGLIFY) --compress --mangle --output build/lager.min.js -- build/lager.js

build/lager.js: node_modules index.js
	$(BROWSERIFY) index.js -o build/lager.js -s Lager

node_modules: package.json
	npm install

clean:
	rm -rf build
	rm -rf node_modules

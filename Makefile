BIN := node_modules/.bin
BROWSERIFY := $(BIN)/browserify
UGLIFY := $(BIN)/uglifyjs

# Ensures the parent directory is built
define BUILD_PARENT_DIRECTORY
	mkdir -p $(dir $@)
endef

all: build

build: build/lager.js build/lager.min.js

build/lager.js: node_modules index.js
	$(BUILD_PARENT_DIRECTORY)
	$(BROWSERIFY) index.js -o build/lager.js -s Lager

build/lager.min.js: node_modules build/lager.js
	$(BUILD_PARENT_DIRECTORY)
	$(UGLIFY) --compress --mangle --output build/lager.min.js -- build/lager.js

node_modules: package.json
	npm install

clean:
	rm -rf build
	rm -rf node_modules

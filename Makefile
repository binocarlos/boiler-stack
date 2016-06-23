.PHONY: install build release watch

install:
	cd src/frontend && npm install

build:
	cd src/frontend/gui && npm run build

release:
	cd src/frontend/gui && npm run release

watch:
	cd src/frontend/gui && npm run watch
.PHONY: install build release watch

install:
	cd src/frontend && npm install

build:
	cd src/frontend/gui && npm build

release:
	cd src/frontend/gui && npm release

watch:
	cd src/frontend/gui && npm watch
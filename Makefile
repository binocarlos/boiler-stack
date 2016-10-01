.PHONY: build
build:
	docker-compose build
	docker-compose -f docker-compose.commands.yml build

.PHONY: frontend.build
frontend.build:
	docker-compose -f docker-compose.commands.yml run frontendbuild build

.PHONY: frontend.release
frontend.release:
	docker-compose -f docker-compose.commands.yml run frontendbuild release

.PHONY: frontend.watch
frontend.watch:
	docker-compose -f docker-compose.commands.yml run frontendbuild watch
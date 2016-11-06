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

.PHONY: api.quick
api.quick:
	docker run -ti --rm \
		--name boiler_api \
		--network boilerstack_default \
		--link boiler_auth:auth \
		--link boiler_digger:digger \
		--link boiler_storage:storage \
		-v ~/projects/boiler-stack/api/src:/app/src \
		-v ~/projects/digger-folder-ui:/app/node_modules/digger-folder-ui \
		-e AUTH_SERVICE_HOST=auth \
		-e AUTH_SERVICE_PORT=80 \
		-e DIGGER_SERVICE_HOST=digger \
		-e DIGGER_SERVICE_PORT=80 \
		-e STORAGE_SERVICE_HOST=storage \
		-e STORAGE_SERVICE_PORT=80 \
		--entrypoint bash \
		boilerstack_api

.PHONY: digger.quick
digger.quick:
	docker run -ti --rm \
		--name boiler_digger \
		--network boilerstack_default \
		-v ~/projects/boiler-stack/.boilerstack/digger:/data/db \
		-v ~/projects/digger-rest/router.js:/app/router.js \
		-v ~/projects/digger-rest/index.js:/app/index.js \
		--entrypoint bash \
		binocarlos/digger-rest

.PHONY: storage.quick
storage.quick:
	docker run -ti --rm \
		--name boiler_storage \
		--network boilerstack_default \
		--link boiler_mongo:mongo \
		-v ~/projects/boiler-stack/storage/src:/app/src \
		-e MONGO_SERVICE_HOST=mongo \
		-e MONGO_SERVICE_PORT=27017 \
		--entrypoint bash \
		boilerstack_storage
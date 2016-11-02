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
	docker run -ti \
		--network boilerstack_default \
		--link boiler_auth:auth \
		--link boiler_digger:digger \
		-v ~/projects/boiler-stack/api:/app \
		-v ~/projects/digger-folder-ui:/app/node_modules/digger-folder-ui \
		-e AUTH_SERVICE_HOST=auth \
		-e AUTH_SERVICE_PORT=80 \
		-e DIGGER_SERVICE_HOST=digger \
		-e DIGGER_SERVICE_PORT=80 \
		--entrypoint bash \
		boilerstack_api
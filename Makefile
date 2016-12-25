.PHONY: compose.build
compose.build:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml build
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

.PHONY: compose.rebuild
compose.rebuild:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache --pull
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build --no-cache --pull

.PHONY: compose.up.dev
compose.up.dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

.PHONY: compose.up.prod
compose.up.prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

.PHONY: frontend.analyze
frontend.analyze:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml run frontend analyze

.PHONY: frontend.test
frontend.test:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml run frontend test

.PHONY: frontend.test.unit
frontend.test.unit:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml run frontend test:unit

.PHONY: frontend.test.acceptance
frontend.test.acceptance:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml run frontend test:acceptance

.PHONY: frontend.release
frontend.release:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml run frontend release

.PHONY: frontend.logs
frontend.logs:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f frontend

.PHONY: mongo.cli
mongo.cli:
	docker run -ti --rm \
		--name mongo_cli \
		--network boilerstack_default \
		--link boiler_mongo:mongo \
		--entrypoint mongo \
		mongo mongo:27017/boiler

.PHONY: storage.post
storage.post:
	curl -H "Content-Type: application/json" -X POST -d '{"name":"Test","projectid":"58226cab426437000123ac8b"}' http://localhost:8089/api/v1/quotes
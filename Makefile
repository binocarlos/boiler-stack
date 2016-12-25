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

.PHONY: frontend.analyze
frontend.analyze:
	docker exec -t boiler_frontend npm run analyze

.PHONY: compose.build
compose.build:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml build
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

.PHONY: compose.dev
compose.dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

.PHONY: compose.prod
compose.prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

.PHONY: compose.test
compose.test:
	echo hello
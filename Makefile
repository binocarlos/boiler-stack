.PHONY: clean
clean:
	docker rm -f `docker ps -aq`

.PHONY: compose.build
compose.build:
	docker-compose -f docker-compose.elk.yml build
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml build
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

.PHONY: compose.rebuild
compose.rebuild:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache --pull
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build --no-cache --pull

.PHONY: compose.up.dev
compose.up.dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

.PHONY: compose.up.elk
compose.up.elk:
	docker-compose -f docker-compose.elk.yml up

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
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml -f docker-compose.commands.yml run frontend_cli test:acceptance

.PHONY: frontend.release
frontend.release:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml run frontend release

.PHONY: frontend.logs
frontend.logs:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f frontend

.PHONY: frontend.cli
frontend.cli:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml run --entrypoint bash frontend

.PHONY: postgres.cli
postgres.cli:
	bash scripts/postgres.sh

.PHONY: redis.cli
redis.cli:
	bash scripts/redis.sh
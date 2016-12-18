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

.PHONY: copy_frontend_files
copy_frontend_files:
	cp -rf ~/projects/boiler-frontend/src/* frontend/node_modules/boiler-frontend/src
	cp -rf ~/projects/passport-slim-ui/src/* frontend/node_modules/passport-slim-ui/src
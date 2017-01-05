#!/bin/bash -e
#
# scripts to manage the postgres database
#

set -e

export DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

POSTGRES_HOST="postgres"
POSTGRES_USER="boiler"
POSTGRES_PASSWORD="boiler"
POSTGRES_DATABASE="boiler"
TEMP_FILE="${DIR}/../.data/boiler_command.sql"

function connect() {
  docker run -i --rm ${EXTRA_DOCKER_ARGS} \
    --network boilerstack_default \
    --link boiler_postgres:postgres \
    -e PGPASSWORD=${POSTGRES_PASSWORD} \
    postgres $@
}

function psql() {
  local file="${1}"
  local cmd="psql --host ${POSTGRES_HOST} --username ${POSTGRES_USER} --dbname ${POSTGRES_DATABASE}"
  if [ -t 0 ]; then
    echo 'connecting to postgres'
    export EXTRA_DOCKER_ARGS="${EXTRA_DOCKER_ARGS} -t "
  else
    cat > ${TEMP_FILE}
    file="${TEMP_FILE}"
  fi
  if [ -f "${file}" ]; then
    export EXTRA_DOCKER_ARGS="${EXTRA_DOCKER_ARGS} -v ${file}:/tmp/command.sql "
    cmd="${cmd} --file /tmp/command.sql"
  fi
  connect ${cmd}
}

function usage() {
cat <<EOF
Usage:
  psql                 run connected psql
  help                 display this message
EOF
  exit 1
}

function main() {
  case "$1" in
  psql)            shift; psql $@;;
  help)            shift; usage $@;;
  *)               psql $@;;
  esac
}

main "$@"
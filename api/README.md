# api


The api server provides the REST interface to the front-end

THe express based server will mount all routes from `routes/index`

The routes will pass off to the `controllers` for transaction based business logic.

Anything HTTP related (like writing login cookies) is done in the routes.

Anything database related (like registering an account) is done in the controllers.

## controllers

A route will invoke one or more controller methods.

Each controller method represents a totally different transaction block - you cannot combine controller methods in one transaction as they control the transaction flow.

The point is that the contrllers orchestrate the connection to the database and the starting / commiting of the transaction.

This leaves the model code to always deal with a `client` and not transactions/connections.

## models

The models are the core logic that translate methods onto database calls.

You can combine multiple model functions into one transaction using a controller method.

## eventBus

The event bus is used for commands not queries - the queries can be logged to stdout and consumed by our logging infrastructure.
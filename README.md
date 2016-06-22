# boiler-stack

A starting place for a multi-container micro-service application.

It comes with authentication and a redux boilerplate.

## install

First you need to install:

 * [virtualbox](https://www.virtualbox.org/wiki/Downloads)
 * [vagrant](http://www.vagrantup.com/downloads.html)

## start vm

```bash
$ git clone https://github.com/binocarlos/boiler-stack
$ cd boiler-stack
$ vagrant up
```

This will start a vagrant box and install the things we need.

## ssh into vm

```bash
$ vagrant ssh
```

If you are on Linux or OSX, this will connect automatically.  If you are on windows - follow the instructions to use Putty to SSH onto the VM.

## /vagrant

The working folder is `/vagrant` - all of the following commands assume you are in this folder.

```bash
$ cd /vagrant
```

## install

```bash
$ make install
```

## start stack

Use docker-compose to start the stack:

```bash
$ docker-compose up
```

## open browser

Open a browser to [http://172.17.1.188](http://172.17.1.188)

## rebuild frontend

In another shell - rebuild the frontend code:

```bash
$ make build
```

You can watch the code:

```bash
$ make watch
```

And build a release:

```bash
$ make release
```

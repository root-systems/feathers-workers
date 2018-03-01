# feathers-workers

example to understand how to use feathers and job worker queues

## use case

in a production web app, we will encounter situations where the server will need to perform some task that will take longer than a normal http request -> response cycle. even if the user was willing to wait for minutes, often the gateway (what connects your server to the external internet) will intervene in responses that go beyond a maximum response time.

common examples:

- generating reports
- processing media (images or video)

to handle these cases, we will run a separate "worker" service(s) that the "web" service can off-load work to, which will return back to the user in an asynchronous way (like an email or push notification).

the "worker" service will listen for new jobs and process them on-demand.

## stack

- [feathers](https://docs.feathersjs.com/)
- [node-resque](https://github.com/taskrabbit/node-resque)

## why make this repo?

this example is the first step to deliver quality work for [Minded](https://www.mindedapp.com/)

## license

Apache-2.0

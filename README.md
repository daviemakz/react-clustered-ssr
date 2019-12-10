# Risen.JS with React Server Side Rendering

In order to understand the increase in React.JS server-side rendering in recent times we need to understand the evolution of web applications, something which is tightly coupled with the rise of the **Single Page Application** (SPA).SPAs offer great advantages in speed and user experience over traditional server-rendered apps, but it not all sunshine and roses…

The initial server request normally returns a **plain HTML file** with an empty body and a bunch of CSS and JavaScript links. Then the external files need to be fetched by the browser in order to render the markup. This means that the user will have to wait longer for the initial render.

This also means that crawlers may interpret your page as empty as technically it is! So the idea is to render your app on the server initially, then to leverage the capabilities of SPAs on the client.

# Why would we want multi-threaded SSR?

As mentioned above, to implement server-side rendering you will need a Node.JS process which will render the initial landing as well as deliver the assets so the client can take over after the server.

A single instance of Node.JS runs in a single thread, this means when you are running server-side rendering on the backend with a single process you will only be using **one core** at a time.

This means no matter how many cores you have on the system only one will be utilised to generate the initial HTML markup, which in high load situations can be a performance bottleneck.

To take advantage of **multi-core systems**, the user will sometimes want to launch a cluster of these Node.JS processes to handle high throughput situations and route requests to said processes via some load balancing strategy.

# What is Risen.JS?

Full disclosure, I am the creator of the package Risen.JS which is a framework for building efficient, scalable non-blocking Node.JS server-side applications.

Under the hood, Risen.JS makes use of the well-known and robust Express HTTP(s) package, Quick-DB for long term persistent storage, and the native child process feature in Node.JS.

Risen.JS provides a level of abstraction above these frameworks, but also exposes their APIs directly to the developer. This allows for easy use of the myriad third-party modules, packages and middle-ware's.

# Why would I use Risen.JS?

Because the "services" you will create run as Node.JS processes, this means you can build micro services utilising the thousands of NPM packages which currently exist and are added every day.

Simply put anything you can do in Node.JS, you can build a micro service to do for you. From inserting and retrieving data from a separate external database (e.g. Redis) to a service which converts images the possibilities are endless!

This README.md will focus on the setup of the application rather than go into all the features of Risen.JS (as there's quite abit there).

## Clone the repository

Clone the repository using the command below:

```
git clone https://github.com/daviemakz/react-clustered-ssr.git
```

## Installing the application

Run the following command to install:

```
yarn install
```

or

```
npm install
```

## Starting the framework

Now all that needs to be done is to start the Risen.JS framework and start serving content to your browser. You do this by executing in the console:

```
yarn start
```

or

```
npm run start
```

If you navigate to http://localhost:3000 you should see the application displayed!

Congratulations, you have just deployed your first Risen.JS powered application! Try entering some numbers into the text box and see how the page changes.

Now refresh the page a couple of times. Notice how the footer which shows the instance ID which received the request changes on each request. What's happening is each request is being routed via roundRobin to each of the 4 instances of the primeCalculator service running within Risen.JS.

If you refresh 5 times you will see the first instance ID you saw when you first navigated to the page.

To demonstrate the symbiosis between the front end & backend, try inputting a number into the input box which is greater than 100,000. You will see a warning in the browser. This message is not coming from the server, rather the client side JavaScript we shipped to the browser is powering the above user interaction.

Simply put we were able to **pre-render HTML markup** and send it to the client and then let the browser take care of interaction afterwards!
But in this example we still want to take advantage of the **computational power** of the Risen.JS framework to do the prime number calculations for us.

So when you click on the "Get Primes" button the request is sent to the server which then renders HTML markup and returns content to the client.

# Conclusion

In essence we have vastly expanded the content we can deliver to the client especially in **high performance situations**. One can imagine a React.JS powered online image converter, for example, where all the heavy lifting is done via a Risen.JS running in the backend

For user interaction the browser takes care of it while Risen.JS is used to do the CPU heavy calculations of the prime numbers as well as deliver content to the browser. This is the power of of the framework and is just the tip of the iceberg of what is possible!

Thank you for reading and happy rising!

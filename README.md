# simenterprise-ecs-poc

Created with CodeSandbox

## Purpose

To assess the suitability of Javascript and the HTML Canvas API for the SimEnterprise project.

We wanted to assess the following characteristics:

- Testability
- Deployability to web
- Quality and freedom of visualization
- Configurability of simulation
- Support for animation loop
- Support for behavioral trees
- Quality of ecosystem
- Simplicity
- Familiarity

## Dependencies

- Typescript
- Konva (HTML 5 Canvas library)

## Learnings

Development progressed in four stages.

### Functional wrappers around Konva shapes

We started off trying to wrap Konva shapes with some state and behaviour using a semi-functional paradigm. However, this proved difficult to test because it required either having access to a canvas or mocking Konva/the canvas to perform unit tests, which seemed to us to be an unacceptable amount of overhead.

### MVC

We decided to make our code more testable by applying an MVC pattern, separating our functional code into models and views, with the views responsible for interacting with Konva.

However, this caused friction because we frequently needed to factor the view state (e.g. position of Konva objects) into our simulation logic. It wasn't possible to use the view state to inform the model without tightly coupling the view and model together, which we felt defeated the object of the MVC pattern.

### Basic OOP

We decided to merge our views and models, and for each domain object to extend a Konva shape, so that we would have access to the view state within our model logic. This worked well but wasn't easy to test because it again required access to the canvas API or mocking Konva.

### Entity Component System

We did some research on how game developers resolve this issues, and saw the Entity Component System suggested in quite a few places. We decided to explore whether it would solve our testing and coupling issues. It was successful in that respect, but at the cost of significant complexity mainly arising from all the state becoming global. It also requires a change of mindset from standard web application development which was a real challenge. It is also worth noting that one of the main advantages of this architecture is performance gains from keeping all of the simulation state closely co-located in memory when using languages that allow direct memory management. The same benefits do not apply to Javascript.

I also think Typescript doesn't suit this style of programming, as the amount of mutation involved does not make it easy to use static typing. But I expect with a bit of forethought it could be managed and would make it easier to reason about the application.

## Overall Suitability

Overall, we think the canvas API and Javascript could provide a suitable foundation for the SimEnterprise project. There are a number of libraries available to improve the developer experience of using the canvas and the requestAnimationFrame API. Unfortunately we did not have time to assess and behaviour tree implementations but there are some available.

We are not convinced that we have found the best architecture to move forwards with yet. The ECS is very powerful, but complex, so it probably isn't a good fit for the project. We're also not sure that Konva is the best canvas library for a loop-based application where the simulation application would manage most of the visual state (e.g. position, shape). One of the main selling points of Konva is that it provides a number of ease of use features for developers to achieve animations and controls without needing a full render loop, but these rely on Konva controlling the state. They probably won't be that helplful on SimEnterprise - it may make sense to consider a library that assumes it will run in a loop such as PixiJS

## References / Further Reading

- https://github.com/SanderMertens/ecs-faq - a good explanation of entity component systems
- https://blog.mozvr.com/introducing-ecsy/ - introduction to ECSY, javascript ECS library
- https://pixijs.com/ - PixiJS 2D canvas library
- https://konvajs.org/ - Konva canvas library




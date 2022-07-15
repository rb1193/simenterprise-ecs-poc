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

We did some research on how game developers resolve this issues, and saw the... TBC


## References / Further Reading

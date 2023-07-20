# Snake Game



https://github.com/alast202/snake-game/assets/81660066/aad8bf2b-4e22-45c4-9dd5-ad944c32f2b6




This is a simple implementation of the classic Snake Game using React. The game features a snake that moves around the screen, attempting to eat apples and grow in length. The objective of the game is to guide the snake to eat as many apples as possible without colliding with the boundaries of the game area or its own body.

## Features

- Responsive gameplay area represented by a canvas element.
- The snake grows in length when it eats an apple and the score increases.
- The game ends if the snake collides with the boundaries of the game area or its own body.
- High score tracking using local storage.
- Play button to start a new game.
- Arrow keys to control the direction of the snake.

## Technologies Used

- React: The game is built using the React library, allowing for the creation of reusable components and efficient rendering of the game state.
- HTML5 Canvas: The game area is rendered using the HTML5 Canvas element, which provides a drawing API for drawing shapes and images on the screen.
- CSS: Styling is applied using CSS to create an appealing visual representation of the game.



## Code Structure

The code is organized into several components:

- `App`: The main component that manages the game state and handles user input. It renders the canvas, score display, play button, and game over message.
- `useInterval`: A custom hook that handles the game loop by calling the specified function at a given interval.
- `AppleLogo` and `Monitor`: Images used in the game.
- `./useInterval` and `./apple.png`: External dependencies used by the game.




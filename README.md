# 📋Project 2-Memory Game Project

![Alt text](img/overview.png?raw=true)

This is my second project from Udacity Front End Nano Degree. It is an assessment after learning Javascript DOM manipulation. In this project, the starter project has some HTML and CSS styling to display a static version of the Memory Game project. The task is to convert this project from a static project to an interactive one.

## 🗂 Provided Assets

- Project Rubric [Review](https://review.udacity.com/#!/rubrics/591/view)

## ✅ Challenge Checklist

**Required Elements**

The page at minimum includes all of the following interactions:

- [x] Shuffle cards
- [x] Matching cards
- [x] Unmatching cards
- [x] Star rating
- [x] Moves count
- [x] Timer
- [x] Reset button
- [x] Result report

## 🛠 Development approach

- Each states and actions are written into different small functions.
- **gameState**: handle the interactions of different mode to facilitate the timer function.
- **stopGameTime**: to stop the timer or restart game.
- **startGameTime**: use setInterval to count each second and use the (finish time) - (start time) to create timer output.
- **restartGame**: set gameState to idle, reset the moves count, card match count, timer and clean out the previous game
- **setDefaultStars**: to create the default star setting.
- **setRating**: pass the moves count to the function and compare with the worst case (over 16 moves) to determine the rating.
- **handleWon**: set gameState to won, stop the timer and send out the alert with performance (greetings + time spent + moves).
- **handleCardClick**: 1. If in won state, stop handling the click. 2. If in idle state, start timer and change to playing state. 3. Add display classes to the clicked cards and push to openedCards array to compare. 4. If the user clicks the exact same card (itself, determined by the data set id) twice then return the function. 5. Count the moves and pass it to setRating. 6. Compare the card if they have the same class, then add the match or unmatch class. 7. If cards are matched, + 1 to globalCardMatchCount. If it doesn't match, pass to setTimeout(1s) function to close the unmatched card. This also prevents the user from quickly click multiple times before it turns back and also make sure the globalCardMatchCount (include the last card clicked) to achieve the won condition. Then pass to handleWon function.
- **createStar**: create the filled or empty stars.
- **createCard**: create the card (li element) with card class, create the dataset index for each card (to prevent clicking itself twice and comparing itself).
- **makeGame**: to initalise the game by cleaning the li cards, resetting the timer and moves to 0. Set default stars. Shuffle cards. Create cards and pass the event listener to each card, then attach to the deck (ul element).
- **isSameCardClass**: if the cards are having the same icon class, then they are match.
- **isCardItself**: check if the cards are having the same dataset id (itself).
- **displayCard**: add the "open" and "show" css class to the elements.
- **closeUnmatchedCards**: add the "unmatch" css class to the elements. Then "turn them back" by removing the "unmatch", "show" and "open" class.
- **main**: to initalise the game makeGame() and reset the time from the previous game to 0.
- **shuffle**: provided by the template sourced from [Fisher-Yates (aka Knuth) Shuffle](http://stackoverflow.com/a/2450976).

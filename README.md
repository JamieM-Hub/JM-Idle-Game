# **ELEMENTS**
*Elements* is a simple yet alluring mobile clicker game that is best described as interactive art with a finite play experience... and achievements!

The project was developed by [Jamie McKenzie](https://github.com/JamieM-Hub) as part of the [Full Stack Software Development](https://codeinstitute.net) diploma at Code Institute.

Click [here](http://https://jamiem-hub.github.io/JM-Idle-Game/) to check it out!

# UX

*Elements* is a primitive clicker game with no automation, prestige system or player abilities.
In the design process, it was significant that the game mechanics to keep players engaged are minimal. For this reason, major developmental focus was placed on the game's aesthetic and general immersion.

The aesthetic was designed to be bold and colourful in every corner, with unlockable themes rewarding continued gameplay.

## User Stories
Clicker games are very popular on the mobile market, and the following are examples of typical mobile game consumers:
- As a busy User looking for a quick distraction
    - I want something I can easily jump into
    - I want something that will keep me entertained for a short period of time
    - I want something simple that doesn't require complex thought
- As a User looking for a game with progression and reward
    - I want clearly defined objectives
    - I want to be rewarded for clearing goals with something I can use
    - I want to feel a sense of improvement as I continue playing
- As a User who is a fan of clicker-style games
    - I want an aesthetically pleasing experience
    - I want a robust product of high quality
    - I want to experience something that stands out within a very saturated market

Although *Elements* is fully responsive for all breakpoints, the game was designed to be played on a smartphone or tablet.
# Features
### Player Name
- Users enter their name before playing.
- The User's name is displayed on screen alongside their score and number of clicks.
### Levelling Up
- Each Element has a level that can be increased by clicking the Element enough times.
- Reaching certain levels unlocks bonuses.
### Upgrades
- Each Element can be upgraded up to three times, adding a count multiplier each time.
- Upgrade multipliers are displayed within the clicker buttons.
### Theme Change
- 10 styling schemes unique to each of the 8 Elements (plus the default theme and a bonus theme) are selectable.
- Themes are unlocked as rewards for completing an Element.
### Achievements
- Unlockable achievements that appear on screen when unlocked
- Each includes a unique unlock message viewable in the Achievements menu.

## If I Had Time
Given unlimited time, the following features would be included in the final product:
- Unique sound effects and background music for each theme
- A progress bar alongside or instead of numerical counters
- An unlockable automation upgrade
- The option to retain unlocked Themes when starting a New Game
- Additional animations and interactivity to make the game pop
- JSON serialization to prevent page reload resetting the game

# Technologies Used
## Libraries
- Bootstrap CDN
- jQuery CDN
- Font Awesome
- Google Fonts
## Languages
- HTML *49.7%*
    - A large number of small HTML elements like buttons and bootstrap grid divs have resulted in a larger than expected HTML file.

- JavaScript / jQuery *38.2%*
    - jQuery was the operational focus of this project alongside the Bootstrap grid, and many styling operations are done in jQuery instead of CSS.

-  CSS *12.1%*
    - As above, much styling was done in jQuery however all media queries have been coded in CSS.

# Testing
## Functional Testing
### Input fields
There is only one User input in *Elements*, which is name entry before the game begins. When the User starts a New Game, they are prompted for their name again before restarting the game.

The following values were tested on both inputs and were found to be satisfactory:
- Null (nothing was typed in)
    - Input text was deleted and input placeholder asked User to enter their name.
- More than 8 characters
    - Character entry is disabled after 8 characters.
    - When character entry above 8 characters is permitted, input text was deleted and placeholder advises User to use up to characters.
- Between 1 and 8 characters
    - Entry accepted and game screen loads.
### Menu toggling
The icons in the top left and top right corners toggle one of two menus - the main menu and the Theme menu. Each menu occupies the same space in front of the game title and needs to be closed before opening the other menu if that icon is clicked.

- When neither menu was active:
    - The Theme button activated the Themes menu
    - The main menu button activated the main menu
- When the Themes menu was active:
    - The Theme button deactivated the Themes menu
    - The main menu button deactivated the Themes menu and activated the main menu
- When the main menu was active:
    - The Theme button deactivated the main menu and activated the Themes menu
    - The main menu button deactivated the main menu
### Themes
Each Theme button was tested when in a locked and unlocked state.
- When locked, Theme buttons do nothing when clicked
- When unlocked, Theme buttons change all relevant elements to the selected Theme when clicked
- Each theme's palette and background image is relevant to the theme
- Each background image displays correctly in both orientations at all reolutions
### Game menu buttons
- Each button activates its own modal when clicked
### Clicker buttons
Each Element's clicker button displays the Element's level, current click count, clicks to next level, and upgrade multiplier if unlocked. The total clicks for each Element are displayed underneath on the tracker table.

To ensure the script is performing mathematical operations correctly, I did the following:
- Checked count and total count incremented every time I clicked the button
- Checked count and total count increment matches increment displayed on tracker
- Checked count on clicker was not affected by level up function
- Checked count and total count's increment increased when upgrade unlocked
- Tested clicking button after Element completed - disabled
### Achievement buttons
- Tested each achievement button, all of which show the achievements modal
- Achievement buttons are not clickable if not unlocked
## Script Testing
### Debug Mode
I designed a Debug Mode to allow streamlined testing of things like unlocking achievements or levelling up, which require time to perform. Debug Mode was also useful to test responsiveness when all game board elements are displayed, and refine Themes.

Debug Mode includes the following operations:
- Unlock and display all Elements' clicker buttons
- Unlock and display all Achievements on game board and in menu
- Change to any selected Theme

A secondary Debug Mode to reduce the number of clicks needed to level up on one Element to 1 was used to quickly test the Theme unlock function, which would otherwise require hundreds of clicks to unlock one Theme.
### Console Logging
The primary method used to test and track data flow in Javascript was the console.log function.
## UX Testing
### Breakpoints
Application tested on portrait and landscape orientation for all breakpoints and for the following device templates on Developer Tools:
- Moto G4
- Galaxy S5
- Pixel 2
- Pixel 2 XL
- iPhone 5/SE
- iPhone 6/7/8*
- iPhone 6/7/8 Plus
- iPhone X
- iPad
- iPad Pro
### User Stories
sdfsdfsdfsd



## Player Testing
*Elements* was human tested separately with three individuals who were asked to answer the following questions:

1. What contributed to a positive experience?
2. What contributed to a negative experience?
3. Did you encounter anything strange or unusual?
4. What additional features would improve the experience?
5. On a scale of 1-10, how would you rate *Elements*?
6. Any additional comments?

Player A
> buuhhhhhh good game buuhhdeh

Player B
> buuhhhhhh good game buuhhdeh

Player C
> buuhhhhhh good game buuhhdeh

## Known Bugs
- iPhone X
# Deployment
## Deploying to GitHub

You can deploy this project to GitHub by doing the following:

1. Log in to your GitHub account and search for/locate this repository
2. Click the 'Settings'button at the top of the page
3. Find the 'GitHub Pages' section
4. Make sure 'main' is selected on the 'Branch' dropdown
5. Click the newly-created link with a green tick next to it.
6. Enjoy the website!

## Forking the GitHub Repository
You can fork this GitHub Repository if you wish to make a copy of the original repository on your GitHub account without affecting the original respository:

1. Log in to your GitHub account and search for/locate this repository
2. Click the 'Fork' button at the top of the page
3. Your GitHub account will now have an exact copy of the project that you can edit

## Making a Local Clone
1. Log in to your GitHub account and search for/locate this repository
2. Click the 'Code' dropdown and select your cloning method
3. If you have GitHub Desktop, click the GitHub Desktop button
    * The application will open with this repository available for editing
4. If you're using an alternative Git service
    1. Open Git Bash
    2. Make sure the current working directory is set to the location where you want to place the clone.
    3. Type 'git clone' in your command line and paste the URL given on the GitHub repository page

*Elements* was deployed via GitHub Pages at [GitHub.com](https://GitHub.com). At the time of writing, the development and deployment versions of *Elements* are identical.

If you'd like to run *Elements* locally, clone the repo from the menu above and open *index.html* in your web browser.


# Credits
## Code Snippets
- startGame() *script.js line 576*
    - https://www.w3docs.com/snippets/javascript/how-to-get-the-value-of-text-input-field-using-javascript.html
    - close Bootstrap modal *script.js line 600*
- (line 69) w3schools
- stackOverflow

## Digital Copyright
- All background images obtained license free from [Unsplash](https://unsplash.com) and [Pexels](https://pexels.com)
- All icons obtained license free from [Font Awesome](https://font-awesome.com)

## Acknowledgements
- This project was inspired by mobile idle/clicker games
- Thank you to my mentor Aaron for your continued help and advice
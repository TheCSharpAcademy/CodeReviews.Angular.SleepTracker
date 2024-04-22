# SleepTracker

Sleep tracker project for the c# academy.

### Features

- Filtering records by date range
- Timer that automatically adds a new record when stopping
- Table pagination thanks to angular material

### Running

start the server in visual studio and then run *ng serve* in the angular folder

### Notes and problems

Pretty straightforward project. Angular is very intuitive to work with and Material is just a good framework in general.
The main problem with material is the amount of bloat and imports you have to do depending on your setup, which makes some components increase in size a lot, making it very necessary to divide them into sub-components.
Aside from that, the back-end was simple, i used a no controller approach since the project didn't demand a lot of backend processing. At the same time, it wasn't necessary to do a lot of testing, so i havent added any tests too.
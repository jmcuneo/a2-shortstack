Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
## Anagramizer
This is the anagramizer! You can enter a word and see four anagrams of it. You can also see words that
other people have anagramized! I used both Flexbox and Grid positioning techniques.

## Technical Achievements
- **Tech Achievement 1**: I made a single page interface. When new data is added, the server returns
just the new row. When data is deleted, the server returns the unique ID of the deleted row, and every
10 seconds the page requests all data from the server so that the page can update with the requests
(both additions and deletions) of others.

### Design/Evaluation Achievements
- **Evaluation Achievement 1**: Andres Negron evaluated my interface. I started the study by giving the
instruction "Generate Some Anagrams!" Here are the results.

1. Negron
2. They didn't get immediate feedback after hitting "Generate" so they hit it a lot of times before the requests all came back at once. They thought it wasn't working, when in reality it was just taking a while.
3. I hadn't considered that they would be confused by not getting a response immediately, so that surprised me. I was also surprised when they tried a very long word and it came back much more quickly than expected!
4. I would add a little animated "Loading..." bar that appears once you hit "Generate" and disappears once the request comes back. This would prevent the confusion that occurred. I might also ignore requests that come .

- **Evaluation Achievement 2**: Liv Perez evaluated my interface.

1. Liv Perez
2. Similarly to Andres, they generated the same item two or three times, but then they figured out what was going on. However, Liz instead complained about the response time itself rather than the lack of an indication that it was loading.
3. They tried a lot of edge cases I hadn't expected them to, including using a string with numbers and using a string of only numbers. Luckily I had my server filter out any non-letters, so it worked fine!
4. I'd definitely add the loading bar as described before. If I could find a way to speed up the anagram finding algorithm I definitely would, but in a lack of knowledge of how I would do that, I think the "loading" animation will suffice.
## Course Logging System

Access online: [https://a2-spencergreene.glitch.me/]()

A system that allows enables the storage/record keeping of courses. Due to the lack of user access, the server stores *everyones* courses that uses it, without knowing who. A course is logged of a `Course ID`, i.e. 4241, a `Term`, i.e. D, `Course Name`, i.e. Webware, and a `Professor`, i.e. Cuneo. A derived field is stored, the  `CRN `consisting of the `Term `and `Course ID `, i.e. `D-3013`.

Positionaly styled using the CSS-Grid layout.

## Technical Achievements

- **Tech Achievement 1**: Everything is on a single page. Logging a course results in the table re-rendering with the updated data, and deleting a course results in the table re-rendering with the updated data.
- **Tech Achievement 2:** Existing data can be modified! To modify existing data, you simply have to "log" a course with the same existing course id.
  - Suppose we wanted to change the Professor from "Cuneo" to "Walls" in the initial summary of this project. We would create a new log with `Course ID` 4241, `Term` D, `Course Name` Webware, and `Professor` *Walls*.

### Design/Evaluation Achievements

- **Design Achievement:**

  - From Beck

    - The message you left made me laugh. Feedback wise, I think having the form in a row would make it easier to type in, however you made it very intuitive nonetheless. I like how the “remove course” portion is separate from the other portion. For some reason, I can type e into course id, but that’s the only letter. It makes the Course ID null, and the CRN “Term-“. It also makes removing the course impossible.
    - You make Course ID strictly a number, however I think it would be better to make it a string and validate it manually. If you make it a large number, it automatically turns into scientific notation (2.33e+65)
    - Not really in the scope of my responsibilities (I don’t think), but I went ahead and looked at inspect element (I was curious). For the form, you included a bunch of br’s, but from my experience it’s better to not include them. Including them makes it look really bad on mobile (which, for the purposes of this small assignment doesn’t matter). It’s something to consider

    * Still not in my scope of responsibilities, in the main.js, you use cTerm.value.concat(“-“, cID.value), when you could have simply done cTerm.value + “-“ + cID.value

  * From Perez
    * Problems: Cant remove course if there's only one left in results, sometimes would update the first result's courseid instead of creating a new course
      * **Fixed this problem - courses can now be removed if only one is there!**
    * Comments: How to update data was a bit unclear, but I like how you just need to match the courseid to update the rest of the information
      * **Added instructions on the site to be more explicit!**
    * What could change: instead of manually typing in the courseid to delete a course, pressing a delete button at the end of a row could make it quicker for the user

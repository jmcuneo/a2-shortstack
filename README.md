## Course Logging System

A system that allows enables the storage/record keeping of courses. Due to the lack of user access, the server stores *everyones* courses that uses it, without knowing who. A course is logged of a `Course ID`, i.e. 4241, a `Term`, i.e. D, `Course Name`, i.e. Webware, and a `Professor`, i.e. Cuneo. A derived field is stored, the  `CRN `consisting of the `Term `and `Course ID `, i.e. `D-3013`.

Positionaly styled using the CSS-Grid layout. 

## Technical Achievements

- **Tech Achievement 1**: Everything is on a single page. Logging a course results in the table re-rendering with the updated data, and deleting a course results in the table re-rendering with the updated data.
- **Tech Achievement 2:** Existing data can be modified! To modify existing data, you simply have to "log" a course with the same existing course id.
  - Suppose we wanted to change the Professor from "Cuneo" to "Walls" in the initial summary of this project. We would create a new log with `Course ID` 4241, `Term` D, `Course Name` Webware, and `Professor` *Walls*. 

### Design/Evaluation Achievements

- **Design Achievement 1**:

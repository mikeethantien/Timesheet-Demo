# Timesheet-Demo
This demo was writting in Angular and styled using Bootstrap. Since it's only for demo purpose, it doesn't make any actual service call, and thus the application can be executed offline without a localhost.
The form allows user to enter information of a timesheet:
- **email** required
- **time** required (the format accepts both the acronym h and m or the entire word hours and minutes. e.g. 1 h 20 m, 1 hour 20 minutes...etc).
- **message** optional
- **type of work** required

Users can reset the form using the **Clear** button or submit the timesheet using the **Next** button. Upon submission, the loader will be displayed for 1 sec before redirecting to the confirmation page. Users can also start over the workflow by clicking on **Start Again**. 

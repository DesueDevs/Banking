## Purpose of this repository
I am developing this banking web app that showcases my comprehension of cybersecurity. The purpose of this project is to provide me with hands-on experience in cybersecurity concepts and serve as a timeline that demonstrates my growth in programming ability and cybersecurity implementation.
NOTE: I am not long enough in my cybersecurity journey to begin utilizing many fundamental concepts and while I do intend to get to those concepts eventually (db management to begin with) at the time of writing this (6/25/25) I do not feel confident in my ability to properly display or use these concepts.

### Displayed Concepts
- The use of hashing in the form of SHA256 along with basic salting. Using hashing makes the storing of user credentials such as passwords secure, and salting prevents brute force attacks with things such as rainbow tables
- Proper logging techniques. Logging user actions to a reasonable level, allows a cybersecurity professional to utilize SIEM tools to effectively look for potential attacks on the system.

### Update Timeline
- [6/20/25] Logging, hashing, basic account creation/management functions without any gui - 
- [6/22/25] Implemented basic salting when storing passwords by adding the first 5 characters of the user's email before being hashed, and added a check to ensure the user has access to the requested account number in the withdrawal.
- [6/25/25] Utilized Copilot to create some basic webpages for serving login and account pages (though at this point you can't register an account). Fixed the logging function in logging.js that was broken due to a misspelled variable, fixed cookie handling in middleware.js, and changed how account.js was exported.
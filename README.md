## Purpose of this repository
I am developing this banking web app that showcases my personal comprehension of cybersecurity. This project's purpose is to both give me hands-on experience with cybersecurity concepts and serve as a timeline that shows my growth in my programming ability and my implementation of cybersecurity.

### Displayed Concepts
- The use of hashing in the form of SHA256 along with basic salting. Using hashing makes the storing of user credentials such as passwords secure, and salting pervents brute force attacks with things such as rainbow tables
- Proper logging techniques. By logging user actions to a reasonable level, it allows a cybersecurity professional to utilize SIEM tools to effectively look for potential attacks on the system.

### Update Timeline
- [6/20/25] Logging, hashing, basic account creation/management functions without any gui - 
- [6/22/25] Implemented basic salting when storing passwords by adding the first 5 characters of the user's email before being hashed, and added a check to ensure the user has access to the requested account number in the withdrawal.
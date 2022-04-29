# /main/
- Main app screen - displays the dashboard information
- Only accessible if sign-in was successful

# /sign-in/
- Comp 426 Covid Dashboard title
- Sign-in webpage with title, two entry fields (username and password), and optional sign-up button
- Checks database to see if username/password match existing database entries
- Will not allow empty fields

# /sign-up/
- Comp 426 Covid Dashboard title
- Three entry fields (username, password, confirm password)
- Will not allow empty fields
- Creates database entry with username and password

# /app/user/:username
- Developer feature - if app is run in developer mode, gives access searching the database directly for users
 
# /app/log/access
- Developer feature - if app is run in developer mode, gives access to getting information from accessLog.db

# Default response for any other request
- Displays "404 NOT FOUND"
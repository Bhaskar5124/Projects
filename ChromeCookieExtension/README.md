## Cookie Insights
The Cookie Insights is a lightweight and user-friendly Chrome extension that allows you to easily inspect and manage cookies for the website you are currently visiting.

# Features
1. Site Information: Displays the current URL, domain, and whether the site is served over HTTPS.

2. Runtime Permission: Asks for your permission before accessing cookies, respecting your privacy.

3. View Cookies: Once permission is granted, you can view a detailed list of all cookies set by the current site.

4. Manage Permissions: Allows you to revoke permission at any time.

## How to Use
1. Install the Extension..

2. Open the Extension: Navigate to a website and click on the extension icon in your browser's toolbar.

3. Grant Permission: The extension will prompt you to grant permission to access cookies for that specific site. Click "Grant" to proceed.

4. View Cookies: After granting permission, click the "Show Cookies" button to see the list of cookies.

5. Remove Permission: You can click the "Remove Permission" button at any time to revoke cookie access for the site.

## Permissions
This extension requests the following permissions to function correctly:

1. ActiveTab: Required to get the URL and domain of the currently active tab. This permission is temporary and only applies when the user interacts with the extension popup.

2. Storage: Used to remember your permission choice (granted or denied) so you don't have to confirm every time you visit the same site.

# optional_permissions:

3. Cookies: This permission is requested at runtime when you click "Grant." It allows the extension to read cookies for the active site.


# Built With
React + Javascript Vite Project : For building the user interface.

Tailwind CSS: For styling the components and ensuring a clean, responsive design.

Chrome Extension APIs: For interacting with browser functionalities like tabs, storage, and cookies.
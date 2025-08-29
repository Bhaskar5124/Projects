import { useState, useEffect } from 'react';

// Main App component
function App() {
  const [siteInfo, setSiteInfo] = useState({});
  const [cookiePermission, setCookiePermission] = useState(null);
  const [cookies, setCookies] = useState([]);
  const [showCookiesList, setShowCookiesList] = useState(false);

  // Effect to get the active tab's URL and check for stored permission
  useEffect(() => {
    // Get site info from the active tab
    // We use a chrome API, so we have to use a callback.
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          const url = new URL(tabs[0].url);
          setSiteInfo({
            url: url.href,
            domain: url.hostname,
            isHttps: url.protocol === 'https:',
          });
        }
      });

      // Check for cookie permission from local storage
      chrome.storage.local.get(['cookiePermission'], (result) => {
        setCookiePermission(result.cookiePermission);
      });
    }
  }, []);

  // Function to request cookie permission and then show cookies if granted
  const handleGrantPermission = async () => {
    if (typeof chrome !== 'undefined' && chrome.permissions) {
      const isGranted = await chrome.permissions.request({
        permissions: ['cookies'],
        origins: [siteInfo.url]
      });

      if (isGranted) {
        setCookiePermission('granted');
        chrome.storage.local.set({ cookiePermission: 'granted' });
        // After permission is granted, immediately show cookies
        handleShowCookies();
      } else {
        setCookiePermission('denied');
        chrome.storage.local.set({ cookiePermission: 'denied' });
      }
    }
  };

  // Function to deny permission
  const handleDenyPermission = () => {
    setCookiePermission('denied');
    chrome.storage.local.set({ cookiePermission: 'denied' });
  };

  // Function to get and display cookies for the current domain
  const handleShowCookies = () => {
    if (typeof chrome !== 'undefined' && chrome.cookies && siteInfo.domain) {
      chrome.cookies.getAll({ domain: siteInfo.domain }, (cookieList) => {
        setCookies(cookieList);
        setShowCookiesList(true);
      });
    }
  };

  // Function to remove permission and reset state
  const handleRemovePermission = () => {
    setCookiePermission(null);
    setShowCookiesList(false);
    setCookies([]);
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.permissions) {
      chrome.storage.local.remove('cookiePermission');
      // Revoke the permission from the browser.
      // We only remove the 'cookies' permission, not the host permission,
      // which is granted by 'activeTab' and is not removable.
      chrome.permissions.remove({
        permissions: ['cookies']
      });
    }
  };

  return (
    <div className='p-4 font-sans min-h-60 max-h-dvh min-w-100 max-w-dvw flex flex-col bg-gray-100 text-gray-900 dark:bg-slate-950 dark:text-gray-100 rounded-lg shadow-md'>
      
      <h1 className='text-center text-4xl font-semibold text-orange-300'>Site Information</h1>

      <div className='flex flex-col flex-nowrap my-2'>
        <p className='text-sm overflow-x-auto whitespace-nowrap min-h-4 max-h-16 w-full'><strong className='text-left'>URL:</strong> {siteInfo.url || 'Loading...'}</p>
        <p className='text-sm overflow-x-auto whitespace-nowrap min-h-4 max-h-16 w-full'><strong className='text-left'>Domain:</strong> {siteInfo.domain || 'Loading...'}</p>
        <p className='text-sm'><strong className='text-left'>HTTPS:</strong> {siteInfo.isHttps ? 'Served over https' : 'Not served over https'}</p>
      </div>

      {cookiePermission === 'granted' ? (
        <div className="permission-granted">
          <p className='text-lg text-green-700 dark:text-green-400'>Cookies permission granted!</p>
          <div className='flex justify-evenly'>
            <button className='m-2 h-10 w-22 rounded-md bg-gray-800 hover:border hover:border-amber-700 text-white' onClick={handleShowCookies}>Show Cookies</button>
            <button className='m-2 h-10 w-22 rounded-md bg-gray-800 hover:border hover:border-amber-700 text-white' onClick={handleRemovePermission}>Remove Permission</button>
          </div>
          {showCookiesList && (
            <div className="cookies-list">
              <h3 className='text-sm text-orange-300'>Cookies for {siteInfo.domain}</h3>

              <div className="overflow-auto max-h-70 w-full/auto p-4 rounded-lg shadow-md bg-gray-100 text-gray-900 dark:bg-slate-950 dark:text-gray-100">
                {cookies.length > 0 ? (
                  <ul className="space-y-2">
                    {cookies.map((cookie, index) => (
                      <li key={index} className="flex items-start text-sm break-words">
                        <strong className="min-w-[100px] font-semibold">{cookie.name}:</strong> 
                        <span className="text-gray-400">{cookie.value}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center text-lg">No cookies found for this site.</p>
                )}
              </div>

            </div>
          )}
        </div>
      ) : cookiePermission === 'denied' ? (
        <div className="permission-denied">
          <p className='text-lg text-red-700 dark:text-red-400'>Cookies permission denied!</p>
          <button className='m-2 h-10 w-22 rounded-md bg-gray-800 hover:border hover:border-amber-700 text-white' onClick={handleRemovePermission}>Change Permission</button>
        </div>
      ) : (
        <div className="flex flex-col">
          <p className='text-lg text-orange-700 dark:text-orange-400'>Do you want to grant cookies permission?</p>
          <div className='flex justify-evenly'>
            <button className='m-2 h-10 w-22 rounded-md bg-gray-800 hover:border hover:border-amber-700 text-white' onClick={handleGrantPermission}>Grant</button>
            <button className='m-2 h-10 w-22 rounded-md bg-gray-800 hover:border hover:border-amber-700 text-white' onClick={handleDenyPermission}>Deny</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

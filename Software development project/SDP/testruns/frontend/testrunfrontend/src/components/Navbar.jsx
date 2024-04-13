import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/home');
  };

  const navigateToProfile = () => {
    navigate('/profile');
  };

  const navigateToProfileName = () => {
    navigate('/profile'); // Navigate to the profile page
    // Additional logic to handle profile name
  };

  return (
    <div>
      <button onClick={navigateToHome}>Home</button>
      <button onClick={navigateToProfile}>Profile</button>
      <button onClick={navigateToProfileName}>Profile Name</button>
    </div>
  );
}

export default Navbar;



// import React from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   return (
//     <div>
//       {/* Use Link components to navigate to different pages */}
//       <Link to="/home">
//         <button>Home</button>
//       </Link>
//       <Link to="/profile">
//         <button>Profile</button>
//       </Link>
//       <Link to="/profile">
//         <button>Profile Name</button>
//       </Link>
//     </div>
//   );
// }

// export default Navbar;

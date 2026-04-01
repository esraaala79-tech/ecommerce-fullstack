// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import Sidebar from "../Sidebar/Sidebar";
// import "./Account.css";
// import "./Account.css";
// import { useAuth } from "../AuthContext/AuthContext";
// import Profile from "../Profile/Profile";
// function Placeholder({ title }) {
//   return (
//     <div className="placeholder">
//       <p>{title}</p>
//     </div>
//   )
// }

// export default function AccountPage() {
//   const [active, setActive] = useState('profile')
//   const { MyEmail } = useAuth();

//   const content = {
//     profile:       <Profile />,
//     address:       <Placeholder title="Address Book" />,
//     payment:       <Placeholder title="My Payment Options" />,
//     returns:       <Placeholder title="My Returns" />,
//     cancellations: <Placeholder title="My Cancellations" />,
 
//   }

//   return (
//     <div className="ap">
//       <div className="ap-topbar">
//         <nav className="ap-breadcrumb">
//           <Link to="/home">Home</Link>
//           <span>/</span>
//           <span>My Account</span>
//         </nav>
//         <p className="ap-welcome">Welcome! <span>{MyEmail?.user_username || 'User'}</span></p>
//       </div>

//       <div className="ap-layout">
//         <Sidebar active={active} onSelect={setActive} />
//         <main className="ap-content">
//           {content[active]}
//         </main>
//       </div>
//     </div>
//   )
// }
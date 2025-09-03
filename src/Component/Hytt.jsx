

// import { Trophy, Star, Users, Building2, Activity } from "lucide-react";

// export default function CRMWireframes() {
//   return (
//     <div className="p-6 grid gap-6">
//       {/* Dashboard */}
//       <Card className="shadow-lg">
//         <CardContent className="p-6">
//           <h2 className="text-xl font-bold mb-4">🏥 CRM Dashboard</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="p-4 rounded-2xl shadow bg-white text-center">
//               <Building2 className="mx-auto mb-2" />
//               <p className="font-bold">152</p>
//               <p className="text-sm">Hospitals Onboarded</p>
//             </div>
//             <div className="p-4 rounded-2xl shadow bg-white text-center">
//               <Users className="mx-auto mb-2" />
//               <p className="font-bold">420</p>
//               <p className="text-sm">CarePreneurs Active</p>
//             </div>
//             <div className="p-4 rounded-2xl shadow bg-white text-center">
//               <Activity className="mx-auto mb-2" />
//               <p className="font-bold">87</p>
//               <p className="text-sm">Leads in Progress</p>
//             </div>
//             <div className="p-4 rounded-2xl shadow bg-white text-center">
//               <Trophy className="mx-auto mb-2" />
//               <p className="font-bold">Top Partner</p>
//               <p className="text-sm">City Hospital</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Hospital Profile Wireframe */}
//       <Card className="shadow-lg">
//         <CardContent className="p-6">
//           <h2 className="text-xl font-bold mb-4">Hospital Profile Page</h2>
//           <div className="flex items-center gap-4 mb-4">
//             <img
//               src="https://via.placeholder.com/80"
//               alt="Hospital Logo"
//               className="rounded-full"
//             />
//             <div>
//               <h3 className="text-lg font-semibold">City Multispecialty Hospital</h3>
//               <p className="text-sm text-gray-500">Established 2002 | 200 Beds</p>
//               <Progress value={85} className="mt-2" />
//               <p className="text-xs mt-1">Profile Completion: 85%</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//             <div className="p-3 bg-gray-50 rounded-xl text-center">
//               <Star className="mx-auto mb-1 text-yellow-500" />
//               <p className="text-sm">Gold Partner</p>
//             </div>
//             <div className="p-3 bg-gray-50 rounded-xl text-center">
//               <p className="font-bold">12</p>
//               <p className="text-xs">Specialties</p>
//             </div>
//             <div className="p-3 bg-gray-50 rounded-xl text-center">
//               <p className="font-bold">ISO, NABH</p>
//               <p className="text-xs">Accreditations</p>
//             </div>
//             <div className="p-3 bg-gray-50 rounded-xl text-center">
//               <p className="font-bold">25</p>
//               <p className="text-xs">Support Staff</p>
//             </div>
//           </div>

//           <Button className="mt-6">Edit Profile</Button>
//         </CardContent>
//       </Card>

//       {/* Lead Pipeline Wireframe */}
//       <Card className="shadow-lg">
//         <CardContent className="p-6">
//           <h2 className="text-xl font-bold mb-4">Lead Pipeline</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {[
//               "New",
//               "Contacted",
//               "In Progress",
//               "Converted",
//             ].map((stage) => (
//               <div
//                 key={stage}
//                 className="p-4 bg-gray-50 rounded-xl min-h-[200px]"
//               >
//                 <h3 className="font-semibold mb-2">{stage}</h3>
//                 <div className="bg-white p-2 rounded shadow mb-2">
//                   Lead 1 - Patient A
//                 </div>
//                 <div className="bg-white p-2 rounded shadow mb-2">
//                   Lead 2 - Patient B
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
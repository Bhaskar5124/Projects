import comments from "./models/commentSchema.js";
import users from "./models/userSchema.js";
import videos from "./models/videoSchema.js";

const commentData = [
  {
    commentId: "cmt001",
    userId: "user01",
    text: "This video changed my perspective!",
    timestamp: new Date("2024-06-01T09:30:00Z")
  },
  {
    commentId: "cmt002",
    userId: "user02",
    text: "Great explanation, thank you!",
    timestamp: new Date("2024-06-02T14:15:00Z")
  },
  {
    commentId: "cmt003",
    userId: "user03",
    text: "Can someone share the link to the slides?",
    timestamp: new Date("2024-06-03T10:45:00Z")
  },
  {
    commentId: "cmt004",
    userId: "user04",
    text: "I love how detailed this is.",
    timestamp: new Date("2024-06-04T18:00:00Z")
  },
  {
    commentId: "cmt005",
    userId: "user05",
    text: "You deserve more views!",
    timestamp: new Date("2024-06-05T07:20:00Z")
  },
  {
    commentId: "cmt006",
    userId: "user06",
    text: "I didn’t fully understand the second part. Can you clarify?",
    timestamp: new Date("2024-06-06T22:10:00Z")
  },
  {
    commentId: "cmt007",
    userId: "user07",
    text: "Subscribed! Keep posting more content like this.",
    timestamp: new Date("2024-06-07T11:45:00Z")
  },
  {
    commentId: "cmt008",
    userId: "user08",
    text: "The visuals are really well done.",
    timestamp: new Date("2024-06-08T15:30:00Z")
  },
  {
    commentId: "cmt009",
    userId: "user09",
    text: "I watched this 3 times already, love it!",
    timestamp: new Date("2024-06-09T08:05:00Z")
  },
  {
    commentId: "cmt010",
    userId: "user10",
    text: "Looking forward to the next episode!",
    timestamp: new Date("2024-06-10T20:50:00Z")
  }
];


const videoData = [
  {
    videoId: "vid001",
    title: "React Basics Tutorial",
	  category: "Study",
    videoUrl: "https://www.youtube.com/embed/s2skans2dP4?si=jB3LTmdpYtI1J9jx",
    thumbnailUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvqVNjzw_g0aH-zFGiU6pq-lQdlAec2AcUXw&s",
    description: "A complete guide to getting started with React.",
	  channelName: "Dennis Ivy",
    channelId: "channel01",
    uploader: "user01",
    views: 10000,
    likes: 850,
    dislikes: 20,
    uploadDate: new Date("2025-01-10"),
    comments: []
  },
  {
    videoId: "vid002",
    title: "Understanding Promises in JS",
	  category: "Study",
    videoUrl: "https://www.youtube.com/embed/RvYYCGs45L4?si=oNndaBjQmR5cUYyA",
    thumbnailUrl: "https://yt3.googleusercontent.com/ytc/AIdro_mKzklyPPhghBJQH5H3HpZ108YcE618DBRLAvRUD1AjKNw=s900-c-k-c0x00ffffff-no-rj",
    description: "Simplify async code using JavaScript Promises.",
	  channelName: "Fireship",
    channelId: "channel02",
    uploader: "user03",
    views: 5600,
    likes: 410,
    dislikes: 12,
    uploadDate: new Date("2025-01-14"),
    comments: []
  },
  {
    videoId: "vid003",
    title: "Ferrari SF90 v 1,000hp Golf R & BMW M240i: DRAG RACE",
	  category: "Cars",
    videoUrl: "https://www.youtube.com/embed/hHjEtAKvWC4?si=feQ7R9BBKEqE8Sbe",
    thumbnailUrl: "https://carwow-uk-wp-2.imgix.net/carwow-new-logo-2.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=10&w=460",
    description: "It’s time for a tuned car vs supercar drag race!",
	  channelName: "Carwow",
    channelId: "channel03",
    uploader: "user04",
    views: 8200,
    likes: 710,
    dislikes: 10,
    uploadDate: new Date("2024-02-01"),
    comments: []
  },
  {
    videoId: "vid004",
    title: "F1 Car vs MotoGP Bike vs Rally Car: Ultimate Drag Race!",
	  category: "Cars",
    videoUrl: "https://www.youtube.com/embed/ADs8tvU2xDc?si=CgV4zMn0Dz3gucad",
    thumbnailUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScQsm5WkvkpdlfSmVBNXlLvFSqBO9ir4ptHw&s",
    description: "Which of these INSANE vehicles can beat a Formula 1 car?! We teamed up with ‪@carwow‬ to race a ‪@KTM‬ MotoGP Bike, a World Rally Championship car, a World Rallycross car and a crazy Ford SuperVan 4.2 in a 5 way drag race 🏁",
	  channelName: "RedBull",
    channelId: "channel04",
    uploader: "user01",
    views: 9200,
    likes: 770,
    dislikes: 8,
    uploadDate: new Date("2025-06-10"),
    comments: []
  },
  {
    videoId: "vid005",
    title: "10 *EASY* HOME DECOR STYLING TRICKS",
	  category: "Home",
    videoUrl: "https://www.youtube.com/embed/qQiKRLs75c4?si=z1NoNkgR6Mn63n4E",
    thumbnailUrl: "https://yt3.googleusercontent.com/ytc/AIdro_l8SxE3HQ6gB-QOSKqavB_zK7vt_qYuyKev7lTCoU3LQsA=s900-c-k-c0x00ffffff-no-rj",
    description: "10 budget friendly easy DIY home decor styling tricks that will instantly elevate the look of your home",
	  channelName: "Kristen Macgowan",
    channelId: "channel05",
    uploader: "user05",
    views: 4300,
    likes: 300,
    dislikes: 5,
    uploadDate: new Date("2024-03-01"),
    comments: []
  },
  {
    videoId: "vid006",
    title: "RCB vs PBKS HIGHLIGHTS I FINAL I IPL 2025",
	  category: "Sports",
    videoUrl: "https://www.youtube.com/embed/2-TIEuqoU5A?si=zy1I7ggtIUDaa0Cy",
    thumbnailUrl: "https://static.vecteezy.com/system/resources/previews/017/446/597/non_2x/cricket-bat-with-wicket-illustration-sports-objects-icon-concept-team-club-cricket-badge-shield-design-on-yellow-background-with-shadow-free-vector.jpg",
    description: "PL 2025 Final: The 18th edition of the IPL truly belonged to No. 18. An 18-year-long wait finally came to an end.",
	  channelName: "Cricked Fever",
    channelId: "channel06",
    uploader: "user03",
    views: 6800,
    likes: 550,
    dislikes: 9,
    uploadDate: new Date("2024-03-12"),
    comments: []
  },
  {
    videoId: "vid007",
    title: "How did Gukesh win for the first time against Magnus Carlsen?",
	  category: "Sports",
    videoUrl: "https://www.youtube.com/embed/93aqIYtSMFc?si=rFb9IEaJH6bHloRf",
    thumbnailUrl: "https://www.regencychess.co.uk/images/RCPB097.jpg",
    description: "Chess News: World Chess Champion D Gukesh takes down Magnus Carlsen for the first time in his chess career at Round 6 of Norway Chess 2025!",
	  channelName: "Sports Today",
    channelId: "channel07",
    uploader: "user06",
    views: 7500,
    likes: 670,
    dislikes: 15,
    uploadDate: new Date("2023-03-20"),
    comments: []
  },
  {
    videoId: "vid008",
    title: "Beriddim",
	  category: "Music",
    videoUrl: "https://www.youtube.com/embed/M57HXTA6SsU?si=DSVfPIOuBCwguis6",
    thumbnailUrl: "https://c.saavncdn.com/532/Berywam-English-2017-500x500.jpg",
    description: "We present to you « BERIDDIM » the first song from our future album which will be dropped very soon!",
	  channelName: "Beriwam",
    channelId: "channel08",
    uploader: "user07",
    views: 6100,
    likes: 540,
    dislikes: 11,
    uploadDate: new Date("2024-04-01"),
    comments: []
  },
  {
    videoId: "vid009",
    title: "Barbaadiyan (Full Video)| Shiddat |Sunny K,Radhika M |Sachet T,Nikhita G, Madhubanti B",
	  category: "Music",
    videoUrl: "https://www.youtube.com/embed/vJQMhj6WYZA?si=0m57pH4xrPj9dGks",
    thumbnailUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK0xPPmXEHIyC1tMpqhj0aKK0slh97mn9ImA&s",
    description: "Presenting the full video of the song Barbaadiyan from the movie #Shiddat. ",
	  channelName: "T-series",
    channelId: "channel09",
    uploader: "user08",
    views: 17958423,
    likes: 490,
    dislikes: 7,
    uploadDate: new Date("2022-04-12"),
    comments: []
  },
  {
    videoId: "vid010",
    title: "DEKHYA KITE (Official Video) Davy Ft Simar Kaur | Gur Sidhu",
	  category: "Music",
    videoUrl: "https://www.youtube.com/embed/YE1XRIOCuiA?si=0XMTmXpjvkHMx-uo",
    thumbnailUrl: "https://yt3.googleusercontent.com/ytc/AIdro_lCLXpWdGEnSYTBZYp711PY6EBNWQNPplXAqJlewE_ftw=s900-c-k-c0x00ffffff-no-rj",
    description: "Brown Town Music & Nav Sandhu Presents Punjabi Song Dekhya Kite By Davy Ft Simar Kaur.",
	  channelName: "Brown Town Music",
    channelId: "channel010",
    uploader: "user09",
    views: 7100,
    likes: 630,
    dislikes: 13,
    uploadDate: new Date("2024-04-22"),
    comments: []
  },
  {
    videoId: "vid011",
    title: "2025 Interior Design Trends w/ Shea McGee",
	  category: "Home",
    videoUrl: "https://www.youtube.com/embed/draecH9UND8?si=nt8-v8g53G22x41X",
    thumbnailUrl: "https://studio-mcgee.com/wp-content/app/uploads/2025/04/studiomcgee-20241022-Spring-0217-aspect-ratio-5-6.jpg",
    description: "In this webisode, Shea brings us along as she dives into the 2025 design trends she's most excited about.",
	  channelName: "Studio McGee",
    channelId: "channel11",
    uploader: "user11",
    views: 712000,
    likes: 10000,
    dislikes: 5,
    uploadDate: new Date("2024-03-01"),
    comments: []
  },
  
];


// const userData = [
//   {
//     userName: "DennisIvy",
//     email: "Dennis.Ivy123@gmail.com",
//     password: "Ivy@123",
//     avatar: "https://img-c.udemycdn.com/user/200_H/98206342_40d2_5.jpg",
//     channel: [	
//       {
//         channelName: "DennisIvy",
//         owner: "DennisIvy",
//         description: "Sharing what I know about Full Stack Web development",
//         channelBanner: "https://yt3.googleusercontent.com/l_Gkx5duwboYftvawqW4ykr64bXmt--ZpmlY2ooff2ZYq6ZWii75OVN7yTxeFGjBVTFwAfMN=w2276-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
//         subscribers: 221000,
//         videos: [
//           {
//             videoId: "vid001",
//             title: "React Basics Tutorial",
// 	          category: "Study",
//             videoUrl: "https://www.youtube.com/embed/s2skans2dP4?si=jB3LTmdpYtI1J9jx",
//             thumbnailUrl: "https://img-c.udemycdn.com/user/200_H/98206342_40d2_5.jpg",
//             description: "A complete guide to getting started with React.",
// 	          channelName: "DennisIvy",
//             channelId: "channel01",
//             uploader: "DennisIvy",
//             views: 10000,
//             likes: 850,
//             dislikes: 20,
//             uploadDate: new Date("2025-01-10"),
//             comments: [
//               {
//                 userCommented:"Fireship",
// 	              userAvatar:"https://yt3.googleusercontent.com/ytc/AIdro_mKzklyPPhghBJQH5H3HpZ108YcE618DBRLAvRUD1AjKNw=s900-c-k-c0x00ffffff-no-rj",
//                 text: "This video changed my perspective!",
//                 timestamp: new Date("2024-06-01T09:30:00Z")
// 	            },
// 	            {
//                 userCommented: "Carwow",
// 	              userAvatar:"https://carwow-uk-wp-2.imgix.net/carwow-new-logo-2.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=10&w=460",
//                 text: "Great explanation, thank you!",
//                 timestamp: new Date("2024-06-02T14:15:00Z")
//               },
//             ]
// 	        },
//         ]
// 	    }
//     ]
//   },
//   {
//     userName: "Fireship",
//     email: "Fire.Ship123@gmail.com",
//     password: "Ship@123",
//     avatar: "https://yt3.googleusercontent.com/ytc/AIdro_mKzklyPPhghBJQH5H3HpZ108YcE618DBRLAvRUD1AjKNw=s900-c-k-c0x00ffffff-no-rj",
//     channel: [	
//       {
//         channelName: "Fireship",
//         owner: "Fireship",
//         description: "High-intensity code tutorials and tech news to help you ship your app faster. New videos every week covering the topics every programmer should know.",
//         channelBanner: "https://yt3.googleusercontent.com/62Kw34f1ysmycFceeNIFGsWpRDyqgDUSn2mAn29gwv7axMjN4NUVkJWqwEi4XKBE0016l7C4=w2276-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
//         subscribers: 3900000,
//         videos: [
//           {
//             videoId: "vid002",
//             title: "Understanding Promises in JS",
// 	          category: "Study",
//             videoUrl: "https://www.youtube.com/embed/RvYYCGs45L4?si=oNndaBjQmR5cUYyA",
//             thumbnailUrl: "https://yt3.googleusercontent.com/ytc/AIdro_mKzklyPPhghBJQH5H3HpZ108YcE618DBRLAvRUD1AjKNw=s900-c-k-c0x00ffffff-no-rj",
//             description: "Simplify async code using JavaScript Promises.",
// 	          channelName: "Fireship",
//             channelId: "channel02",
//             uploader: "Fireship",
//             views: 5600,
//             likes: 410,
//             dislikes: 12,
//             uploadDate: new Date("2025-01-14"),
//             comments: [
// 	            {
//                 userCommented: "Carwow",
// 	              userAvatar:"https://carwow-uk-wp-2.imgix.net/carwow-new-logo-2.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=10&w=460",
//                 text: "Great explanation, thank you!",
//                 timestamp: new Date("2024-06-02T14:15:00Z")
//               },
// 	            {
//                 userCommented: "RedBull",
// 	              userAvatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScQsm5WkvkpdlfSmVBNXlLvFSqBO9ir4ptHw&s",
//                 text: "Great explanation, thank you!",
//                 timestamp: new Date("2024-06-02T14:15:00Z")
//               }
//             ]
// 	        },
//         ]
// 	    }
//     ]
//   },
//   {
//     userName: "Carwow",
//     email: "Car.Wow123@gmail.com",
//     password: "Wow@123",
//     avatar: "https://carwow-uk-wp-2.imgix.net/carwow-new-logo-2.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=10&w=460",
//     channel: [	
//       {
//         channelName: "Carwow",
//         owner: "Carwow",
//         description: "Sharing Most Excting Drag Races!",
//         channelBanner: "https://yt3.googleusercontent.com/fPXHN3UXZg1PXMdBeGj0GEsLuB2SoZv33pQo8nTRQRoelnFLVIeI73ax1OyGrNLJnkrJHJSSUg=w2276-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
//         subscribers: 10300000,
//         videos: [
//           {
//             videoId: "vid003",
//             title: "Ferrari SF90 v 1,000hp Golf R & BMW M240i: DRAG RACE",
// 	          category: "Cars",
//             videoUrl: "https://www.youtube.com/embed/hHjEtAKvWC4?si=HEe7GkQtTZEBIsRo",
//             thumbnailUrl: "https://carwow-uk-wp-2.imgix.net/carwow-new-logo-2.jpg?auto=format&cs=tinysrgb&fit=clip&ixlib=rb-1.1.0&q=10&w=460",
//             description: "It’s time for a tuned car vs supercar drag race!",
// 	          channelName: "Carwow",
//             channelId: "channel03",
//             uploader: "user04",
//             views: 8200,
//             likes: 710,
//             dislikes: 10,
//             uploadDate: new Date("2024-02-01"),
//             comments: [
// 	            {
//                 userCommented: "RedBull",
// 	              userAvatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScQsm5WkvkpdlfSmVBNXlLvFSqBO9ir4ptHw&s",
//                 text: "Great Dopamine Today, thank you!",
//                 timestamp: new Date("2024-06-02T14:15:00Z")
//               },
// 	            {
//                 userCommented: "Kristen Macgowan",
// 	              userAvatar:"https://yt3.googleusercontent.com/ytc/AIdro_l8SxE3HQ6gB-QOSKqavB_zK7vt_qYuyKev7lTCoU3LQsA=s900-c-k-c0x00ffffff-no-rj",
//                 text: "Thrilling Drag Race",
//                 timestamp: new Date("2024-06-02T14:15:00Z")
//               }
//             ]
// 	        },
//         ]
// 	    }
//     ]
//   },//----------------------------------------------
//   {
//     userName: "RedBull",
//     email: "Red.Bull123@gmail.com",
//     password: "Bull@123",
//     avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScQsm5WkvkpdlfSmVBNXlLvFSqBO9ir4ptHw&s",
//     channel: [	
//       {
//         channelName: "RedBull",
//         owner: "RedBull",
//         description: "Experience the world of Red Bull like you have never seen it before, with the best action sport videos on YouTube.",
//         channelBanner: "https://yt3.googleusercontent.com/kJ6_GhWLk4YnaNQV65g6CN9WrAiuw2Qa0ebUkrjr6pX6Nj2ANE5KRwaSAqEeYFfTtX4txJYEfg=w2276-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
//         subscribers: 23300000,
//         videos: [
//           {
//             videoId: "vid004",
//             title: "F1 Car vs MotoGP Bike vs Rally Car: Ultimate Drag Race!",
// 	          category: "Cars",
//             videoUrl: "https://www.youtube.com/embed/ADs8tvU2xDc?si=CgV4zMn0Dz3gucad",
//             thumbnailUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScQsm5WkvkpdlfSmVBNXlLvFSqBO9ir4ptHw&s",
//             description: "Which of these INSANE vehicles can beat a Formula 1 car?! We teamed up with ‪@carwow‬ to race a ‪@KTM‬ MotoGP Bike, a World Rally Championship car, a World Rallycross car and a crazy Ford SuperVan 4.2 in a 5 way drag race 🏁",
// 	          channelName: "RedBull",
//             channelId: "channel04",
//             uploader: "user01",
//             views: 9200,
//             likes: 770,
//             dislikes: 8,
//             uploadDate: new Date("2025-06-10"),
//             comments: [
// 	            {
//                 userCommented: "Kristen Macgowan",
// 	              userAvatar:"https://yt3.googleusercontent.com/ytc/AIdro_l8SxE3HQ6gB-QOSKqavB_zK7vt_qYuyKev7lTCoU3LQsA=s900-c-k-c0x00ffffff-no-rj",
//                 text: "What a Drag Race!",
//                 timestamp: new Date("2024-08-02T14:15:00Z")
//               },
// 	            {
//                 userCommented: "SportsToday",
// 	              userAvatar:"https://yt3.googleusercontent.com/N59zp9ScnRljZQM9Lffp58rdxun3tx-ONEgpj0f0YOUHg7pd608TTB2sGuHESSrutrU8UmVDYQ=s900-c-k-c0x00ffffff-no-rj",
//                 text: "That motoGP bike is Insane!",
//                 timestamp: new Date("2024-06-02T14:15:00Z")
//               }
//             ]
// 	        },
//         ]
// 	    }
//     ]
//   },
//   {
//     userName: "KristenMacgowan",
//     email: "Kristen.Macgowan123@gmail.com",
//     password: "Macgowan@123",
//     avatar: "https://yt3.googleusercontent.com/ytc/AIdro_l8SxE3HQ6gB-QOSKqavB_zK7vt_qYuyKev7lTCoU3LQsA=s900-c-k-c0x00ffffff-no-rj",
//     channel: [	
//       {
//         channelName: "KristenMacgowan",
//         owner: "KristenMacgowan",
//         description: "Kristen McGowan received her Bachelors of Interior Design and is ready to share all of her Interior design, home decor, DIY, and lifestyle tips.",
//         channelBanner: "https://yt3.googleusercontent.com/BFs2WMyEkg8iMkXHWF0vDWcjiK5JfHnIO6WqXRUXaiD8mfOdSir_5tZAFIk93gMjwWI3DCpN8lA=w2276-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
//         subscribers: 1850000,
//         videos: [
//           {
//             videoId: "vid005",
//             title: "10 *EASY* HOME DECOR STYLING TRICKS",
// 	          category: "Home",
//             videoUrl: "https://www.youtube.com/embed/qQiKRLs75c4?si=z1NoNkgR6Mn63n4E",
//             thumbnailUrl: "https://yt3.googleusercontent.com/ytc/AIdro_l8SxE3HQ6gB-QOSKqavB_zK7vt_qYuyKev7lTCoU3LQsA=s900-c-k-c0x00ffffff-no-rj",
//             description: "10 budget friendly easy DIY home decor styling tricks that will instantly elevate the look of your home",
// 	          channelName: "KristenMacgowan",
//             channelId: "channel05",
//             uploader: "user05",
//             views: 4300,
//             likes: 300,
//             dislikes: 5,
//             uploadDate: new Date("2024-03-01"),
//             comments: [
// 	            {
//                 userCommented: "SportsToday",
// 	              userAvatar:"https://yt3.googleusercontent.com/N59zp9ScnRljZQM9Lffp58rdxun3tx-ONEgpj0f0YOUHg7pd608TTB2sGuHESSrutrU8UmVDYQ=s900-c-k-c0x00ffffff-no-rj",
//                 text: "Nice Ideas!",
//                 timestamp: new Date("2024-06-02T14:15:00Z")
//               },
// 	            {
//                 userCommented: "ChesscomIndia",
// 	              userAvatar:"https://yt3.googleusercontent.com/kqfqRVyL-d1wLMcHn8T5GymmPhv7H_53WoByAqpUibso6WM4kCJEx03n8YysaqW-fQPHREMDXw=s900-c-k-c0x00ffffff-no-rj",
//                 text: "Last One flattened me, thank you!",
//                 timestamp: new Date("2024-06-02T14:15:00Z")
//               }
//             ]
// 	        },
//         ]
// 	    }
//     ]
//   },
//   {
//     userName: "SportsToday",
//     email: "Sports.Today123@gmail.com",
//     password: "Today@123",
//     avatar: "https://yt3.googleusercontent.com/N59zp9ScnRljZQM9Lffp58rdxun3tx-ONEgpj0f0YOUHg7pd608TTB2sGuHESSrutrU8UmVDYQ=s900-c-k-c0x00ffffff-no-rj",
//     channel: [	
//       {
//         channelName: "SportsToday",
//         owner: "SportsToday",
//         description: "Crazy about sports? Join the club.",
//         channelBanner: "https://yt3.googleusercontent.com/JcJLhOfmEg1v-7j5EsW3K5Gi2d52OJC5WHcbsJ2k3QmYiVB0fv-RP9KPHLUjj4t3FU2tvfcc0IE=w2276-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
//         subscribers: 609000,
//         videos: [
//           {
//             videoId: "vid006",
//             title: "RCB vs PBKS HIGHLIGHTS I FINAL I IPL 2025",
// 	          category: "Sports",
//             videoUrl: "https://www.youtube.com/embed/2-TIEuqoU5A?si=zy1I7ggtIUDaa0Cy",
//             thumbnailUrl: "https://yt3.googleusercontent.com/N59zp9ScnRljZQM9Lffp58rdxun3tx-ONEgpj0f0YOUHg7pd608TTB2sGuHESSrutrU8UmVDYQ=s900-c-k-c0x00ffffff-no-rj",
//             description: "PL 2025 Final: The 18th edition of the IPL truly belonged to No. 18. An 18-year-long wait finally came to an end.",
// 	          channelName: "SportsToday",
//             channelId: "channel06",
//             uploader: "user03",
//             views: 6800,
//             likes: 550,
//             dislikes: 9,
//             uploadDate: new Date("2024-03-12"),
//             comments: [
// 	            {
//                 userCommented: "ChesscomIndia",
// 	              userAvatar:"https://yt3.googleusercontent.com/kqfqRVyL-d1wLMcHn8T5GymmPhv7H_53WoByAqpUibso6WM4kCJEx03n8YysaqW-fQPHREMDXw=s900-c-k-c0x00ffffff-no-rj",
//                 text: "What a game!",
//                 timestamp: new Date("2024-06-02T14:15:00Z")
//               },
// 	            {
//                 userCommented: "Beriwam",
// 	              userAvatar:"https://c.saavncdn.com/532/Berywam-English-2017-500x500.jpg",
//                 text: "Well Played RCB!",
//                 timestamp: new Date("2024-06-02T14:15:00Z")
//               }
//             ]
// 	        },
//         ]
// 	    }
//     ]
//   },
//   {
//     userName: "Beriwam",
//     email: "Beri.Wam123@gmail.com",
//     password: "Wam@123",
//     avatar: "https://c.saavncdn.com/532/Berywam-English-2017-500x500.jpg",
//     channel: [	
//       {
//         channelName: "Beriwam",
//         owner: "Beriwam",
//         description: "World Beatbox Champion",
//         channelBanner: "https://yt3.googleusercontent.com/SGwH3IgtqYmBs-_edU9OPHi5kDLlZ3-OJEax_7zdQAHaHkxrLkMve_m0j_f5m4SPV_vl9Jq4rA=w2276-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
//         subscribers: 4.920000,
//         videos: [
//           {
//             videoId: "vid007",
//             title: "Beriddim",
// 	          category: "Music",
//             videoUrl: "https://www.youtube.com/embed/M57HXTA6SsU?si=DSVfPIOuBCwguis6",
//             thumbnailUrl: "https://c.saavncdn.com/532/Berywam-English-2017-500x500.jpg",
//             description: "We present to you « BERIDDIM » the first song from our future album which will be dropped very soon!",
// 	          channelName: "Beriwam",
//             channelId: "channel07",
//             uploader: "user07",
//             views: 6100,
//             likes: 540,
//             dislikes: 11,
//             uploadDate: new Date("2024-04-01"),
//             comments: [
// 	            {
//                 userCommented: "KristenMacgowan",
// 	              userAvatar:"https://yt3.googleusercontent.com/ytc/AIdro_l8SxE3HQ6gB-QOSKqavB_zK7vt_qYuyKev7lTCoU3LQsA=s900-c-k-c0x00ffffff-no-rj",
//                 text: "What a Music!",
//                 timestamp: new Date("2024-08-02T14:15:00Z")
//               },
// 	            {
//                 userCommented: "SportsToday",
// 	              userAvatar:"https://yt3.googleusercontent.com/N59zp9ScnRljZQM9Lffp58rdxun3tx-ONEgpj0f0YOUHg7pd608TTB2sGuHESSrutrU8UmVDYQ=s900-c-k-c0x00ffffff-no-rj",
//                 text: "That Bass is Insane!",
//                 timestamp: new Date("2024-06-02T14:15:00Z")
//               }
//             ]
// 	        },
//         ]
// 	    }
//     ]
//   },
// ];





  export async function seedVideoDB(){
    await videos.insertMany(videoData);
    console.log('Video DB seeded');
  }

    export async function seedCommentDB(){
    await comments.insertMany(commentData);
    console.log('Comment DB seeded');
  }

    export async function seedUserDB(){
    await users.insertMany(userData);
    console.log('User DB seeded');
  }
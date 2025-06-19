import comments from "./models/commentSchema.js";
import users from "./models/userSchema.js";
import videos from "./models/videoSchema.js";


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





  export async function seedVideoDB(){
    await videos.insertMany(videoData);
    console.log('Video DB seeded');
  }

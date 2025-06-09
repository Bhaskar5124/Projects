import commentModel from "./models/commentSchema.js";
import videoModel from "./models/videoSchema.js";

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
    thumbnailUrl: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fo9r97ts6fecb6elzm4vf.png",
    description: "A complete guide to getting started with React.",
	channelName: "React Learning",
    channelId: "channel01",
    uploader: "user01",
    views: 10000,
    likes: 850,
    dislikes: 20,
    uploadDate: new Date("2024-01-10"),
    comments: commentData,
  },
  {
    videoId: "vid002",
    title: "Understanding Promises in JS",
	category: "Study",
    videoUrl: "https://www.youtube.com/embed/RvYYCGs45L4?si=oNndaBjQmR5cUYyA",
    thumbnailUrl: "https://ellipsiseducation.com/wp-content/uploads/2023/03/javascript.png",
    description: "Simplify async code using JavaScript Promises.",
	channelName: "JS Nodeman",
    channelId: "channel02",
    uploader: "user03",
    views: 5600,
    likes: 410,
    dislikes: 12,
    uploadDate: new Date("2024-01-14"),
    comments: commentData,
  },
  {
    videoId: "vid003",
    title: "Ferrari SF90 v 1,000hp Golf R & BMW M240i: DRAG RACE",
	category: "Cars",
    videoUrl: "https://www.youtube.com/embed/lkIFF4maKMU?si=HDrBybDf2gKD3cdp",
    thumbnailUrl: "https://i.pinimg.com/736x/e1/ed/2f/e1ed2f37e5607be83c741e6c411db272.jpg",
    description: "It’s time for a tuned car vs supercar drag race!",
	channelName: "Carhow",
    channelId: "channel03",
    uploader: "user04",
    views: 8200,
    likes: 710,
    dislikes: 10,
    uploadDate: new Date("2024-02-01"),
    comments: commentData,
  },
  {
    videoId: "vid004",
    title: "911 GT3 RS v AMG GT R: DRAG RACE",
	category: "Cars",
    videoUrl: "https://www.youtube.com/embed/Ky_l9FxSHOs?si=Q-E5x1iglNAUdtin",
    thumbnailUrl: "https://carwow-uk-wp-2.imgix.net/porsche-911-gt3-rs-v-mercedes-amg-gtr-drag-race-thumbnail-b-2-1.jpg?auto=format&cs=tinysrgb&fit=crop&h=800&ixlib=rb-1.1.0&q=60&w=1600",
    description: "It’s time for a supercar showdown!",
	channelName: "Burnout",
    channelId: "channel04",
    uploader: "user01",
    views: 9200,
    likes: 770,
    dislikes: 8,
    uploadDate: new Date("2024-02-10"),
    comments: commentData,
  },
  {
    videoId: "vid005",
    title: "10 *EASY* HOME DECOR STYLING TRICKS",
	category: "Home",
    videoUrl: "https://www.youtube.com/embed/qQiKRLs75c4?si=z1NoNkgR6Mn63n4E",
    thumbnailUrl: "https://assets.architecturaldigest.in/photos/62026064b5d9eefa7e4e2ddf/4:3/w_1439,h_1079,c_limit/How%20to%20furnish%20your%20home%20on%20a%20budget.jpg",
    description: "10 budget friendly easy DIY home decor styling tricks that will instantly elevate the look of your home",
	channelName: "Home Maker",
    channelId: "channel05",
    uploader: "user05",
    views: 4300,
    likes: 300,
    dislikes: 5,
    uploadDate: new Date("2024-03-01"),
    comments: commentData,
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
    comments: commentData,
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
    uploadDate: new Date("2024-03-20"),
    comments: commentData,
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
    comments: commentData,
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
    uploadDate: new Date("2024-04-12"),
    comments: commentData,
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
    comments: commentData,
  }
];




  export async function seedVideoDB(){
    await videoModel.insertMany(videoData);
    console.log('Video DB seeded');
  }

    export async function seedCommentDB(){
    await commentModel.insertMany(commentData);
    console.log('Comment DB seeded');
  }

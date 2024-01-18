const PRODUCTS = [
  {
   "Product Name": "Wordpress Website - Basic Version",
   "Price USD": 1500,
   "Discount %": 10,
   "Discount Price": 1350
  },
  {
   "Product Name": "Wordpress Website - Standard Version",
   "Price USD": 3000,
   "Discount %": 15,
   "Discount Price": 2550
  },
  {
   "Product Name": "Wordpress Website - Extended Version",
   "Price USD": 5000,
   "Discount %": 20,
   "Discount Price": 4000
  },
  {
   "Product Name": "APP Development - Android",
   "Price USD": 500
  },
  {
   "Product Name": "APP Development - IOS",
   "Price USD": 800,
   "Discount %": 10,
   "Discount Price": 720
  },
  {
   "Product Name": "App Development Combi (Android and IOS)",
   "Price USD": 1500,
   "Discount %": 25,
   "Discount Price": 1125
  },
  {
   "Product Name": "Social Media Marketing Facebook",
   "Price USD": "200 \/ monthly"
  },
  {
   "Product Name": "Social Media  Marketing Instagram",
   "Price USD": "200 \/monthly"
  },
  {
   "Product Name": "Social Media Marketing TikTok",
   "Price USD": "200\/monthly"
  },
  {
   "Product Name": "Graphic Design  Startup Package",
   "Description": "Logo, Company Letter, Social Media Banners, Company Cards",
   "Price USD": 800,
   "Discount %": 25,
   "Discount Price": 600
  },
  {
   "Product Name": "Web Design",
   "Description": "individual design and templates, responsive design",
   "Price USD": 650
  },
  {
   "Product Name": "Logo Design ",
   "Description": "2 reviews, all logos will give out as png, and source file",
   "Price USD": 300
  },
  {
   "Product Name": "CPP Advertisement ",
   "Description": "Budget needs to be provided by the client. ",
   "Price USD": 350
  },
  {
   "Product Name": "E-Mail Marketing",
   "Description": "Bulk Mails up to 500.000 Emails (mails needs to be provided by the client)",
   "Price USD": 150
  },
  {
   "Product Name": "E-Mail Marketing 1M",
   "Description": "Bulk Mails up to 1 Mio Emails (mails needs to be provided by the client)",
   "Price USD": 250
  },
  {
   "Product Name": "E-Mail Marketing 2M",
   "Description": "Bulk Mails up to 1.5 Mio Emails (mails needs to be provided by the client)",
   "Price USD": 350
  },
  {
   "Product Name": "Online Press Releases",
   "Description": "Over 200 Online Magazines in UK,US,Can and Germany (per press release)",
   "Price USD": 350,
   "Discount %": 10,
   "Discount Price": 315
  },
  {
   "Product Name": "Google Bad Commands Removal",
   "Description": "remove bad commands permanently from google (per link)",
   "Price USD": 900,
   "Discount %": 10,
   "Discount Price": 810
  },
  {
   "Product Name": "Boundle I",
   "Description": "Wordpress Basic, Graphic Design Start Up Package",
   "Price USD": 1999,
   "Discount %": 10,
   "Discount Price": 1800
  },
  {
   "Product Name": "Boundle 2",
   "Description": "Wordpress Extendet, App Development Combi",
   "Price USD": 5999,
   "Discount %": 15,
   "Discount Price": 5099
  },
  {
   "Product Name": "Translations",
   "Description": "english, german, french, chinese, japanese, tagalog, tamil ",
   "Price USD": "0,085\/word"
  },
  {
   "Product Name": "SEO (Search Engine Optimization)",
   "Description": "Research, On page , Link Builing, Analytic",
   "Price USD": "900\/monthly",
   "Discount %": 10,
   "Discount Price": 810
  },
  {
   "Product Name": "Customer Support (english)",
   "Description": "Chat Support (price per agent)",
   "Price USD": "10 USD \/h"
  },
  {
   "Product Name": "Customer Support Telephone (english)",
   "Description": "Telephone Support (price per agent)",
   "Price USD": "25 USD \/ h"
  },
  {
   "Product Name": "Customer Support E Mail (english)",
   "Description": "E-Mail Support (price per agent)",
   "Price USD": "10 USD \/ h"
  },
  {
   "Product Name": "Customer Support Backoffice (english)",
   "Description": "Backoffice (price per agent)",
   "Price USD": "30 USD\/h"
  }
 ]
let allCodes = []
 json.forEach((x) => {
  allCodes.push(x.FIELD3)
 })

 console.log(allCodes.join(","))
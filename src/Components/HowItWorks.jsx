import Navbar from "./Navbar"
import Footer from "./Footer"
import { Link } from 'react-router-dom'


 const  HowItWorks = ()  =>{
  return (
    <>
      <Navbar />
      
     
     <div className="  p-4 lg:p-20 text-cyan-900">
       <h1 className=" grid place-items-center lg:text-2xl font-bold mb-4" >How to Design</h1>
       
       
       <div className="mb-4">
         <h2 className="lg:text-xl font-bold mb-2">Step 1: Select a Quote</h2>
         <p>Choose an inspirational or motivational quote from the available options.</p>
       </div>


       <div className="mb-4">
         <h2 className="lg:text-xl font-bold mb-2">Step 2: Save or Export the Quotes you Generated </h2>
         <p>You have the option of saving the quote you generated as a MSWord document or export to use it for T-shirt customization</p>
       </div>
 
       <div className="mb-4">
         <h2 className="lg:text-xl font-bold mb-2">Step 3: Customize T-shirt</h2>
         <p>Customize a T-shirt with your quote by changing the background color, text color, and other styling options.</p>
       </div>

       <div className="mb-4">
         <h2 className="lg:text-xl font-bold mb-2">Step 4: Download your design</h2>
         <p>Click the download button to download your customized T-shirt with the amazing quote</p>
       </div>


       <Link to="/getquotes"><button  className="items-center text-cyan-100   font-bold list-none justify-self-end bg-cyan-700 lg:w-40 px-6   py-2 lg:py-4 rounded-full hover:scale-95">
        Get Started</button>
        </Link>
     </div>
   
       <Footer />
   
    </>
    
  )
}

export default HowItWorks
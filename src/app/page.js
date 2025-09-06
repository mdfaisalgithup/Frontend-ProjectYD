import Footer from "./Component/footer/page";
import Home from "./Component/Home-Section/homeSection";
import NavBar from "./Component/header/navbar/page";
import Section from "./frontend/section/section";
import About from "./about/page";





export default async function Main() {








   return (
   <>
   <div className="relative top-0 bottom-0 left-0 right-0">
<NavBar></NavBar>
<Home></Home>
<Section></Section>
<Footer></Footer>
</div>
   </>
  );




}
